const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Multimedia {
    url: String
  }

  type Article {
    title: String
    abstract: String
    section: String
    subsection: String
    byline: String
    des_facet:[String]
    org_facet:[String]
    per_facet:[String]
    geo_facet:[String]
    url: String
    multimedia: [Multimedia]
  }

  type Query {
    topStories(section: String): [Article]
  }
`;

module.exports = typeDefs;
