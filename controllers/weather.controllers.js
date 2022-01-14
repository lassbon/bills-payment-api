const Joi = require('Joi')
const weatherService = require('../services/weather.services')


const getCurrentWeather = (req, res) => {

    const weatherSchema = Joi.Object({
        location: Joi.string().required()

    })
    const { value, error } = Joi.validate(req.params, weatherSchema );

    if (error) {
        throw new Error(error.details[0].message)
    }

    const { location } = req.params

    weatherService.getCurrentWeather(location)
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
    
}


const getHistoricalWeather =  async (req, res) => {

    const { location, start_date, end_date } = req.params
    
    const result = await weatherService.getWeatherHistoricalService(location, start_date, end_date)
        //talkToWeatherAPI()
        
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

}



module.exports = {
    getCurrentWeather,
    getHistoricalWeather
}
