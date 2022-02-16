require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const displayRoutes = require('express-routemap')
const mySqlConnection = require('./config/mysql')
const userRoutes = require('./routes/users.routes')
const billPaymentRoutes = require('./routes/bills_payments.routes')
const paymentRoutes = require('./routes/payment.routes')
const resolveRoutes = require('./routes/resolve.routes')
// const AppRoutes = require('./routes')
const port = process.env.PORT

// parse application/json
/*Body-parser is the Node. js body parsing middleware. 
It is responsible for parsing the incoming request bodies in a middleware
before you handle it.
*/
app.use(bodyParser.json())


app.listen(port, () => {
    console.log(`i am listening on ${port}`)
    displayRoutes(app)
})

mySqlConnection.connect(err => {
    if (err) throw err.stack
    // connected!
    console.log('successfully connected: ' , mySqlConnection.threadId)
  })


app.use(morgan('combined'))
app.use(userRoutes)
app.use(billPaymentRoutes)
app.use(paymentRoutes)
app.use(resolveRoutes)
//app.use(AppRoutes)


app.get('/', (req, res) => {
    
    res.status(200).send({
        status: "error",
        message: "Welcome guys",
        data: []
    })

})

/*
    Error 404
*/
app.use((req, res, next) => {

        res.status(404).send({
            status: "error",
            message: "Seems you got lost. so sorry"
        })

})