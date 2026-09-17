/* ==========================================================================
   EduTrack — validation.js
   Small, dependency-free validation helpers shared by every auth form.
   ========================================================================== */
(function (window) {
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || '').trim());
    }

    function isNonEmpty(value) {
        return (value || '').toString().trim().length > 0;
    }

    function minLength(value, len) {
        return (value || '').toString().trim().length >= len;
    }

    function passwordsMatch(a, b) {
        return a === b;
    }

    // Keys match each form's input `id` attributes, so callers can hand the
    // errors object straight to ui.js's applyFieldErrors().

    function validateLoginForm(data) {
        var errors = {};
        if (!isValidEmail(data.email)) errors.email = 'Enter a valid email address.';
        if (!isNonEmpty(data.password)) errors.password = 'Password is required.';
        if (!isNonEmpty(data.rollNo)) errors.rollNo = 'Roll number is required.';
        return { valid: Object.keys(errors).length === 0, errors: errors };
    }

    function validateRegisterForm(data) {
        var errors = {};
        if (!isNonEmpty(data.fullName)) errors['full-name'] = 'Full name is required.';
        if (!isNonEmpty(data.studentId)) errors['student-id'] = 'Student ID / Roll No is required.';
        if (!isNonEmpty(data.program)) errors.program = 'Please select a program.';
        if (!isValidEmail(data.email)) errors.email = 'Enter a valid email address.';
        if (!minLength(data.password, 6)) {
            errors.password = 'Password must be at least 6 characters.';
        } else if (!passwordsMatch(data.password, data.confirmPassword)) {
            errors['confirm-password'] = 'Passwords do not match.';
        }
        return { valid: Object.keys(errors).length === 0, errors: errors };
    }

    function validateResetForm(data) {
        var errors = {};
        if (!isValidEmail(data.email)) errors.email = 'Enter the email address on your account.';
        if (!minLength(data.password, 6)) {
            errors.password = 'Password must be at least 6 characters.';
        } else if (!passwordsMatch(data.password, data.confirmPassword)) {
            errors['confirm-password'] = 'Passwords do not match.';
        }
        return { valid: Object.keys(errors).length === 0, errors: errors };
    }

    window.EduTrackAuth = window.EduTrackAuth || {};
    window.EduTrackAuth.validation = {
        isValidEmail: isValidEmail,
        isNonEmpty: isNonEmpty,
        minLength: minLength,
        passwordsMatch: passwordsMatch,
        validateLoginForm: validateLoginForm,
        validateRegisterForm: validateRegisterForm,
        validateResetForm: validateResetForm
    };
})(window);