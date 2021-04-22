const { default: axios } = require('axios')
const { Router } = require('express')

const router = Router()

router.get('/', async (_, res) => {
  return res.render('home')
})

module.exports = router
