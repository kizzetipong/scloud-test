const express = require('express')
const next = require('next')
const http = require('http')
const bodyParser = require('body-parser')
const apiRoutes = require('./server/routers/api')
const opensocket = require('./server/socket/socket')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    var httpserver = http.createServer(server, { 'log level': 0, 'match origin protocol': 'yes' })
    server.use(bodyParser.json())

    opensocket(httpserver)

    //handle trailing slash
    server.use((req, res, next) => {
      const test = /\?[^]*\//.test(req.url)
      if (req.url.substr(-1) === '/' && req.url.length > 1 && !test)
        res.redirect(301, req.url.slice(0, -1))
      else
        next()
    })

    server.use('/api', apiRoutes)

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    httpserver.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
