(function (window) {
    var BASE_URL = 'http://localhost:5000/api/v1';
    var COLLECTIONS = {
        edutrack_courses: 'courses',
        edutrack_enrollments: 'enrollments'
    };
    var TOKEN_KEY = 'token';
    var STUDENT_SESSION_KEY = 'edutrack_current_student';
    var ADMIN_FLAG_KEY = 'isAdminVerified';
    var ADMIN_ACCOUNT = {
        name: 'Administrator',
        email: 'admin@institute.edu',
        password: '12341234',
        department: 'Administration'
    };
    var MAX_AGE_MS = 1000;
    var BANNER_ID = 'edutrack-api-banner';
    var store = {};
    var online = false;
    var raw = {
        get: Storage.prototype.getItem,
        set: Storage.prototype.setItem,
        remove: Storage.prototype.removeItem
    };

    function getToken() {
        try {
            return window.sessionStorage.getItem(TOKEN_KEY);
        } catch (err) {
            return null;
        }
    }

    function setToken(token) {
        try {
            window.sessionStorage.setItem(TOKEN_KEY, token);
        } catch (err) {
            return;
        }
    }

    function clearToken() {
        try {
            window.sessionStorage.removeItem(TOKEN_KEY);
        } catch (err) {
            return;
        }
    }

    function isAdminSession() {
        return raw.get.call(window.localStorage, ADMIN_FLAG_KEY) === 'true';
    }

    function showBanner(message) {
        function add() {
            var bar = document.getElementById(BANNER_ID);
            if (!bar) {
                bar = document.createElement('div');
                bar.id = BANNER_ID;
                bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#b3261e;color:#fff;padding:10px 16px;font:14px/1.4 Inter,Arial,sans-serif;text-align:center';
                document.body.appendChild(bar);
            }
            bar.textContent = message;
        }
        if (document.body) {
            add();
        } else {
            document.addEventListener('DOMContentLoaded', add);
        }
    }

    function hideBanner() {
        var bar = document.getElementById(BANNER_ID);
        if (bar && bar.parentNode) {
            bar.parentNode.removeChild(bar);
        }
    }

    function send(method, path, body) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, BASE_URL + path, false);
        if (body !== undefined) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        var token = getToken();
        if (token) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        }
        xhr.send(body === undefined ? null : JSON.stringify(body));
        var data = null;
        try {
            data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
        } catch (err) {
            data = null;
        }
        return { status: xhr.status, data: data };
    }

    function loginAdmin() {
        var credentials = { email: ADMIN_ACCOUNT.email, password: ADMIN_ACCOUNT.password };
        var result = send('POST', '/auth/login', credentials);
        if (result.status === 401) {
            var created = send('POST', '/auth/register', ADMIN_ACCOUNT);
            if (created.status !== 201 && created.status !== 409) {
                return false;
            }
            result = send('POST', '/auth/login', credentials);
        }
        if (result.status === 200 && result.data && result.data.token) {
            setToken(result.data.token);
            return true;
        }
        return false;
    }

    function request(method, path, body) {
        var result = send(method, path, body);
        if (result.status === 401 && method !== 'GET' && isAdminSession() && loginAdmin()) {
            result = send(method, path, body);
        }
        if (result.status < 200 || result.status >= 300) {
            var message = (result.data && result.data.message) || (method + ' ' + path + ' failed with status ' + result.status);
            throw new Error(message);
        }
        return result.data;
    }

    function load(key) {
        var response = request('GET', '/' + COLLECTIONS[key]);
        var list = (response && response.data) || [];
        var map = {};
        list.forEach(function (item) {
            if (item && item.id !== undefined) {
                map[String(item.id)] = JSON.stringify(item);
            }
        });
        store[key] = { list: list, map: map, loadedAt: Date.now() };
    }

    function hydrate() {
        try {
            Object.keys(COLLECTIONS).forEach(function (key) {
                load(key);
            });
            Object.keys(COLLECTIONS).forEach(function (key) {
                raw.remove.call(window.localStorage, key);
            });
            raw.remove.call(window.localStorage, 'edutrack_students');
            online = true;
            hideBanner();
        } catch (err) {
            online = false;
            console.warn('EduTrack: backend not reachable at ' + BASE_URL, err);
            showBanner('Backend is not running. Start it with "npm run dev" in the backend folder, then refresh. Changes are NOT being saved to db.json.');
        }
    }

    function current(key) {
        var entry = store[key];
        if (entry && Date.now() - entry.loadedAt < MAX_AGE_MS) {
            return entry;
        }
        try {
            load(key);
        } catch (err) {
            console.warn('EduTrack: could not refresh ' + COLLECTIONS[key] + ' from backend', err);
        }
        return store[key];
    }

    function write(key, value) {
        var list;
        try {
            list = JSON.parse(value);
        } catch (err) {
            return;
        }
        if (!Array.isArray(list)) {
            return;
        }
        var name = COLLECTIONS[key];
        var before = store[key] ? store[key].map : {};
        var after = {};
        var failed = false;
        var failMessage = '';

        list.forEach(function (item) {
            if (!item || item.id === undefined) {
                return;
            }
            var id = String(item.id);
            var serial = JSON.stringify(item);
            try {
                if (!(id in before)) {
                    request('POST', '/' + name, item);
                    after[id] = serial;
                } else if (before[id] !== serial) {
                    request('PUT', '/' + name + '/' + encodeURIComponent(id), item);
                    after[id] = serial;
                } else {
                    after[id] = before[id];
                }
            } catch (err) {
                failed = true;
                failMessage = err.message;
                console.error('EduTrack: could not save to backend', err);
                if (id in before) {
                    after[id] = before[id];
                }
            }
        });

        Object.keys(before).forEach(function (id) {
            if (id in after) {
                return;
            }
            var stillPresent = list.some(function (item) {
                return item && String(item.id) === id;
            });
            if (stillPresent) {
                after[id] = before[id];
                return;
            }
            try {
                request('DELETE', '/' + name + '/' + encodeURIComponent(id));
            } catch (err) {
                failed = true;
                failMessage = err.message;
                console.error('EduTrack: could not delete from backend', err);
                after[id] = before[id];
            }
        });

        store[key] = { list: list, map: after, loadedAt: Date.now() };
        if (failed) {
            showBanner('Could not save your change: ' + failMessage);
        }
    }

    function isTracked(storage, key) {
        return online && storage === window.localStorage && Object.prototype.hasOwnProperty.call(COLLECTIONS, key);
    }

    Storage.prototype.getItem = function (key) {
        if (isTracked(this, key)) {
            return JSON.stringify(current(key).list);
        }
        return raw.get.call(this, key);
    };

    Storage.prototype.setItem = function (key, value) {
        if (isTracked(this, key)) {
            write(key, String(value));
            return;
        }
        raw.set.call(this, key, value);
    };

    Storage.prototype.removeItem = function (key) {
        if (isTracked(this, key)) {
            write(key, '[]');
            return;
        }
        if (this === window.localStorage && (key === STUDENT_SESSION_KEY || key === ADMIN_FLAG_KEY)) {
            clearToken();
        }
        raw.remove.call(this, key);
    };

    hydrate();

    window.EduTrackServer = {
        baseUrl: BASE_URL,
        isOnline: function () { return online; },
        refresh: hydrate
    };
})(window);
