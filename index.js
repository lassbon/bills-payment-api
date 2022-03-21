
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const displayRoutes = require('express-routemap')
const winston = require('winston')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mySqlConnection = require('./config/mysql')
const userRoutes = require('./routes/users.routes')
const billPaymentRoutes = require('./routes/bills_payments.routes')
const paymentRoutes = require('./routes/payment.routes')
const refundRoutes = require('./routes/refunds.routes')
const transferRoutes = require('./routes/transfer.routes')
const authRoutes = require('./routes/auth.routes')
const cors = require('cors')
// const AppRoutes = require('./routes')
const port = process.env.PORT
const logger = require('./logger')




// parse application/json
app.use(bodyParser.json());
app.use(cors())

app.listen(port, async() => {
	console.log('i am listening on ', port);
	logger.info('i am listening on %s ', port)
	// mySqlConnection.connect(err => {

	// 	if (err) throw err.stack
	// 	// connected!
	//    logger.info('successfully connected: %d ' , mySqlConnection.threadId)
	//   })

	try {
	 	 await mySqlConnection.authenticate()
		console.log('Connection has been established successfully.');
		displayRoutes(app)
	  } catch (error) {
		console.error('Unable to connect to the database:', error);
	  }

	//Database
	// mySqlConnection.authenticate()
	// .then(() => {
	// console.log('Connection has been established successfully.');
	//  displayRoutes(app); //show th eroutes in terminla
	// })
	// .catch(err => {
	// console.error('Unable to connect to the database:', err);
	// return {
	// 	error: true,
	// 	message: "Application failed to start"
	// }
	// });
  
})




app.use(morgan('tiny'))
app.use(userRoutes)
app.use(billPaymentRoutes)
app.use(paymentRoutes)
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



const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Bills Payment Server',
		version: '1.0.0',
		description: 'API Docs for cohorts',
		license: {
		  name: 'rosh',
		  url: '',
		},
		contact: {
		  name: '',
		  url: '',
		},
	  },
	  servers: [
		{
		  url: 'http://localhost:8101/api/v1',
		  description: 'Development server',
		},
		{
		  url: '',
		  description: 'Production server',
		},
	  ],
	
};
  
  const options = {
	 swaggerDefinition,
	 apis: [`./routes/*.js`],
  };
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


  
/*
    Error 404
*/
app.use((req, res, next) => {
	logger.info('Seems you got lost. so sorry') 
	res.status(404).send({
		status: 'error',
		message: 'Seems you got lost. so sorry',
	});
});
