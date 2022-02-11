const Joi = require('Joi')

const purchasesValidation = Joi.object({
    // customer_id: Joi.string().required(),
    // amount: Joi.number().required(),
    // name: Joi.string().required(),
    // customer_unique_number: Joi.string().required(),
    // serviceType: Joi.string().required(),
    // payment_ref: Joi.string().required(),
    operatorID: Joi.string().required(),
    amount: Joi.number().required(),
    phoneNumber: Joi.string().required(),

})




module.exports = purchasesValidation