/* ==========================================================================
   EduTrack — pages/reset-password.js
   Wires up the "Set a new password" form: looks the account up by email
   and updates its stored password.
   Depends on validation.js, ui.js and auth.js being loaded first.
   ========================================================================== */
(function () {
    var validation = window.EduTrackAuth.validation;
    var ui = window.EduTrackAuth.ui;
    var auth = window.EduTrackAuth.auth;

    var form = document.querySelector('.auth-form-wrap form');
    var submitBtn = form.querySelector('.btn-auth');
    var messageEl = ui.createMessageBanner(form);

    // Prefill the email if it was carried over from the login page's
    // "Forgot password?" link.
    (function prefillEmail() {
        var email = new URLSearchParams(window.location.search).get('email');
        if (email) document.getElementById('email').value = email;
    })();

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        ui.clearFormMessage(messageEl);
        ui.clearAllFieldErrors(form);

        var email = document.getElementById('email').value.trim();
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirm-password').value;

        var result = validation.validateResetForm({ email: email, password: password, confirmPassword: confirmPassword });
        if (!result.valid) {
            ui.applyFieldErrors(form, result.errors);
            return;
        }

        ui.setButtonLoading(submitBtn, true, 'Updating…');

        auth.resetPassword({ email: email, password: password })
            .then(function (resetResult) {
                if (!resetResult.success) {
                    ui.setButtonLoading(submitBtn, false);
                    ui.showFormMessage(messageEl, "We couldn't find an account with that email.", 'error');
                    return;
                }
                ui.showFormMessage(messageEl, 'Password updated. Redirecting to login…', 'success');
                setTimeout(function () { ui.redirectTo('student-login.html'); }, 1200);
            })
            .catch(function () {
                ui.setButtonLoading(submitBtn, false);
                ui.showFormMessage(messageEl, 'Something went wrong. Please try again.', 'error');
            });
    });
})();