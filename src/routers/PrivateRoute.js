import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...props
}) => (
  <Route {...props} component={(routeProps) => (
    isAuthenticated ? (
      <Component {...routeProps} />
    ) : (
      <Redirect to={"/"} />
    )
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
