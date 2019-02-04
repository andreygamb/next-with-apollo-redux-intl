import NProgress from 'nprogress'
import Router from 'next/router'
import Helmet from 'react-helmet'
import { defineMessages, injectIntl } from 'react-intl'

import GlobalStyle from 'utils/globalStyles'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const title = 'Apollo + next.js'
const image = ''
const messages = defineMessages({
  description: 'Описание'
})

export default injectIntl(({ children }) => (
  <main>
    <Helmet
      defaultTitle={title}
      meta={[
        { name: 'viewport', content: 'width=device-width, user-scalable=no' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' }
      ]}
    />
    <GlobalStyle />
    {children}
  </main>
))
