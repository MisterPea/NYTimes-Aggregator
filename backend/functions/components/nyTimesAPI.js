require("dotenv").config(); // Shouldn't need this during implementation.
const axios = require("axios");
const apiKey = process.env.NYT_API_KEY;
const uri = (q, key) =>
  `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${q}&sort=relevancet&${currentDate()}&api-key=${key}`;

const currentDate = () => {
  const dateObject = new Date();
  const year = dateObject.getUTCFullYear();
  const month = ("0" + (dateObject.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + dateObject.getUTCDate()).slice(-2);
  return `begin_date=${year}${month}${day}&end_date=${year}${month}${day}`;
};

/**
 * Method that returns up to 10 articles with text and links
 * @param {String} searchTerm Term which derived from facet keywords
 * @return {Array<Objects>} The articles array returns an array composed of:
 * - headline Headline
 * - web_url URL of the article
 * - abstract Article summary
 * - thumbnail URL of the thumbnail image
 */
function getSelectionArticles(searchTerm) {
  const articles = [];
  axios({
    method: "get",
    url: uri(searchTerm, apiKey),
    headers: {
      Accept: "application/json",
    },
  })
      .then((result) => result.data.response)
      .then((result) => {
        if (result.docs.length > 0) {
          for (const doc of result.docs) {
            const tempArticle = {};
            tempArticle.headline = doc.headline.main;
            tempArticle.web_url = doc.web_url;
            tempArticle.abstract = doc.abstract;
            for (const images of doc.multimedia) {
              if (images.subtype === "thumbnail" && images.height === 75) {
                tempArticle.thumbnail = `https://www.nytimes.com/${images.url}`;
              }
            }
            articles.searchObject.push(tempArticle);
          }
        }
      })
      .catch((err) => console.error(err));
  return articles;
}

module.exports = {getSelectionArticles};
