import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import '../style/style_main.scss';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://thetimespage.misterpea.me/graphql',
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
