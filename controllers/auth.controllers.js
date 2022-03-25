require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid') 
const { getUserDetailsByEmail, forgetPasswordModel,
        validateHash, updatePassword,
        deleteResetPasswordRecord } = require('../models/users.models')
const { isEmpty, doSomeAsyncMagik } = require('../utils/utils')
const { readFileAndSendEmail } =  require('../services/email.services')
const { hashMyPassword } =  require('../controllers/users.controllers')





const login = async (req, res) => {
    const { email, password } = req.body

    let payload

    getUserDetailsByEmail(email)
    .then(resultFromLogin => {
        if (isEmpty(resultFromLogin)) {
            //log that the email does not exist
            throw new Error("Invalid Credentials")
        }
        
         payload = resultFromLogin[0]
        
        // if (payload.isAccountBlocked == true) {
        //     throw new Error("Acccount restricted, contact support")
        // }

        return bcrypt.compare(password, payload.password)
        
    })
    .then(resultFromPasswordCompare => {
        if (resultFromPasswordCompare == false) {
            throw new Error("Invalid Email or Password")
        }

    
       
        const dataToAddInMyPayload = {
            email: payload.email,
            isAdmin: false,
            _id: uuidv4()
            }
                jwt.sign(dataToAddInMyPayload, process.env.JWT_SECRET, { expiresIn : process.env.JWT_EXPIRES_TIME },
                (err, token) => {
                    if (err) {
                        throw new Error("Something went wrong")
                    }
                 
                    res.setHeader('token', token).status(200).send({
                                status: true,
                                message: "Successfully logged in "
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

const startForgetPassword = async (req, res) => {

    const { email } = req.params
    
    try {
        
        let [err, checkIfEmailExist] = await doSomeAsyncMagik(getUserDetailsByEmail(email))
        if (err) {
            //log from our end 
            //email does not exists
            throw new Error('This is on us, something went wrong', 400)
        }
        if (isEmpty(checkIfEmailExist)) {
            throw new Error(`If the email ${email} account exist with us, you will get a reset password email`)
        }
        let hash = uuidv4().replace(/-/gi, '')
        let [err2, createForgetPasword] = await doSomeAsyncMagik(forgetPasswordModel(email,hash))
       
        if (err2) {
            throw new Error('Please try This is on us, something went wrong')
        }
        if (!isEmpty(createForgetPasword)) {
            
            let dataReplacement = {
                "fullname": ` ${checkIfEmailExist[0].firstname}  ${checkIfEmailExist[0].surname}`,
                "resetPasswordlink": `${process.env.RESET_PASSWORD_LINK}/${hash}`
            }
            //send email
            readFileAndSendEmail(email, "RESET PASSWORD", dataReplacement, "forgetPassword")
        }
       

        res.status(200).send({
            status: true,
            message: `If the email ${email} account exist with us, you will get a reset password email`
        })


    } catch (e) {
        console.log(e)
        res.status(400).send({
            status: true,
            message: e.message 
        })

    }


}

const completeForgetPassword = async (req, res) => {

    const {hash} = req.params
    const { newPassword, confirmNewPassword } = req.body

    // if (isEmpty(checkIfHashIsValid)) {

    //     throw new Error('Unable to perform this operation')
    // }
    if (newPassword != confirmNewPassword) {
        res.status(400).send({
            status: false,
            message: "Password does not match"
        })
    }else{


    try {
        const [err, checkIfHashIsValid] = await doSomeAsyncMagik(validateHash(hash))
        if (err) {
            throw new Error('Internal Server Error', 500)
        }

        //update the password
        const passwordHashed = await hashMyPassword(newPassword)
        let [err2, updatePasswordResponse] = await doSomeAsyncMagik(updatePassword(passwordHashed[1], checkIfHashIsValid[0].email))
        if (err2) {
            throw new Error('Internal Server Error', 500)
        }

        await deleteResetPasswordRecord(hash)

        res.status(200).send({
            status: true,
            message: `Password successfully updated`
        })
    }
    catch (err) {
        console.log("err: " , err)
        res.status(400).send({
            status: false,
            message: err || "Something went wrong"
        })

    }
    }

}

// const logout = () => {
//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvc2hib25AZ21haWwiLCJwaG9uZSI6IjA4MDg0MjU5MzcyIiwiaWQiOiI5NTVlMTgzZC05ZDgxLTQ4ODAtYjUwZi0wYjYxN2Y2MDYyZDAiLCJpYXQiOjE2NDQ0Mzk4NTcsImV4cCI6MTY0NDQ0MzQ1N30.ozOgwaUIezSbCPSo454QguZnpZ3GzaZDNikmccMgqqY"
//     jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
//         console.log(JSON.stringify(decoded)) // bar
//       });
// }

module.exports = {
    login,
    startForgetPassword,
    completeForgetPassword
     
}
