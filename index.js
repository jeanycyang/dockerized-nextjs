const express = require('express')
const app = express()

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(4000, () => console.log('Example app listening on port 4000!'))
