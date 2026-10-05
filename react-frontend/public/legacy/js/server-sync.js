(function (window) {
    var BASE_URL = 'http://localhost:4000';
    var COLLECTIONS = {
        edutrack_courses: 'courses',
        edutrack_enrollments: 'enrollments',
        edutrack_students: 'students'
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

    function request(method, path, body) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, BASE_URL + path, false);
        if (body !== undefined) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.send(body === undefined ? null : JSON.stringify(body));
        if (xhr.status < 200 || xhr.status >= 300) {
            throw new Error(method + ' ' + path + ' failed with status ' + xhr.status);
        }
        return xhr.responseText ? JSON.parse(xhr.responseText) : null;
    }

    function load(key) {
        var list = request('GET', '/' + COLLECTIONS[key]);
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
            online = true;
            hideBanner();
        } catch (err) {
            online = false;
            console.warn('EduTrack: backend not reachable at ' + BASE_URL, err);
            showBanner('Backend is not running. Start it with "npm start" in the backend folder, then refresh. Changes are NOT being saved to db.json.');
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
                console.error('EduTrack: could not delete from backend', err);
                after[id] = before[id];
            }
        });

        store[key] = { list: list, map: after, loadedAt: Date.now() };
        if (failed) {
            showBanner('Could not save your change to the backend. Check that "npm start" is running in the backend folder.');
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
        raw.remove.call(this, key);
    };

    hydrate();

    window.EduTrackServer = {
        baseUrl: BASE_URL,
        isOnline: function () { return online; },
        refresh: hydrate
    };
})(window);