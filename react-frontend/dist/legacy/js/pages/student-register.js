/* ==========================================================================
   EduTrack — pages/student-register.js
   Wires up the student registration form. On success the new student is
   logged in immediately and sent to their dashboard.
   Depends on validation.js, ui.js and auth.js being loaded first.
   ========================================================================== */
(function () {
    var validation = window.EduTrackAuth.validation;
    var ui = window.EduTrackAuth.ui;
    var auth = window.EduTrackAuth.auth;

    var form = document.querySelector('.auth-form-wrap form');
    var submitBtn = form.querySelector('.btn-auth');
    var messageEl = ui.createMessageBanner(form);

    // If the person arrived here from the login page ("no account found"),
    // carry the email they already typed over so they don't retype it.
    (function prefillEmail() {
        var email = new URLSearchParams(window.location.search).get('email');
        if (email) document.getElementById('email').value = email;
    })();

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        ui.clearFormMessage(messageEl);
        ui.clearAllFieldErrors(form);

        var fullName = document.getElementById('full-name').value.trim();
        var rollNo = document.getElementById('student-id').value.trim();
        var program = document.getElementById('program').value;
        var email = document.getElementById('email').value.trim();
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirm-password').value;

        var result = validation.validateRegisterForm({
            fullName: fullName, studentId: rollNo, program: program,
            email: email, password: password, confirmPassword: confirmPassword
        });
        if (!result.valid) {
            ui.applyFieldErrors(form, result.errors);
            return;
        }

        ui.setButtonLoading(submitBtn, true, 'Creating account…');

        auth.registerStudent({ fullName: fullName, rollNo: rollNo, program: program, email: email, password: password })
            .then(function (regResult) {
                if (!regResult.success) {
                    ui.setButtonLoading(submitBtn, false);
                    ui.showFormMessage(messageEl, 'An account with that email already exists. Try logging in instead.', 'error');
                    return;
                }
                ui.redirectTo('student-dashboard.html');
            })
            .catch(function () {
                ui.setButtonLoading(submitBtn, false);
                ui.showFormMessage(messageEl, 'Something went wrong. Please try again.', 'error');
            });
    });
})();