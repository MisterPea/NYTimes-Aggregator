const resolvers = {
  Query: {
    topStories: (_, { section }, { dataSources }) => {
      return dataSources.nytApi.getTopStories(section);
    }
  }
};

module.exports = resolvers;