const mysqlConnection = require('../config/mysql')



const getUserDetailsByPhone =  async ( phone) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `select * from customers where phone=?`,
            values: [phone]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}


const insertOtp =   async (customer_id, otp) => {
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

const newUser =   async (email, firstname, surname, password, phone, customer_id) => {
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


const deleteOTP = async (otp, customerid) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `delete from _otps where otp=? and customer_id=?`,
            values: [otp, customerid]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}

const deleteOTPByCustomerID =  async (customerid) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `delete from _otps where customer_id=?`,
            values: [customerid]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}


const updateOTPStatus = async (customer_id) => {
   
    return new Promise((resolve, reject) => {

        mysqlConnection.query({
            sql: `update customers set isotpVerified=? where customer_id=?`,
            values: [1, customer_id]
        },
          (err, results, fields) => {
                if (err) {
                 reject(err)
                }
                resolve(results)
          })
    })
}

const updateInvoice =   (data) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `update invoice set invoice_playstach_ref=?, invoice_playstach_tx_ref=?,transaction_flutterwave_flw_ref=?,transaction__flutterwave_tx_ref=? where invoiceID=?`,
            values: [data.payment_flutterwave_flw_ref, data.payment_flutterwave_tx_ref, data.transaction_flutterwave_flw_ref, data.transaction__flutterwave_tx_ref, data.sn]
        }
         ,  (err, results, fields) => {
             if (err) {
               reject(err);
             }
             resolve(results);
         })
      })
 

}



module.exports = {
    newUser,
    checkUser,
    insertOtp,
    getUserDetails,
    getOtp,
    deleteOTP,
    updateOTPStatus,
    getUserDetailsByPhone,
    deleteOTPByCustomerID,
    updateInvoice
}