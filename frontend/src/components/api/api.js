/**
 * Method to remove empty elements/articles from the results array
 * @param {Array} data Array of articles
 * @returns Returns an array of articles
 */
function checkForEmptyData(data) {
  const sanitizedData = [];
  for (let i = 0; i < data.length; i += 1) {
    const article = data[i];
    const { section, title, abstract } = article;
    if (section.length !== 0 && title.length !== 0 && abstract.length !== 0) {
      sanitizedData.push(article);
    }
  }
  return sanitizedData;
}

/**
 * Method to pull stories from NY Times TopStories API.
 * @param {string} section - String representation of the section to be pulled.
 * @return {Promise} Top Stories data.
*/
export default function grabTopStories(section) {
  return fetch(`http://35.207.5.197/api/${section}`)
    .then((result) => result.json())
    .then((data) => {
      if (!data) {
        throw new Error(data.message);
      }
      return { ...data, results: checkForEmptyData(data.results) };
    })
    .catch((err) => console.error('Failed', err));
}
