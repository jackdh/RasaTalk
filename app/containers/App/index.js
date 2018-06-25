/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import HomePage from 'containers/HomePage/Loadable';
import { CssBaseline } from '@material-ui/core';
import LoginPage from 'containers/LoginPage';
import FeaturePage from 'containers/FeaturePage/Loadable';

import Auth from 'containers/LoginPage/Auth';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  height: 100%;
  min-height: 100%;
  min-height: 100vh;
`;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.any,
};

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - Rasa Talk" defaultTitle="Rasa Talk">
        <meta
          name="description"
          content="A dialog management system for Rasa"
        />
      </Helmet>
      <CssBaseline />
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute path="/" component={HomePage} />
      </Switch>
    </AppWrapper>
  );
}
