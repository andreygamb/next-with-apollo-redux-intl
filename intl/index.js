const extractReactIntlMessages = require('extract-react-intl-messages')

const locales = ['en']
const input = '!(node_modules)/**/*.js'
const translationsDirectory = 'intl/translations'
const defaultLocale = 'ru'

extractReactIntlMessages(locales, input, translationsDirectory, { defaultLocale }).then(() => {
  console.log(`translations in ${translationsDirectory} folder`)
})
