

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



const getSingleCustomer = () => {
    return "yes i am all customers"
}



module.exports = {
    getAllCustomers,
    getSingleCustomer
}