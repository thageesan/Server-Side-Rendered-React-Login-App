import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './_services/store.service';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';


module.exports = function render(initialState) {
  // Configure the store with the initial state provided
  const store = configureStore(initialState)

  // render the App store static markup ins content variable
  let content = renderToString(
    <Provider store={store} >
      <StaticRouter>
        <Route exact path="/api/login" component={LoginPage}>
        </Route>
        <Route exact path="/api/users" component={HomePage}>
        </Route>
      </StaticRouter> 
    </Provider>
  );

  // Get a copy of store data to create the same store on client side 
  const preloadedState = store.getState()

  return {content, preloadedState};
}