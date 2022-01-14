const express = require('express')
const router = express.Router()
const weatherController = require('../controllers/weather.controllers')
const checkLogin = require('../middlewares/check-login-details')


router.get('/weather/current/:location', checkLogin.checkLogin,  weatherController.getCurrentWeather)


router.get('/weather/historical-within-range/:location/:start_date/:end_date', weatherController.getHistoricalWeather)

module.exports = router