import '@babel/polyfill';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AuthenticatedRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} render={ props => localStorage.getItem('user') ? <Component {...props} /> : <Redirect to={{ pathname: '/api/users', state: { from: props.location } }} />}/>
}