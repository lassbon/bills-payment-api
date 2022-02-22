require('dotenv').config()
const jwt = require('jsonwebtoken');
const { createNewTransaction } = require('../models/payment.models');
const authentication = async(req, res, next) => {

    const token = req.headers.authorization
    
    const tokenSplit = token.split(" ")
    if (!token) {
        res.status(401).send({
            status: false,
            message: 'Unauthorized Access'
                    
        })
    }
    
     jwt.verify(tokenSplit[1], process.env.JWT_SECRET, (err, decoded)=> {

         if (err) {
            res.status(401).send({
                status: false,
                message: 'Unauthorized Acesss'
                        
            })
         }

         req.body.customerEmail = decoded.email
         req.body.fakeId =  decoded._id
   
         next() 
         
         
         
     })
    


}


module.exports = {
    authentication
}


// if (!username || !password) {
//     res.status(422).send({
//         status: "sucess",
//         message: 'Bad request',
//         data: []
        
    
//     })
// }

// if (username == hiddenUsername && password == hiddenPassword) {
// next()

// } else {
//     res.status(401).send({
//         status: "sucess",
//         message: 'Unauthorized Acesss',
//         data: []
        
    
//     })
// }