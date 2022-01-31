const mysqlConnection = require('../config/mysql')




const createNewTransaction =   async (data) => {
       return new Promise( (resolve, reject) => {
           mysqlConnection.query({
               sql: `INSERT into transactions(customer_id,amount,payment_channel,payment_status,transaction_reference,transaction_date) VALUES()(?,?,?,?,?,?)`,
               values: [data.customer_id, data.amount, data.payment_channel, data.payment_status, data.transaction_reference, data.transaction_date]
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
    createNewTransaction
}