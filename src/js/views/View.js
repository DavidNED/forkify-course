import icons from 'url:../../img/icons.svg';

export default class View {
  render(data) {
    this.data = data;

    const markup = this.generateMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this.data = data;

    const markup = this.generateMarkup();

    const newDOM = document.createRange().createContextualFragment(markup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this.parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue?.trim() !== ''
      ) {
        curEl.textContent = newEl.firstChild?.nodeValue?.trim();
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  clear() {
    this.parentElement.innerHTML = '';
  }

  renderError(message = this.error) {
    const error = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;

    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', error);
  }

  renderMessage(msg = this.message) {
    const message = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>
      ${msg}
    </p>
  </div>
`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', message);
  }

  renderSpinner() {
    const spinner = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;

    this.parentElement.insertAdjacentHTML('afterbegin', spinner);
  }
}
