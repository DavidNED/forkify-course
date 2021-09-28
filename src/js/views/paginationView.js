import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  parentElement = document.querySelector('.pagination');

  addHandlerGoToPage(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const goto = e.target.closest('.btn--inline').dataset.goto;
      if (!goto) return;
      handler(+goto);
    });
  }

  generateMarkup() {
    const page = this.data.page;
    const numPages = Math.ceil(this.data.results.length / this.data.resPerPage);

    if (page === 1 && numPages > 1) {
      return `<button class="btn--inline pagination__btn--next" data-goto="${
        page + 1
      }">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    if (page < numPages) {
      return `<button class="btn--inline pagination__btn--prev" data-goto="${
        page - 1
      }">
      <span>Page ${page - 1} </span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      </button>
      <button class="btn--inline pagination__btn--next" data-goto="${page + 1}">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    if (page === 1 && numPages === 1) {
      return '';
    }

    if (page === numPages && numPages > 1) {
      return `<button class="btn--inline pagination__btn--prev" data-goto="${
        page - 1
      }">
        <span>Page ${page - 1} </span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        </button>`;
    }
  }
}

export default new PaginationView();
