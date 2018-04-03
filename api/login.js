const router = require('express').Router()

router.post('/', (req, res) => {
  if (req.body.account === 'test' && req.body.password === 'pass') {
    res.status(200).end()
  } else res.status(400).json({ message: 'this account does not exist' })
})

module.exports = router
