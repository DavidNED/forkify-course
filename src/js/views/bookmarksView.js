import View from './View';

class BookmarksView extends View {
  parentElement = document.querySelector('.bookmarks__list');
  message = 'No recipes bookmarked yet.';

  generateMarkup() {
    return this.data.bookmarks
      .map(bookmark => this.generateMarkupPreview(bookmark))
      .join('');
  }

  generateMarkupPreview(bookmark) {
    return `<li class="preview">
        <a class="preview__link" href="#${bookmark.id}">
          <figure class="preview__fig">
            <img src="${bookmark.imageUrl}" alt="${bookmark.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__name">
            ${bookmark.title}
            </h4>
            <p class="preview__publisher">${bookmark.publisher}</p>
          </div>
        </a>
      </li>`;
  }
}

export default new BookmarksView();
