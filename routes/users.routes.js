const express = require('express')
const router = express.Router()
const usersController  = require('../controllers/users.controllers')



router.post('/user/create', usersController.createNewUser)

router.get('/user/verify-otp/:customer/:email/:otp', usersController.verifyOTP)

router.get('/user/:id', usersController.getUser )

router.put('/user/:id', usersController.updateUser)

router.get('/user/resend-otp/:phone', usersController.resendOtp)




module.exports = router
