import React from "react";
import { connect } from 'react-redux';

import { startLogin } from './../actions/auth';

export const LoginPage = (props) => (
  <div>
    <h1>Login</h1>
    <button type="button" onClick={props.login}>Login</button>
  </div>
);

const mapDispatchToProps = (dispatch)=> ({
  login: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
