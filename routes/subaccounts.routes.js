const express = require('express')
const router = express.Router()
const subaccountsController  = require('../controllers/subaccounts.controllers')


router.post('/subaccount/create', subaccountsController.createNewSubaccount)

router.get('/subaccount', subaccountsController.listSubaccounts)

router.get('/subaccount/:id', subaccountsController.getSubaccount)

router.put('/subaccount/:id', subaccountsController.updateSubaccount)



module.exports = router