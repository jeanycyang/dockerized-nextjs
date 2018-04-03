const router = require('express').Router()

const login = require('./login')

router.use('/login', login)

const user = require('./user')

router.use('/user', user)

module.exports = router
