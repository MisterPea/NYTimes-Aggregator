const { RESTDataSource } = require('apollo-datasource-rest');

class NytApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.nytimes.com/svc/topstories/v2/';
  }

  willSendRequest(request) {
    request.params.set('api-key', process.env.NYT_API_KEY);
  }

  async getTopStories(section){
    const response = await this.get(`${section}.json`);
    // filter out elements without a title
    return response.results.filter((result) => result.title !== "")
  }
}

module.exports = NytApi;