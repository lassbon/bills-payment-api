require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const customerRoute = require('./routes/users.routes')
const weatherRoute = require('./routes/weather.routes')

const port = process.env.PORT

// parse application/json
app.use(bodyParser.json())
app.listen(port, () => {
    console.log(`i am listening on ${port}`)
})

app.use(morgan('combined'))
app.use(customerRoute)
app.use(weatherRoute)



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