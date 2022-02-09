const express = require('express')
const router = express.Router()
const planController = require('../controllers/bills_payment_plan.controllers')


router.post('/plan/create', planController.createPlan)
router.get('plan/list_plan/:page', planController.listPlan)





module.exports = router