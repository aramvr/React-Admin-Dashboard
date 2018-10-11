import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../api/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (Auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      ))
    }
  />
);

export default PrivateRoute;
