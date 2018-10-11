// @flow
import 'antd/dist/antd.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DefaultLayout from './components/DefaultLayout';
import Login from './auth/Login';
import PrivateRoute from './auth/PrivateRoute';
import './theme.css';
import './style.css';
import initialState from './initialState';

if (!localStorage.getItem('state')) {
  localStorage.setItem('state', JSON.stringify(initialState));
}

const root: any = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/" component={DefaultLayout} />
    </Switch>
  </Router>,
  root,
);
