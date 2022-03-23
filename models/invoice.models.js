const mysqlConnection = require('../config/mysql')


const createNewInvoice =   async (Customer_id, amount, due_date, has_invoice, invoice_number) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `Insert into invoiceTable(Customer_id, amount, due_date, has_invoice, invoice_number)values(?,?,?,?,?)`,
            values: [Customer_id, amount, due_date, has_invoice, invoice_number]
        }
         ,  (err, results, fields) => {
             if (err) {
               reject(err);
             }
             resolve(results);
         })
      })
 
 
 
 
}

const updateInvoice =   async (data) => {
    return new Promise( (resolve, reject) => {
        mysqlConnection.query({
            sql: `update invoiceTable set seller_name=?, buyer_name=?, item_1, amount=?, discount_kind=?? where invoiceID=?`,
            values: [data.seller_name, data.buyer_name, data.item_1, data.amount, data.discount_kind, data.invoiceID]
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
    createNewInvoice,
    updateInvoice
}