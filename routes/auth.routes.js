const express = require('express')
const router = express.Router()
const authController  = require('../controllers/auth.controllers')



router.post('/login', authController.login)

router.get('/start-forget-password/:email', authController.startForgetPassword)

router.patch('/complete-forget-password/:hash', authController.completeForgetPassword)





module.exports = router
