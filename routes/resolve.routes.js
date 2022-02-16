const express = require('express')
const router = express.Router()
const resolveController  = require('../controllers/resolve.controllers')
    
    
    
router.get('/customer/bank/resolve_bvn/:BVN', resolveController.BvnResolve)
    
router.get('/customer/bank/resolve-account?account_number=ACCOUNT_NUMBER&bank_code=BANK_CODE', resolveController.accountResolve)

router.get('/customer/bank/resolve-cardbin/:BIN', resolveController.CardbinResolve)
    
router.get('/customer/bank/resolve-phonenumber/:verifications', resolveController.PhoneNumberResolve)
    
module.exports = router