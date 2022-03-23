const express = require('express')
const router = express.Router()
const invoiceController  = require('../controllers/invoice.controllers')

router.post('/user/create', invoiceController.createInvoice)

router.get('user/listInvoiceID', invoiceController.listInvoice)

router.get('user/viewIvoice', invoiceController.viewInvioce)

router.get('user/verifyInvioce', invoiceController.verifyInvioce)

router.post('user/sendNotification', invoiceController.sendNotification)

router.post('user/finalizeInvoice', invoiceController.FinalizeInvoice)

router.put('user/udpdateInvoice', invoiceController.updateInvoice)





module.exports = router