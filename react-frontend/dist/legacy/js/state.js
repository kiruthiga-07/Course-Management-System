/* ==========================================================================
   EduTrack — state.js
   Single in-memory source of truth for the current session: the logged-in
   user and the currently selected course. Every other module reads/writes
   this through the functions here instead of touching storage directly.
   Depends on api.js being loaded first.
   ========================================================================== */
(function (window) {
    var api = window.EduTrackAuth.api;
    var SELECTED_COURSE_KEY = 'edutrack_selected_course'; // sessionStorage: only needed for the current visit

    function readSelectedCourse() {
        try {
            var raw = sessionStorage.getItem(SELECTED_COURSE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (err) {
            return null;
        }
    }

    var state = {
        currentUser: api.getSession(),      // { fullName, studentName, rollNo, email } | null
        selectedCourse: readSelectedCourse()
    };

    var listeners = [];

    function notify() {
        listeners.forEach(function (fn) { fn(state); });
    }

    // Lets pages react to login/logout or course selection without polling.
    function subscribe(fn) {
        listeners.push(fn);
        return function unsubscribe() {
            var idx = listeners.indexOf(fn);
            if (idx !== -1) listeners.splice(idx, 1);
        };
    }

    function getCurrentUser() {
        return state.currentUser;
    }

    function setCurrentUser(user) {
        state.currentUser = user;
        notify();
    }

    function getSelectedCourse() {
        return state.selectedCourse;
    }

    function setSelectedCourse(course) {
        state.selectedCourse = course;
        try {
            sessionStorage.setItem(SELECTED_COURSE_KEY, JSON.stringify(course));
        } catch (err) { /* storage unavailable, fail silently */ }
        notify();
    }

    function clearSelectedCourse() {
        state.selectedCourse = null;
        sessionStorage.removeItem(SELECTED_COURSE_KEY);
        notify();
    }

    window.EduTrackAuth.state = {
        subscribe: subscribe,
        getCurrentUser: getCurrentUser,
        setCurrentUser: setCurrentUser,
        getSelectedCourse: getSelectedCourse,
        setSelectedCourse: setSelectedCourse,
        clearSelectedCourse: clearSelectedCourse
    };
})(window);