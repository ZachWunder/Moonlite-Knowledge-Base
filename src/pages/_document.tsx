import React from 'react';

import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            async
            defer
            data-domain="moonlite.dev"
            src="https://plausible.io/js/plausible.js"
          />
        </Head>
        <body className="bg-gray-50 dark:bg-gray-700">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
