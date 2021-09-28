import * as Model from './model';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView';
import PaginationView from './views/paginationView';
import RecipeView from './views/recipeView';
import BookmarksView from './views/bookmarksView';
import AddRecipeView from './views/addRecipeView';
import addRecipeView from './views/addRecipeView';
import { SET_TIMEOUT_OVERLAY } from './config';

const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner();
    const query = SearchView.getQuery();
    SearchView.clearSearch();
    await Model.getSearchResults(query);
    ResultsView.render(Model.getSearchResultsPage());
    PaginationView.render(Model.state);
  } catch (err) {
    ResultsView.renderError(err.message);
  }
};

console.log('Hey');

const controlMainRecipe = async function (id) {
  try {
    RecipeView.renderSpinner();
    await Model.getMainRecipe(id);
    RecipeView.render(Model.state);
  } catch (err) {
    RecipeView.renderError(err.message);
  }
};

const controlPagination = function (goto) {
  ResultsView.render(Model.getSearchResultsPage(goto));
  PaginationView.render(Model.state);
};

const controlServings = function (updateTo) {
  Model.updateServingIngredient(updateTo);
  RecipeView.update(Model.state);
};

const controlBookmarks = function () {
  Model.addOrRemoveBookmark();
  RecipeView.update(Model.state);
  if (Model.state.bookmarks.length > 0) BookmarksView.render(Model.state);
  else BookmarksView.renderMessage();
};

const controlLocalStorage = function () {
  Model.getBookmarksFromLocalStorage();
  if (Model.state.bookmarks.length > 0) BookmarksView.render(Model.state);
  else BookmarksView.renderMessage();
};

const controlAddRecipe = async function (data) {
  try {
    await Model.addNewRecipe(data);
    RecipeView.render(Model.state);
    addRecipeView.renderMessage();
    setTimeout(function () {
      addRecipeView.addHandlerToggleOverlayWindow();
      // location.reload();
    }, SET_TIMEOUT_OVERLAY * 1000);

    window.history.pushState(null, '', `#${Model.state.recipe.id}`);
    Model.addOrRemoveBookmark();
    RecipeView.update(Model.state);
  } catch (err) {
    AddRecipeView.renderError(err.message);
  }
};

const init = function () {
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerGoToPage(controlPagination);
  RecipeView.addHandlerGetLocalStorage(controlLocalStorage);
  RecipeView.addHandlerMainRecipe(controlMainRecipe);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerUpdateBookmarks(controlBookmarks);
  AddRecipeView.addHandlerSubmitForm(controlAddRecipe);
};

init();
