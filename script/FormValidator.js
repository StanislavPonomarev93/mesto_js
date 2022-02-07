class FormValidator {
  constructor(form, errorMessages) {
    this.form = form;
    this.errorMessages = errorMessages;
    this.button = this.form.querySelector('button');
  };

  checkInputValidity(input, error) {
    for (let key in this.errorMessages) {
      if (input.validity[key]) {
        return error.textContent = this.errorMessages[key];
      }
    }
    error.textContent = '';
  };
  setSubmitButtonState(button) {
    if (this.form.checkValidity()) {
      this.enabled(button);
    } else {
      this.disabled(button);
    }
  };
  setEventListeners() {
    this.form.addEventListener('input', (event) => {
      this.checkInputValidity(event.target, event.target.closest('div').querySelector('.error'));
      this.setSubmitButtonState(this.button);
    });
  };
  checkInputsForms() {
    if (Array.from(this.form.querySelectorAll('input')).every(input => input.value)) {
      this.enabled(this.button)
    } else {
      this.disabled(this.button)
    }
  };
  errorReset() {
    this.form.querySelectorAll('span').forEach(item => item.textContent = '')
  };
  disabled(button) {
    button.setAttribute('disabled', true);
    button.classList.add('button__disabled');
  };
  enabled(button) {
    button.removeAttribute('disabled');
    button.classList.remove('button__disabled');
  };
}