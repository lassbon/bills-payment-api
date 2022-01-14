

const axios = require('axios').default

const getWeatherHistoricalService =  (location, start_date, end_date) => {

    return axios.get(`${process.env.WEATHER_API_BASE_URL}/historical?access_key=${process.env.WEATHER_API_KEY}&query=${location}
    & historical_date_start=${start_date}&historical_date_end=${end_date}`)
}


const getCurrentWeather = (location) => {

    return axios.get(`${process.env.WEATHER_API_BASE_URL}/current?access_key=${process.env.WEATHER_API_KEY}&query=${location}`)
       
}



module.exports = {
    getWeatherHistoricalService,
    getCurrentWeather
}