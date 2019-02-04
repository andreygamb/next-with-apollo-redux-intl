import Document, { Head, Main, NextScript } from 'next/document'
import Helmet from 'react-helmet'
import { ServerStyleSheet } from 'styled-components'
import { getMessages, getLocaleDataScript } from 'utils/intl'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()

    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
      })

    const initialProps = await Document.getInitialProps(ctx)
    const helmet = await Helmet.renderStatic()
    const helmetTags = Object.keys(helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => helmet[el].toComponent())

    const {
      query: { locale }
    } = ctx
    const { nextExport = false } = global.__NEXT_DATA__ || {}
    const messages = getMessages(locale)
    const localeDataScript = getLocaleDataScript(locale)
    localeDataScript

    return {
      ...initialProps,
      head: [...initialProps.head, ...helmetTags],
      styles: [...initialProps.styles, ...sheet.getStyleElement()],
      locale,
      messages,
      localeDataScript,
      nextExport
    }
  }

  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <script src={`https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${this.props.locale}`} />
          <script dangerouslySetInnerHTML={{ __html: this.props.localeDataScript }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__intl__ = ${JSON.stringify(this.props.messages)}` }} />
          <NextScript />
        </body>
      </html>
    )
  }
}
