
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
//const displayRoutes = require('express-routemap')
const mySqlConnection = require('./config/mysql')
const userRoutes = require('./routes/users.routes')
const billPaymentRoutes = require('./routes/bills_payments.routes')
const subaccountRoutes = require('./routes/subaccounts.routes')
const paymentRoutes = require('./routes/payment.routes')
const refundRoutes = require('./routes/refunds.routes')
const transferRoutes = require('./routes/transfer.routes')
const authRoutes = require('./routes/auth.routes')
// const AppRoutes = require('./routes')
const port = process.env.PORT

// parse application/json
app.use(bodyParser.json());

app.listen(port, () => {

    console.log(`i am listening on ${port}`)
    //displayRoutes(app)
})

mySqlConnection.connect(err => {
    if (err) throw err.stack
    // connected!
    console.log('successfully connected: ' , mySqlConnection.threadId)
  })


app.use(morgan('combined'))
app.use(userRoutes)
app.use(billPaymentRoutes)
app.use(subaccountRoutes)
app.use(paymentRoutes)
app.get('/', (req, res) => {
    
    res.status(200).send({
        status: "error",
        message: "You are welcome guys",
        data: []
    })

})

app.use(refundRoutes)
app.use(transferRoutes)
app.use(authRoutes)
//app.use(AppRoutes)


app.get('/', (req, res) => {
	res.status(200).send({
		status: 'error',
		message: 'Welcome guys',
		data: [],
	});
});

/*
    Error 404
*/
app.use((req, res, next) => {
	res.status(404).send({
		status: 'error',
		message: 'Seems you got lost. so sorry',
	});
});
