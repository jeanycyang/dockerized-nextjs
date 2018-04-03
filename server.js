const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const { errors: joiErrors } = require('celebrate')

const port = parseInt(process.env.PORT, 10) || 4000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const apiRoutes = require('./api')

app.prepare()
  .then(() => {
    const server = express()

    /* body parser */
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))

    /* all API endpoints */
    server.use('/api', apiRoutes)

    server.get('/login', (req, res) => app.render(req, res, '/login', req.query))

    /* celebrate middleware for joi errors */
    server.use(joiErrors())

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
