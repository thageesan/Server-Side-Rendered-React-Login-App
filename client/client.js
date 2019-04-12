import React from 'react'
import { Provider } from 'react-redux';
import { StaticRouter, Route } from 'react-router-dom';
import { hydrate } from 'react-dom'
import configureStore from './_services/store.service';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';

// Read the state sent with markup
const state = window.__STATE__;

// delete the state from global window object
delete window.__STATE__;

// reproduce the store used to render the page on server
const store = configureStore(state)

/**
 * hydrate the page to make sure both server and client
 * side pages are identical. This includes markup checking,
 * react comments to identify elements and more.
 */

hydrate(
  <Provider store={store} >
    <StaticRouter>
      <Route exact path="/api/login" component={LoginPage}>
      </Route>
      <Route exact path="/api/users" component={HomePage}>
      </Route>
    </StaticRouter>   
  </Provider>,
  document.querySelector('#app')
)