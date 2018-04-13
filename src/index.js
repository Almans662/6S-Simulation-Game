import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './components/registerServiceWorker';
import {unregister} from './components/registerServiceWorker';


import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

unregister();
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>

  , document.getElementById('root'));
//registerServiceWorker();
