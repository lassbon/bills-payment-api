const mysqlConnection = require('../config/mysql')




const createNewTransaction = async (data) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query({
            sql: `INSERT into transactions(customer_id,amount,customer_unique_number,transaction_reference) VALUES(?,?,?,?)`,
            values: [data.customer_id, data.amount, data.customer_unique_number, data.transaction_reference]
        }
            , (err, results, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            })
    })
    // paystack
}


const updateTransaction =   async (data) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `update transactions set payment_flutterwave_flw_ref=?, payment_flutterwave_tx_ref=?,transaction_flutterwave_flw_ref=?,transaction__flutterwave_tx_ref=? where sn=?`,
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


const createNewCustomer = async(data) => {
    return new Promise( (resolve,reject) => {
        mysqlConnection.query({
            sql: `INSERT into customers(firstname,lastname,phone,email) VALUES(?,?,?,?)`,
            values: [data.first_name, data.last_name, data.email, data.phone]

        })
            , (err,results,fields) => {
                if(err) {
                    reject(err);
                }
                resolve(results);
            }
    })
}


const retrieveCustomer = (perPage, page) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query(
            {
                sql: `select * from customers where perPage= ? and page=? `,
                values: [perPage, page]
            },
            (err, results, fields) => {
                if (err) {
                  reject(err);
                }
                resolve(results);
        })

    })
}


const fetchingCustomer = async (email) => {
   
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


const updateCustomerStatus = async(data) => {
    return new Promise( (resolve,reject) => {
        mysqlConnection.query({
            sql: `INSERT into customers(firstname,lastname) VALUES(?,?)`,
            values: [data.first_name, data.last_name,]

        })
            , (err,results,fields) => {
                if(err) {
                    reject(err);
                }
                resolve(results);
            }
    })
}


const blackOrWhiteListing = async(data) => {
    return new Promise( (resolve,reject) => {
        mysqlConnection.query({
            sql: `INSERT into customers(email, risk_action) VALUES(?,?)`,
            values: [ data.email, data.risk_action]

        })
            , (err,results,fields) => {
                if(err) {
                    reject(err);
                }
                resolve(results);
            }
    })
}






module.exports = {
    createNewTransaction,
    updateTransaction,
    createNewCustomer,
    retrieveCustomer,
    fetchingCustomer,
    updateCustomerStatus,
    blackOrWhiteListing
}