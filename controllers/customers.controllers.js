
const { v4: uuidv4 } = require('uuid')
const Joi = require('Joi')


let customerDetails = [
    {
        id: 1,
        firstname: "Abayomi",
        surname: "Ajao",
        phone: "08084259372",
        email: "roshbon@gmail.com"
    },
    {
        id: 2,
        firstname: "Alli",
        surname: "Olarinde",
        phone: "08084259372",
        email: "alliolarinde@gmail.com"
    },
    {
        id: 3,
        firstname: "Alli",
        surname: "Olarinde",
        phone: "08084259372",
        email: "alliolarinde@gmail.com"
    },
    {
        id: 4,
        firstname: "Alli",
        surname: "Olarinde",
        phone: "08084259372",
        email: "alliolarinde@gmail.com"
    },
    {
        id: 5,
        firstname: "Alli",
        surname: "Olarinde",
        phone: "08084259372",
        email: "alliolarinde@gmail.com"
    },
    {
        id: 6,
        firstname: "Alli",
        surname: "Olarinde",
        phone: "08084259372",
        email: "alliolarinde@gmail.com"
    },
    {
        id: 7,
        firstname: "Alli",
        surname: "Olarinde",
        phone: "08084259372",
        email: "alliolarinde@gmail.com"
    },
    {
        id: 8,
        firstname: "Alli",
        surname: "Olarinde",
        phone: "08084259372",
        email: "alliolarinde@gmail.com"
    },
    {
        id: 9,
        firstname: "Alli",
        surname: "Olarinde",
        phone: "08084259372",
        email: "alliolarinde@gmail.com"
    },
    {
        id: 10,
        firstname: "Alli",
        surname: "Olarinde",
        phone: "08084259372",
        email: "alliolarinde@gmail.com"
    }

]

const filterData = (variable) => {

    if (!variable) {
        return false
    } 
    return true

    
}

const getAllCustomers = (req, res) => {

let size = req.query.size ? parseInt(req.query.size) : 10 
let result = []
    for(let i in customerDetails){
        result.push(customerDetails[i])
        if(result.length == size){
            res.status('200').send({
                status:  "success",
                message:  "user successfully fetched",
                data: result
            })
               
        }
    }
        
}


const getSingleCustomer = (req, res) => {

    let {value , error} = customerValidation.customerSchema.validate({});
        let phone = req.params.phone
        let email = req.params.email
        console.log('phone: ', phone , 'email: ', email)
        let userDetails = customerDetails.filter((x) => x.id == req.params.varibale1 )
    
            res.status(200).send({
            status: "success",
            message: "Customer successfully fetched",
            data: userDetails || []
        })
    
}

const createNewCustomer = (req, res) => {


    const customerSchema = Joi.object({

        firstname: Joi.string().alphanum().required().messages({
            'string.empty': `Firstname cannot be an empty field`,
        }),
        surname: Joi.string().alphanum().required(),
        email: Joi.string().email().required(),
        phone: Joi.number().required()

    })
    const { value, error } = customerSchema.validate(req.body);
    if (error) {
        res.status(422).send({
                    status: "error",
                     message: error.details[0].message,
                     data: {}
                 })
    }



    const { firstname, surname, phone, email } = req.body

    let newUser = {
        id: uuidv4(),
        firstname: firstname,
        surname: surname,
        phone: phone,
        email: email
    }
     

    customerDetails.push(newUser)

    res.status(201).send({
        status: "success",
        message: "Account successfully created",
        data: newUser || {}
    })

}

const updateCustomer = (req, res) => {

    console.log(JSON.stringify(req.body))
    
    const { phone, email } = req.body
    const { id } = req.params
    //sanitise
    if (!phone || !email || !id) {

        res.status(422).send({
            status: "success",
            message: "Bad Request",
            data: []
        })
    }

    for (let customer in customerDetails) {
        if (customerDetails[customer].id == id) {
            
            customerDetails[customer].phone = phone
            customerDetails[customer].email = email
        }
    }
    
    res.status(200).send({
        status: "success",
        message: "Account Updated",
        data: []
    })

}


const deleteCustomer = (req, res) => {

    console.log(JSON.stringify(req.body))
    
    const { id } = req.params
    //sanitise
    if (!id) {

        res.status(422).send({
            status: "success",
            message: "Bad Request",
            data: []
        })
    }

    for (let customer in customerDetails) {
        if (customerDetails[customer].id == id) {
            
            //delete customerDetails[customer]
            customerDetails.splice(customer, 1)
        }
    }

    
    res.status(200).send({
        status: "success",
        message: "Account Deleted",
        data: []
    })


}


module.exports = {
    getAllCustomers,
    getSingleCustomer,
    createNewCustomer,
    updateCustomer,
    deleteCustomer
}