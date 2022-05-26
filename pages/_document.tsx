import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initalProps = await Document.getInitialProps(ctx)

    return initalProps
  }

  render() {
    return (
      // data-theme is and attribute to daisy ui
      <Html lang="es" data-theme="myTheme">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
