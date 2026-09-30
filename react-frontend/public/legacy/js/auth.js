/* ==========================================================================
   EduTrack — auth.js
   All login / registration / logout / password-reset logic lives here.
   Pages call these functions instead of touching api.js or localStorage
   directly. Depends on api.js and state.js being loaded first.
   ========================================================================== */
(function (window) {
    var api = window.EduTrackAuth.api;
    var state = window.EduTrackAuth.state;

    function toSession(student) {
        return {
            fullName: student.fullName,
            studentName: student.fullName, // kept for compatibility with the existing dashboard/enrollment pages
            rollNo: student.rollNo,
            email: student.email
        };
    }

    function isLoggedIn() {
        var user = state.getCurrentUser();
        return !!(user && user.rollNo);
    }

    function getLoggedInStudent() {
        return state.getCurrentUser();
    }

    // Used by the login page to decide whether to sign the person in or
    // send them to register instead.
    function studentExists(email) {
        return api.findStudentByEmail(email).then(function (student) { return !!student; });
    }

    // Resolves with { success, reason, student }. reason is 'not-found' when
    // no account matches the email, or 'invalid' when the password/roll no
    // don't match that account.
    function loginStudent(data) {
        return api.findStudentByEmail(data.email).then(function (student) {
            if (!student) {
                return { success: false, reason: 'not-found' };
            }
            var rollMatches = (student.rollNo || '').trim().toLowerCase() === data.rollNo.trim().toLowerCase();
            var passwordMatches = student.password === data.password;
            if (!rollMatches || !passwordMatches) {
                return { success: false, reason: 'invalid' };
            }
            var session = toSession(student);
            return api.saveSession(session).then(function () {
                state.setCurrentUser(session);
                return { success: true, student: session };
            });
        });
    }

    // Resolves with { success, reason, student }. reason is 'exists' when
    // the email is already registered.
    function registerStudent(data) {
        return api.findStudentByEmail(data.email).then(function (existing) {
            if (existing) {
                return { success: false, reason: 'exists' };
            }
            return api.createStudent(data).then(function (student) {
                var session = toSession(student);
                return api.saveSession(session).then(function () {
                    state.setCurrentUser(session);
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

    // Resolves with { success, reason }. reason is 'not-found' when no
    // account matches the email.
    function resetPassword(data) {
        return api.findStudentByEmail(data.email).then(function (existing) {
            if (!existing) {
                return { success: false, reason: 'not-found' };
            }
            return api.updateStudentPassword(data.email, data.password).then(function () {
                return { success: true };
            });
        });
    }

    window.EduTrackAuth.auth = {
        isLoggedIn: isLoggedIn,
        getLoggedInStudent: getLoggedInStudent,
        studentExists: studentExists,
        loginStudent: loginStudent,
        registerStudent: registerStudent,
        logoutStudent: logoutStudent,
        resetPassword: resetPassword
    };
})(window);