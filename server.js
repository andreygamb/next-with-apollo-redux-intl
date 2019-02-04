const IntlPolyfill = require('intl')
Intl.NumberFormat = IntlPolyfill.NumberFormat
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

const { basename } = require('path')
const { createServer } = require('http')
const { parse } = require('url')
const accepts = require('accepts')
const next = require('next')
const Route = require('route-parser')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const languages = ['ru', 'en']

app.prepare().then(() => {
  createServer((req, res) => {
    const { pathname, query } = parse(req.url, true)

    let route = new Route('/:locale(/*pathname)')
    const { locale, pathname: matchedPathName = '' } = route.match(pathname)

    // Redirect to user's locale or ru for development
    if (pathname === '/') {
      const accept = accepts(req)
      const locale = accept.language(dev ? ['ru'] : languages)
      res.setHeader(
        'Cache-Control',
        'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
      )
      res.writeHead(302, { Location: `/${locale}` })
      res.end()
      return
    }

    if (~languages.indexOf(locale)) {
      let nextPathName = `/${matchedPathName}`
      let nextQuery = Object.assign({}, query, { locale })

      // let route = new Route('/test/:slug')
      // const { slug } = route.match(nextPathName)
      // if (slug) {
      //   nextPathName = `/test`
      //   nextQuery = Object.assign({}, nextQuery, { slug })
      // }

      app.render(req, res, nextPathName, nextQuery)
    } else {
      handle(req, res)
    }
  }).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
