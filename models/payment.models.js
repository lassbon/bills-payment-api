const mysqlConnection = require('../config/mysql')




const createNewTransaction =   async (data) => {
       return new Promise( (resolve, reject) => {
           mysqlConnection.query({
               sql: `INSERT into transactions(customer_id,amount,customer_unique_number,transaction_reference) VALUES()(?,?,?,?)`,
               values: [data.customer_id, data.amount, data.customer_unique_number, data.transaction_reference]
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