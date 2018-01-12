import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "./../actions/auth";

export const Header = (props) => (
  <header>
    <h1>Expensify</h1>
    <nav>
      <NavLink activeClassName="is-active" to="/" exact={true}>
        login
      </NavLink>
      <NavLink activeClassName="is-active" to="/dashboard" exact={true}>
        Dashboard
      </NavLink>
      <NavLink activeClassName="is-active" to="/create">
        Create
      </NavLink>
      <NavLink activeClassName="is-active" to="/help">
        Help
      </NavLink>
      <button type="button" onClick={props.logout}>
        Logout
      </button>
    </nav>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
