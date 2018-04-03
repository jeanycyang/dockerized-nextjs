const router = require('express').Router()

const login = require('./login')

router.use('/login', login)

module.exports = router
