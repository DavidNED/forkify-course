import View from './View';

class AddRecipeView extends View {
  parentElement = document.querySelector('.upload');
  message = 'Your recipe has been successfuly uploaded.';
  error = 'Something went wrong uploading your recipe.';
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _addRecipeWindow = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _form = document.querySelector('.upload');

  constructor() {
    super();
    this._addHandlerShowForm();
    this._addHandlerHideForm();
  }

  _addHandlerShowForm() {
    this._btnOpen.addEventListener(
      'click',
      this.addHandlerToggleOverlayWindow.bind(this)
    );
  }

  _addHandlerHideForm() {
    this._btnClose.addEventListener(
      'click',
      this.addHandlerToggleOverlayWindow.bind(this)
    );
  }

  addHandlerToggleOverlayWindow() {
    this._overlay.classList.toggle('hidden');
    this._addRecipeWindow.classList.toggle('hidden');
  }

  addHandlerSubmitForm(handler) {
    this._form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = [...new FormData(this)];
      const data = Object.fromEntries(formData);
      handler(data);
    });
  }
}

export default new AddRecipeView();
