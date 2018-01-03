import React from "react";
import ReactDOM from "react-dom";

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>The info is {props.info}</p>
  </div>
);

const withAdminWarning = WrappedComponent => {
  return props => (
    <div>
      {props.isAdmin && <p>ADMIN VIEW ONLY: DO NOT SHARE</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuth = WrappedComponent => {
  return props => (
    <div>
      {props.isAuth ? <WrappedComponent {...props} /> : <p>please login in.</p>}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuth(Info);

ReactDOM.render(
  <AuthInfo info="this is the detail" />,
  document.getElementById("app")
);
