const mysqlConnection = require('../config/mysql')


const createNewRefund = async (data) => {

    return new Promise((resolve, reject) =>{
        mysqlConnection.query({
            sql: `INSERT into refunds (customer_id, amount, currency, customer_note, merchant_note) VALUES(?,?,?,?,?)`,
            values: [data.customer_id, data.amount, data.currency, data.customer_note, data,merchant_note]
        }
        ,  (err, results, fields) => {
            if (err){
                reject(err);
            }
            resolve(results);
        
        })
    })
}



module.exports = {
    createNewRefund
}