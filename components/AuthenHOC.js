import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  getCurrentUserDataSelector,
  getCurrentUser,
  checkLogin
} from "../stores/userState";

export const isServer = !process.browser;

const connectWithRedux = connect(
  createStructuredSelector({
    currentUser: getCurrentUserDataSelector
  })
);

export default function withAuth(AuthComponent) {
  class AuthenHOC extends React.Component {
    static getInitialProps = async ctx => {
      return AuthComponent.getInitialProps
        ? AuthComponent.getInitialProps(ctx)
        : {};
    };

    componentDidMount() {
      if (!isServer) {
        this.props.dispatch(getCurrentUser());
      }
    }

    render() {
      const { currentUser } = this.props;
      console.log(currentUser);
      return (
        <div>
          {!checkLogin(currentUser) ? (
            console.log("loading spiner...")
          ) : (
            <AuthComponent {...this.props} isLoggedIn={true} />
          )}
        </div>
      );
    }
  }

  return connectWithRedux(AuthenHOC);
}
