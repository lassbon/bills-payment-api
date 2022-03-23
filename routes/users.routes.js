const express = require('express')
const router = express.Router()
const usersController  = require('../controllers/users.controllers')
const {authentication} = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')


router.post('/user/create', usersController.createNewUser)

router.get('/user/verify-otp/:email/:otp', usersController.verifyOTP)

router.get('/user',authentication, usersController.getUser )

router.put('/user', authentication, authorization, usersController.updateUser)

router.get('/user/resend-otp/:phone', usersController.resendOtp)






module.exports = router
