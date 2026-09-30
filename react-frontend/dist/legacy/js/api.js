/* ==========================================================================
   EduTrack — api.js
   Centralized data-access layer. Every read/write against browser storage
   goes through here and every function returns a Promise, so this reads
   like real API calls and is the only place that would need to change if
   a real backend is added later.

   Loaded as a plain <script> (not type="module") so the site works when
   opened directly from disk, with no local server required — matches how
   the existing app.js is loaded. Everything attaches to the shared
   window.EduTrackAuth namespace instead of using import/export.
   ========================================================================== */
(function (window) {
    var STUDENTS_KEY = 'edutrack_students';
    var SESSION_KEY = 'edutrack_current_student'; // shared with app.js's EduTrackEnrollments

    function readList(key) {
        try {
            var raw = localStorage.getItem(key);
            var parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
            return [];
        }
    }

    function writeList(key, list) {
        localStorage.setItem(key, JSON.stringify(list));
    }

    function normalize(value) {
        return (value || '').toString().trim().toLowerCase();
    }

    /* ---------------- Students ---------------- */

    function getStudents() {
        return Promise.resolve(readList(STUDENTS_KEY));
    }

    function findStudentByEmail(email) {
        return getStudents().then(function (list) {
            return list.filter(function (s) { return normalize(s.email) === normalize(email); })[0] || null;
        });
    }

    function findStudentByRollNo(rollNo) {
        return getStudents().then(function (list) {
            return list.filter(function (s) { return normalize(s.rollNo) === normalize(rollNo); })[0] || null;
        });
    }

    function createStudent(student) {
        return getStudents().then(function (list) {
            var record = {
                id: 'stu-' + Date.now().toString(36) + '-' + Math.floor(Math.random() * 1000),
                fullName: student.fullName,
                rollNo: student.rollNo,
                program: student.program,
                email: student.email,
                password: student.password, // demo project only — no backend to hash this
                createdAt: Date.now()
            };
            list.push(record);
            writeList(STUDENTS_KEY, list);
            return record;
        });
    }

    function updateStudentPassword(email, newPassword) {
        return getStudents().then(function (list) {
            var idx = -1;
            for (var i = 0; i < list.length; i++) {
                if (normalize(list[i].email) === normalize(email)) { idx = i; break; }
            }
            if (idx === -1) return null;
            list[idx].password = newPassword;
            writeList(STUDENTS_KEY, list);
            return list[idx];
        });
    }

    /* ---------------- Session ---------------- */

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
        return Promise.resolve();
    }

    window.EduTrackAuth = window.EduTrackAuth || {};
    window.EduTrackAuth.api = {
        getStudents: getStudents,
        findStudentByEmail: findStudentByEmail,
        findStudentByRollNo: findStudentByRollNo,
        createStudent: createStudent,
        updateStudentPassword: updateStudentPassword,
        getSession: getSession,
        saveSession: saveSession,
        clearSession: clearSession
    };
})(window);