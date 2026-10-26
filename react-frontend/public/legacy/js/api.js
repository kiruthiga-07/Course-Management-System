(function (window) {
    var SESSION_KEY = 'edutrack_current_student';
    var TOKEN_KEY = 'token';

    function baseUrl() {
        return (window.EduTrackServer && window.EduTrackServer.baseUrl) || 'http://localhost:5000/api/v1';
    }

    function post(path, body) {
        return fetch(baseUrl() + path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(function (response) {
            return response.json().catch(function () {
                return {};
            }).then(function (data) {
                return { ok: response.ok, status: response.status, data: data };
            });
        });
    }

    function registerStudent(student) {
        return post('/auth/register', {
            name: student.fullName,
            email: student.email,
            password: student.password,
            department: student.program,
            rollNo: student.rollNo
        });
    }

    function loginStudent(credentials) {
        return post('/auth/login', {
            email: credentials.email,
            password: credentials.password
        });
    }

    function resetPassword(email, password) {
        return post('/auth/reset-password', { email: email, password: password });
    }

    function getSession() {
        try {
            var raw = localStorage.getItem(SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (err) {
            return null;
        }
    }

    function saveSession(student) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(student));
        return Promise.resolve(student);
    }

    function clearSession() {
        localStorage.removeItem(SESSION_KEY);
        try {
            sessionStorage.removeItem(TOKEN_KEY);
        } catch (err) {
            return Promise.resolve();
        }
        return Promise.resolve();
    }

    function saveToken(token) {
        try {
            sessionStorage.setItem(TOKEN_KEY, token);
        } catch (err) {
            return;
        }
    }

    function getToken() {
        try {
            return sessionStorage.getItem(TOKEN_KEY);
        } catch (err) {
            return null;
        }
    }

    window.EduTrackAuth = window.EduTrackAuth || {};
    window.EduTrackAuth.api = {
        registerStudent: registerStudent,
        loginStudent: loginStudent,
        resetPassword: resetPassword,
        getSession: getSession,
        saveSession: saveSession,
        clearSession: clearSession,
        saveToken: saveToken,
        getToken: getToken
    };
})(window);
