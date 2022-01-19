const mysqlConnection = require('../config/mysql')


const newUser =   (email, firstname, surname, password, phone, customer_id) => {

    //  return mysqlConnection.promise().query(`Insert into customers(email, firstname, surname, password, phone, customer_id)values('${email}','${firstname}','${surname}','${password}','${phone}','${customer_id}')`,
    //      (error, results, fields) => {
    //          if (error) {
    //              console.log("i am error: ", error)
    //              throw false
    //          }

    //          return true

    //      })
    
    
         return new Promise(function(resolve, reject) {
            mysqlConnection.query(`Insert into customers(email, firstname, surname, password, phone, customer_id)values('${email}','${firstname}','${surname}','${password}','${phone}','${customer_id}')`
            ,  (err, results, fields) => {
                // Call reject on error states,
                // call resolve with results
                if (err) {
                    return reject(err);
                }
                resolve(results);
            })
        })
    
    
}


module.exports = {
    newUser
}