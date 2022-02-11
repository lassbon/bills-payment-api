const express = require('express')
const router = express.Router()
const refundController = require('../controllers/refunds.controllers')


router.post('/create-refunds', refundController.createRefund)
router.get("/list-refunds/:reference_id/:currency/:from/:to/:perPage/:page", refundController.getAllRefunds)
router.get("/fetch-refunds/:reference", refundController.fetchAllRefunds)


module.exports = router