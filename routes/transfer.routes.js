const express = require('express')
const router = express.Router()
const transferController  = require('../controllers/transfer.controllers')


router.post('/payout/add-recipient', transferController.addTransferRecipient)

router.post('/payout/initiate', transferController.initializingTransfer)

router.get('/payout/:transfer_id', transferController.fetchTransfer)

router.get('/recipients', transferController.getTransferRecipients)

module.exports = router
