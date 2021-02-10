const router = require("express").Router();
const fetch = require("node-fetch");

const nyt_api_key = process.env.NYT_API_KEY

router.route('/:section').get( async (req, res) => {
    const api_uri = `https://api.nytimes.com/svc/topstories/v2/${req.params.section}.json?api-key=${nyt_api_key}`
    const fetch_response = await fetch(api_uri);
    const json = await fetch_response.json();
    res.json(json)
})

module.exports = router