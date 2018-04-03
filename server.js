const express = require('express')
const nextApp = require('next')
const bodyParser = require('body-parser')
const { errors: joiErrors, isCelebrate } = require('celebrate')

const port = parseInt(process.env.PORT, 10) || 4000
const dev = process.env.NODE_ENV !== 'production'
const app = nextApp({ dev })
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
    if (dev) {
      server.use(joiErrors())
    } else {
      server.use((err, req, res, next) => {
        if (isCelebrate(err)) {
          return res.status(400).json({ message: 'invalid params' })
        }
        return next(err)
      })
    }

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
