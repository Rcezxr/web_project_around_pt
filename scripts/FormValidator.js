export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector),
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector,
    );
  }

  // Verifica a validade de um campo e exibe a mensagem de erro
  _checkInputValidity(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}-error`);

    if (input.validity.valueMissing) {
      errorElement.textContent =
        input.type === "url"
          ? "insira uma url válida."
          : "por favor, preencha este campo.";
    } else if (input.validity.tooShort) {
      errorElement.textContent = `Aumente o texto para pelo menos ${input.minLength} caracteres ou mais.`;
    } else if (input.validity.typeMismatch) {
      errorElement.textContent = "insira uma url válida.";
    } else {
      errorElement.textContent = "";
    }

    input.classList.toggle(this._config.inputErrorClass, !input.validity.valid);
  }

  // Habilita ou desabilita o botão Submit com base na validade de todos os campos
  _toggleButtonState() {
    const isFormValid = this._inputList.every((input) => input.validity.valid);
    this._buttonElement.disabled = !isFormValid;
  }

  // Adiciona listeners de input a cada campo do formulário
  _addInputEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  // Reseta erros e estado do botão (útil ao abrir/fechar popups)
  resetValidation() {
    this._inputList.forEach((input) => {
      const errorElement = this._formElement.querySelector(
        `#${input.id}-error`,
      );
      if (errorElement) errorElement.textContent = "";
      input.classList.remove(this._config.inputErrorClass);
    });
    this._toggleButtonState();
  }

  // Método público: ativa a validação do formulário
  setEventListeners() {
    this._toggleButtonState();
    this._addInputEventListeners();
  }
}
