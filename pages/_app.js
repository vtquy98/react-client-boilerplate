import React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import store from "../stores/store";
import withRedux from "next-redux-wrapper";
import Head from "next/head";

class AppRedux extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    const { store } = ctx || {};
    return { pageProps, store };
  }

  render() {
    const { Component, store, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>{pageProps.title || "AGU E-Voting"}</title>
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </React.Fragment>
    );
  }
}

export default withRedux(store)(AppRedux);
