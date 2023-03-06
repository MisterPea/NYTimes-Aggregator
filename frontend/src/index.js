import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import '../style/style_main.scss';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: ' http://backend:4000/graphql/',
  cache: new InMemoryCache()
});



const rootElement = document.getElementById('root');
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>,
  </ApolloProvider>,
  rootElement,
);
