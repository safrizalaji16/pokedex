import Document, { Head, Html, Main, NextScript } from "next/document";

import { AppConfig } from "@/utils/AppConfig";
import { Providers } from "@/stores/provider";

class MyDocument extends Document {
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head />
        <body>
          <Providers>
            <Main />
          </Providers>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
