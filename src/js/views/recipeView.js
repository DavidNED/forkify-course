import View from './View';
import icons from 'url:../../img/icons.svg';

class RecipeView extends View {
  parentElement = document.querySelector('.recipe');
  errorMessage = 'No recipe found. Please try again.';

  addHandlerMainRecipe(handler) {
    const events = ['load', 'hashchange'];
    events.forEach(event =>
      window.addEventListener(event, function () {
        const id = window.location.hash.replace('#', '');
        if (!id) return;
        handler(id);
      })
    );
  }

  addHandlerGetLocalStorage(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerUpdateBookmarks(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const target = e.target.closest('.btn--round');
      if (!target) return;
      handler();
    });
  }

  addHandlerUpdateServings(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const target = e.target.closest('.btn--tiny');
      if (!target) return;
      const updateTo = target.dataset.updateTo;
      handler(+updateTo);
    });
  }

  _generateUserGenerated() {
    return `<div class="recipe__user-generated">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>`;
  }

  _generateMarkupPreview(ing) {
    return `<li class="recipe__ingredient">
       <svg class="recipe__icon">
         <use href="${icons}#icon-check"></use>
       </svg>
       <div class="recipe__quantity">${ing.quantity ?? ''}</div>
       <div class="recipe__description">
         <span class="recipe__unit">${ing.unit}</span>
           ${ing.description}
       </div>
     </li>`;
  }

  generateMarkup() {
    return `<figure class="recipe__fig">
      <img src="${this.data.recipe.imageUrl}" alt="${
      this.data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this.data.recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this.data.recipe.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this.data.recipe.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--decrease-servings" data-update-to="${
            this.data.recipe.servings - 1
          }">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings" data-update-to="${
            this.data.recipe.servings + 1
          }">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this.data.recipe.bookmarked ? '-fill' : ''
    }"></use>
        </svg>
      </button>

      ${this.data.recipe.key ? this._generateUserGenerated() : ''}
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
        ${this.data.recipe.ingredients
          .map(ingredient => this._generateMarkupPreview(ingredient))
          .join('')}
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this.data.recipe.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this.data.recipe.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>`;
  }
}

export default new RecipeView();
