import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose, withState } from "recompose";

import { userLogin } from "../stores/userState";

const withUsernameState = withState("username", "setUsername", "");
const withPasswordState = withState("password", "setPassword", "");

const connectToRedux = connect(
  createStructuredSelector({
    // errorMessage: userLoginErrorMessageSelector
  }),
  dispatch => ({
    doLogin: (username, password) =>
      username && password && dispatch(userLogin(username, password))
  })
);

const enhance = compose(withUsernameState, withPasswordState, connectToRedux);

const Home = ({ doLogin, username, password, setUsername, setPassword }) => (
  <div>
    <form className="form-horizontal" action="index.html">
      <fieldset className="form-group floating-label-form-group">
        <label>Your Username</label>
        <input
          type="text"
          className="form-control"
          id="user-name"
          placeholder="Your Username"
          onChange={e => setUsername(e.currentTarget.value)}
        />
      </fieldset>
      <fieldset className="form-group floating-label-form-group mb-1">
        <label>Enter Password</label>
        <input
          type="password"
          className="form-control"
          id="user-password"
          placeholder="Enter Password"
          onChange={e => setPassword(e.currentTarget.value)}
        />
      </fieldset>
      <button
        type="submit"
        className="btn btn-outline-primary btn-block"
        onClick={e => {
          e.preventDefault();
          doLogin(username, password);
        }}
      >
        <i className="ft-unlock"></i> Login
      </button>
    </form>
  </div>
);

export default enhance(Home);
