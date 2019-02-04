import React, { Component } from 'react'
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl'
import { get } from 'lodash'

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang])
  })
}

let messagesCache
if (typeof window !== 'undefined') {
  const locale = get(window, '__NEXT_DATA__.props.locale')
  messagesCache = window.__intl__
}

export const getMessages = locale => {
  const { readFileSync, existsSync } = require('fs')
  const localeFilePath = `./intl/translations/${locale}.json`
  if (existsSync(localeFilePath)) {
    const localeFile = readFileSync(localeFilePath, 'utf8')
    return JSON.parse(localeFile)
  }
  return null
}

const localeDataCache = new Map()
export const getLocaleDataScript = locale => {
  if (locale) {
    const { readFileSync } = require('fs')
    const lang = locale.split('-')[0]
    if (!localeDataCache.has(lang)) {
      const localeDataFile = eval('require.resolve(`react-intl/locale-data/${lang}`)')
      const localeDataScript = readFileSync(localeDataFile, 'utf8')
      localeDataCache.set(lang, localeDataScript)
    }
    return localeDataCache.get(lang)
  }
}

export default Page => {
  const IntlPage = injectIntl(Page)

  return class PageWithIntl extends Component {
    static async getInitialProps(context) {
      let props
      if (typeof Page.getInitialProps === 'function') {
        props = await Page.getInitialProps(context)
      }

      const {
        req,
        query: { locale }
      } = context
      const now = Date.now()

      if (req) {
        messagesCache = getMessages(locale)
      }

      return { ...props, locale, now }
    }

    render() {
      const { locale, now } = this.props
      return (
        <IntlProvider defaultLocale="ru" locale={locale} messages={messagesCache} initialNow={now}>
          <IntlPage {...this.props} />
        </IntlProvider>
      )
    }
  }
}
