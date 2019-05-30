import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import Dva from '@/utils/dva';
import { createUrl } from '@/utils/helper';

class NextApp extends App {
  static async getInitialProps({ Component, /* router, */ ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const that = this;
    const { /* err, */ Component, store, router, pageProps } = that.props;
    const url = createUrl(router);

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} url={url} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(Dva)(NextApp);
