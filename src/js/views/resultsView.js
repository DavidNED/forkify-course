import View from './View';

class ResultsView extends View {
  parentElement = document.querySelector('.results');

  generateMarkup() {
    return this.data
      .map(recipe => this._generateMarkupPreview(recipe))
      .join('');
  }

  _generateMarkupPreview(recipe) {
    return `<li class="preview">
        <a class="preview__link" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.imageUrl}" alt="${recipe.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
          </div>
        </a>
      </li>`;
  }
}

export default new ResultsView();
