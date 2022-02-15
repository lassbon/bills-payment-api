const express = require('express')
const router = express.Router()
const usersInvoiceController  = require('../controllers/invoice.controllers')

router.post('/user/create', usersInvoiceController.createInvoice)

router.get('user/listInvoiceID', usersInvoiceController.listInvoice)

router.get('user/viewIvoice', usersInvoiceController.viewInvioce)

router.get('user/verifyInvioce', usersInvoiceController.verifyInvioce)

router.post('user/sendNotification', usersInvoiceController.sendNotification)

router.post('user/finalizeInvo ice', usersInvoiceController.FinalizeInvoice)

router.put('user/udpdateInvoice', usersInvoiceController.updateInvoice)





module.exports = router