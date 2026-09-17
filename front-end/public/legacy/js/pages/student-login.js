/* ==========================================================================
   EduTrack — pages/student-login.js
   Wires up the student login form:
     - existing account + correct password/roll no  -> student-dashboard.html
     - no account found for that email               -> student-register.html
     - "Forgot password?"                             -> reset-password.html
   Depends on validation.js, ui.js and auth.js being loaded first.
   ========================================================================== */
(function () {
    var validation = window.EduTrackAuth.validation;
    var ui = window.EduTrackAuth.ui;
    var auth = window.EduTrackAuth.auth;

    var form = document.querySelector('.auth-form-wrap form');
    var submitBtn = form.querySelector('.btn-auth');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var rollInput = document.getElementById('rollNo');
    var forgotLink = document.getElementById('forgotPasswordLink');
    var messageEl = ui.createMessageBanner(form);

    // Carry whatever email the person has typed over to the reset-password
    // page, so it doesn't need to be re-typed there.
    if (forgotLink) {
        forgotLink.addEventListener('click', function () {
            var email = emailInput.value.trim();
            forgotLink.href = email
                ? 'reset-password.html?email=' + encodeURIComponent(email)
                : 'reset-password.html';
        });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        ui.clearFormMessage(messageEl);
        ui.clearAllFieldErrors(form);

        var email = emailInput.value.trim();
        var password = passwordInput.value;
        var rollNo = rollInput.value.trim();

        var result = validation.validateLoginForm({ email: email, password: password, rollNo: rollNo });
        if (!result.valid) {
            ui.applyFieldErrors(form, result.errors);
            return;
        }

        ui.setButtonLoading(submitBtn, true, 'Signing in…');

        auth.studentExists(email)
            .then(function (exists) {
                if (!exists) {
                    ui.showFormMessage(messageEl, "We couldn't find an account with that email. Taking you to registration…", 'error');
                    setTimeout(function () {
                        ui.redirectTo('student-register.html?email=' + encodeURIComponent(email));
                    }, 1400);
                    return;
                }
                return auth.loginStudent({ email: email, password: password, rollNo: rollNo }).then(function (loginResult) {
                    if (loginResult.success) {
                        ui.redirectTo('student-dashboard.html');
                        return;
                    }
                    ui.setButtonLoading(submitBtn, false);
                    ui.showFormMessage(messageEl, 'Incorrect password or roll number. Please try again.', 'error');
                });
            })
            .catch(function () {
                ui.setButtonLoading(submitBtn, false);
                ui.showFormMessage(messageEl, 'Something went wrong. Please try again.', 'error');
            });
    });
})();