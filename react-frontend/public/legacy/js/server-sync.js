(function (window) {
    var BASE_URL = 'http://localhost:5000';
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

    function toLocal(serverItem) {
        var item = {};
        Object.keys(serverItem).forEach(function (field) {
            if (field !== 'appId') {
                item[field] = serverItem[field];
            }
        });
        if (serverItem.appId !== undefined) {
            item.id = serverItem.appId;
        }
        return item;
    }

    function load(key) {
        var serverList = request('GET', '/' + COLLECTIONS[key]);
        var list = [];
        var map = {};
        serverList.forEach(function (serverItem) {
            var item = toLocal(serverItem);
            list.push(item);
            map[String(item.id)] = { serverId: String(serverItem.id), serial: JSON.stringify(item) };
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
            console.warn('EduTrack: mock API not reachable at ' + BASE_URL, err);
            showBanner('Mock API is not running. Start it with "npm start" in the mockapi folder, then refresh. Changes are NOT being saved to db.json.');
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
            console.warn('EduTrack: could not refresh ' + COLLECTIONS[key] + ' from mock API', err);
        }
        return store[key];
    }

    function create(name, item) {
        var body = {};
        Object.keys(item).forEach(function (field) { body[field] = item[field]; });
        body.appId = item.id;
        var saved = request('POST', '/' + name, body);
        return String(saved.id);
    }

    function update(name, serverId, item) {
        var body = {};
        Object.keys(item).forEach(function (field) { body[field] = item[field]; });
        body.id = serverId;
        if (String(item.id) !== serverId) {
            body.appId = item.id;
        }
        request('PUT', '/' + name + '/' + encodeURIComponent(serverId), body);
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
            var previous = before[id];
            try {
                if (!previous) {
                    after[id] = { serverId: create(name, item), serial: serial };
                } else if (previous.serial !== serial) {
                    update(name, previous.serverId, item);
                    after[id] = { serverId: previous.serverId, serial: serial };
                } else {
                    after[id] = previous;
                }
            } catch (err) {
                failed = true;
                console.error('EduTrack: could not save to mock API', err);
                if (previous) {
                    after[id] = previous;
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
                request('DELETE', '/' + name + '/' + encodeURIComponent(before[id].serverId));
            } catch (err) {
                failed = true;
                console.error('EduTrack: could not delete from mock API', err);
                after[id] = before[id];
            }
        });

        store[key] = { list: list, map: after, loadedAt: Date.now() };
        if (failed) {
            showBanner('Could not save your change to the mock API. Check that "npm start" is running in the mockapi folder.');
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