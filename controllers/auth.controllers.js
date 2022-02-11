require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid') 
const usersModel = require('../models/users.models')

const login = async (req, res) => {
    const { email, password } = req.body

    let payload

    usersModel.getUserDetailsByEmail(email)
    .then(resultFromLogin => {
        if (resultFromLogin == "") {
            throw new Error("Invalid Email or password")
        }

         payload = resultFromLogin[0]
        

        return bcrypt.compare(password, payload.password)
        
    })
    .then(resultFromPasswordCompare => {
        if (resultFromPasswordCompare == false) {
            throw new Error("Invalid Email or password")
        }
       
        const dataToAddInMyPayload = {
            email: payload.email,
            _id: uuidv4()
            }
                jwt.sign(dataToAddInMyPayload, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRES_TIME },
                (err, token) => {
                    if (err) {
                        throw new Error("Something went wrong")
                    }
                    res.status(200).send({
                        status: true,
                        message: "Successfully logged in ",
                        data: token
                   })
                   
                }
        

           )

         
        
    })
    .catch(err => {
        
        res.status(400).send({
            status: false,
            message: err.message || "Something went wrong"
        })
    })
  


}


const logout = () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvc2hib25AZ21haWwiLCJwaG9uZSI6IjA4MDg0MjU5MzcyIiwiaWQiOiI5NTVlMTgzZC05ZDgxLTQ4ODAtYjUwZi0wYjYxN2Y2MDYyZDAiLCJpYXQiOjE2NDQ0Mzk4NTcsImV4cCI6MTY0NDQ0MzQ1N30.ozOgwaUIezSbCPSo454QguZnpZ3GzaZDNikmccMgqqY"
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        console.log(JSON.stringify(decoded)) // bar
      });
}

module.exports = {
    login,
     logout
}
