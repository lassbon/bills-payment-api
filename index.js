require('dotenv').config()
const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const axios = require('axios').default
const customerRoute = require('./routes/customers')

const port = process.env.PORT

// parse application/json
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`i am listening on ${port}`)
})

app.use(morgan('combined'))
app.use(customerRoute)



app.get('/', (req, res) => {
    
    res.status(200).send({
        status: "error",
        message: "You might sink, if you come here again",
        data: []
    })

})



/*
    get all customer details
    route - /customers
    endpoint - localhost:8080/customer/:email/:xy1
    const email = req.params.x
    const phone = req.params.y

*/
app.get('/customer/:varibale1/:phone/:email', (req, res) => {

    let phone = req.params.phone
    let email = req.params.email
    console.log('phone: ', phone , 'email: ', email)
    let userDetails = customerDetails.filter((x) => x.id == req.params.varibale1 )

        res.status(200).send({
        status: "success",
        message: "Customer successfully fetched",
        data: userDetails || []
    })

})


/*
    Post
    Create a new customer
    route - /customers
    endpoint - localhost:8080/customers
*/
app.post('/customer', (req, res) => {

    console.log(JSON.stringify(req.body))


    // const firstname = req.body.firstname
    // const surname = req.body.surname
    // const phone = req.body.phone
    // const email = req.body.email
      // const { body } = req
    
    const { firstname, surname, phone, email } = req.body

    if (!firstname) {
      res.status(200).send({
            status: "error",
            message: "The Firstname fields is empty",
            data: {}
        })

    }
    if (!surname) {
          res.status(200).send({
             status: "error",
             message: "The Surname fields is empty",
             data: {}
         })
 
    }
    if (!phone) {
           res.status(200).send({
             status: "error",
             message: "The Phone fields is empty",
             data: {}
         })
 
    }
    if (!email) {
        return  res.status(200).send({
             status: "error",
             message: "The Email fields is empty",
             data: {}
         })
 
    }
    

    let newUser = {
        id: uuidv4(),
        firstname: firstname,
        surname: surname,
        phone: phone,
        email: email
    }
     

    customerDetails.push(newUser)

    res.status(201).send({
        status: "success",
        message: "Account successfully created",
        data: newUser || {}
    })

})


app.put('/customer/:id', (req, res) => {

    console.log(JSON.stringify(req.body))
    
    const { phone, email } = req.body
    const { id }  = req.params
    //sanitise
    if (!phone || !email || !id) {

        res.status(422).send({
            status: "success",
            message: "Bad Request",
            data: []
        })
    }

    for (let customer in customerDetails) {
        if (customerDetails[customer].id == id) {
            
            customerDetails[customer].phone = phone
            customerDetails[customer].email = email
        }
    }
    
    res.status(200).send({
        status: "success",
        message: "Account Updated",
        data: []
    })

})

app.patch('/customer/:id', (req, res) => {

    console.log(JSON.stringify(req.body))
    
    const { phone, email } = req.body
    const { id }  = req.params
    //sanitise
    if (!phone || !email || !id) {

        res.status(422).send({
            status: "success",
            message: "Bad Request",
            data: []
        })
    }

    for (let customer in customerDetails) {
        if (customerDetails[customer].id == id) {
            
            customerDetails[customer].phone = phone
            customerDetails[customer].email = email
        }
    }
    
    res.status(200).send({
        status: "success",
        message: "Account Updated",
        data: []
    })

})


app.delete('/customer/:id', (req, res) => {

    console.log(JSON.stringify(req.body))
    
    const { id }  = req.params
    //sanitise
    if (!id) {

        res.status(422).send({
            status: "success",
            message: "Bad Request",
            data: []
        })
    }

    for (let customer in customerDetails) {
        if (customerDetails[customer].id == id) {
            
           //delete customerDetails[customer]
            customerDetails.splice(customer, 1)
        }
    }

    
    res.status(200).send({
        status: "success",
        message: "Account Deleted",
        data: []
    })

})



app.get('/weather/current/:location', (req, res) => {

    const { location } = req.params
    
    axios.get(`${process.env.WEATHER_API_BASE_URL}/current?access_key=${process.env.WEATHER_API_KEY}&query=${location}`)
        .then((result) => {
            // console.log('here: ', result.data.error)
            if (result.data.error) {
                throw new Error('Sorry we domt have that location at the moment. Check later..')
            }
            res.status(200).send({
                status: "success",
                message: "Current weather successfully fetched",
                data: [result.data.location, result.data.current]
             
        
            })
        })
        .catch((error) => {

            res.status(400).send({
                status: "error",
                message: error.message,
                data: error
                
            
            })
        })


})



app.get('/weather/historical-within-range/:location/:start_date/:end_date', async (req, res) => {

    const { location, start_date, end_date } = req.params
    
    const result = await axios.get(`${process.env.WEATHER_API_BASE_URL}/historical?access_key=${process.env.WEATHER_API_KEY}&query=${location}
        & historical_date_start=${start_date}&historical_date_end=${end_date}`)
    
    if (result.data.error) {
        res.status(400).send({
            status: "error",
            message: result.data.error.info,
            data: []
            
        
        })
    }
    
    res.status(200).send({
        status: "sucess",
        message: 'Successfully fetched Data',
        data: result
        
    
    })

})





/*
    Error 404
*/
    app.use((req, res, next) => {

        res.status(404).send({
            status: "error",
            message: "404 Not found"
        })



    })