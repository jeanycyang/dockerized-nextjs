const router = require('express').Router()
const axios = require('axios')
const Joi = require('joi')
const { celebrate } = require('celebrate')

const redisClient = require('../redis')

const signUpSchema = {
  body: Joi.object().keys({
    account: Joi.string().required(),
    password: Joi.string().required(),
  }),
}
router.post('/sign_up', celebrate(signUpSchema), (req, res) => {
  const { account, password } = req.body
  res.json({ account, password })
})

router.get('/analytics', (req, res) => {
  const { keyword } = req.query
  redisClient.get(`analytics/${keyword}`, (err, cachedData) => {
    if (cachedData !== null) {
      res.json(cachedData)
    } else {
      // some heavy works
      axios.get(`
        https://api.github.com/search/repositories?q=${keyword}+language:javascript&sort=stars&order=desc
      `).then((response) => {
        const originalData = response.data.items
        const data = originalData.reduce((accum, curr) => [
          ...accum,
          {
            id: curr.id,
            name: curr.full_name,
            description: curr.description,
            url: curr.url,
          },
        ], [])
        redisClient.setex(`analytics/${keyword}`, 2 * 60 * 60, JSON.stringify(data))
        res.status(200).json(data)
      }).catch((error) => {
        console.error(error)
        res.status(500).json(error)
      })
    }
  })
})

module.exports = router
