const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./schema');
const NytApi = require('./datasource/nyt-api');
const resolvers = require('./resolvers');


require("dotenv").config();

async function startApolloServer() {
    const port = 4000;
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => ({
            nytApi: new NytApi(),
        })
    });

    await server.start();

    const app = express();
    app.use(cors());

    server.applyMiddleware({ app });

    await new Promise((resolve) => app.listen({ port }, resolve));
    console.log(`🚀 Server is running on PORT:${port}-${server.graphqlPath}`);
}

startApolloServer();