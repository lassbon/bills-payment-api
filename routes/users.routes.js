const express = require('express')
const router = express.Router()
const usersController  = require('../controllers/users.controllers')



router.post('/user/create', usersController.createNewUser)

router.get('/user/verify-otp/:customer/:email/:otp', usersController.verifyOTP)

router.get('/user/:id', usersController.getUser )

router.put('/user/:id', usersController.updateUser)

router.get('/user/resend-otp/:phone', usersController.resendOtp)

router.post('/user/create', usersController.createInvoice)

router.get('user/invoiceID', usersController.listInvoice)

router.get('user/viewIvoice', usersController.viewInvioce)

router.get('user/verifyInvioce', usersController.verifyInvioce)

router.post('user/sendNotification', usersController.sendNotification)

router.get('user/finalizeInvo ice', usersController.FinalizeInvoice)

router.get('user/udpdateInvoice', usersController.updateInvoice)



module.exports = router
