const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 4000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const apiRoutes = require('./api')

app.prepare()
  .then(() => {
    const server = express()

    server.use('/api', apiRoutes)

    server.get('/login', (req, res) => app.render(req, res, '/login', req.query))

    server.get('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
