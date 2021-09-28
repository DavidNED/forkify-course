import { API_URL, KEY } from './config';
import { getJSON, sendJSON } from './helpers';

export const state = {
  results: [],
  page: 1,
  resPerPage: 10,
  recipe: {},
  bookmarks: [],
};

window.s = state;

export const getSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}&key=${KEY}`);
    const { recipes } = data.data;

    state.results = recipes.map(function (recipe) {
      return {
        id: recipe.id,
        imageUrl: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getMainRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;

    state.recipe = {
      cookingTime: recipe.cooking_time,
      imageUrl: recipe.image_url,
      sourceUrl: recipe.source_url,
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      key: recipe.key || '',
    };

    state.bookmarks.some(function (bookmark) {
      if (bookmark.id === state.recipe.id) state.recipe.bookmarked = true;
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = 1) {
  state.page = page;
  const start = (page - 1) * state.resPerPage;
  const end = page * state.resPerPage;

  return state.results.slice(start, end);
};

export const updateServingIngredient = function (newServings) {
  if (newServings > 0 && state.recipe.servings > 0) {
    state.recipe.ingredients.forEach(
      ingredient =>
        (ingredient.quantity =
          (ingredient.quantity / state.recipe.servings) * newServings)
    );
    state.recipe.servings = newServings;
  }
};

export const addOrRemoveBookmark = function () {
  const index = state.bookmarks.findIndex(
    bookmark => bookmark.id === state.recipe.id
  );

  if (index === -1) {
    state.bookmarks.push(state.recipe);
    state.recipe.bookmarked = true;
    persistBookmarks();
  } else {
    state.bookmarks.splice(index, 1);
    state.recipe.bookmarked = false;
    persistBookmarks();
  }
};

export const addNewRecipe = async function (newRecipe) {
  try {
    const arrRecipe = Object.entries(newRecipe);

    const ingredients = arrRecipe
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(function (entry) {
        const ingArr = entry[1].split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format, please use the correct format.'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const newRecipeObj = {
      cooking_time: +newRecipe.cookingTime,
      image_url: newRecipe.image,
      source_url: newRecipe.sourceUrl,
      title: newRecipe.title,
      servings: +newRecipe.servings,
      publisher: newRecipe.publisher,
      ingredients: ingredients,
    };

    const data = await sendJSON(`${API_URL}?key=${KEY}`, newRecipeObj);
    const { recipe } = data.data;

    const newRecipeData = {
      cookingTime: recipe.cooking_time,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      title: recipe.title,
      publisher: recipe.publisher,
      id: recipe.id,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
      key: recipe.key,
    };

    state.recipe = newRecipeData;
  } catch (err) {
    throw err;
  }
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const getBookmarksFromLocalStorage = function () {
  const storage = JSON.parse(localStorage.getItem('bookmarks'));

  if (storage) state.bookmarks = storage;
};
