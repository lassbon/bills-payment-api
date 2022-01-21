const mysqlConnection = require('../config/mysql')



const insertOtp =   (customer_id, otp) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query(
            {
                sql: `Insert into _otps(customer_id,otp)values(?,?)`,
                values: [customer_id, otp]
            },
            (err, results, fields) => {
             if (err) {
               reject(err);
             }
             resolve(results);
         })
      })
 
 
 
 
}


const getOtp =   (customer, otp) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query(
            {
                sql: `select * from _otps where customer_id =? and otp=?`,
                values: [customer, otp]
            },
            (err, results, fields) => {
             if (err) {
               reject(err);
             }
             resolve(results);
         })
      })
 
 
 
 
}



const newUser =   (email, firstname, surname, password, phone, customer_id) => {
       return new Promise( (resolve, reject) => {
           mysqlConnection.query({
               sql: `Insert into customers(email, firstname, surname, password, phone, customer_id)values(?,?,?,?,?,?)`,
               values: [email, firstname, surname, password, phone, customer_id]
           }
            ,  (err, results, fields) => {
                if (err) {
                  reject(err);
                }
                resolve(results);
            })
         })
    
    
    
    
}


const getUserDetails = async (customer_id) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from customers where email=?`,
            values: [email]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}


const checkUser = async (email, phone) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from customers where email=? or phone=?`,
            values: [email, phone]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}
 



module.exports = {
    newUser,
    checkUser,
    insertOtp,
    getUserDetails,
    getOtp
}