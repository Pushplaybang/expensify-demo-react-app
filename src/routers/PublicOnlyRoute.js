import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PublicOnlyRoute = ({
  isAuthenticated,
  component: Component,
  ...props
}) => (
  <Route
    {...props}
    component={routeProps =>
      isAuthenticated ? <Redirect to={"/dashboard"} /> : <Component {...routeProps} />
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicOnlyRoute);
