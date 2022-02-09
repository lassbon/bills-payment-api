require('dotenv').config()
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const planService = require('../services/bills_payment_plan.services')
const planModel = require('../models/plan.models')





const createPlan = async(req, res) =>{
    const {  name, amount, interval } = req.body

    const planSchema = Joi.object({
        name: Joi.string().required(),
        amount: Joi.string().required(),
        interval: Joi.number().required()
     
    })
    try {
        const responseFromJoiValidation = planSchema.validate(req.body)
            if (responseFromJoiValidation.error) {
                throw new Error("Bad request")
            }
            const planResponse = await planService.createPlanCategories(req.body)
            
            if (planResponse.data.status == false) {
                throw new Error("Sorry, plan cannot be creayed ")
                 
             }

        res.status(200).send({
            status: true,
            message: "plan  successfully created",
            data: planResponse.data.data
        })
    }
        catch(e) {
           
            res.status(400).send({
                status: false,
                message:   e.message || msgClass.GeneralError
    
         })
        }
}


    


const listPlan = async (req, res) => {
   
    
         const { page } = req.params
        
        
        try {
            const getAllPlan = await planService.getListPlan()
            
            res.status(200).send({
                status: true,
                message: msgClass.getAllPlan,
                data: getAllPlan.data.data
            })
        } catch (e) {
    
            res.status(400).send({
                status: false,
                message: e.message,
                data: []
            })
        }
        
    
    
    }




module.exports = {
    createPlan,
    listPlan
}