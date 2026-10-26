(function (window) {
    var api = window.EduTrackAuth.api;
    var state = window.EduTrackAuth.state;

    function toSession(student) {
        return {
            fullName: student.name,
            studentName: student.name,
            rollNo: student.rollNo || '',
            email: student.email
        };
    }

    function failureMessage(response, fallback) {
        return (response.data && response.data.message) || fallback;
    }

    function isLoggedIn() {
        var user = state.getCurrentUser();
        return !!(user && user.rollNo);
    }

    function getLoggedInStudent() {
        return state.getCurrentUser();
    }

    function startSession(loginData) {
        var session = toSession(loginData.student);
        api.saveToken(loginData.token);
        return api.saveSession(session).then(function () {
            state.setCurrentUser(session);
            return session;
        });
    }

    function loginStudent(data) {
        return api.loginStudent({ email: data.email, password: data.password }).then(function (response) {
            if (response.status === 400 || response.status === 401) {
                return { success: false, reason: 'invalid' };
            }
            if (!response.ok) {
                throw new Error(failureMessage(response, 'Login failed'));
            }
            var storedRoll = (response.data.student.rollNo || '').trim().toLowerCase();
            var enteredRoll = (data.rollNo || '').trim().toLowerCase();
            if (storedRoll !== enteredRoll) {
                return { success: false, reason: 'invalid' };
            }
            return startSession(response.data).then(function (session) {
                return { success: true, student: session };
            });
        });
    }

    function registerStudent(data) {
        return api.registerStudent(data).then(function (response) {
            if (response.status === 409) {
                return { success: false, reason: 'exists' };
            }
            if (response.status === 400) {
                return { success: false, reason: 'invalid', message: failureMessage(response, '') };
            }
            if (!response.ok) {
                throw new Error(failureMessage(response, 'Registration failed'));
            }
            return api.loginStudent({ email: data.email, password: data.password }).then(function (loginResponse) {
                if (!loginResponse.ok) {
                    throw new Error(failureMessage(loginResponse, 'Login after registration failed'));
                }
                return startSession(loginResponse.data).then(function (session) {
                    return { success: true, student: session };
                });
            });
        });
    }

    function logoutStudent() {
        return api.clearSession().then(function () {
            state.setCurrentUser(null);
        });
    }

    function resetPassword(data) {
        return api.resetPassword(data.email, data.password).then(function (response) {
            if (response.status === 404) {
                return { success: false, reason: 'not-found' };
            }
            if (response.status === 400) {
                return { success: false, reason: 'invalid', message: failureMessage(response, '') };
            }
            if (!response.ok) {
                throw new Error(failureMessage(response, 'Password reset failed'));
            }
            return { success: true };
        });
    }

    window.EduTrackAuth.auth = {
        isLoggedIn: isLoggedIn,
        getLoggedInStudent: getLoggedInStudent,
        loginStudent: loginStudent,
        registerStudent: registerStudent,
        logoutStudent: logoutStudent,
        resetPassword: resetPassword
    };
})(window);
