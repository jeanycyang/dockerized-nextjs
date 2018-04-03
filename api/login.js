const router = require('express').Router()

router.post('/', (req, res) => {
  res.json({ status: 200 })
})

module.exports = router
