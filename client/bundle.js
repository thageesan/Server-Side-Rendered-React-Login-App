import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './_services/store.service';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage'

// pure client side app.

// Create a fresh store 
const store = configureStore()

render(
    <Provider store={store}>
        <BrowserRouter>
            <Route exact path="/api/login" component={LoginPage}>
            </Route>
            <Route exact path="/api/users" component={HomePage}>
            </Route>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#app')
);