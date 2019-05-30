import Document, { Html, Head, Main, NextScript } from 'next/document';

class NextDocument extends Document {
  static async getInitialProps() {
    const initialProps = await Document.getInitialProps(...arguments);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="renderer" content="webkit" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta httpEquiv="x-dns-prefetch-control" content="on" />

          <meta httpEquiv="Cache-Control" content="no-cache,no-store,must-revalidate" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="0" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default NextDocument;
