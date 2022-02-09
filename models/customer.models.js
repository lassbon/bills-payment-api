const mysqlConnection = require('../config/mysql')




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
            values: [ data.email]

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
    createNewCustomer,
    retrieveCustomer,
    fetchingCustomer,
    updateCustomerStatus,
    blackOrWhiteListing
}