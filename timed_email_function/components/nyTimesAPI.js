const axios = require("axios");
const apiKey = process.env.NYT_API_KEY;
const uri = (q, key) =>
  `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${q}&sort=relevance&${currentDate()}&api-key=${key}`;

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
 * @param {function} callback callback function recieves array of object(s):
 * - headline: Headline
 * - web_url: URL of the article
 * - abstract: Article summary
 * - thumbnail: URL of the thumbnail image
 */
function getSelectionFromAPI(searchTerm, callback) {
  const articles = {searchTerm: searchTerm, articles: []};
  axios({
    method: "get",
    url: encodeURI(uri(searchTerm, apiKey)),
    headers: {
      Accept: "application/json",
    },
  })
      .then((result) => result.data.response.docs)
      .then((result) => {
        if (result.length > 0) {
          for (let i=0; i < result.length; i++) {
            const tempArticle = {};
            tempArticle.headline = result[i].headline.main;
            tempArticle.web_url = result[i].web_url;
            tempArticle.abstract = result[i].abstract;
            for (const images of result[i].multimedia) {
              if (images.subtype === "thumbnail" && images.height === 75) {
                tempArticle.thumbnail = `https://www.nytimes.com/${images.url}`;
              }
            }
            articles.articles.push(tempArticle);
            if (result.length - 1 === i) {
              callback(articles);
            }
          }
        }
      })
      .catch((err) => {
        console.error(`Error from getSelectionFromAPI: ${err}:${err.data}`);
      });
}

module.exports = {getSelectionFromAPI};
