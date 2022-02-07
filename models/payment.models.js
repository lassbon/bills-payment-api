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




module.exports = {
    createNewTransaction,
    updateTransaction
}