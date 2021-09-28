import { TIMED_OUT_SEC } from './config';

export const timedOut = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long.'));
    }, sec * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const dataJSON = await Promise.race([fetch(url), timedOut(TIMED_OUT_SEC)]);
    const data = await dataJSON.json();
    // console.log(dataJSON, data);

    if (
      !dataJSON.ok ||
      //   data.status === 'fail' ||
      data.data.recipes?.length === 0
    )
      throw new Error(
        'An error occured while fetching your recipe(s). Maybe a problem with your search query. Please try again.'
      );
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, recipeData) {
  try {
    const dataJSON = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData),
      }),
      timedOut(TIMED_OUT_SEC),
    ]);

    const data = await dataJSON.json();
    return data;
  } catch (err) {
    throw err;
  }
};
