/* ==========================================================================
   EduTrack — ui.js
   Reusable DOM helpers so every form shows errors, banner messages and
   loading state the same way, using the project's existing CSS classes.
   ========================================================================== */
(function (window) {
    function showFieldError(inputEl, message) {
        if (!inputEl) return;
        clearFieldError(inputEl);
        var field = inputEl.closest('.field') || inputEl.parentElement;
        if (field) field.classList.add('has-error');
        var errorEl = document.createElement('span');
        errorEl.className = 'field-error';
        errorEl.textContent = message;
        inputEl.insertAdjacentElement('afterend', errorEl);
    }

    function clearFieldError(inputEl) {
        if (!inputEl) return;
        var field = inputEl.closest('.field') || inputEl.parentElement;
        if (!field) return;
        field.classList.remove('has-error');
        var existing = field.querySelector('.field-error');
        if (existing) existing.remove();
    }

    function clearAllFieldErrors(formEl) {
        if (!formEl) return;
        formEl.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });
        formEl.querySelectorAll('.has-error').forEach(function (el) { el.classList.remove('has-error'); });
    }

    // errors: { [inputId]: message } — see validation.js
    function applyFieldErrors(formEl, errors) {
        clearAllFieldErrors(formEl);
        Object.keys(errors).forEach(function (fieldId) {
            var input = formEl.querySelector('#' + fieldId);
            showFieldError(input, errors[fieldId]);
        });
    }

    function showFormMessage(el, message, type) {
        if (!el) return;
        el.textContent = message;
        el.className = 'form-message is-visible ' + (type || 'error');
    }

    function clearFormMessage(el) {
        if (!el) return;
        el.textContent = '';
        el.className = 'form-message';
    }

    function setButtonLoading(buttonEl, isLoading, loadingText) {
        if (!buttonEl) return;
        loadingText = loadingText || 'Please wait…';
        if (isLoading) {
            buttonEl.dataset.originalText = buttonEl.dataset.originalText || buttonEl.textContent;
            buttonEl.textContent = loadingText;
            buttonEl.disabled = true;
        } else {
            buttonEl.textContent = buttonEl.dataset.originalText || buttonEl.textContent;
            buttonEl.disabled = false;
        }
    }

    // Creates the message banner element once and inserts it at the top of
    // the form, so page scripts don't repeat this DOM setup.
    function createMessageBanner(formEl) {
        var el = document.createElement('div');
        el.className = 'form-message';
        formEl.insertBefore(el, formEl.firstChild);
        return el;
    }

    function redirectTo(url) {
        window.location.href = url;
    }

    window.EduTrackAuth = window.EduTrackAuth || {};
    window.EduTrackAuth.ui = {
        showFieldError: showFieldError,
        clearFieldError: clearFieldError,
        clearAllFieldErrors: clearAllFieldErrors,
        applyFieldErrors: applyFieldErrors,
        showFormMessage: showFormMessage,
        clearFormMessage: clearFormMessage,
        setButtonLoading: setButtonLoading,
        createMessageBanner: createMessageBanner,
        redirectTo: redirectTo
    };
})(window);