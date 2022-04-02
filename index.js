
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const displayRoutes = require('express-routemap')
const winston = require('winston')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
//const displayRoutes = require('express-routemap')
const mySqlConnection = require('./config/mysql')
const userRoutes = require('./routes/users.routes')
const billPaymentRoutes = require('./routes/bills_payments.routes')
const subaccountRoutes = require('./routes/subaccounts.routes')
const paymentRoutes = require('./routes/payment.routes')
const invoiceRoutes = require('./routes/invoice.routes')

const refundRoutes = require('./routes/refunds.routes')
const transferRoutes = require('./routes/transfer.routes')
const authRoutes = require('./routes/auth.routes')
// const AppRoutes = require('./routes')
const cors  = require('cors')
const { token } = require('morgan')
const port = process.env.PORT

// parse application/json
app.use(bodyParser.json());
const option = {
	exposedHeaders: ['Content-Length', 'token'],
}
app.use(cors(option))

app.listen(port, async () => {
//	console.log(`i am listening on ${port}`)
	//displayRoutes(app)
	
	mySqlConnection.connect(err => {
		logger.info({
			message: `Database could not connect: ${err}`
		});
		if (err) throw "Internal Server Error"
		// connected!
		//console.log('successfully connected: ', mySqlConnection.threadId)
	})


})


app.use(morgan('tiny'))
app.use(userRoutes)
app.use(billPaymentRoutes)
app.use(subaccountRoutes)
app.use(paymentRoutes)
app.use(invoiceRoutes)

//app.use(AppRoutes)


app.get('/', (req, res) => {
    
    res.status(200).send({
        status: false,
        message: "You are welcome guys",
        data: []
    })

})

app.use(refundRoutes)
app.use(transferRoutes)
app.use(authRoutes)
//app.use(AppRoutes)

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { service: 'user-service' },
	transports: [
	  //
	  // - Write all logs with importance level of `error` or less to `error.log`
	  // - Write all logs with importance level of `info` or less to `combined.log`
	  //
	  new winston.transports.File({ filename: 'error.log', level: 'error' }),
	  new winston.transports.File({ filename: 'combined.log' }),
	],
});

// if (process.env.NODE_ENV !== 'production') {
// 	logger.add(new winston.transports.Console({
// 	  format: winston.format.simple(),
// 	}));
//   }
  
/*
    Error 404
*/
app.use((req, res, next) => {
	res.status(404).send({
		status: 'error',
		message: 'Seems you got lost. so sorry',
	});
});


module.exports = app