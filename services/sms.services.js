require('dotenv').config()
const axios = require('axios').default
const fetch = require('node-fetch')
const { v4: uuidv4 } = require('uuid')
const formData = require('form-data')

const sendSMSOTP = (phone, otp) => {
    let templateCode = '7153792424'
    let bodyFormData = new formData()
    bodyFormData.append('token', process.env.SMS_TOKEN)
    bodyFormData.append('phone', phone)
    // bodyFormData.append('otp', otp)
    // bodyFormData.append('sender', "New Message");
    // bodyFormData.append('template_code', templateCode)
    // bodyFormData.append('ref_id', uuidv4())
    // console.log("going to send otp...", bodyFormData)
    return axios({
        method: "post",
        url: `${process.env.SMS_API_BASE_URL}/smsotp/send/`,
        headers: { "Content-Type": "multipart/form-data" },
        data: bodyFormData
      })
 
}


const sendVoiceOTP = (phone, otp) => {
    let bodyFormData = new formData()
    bodyFormData.append('token', process.env.SMS_TOKEN)
    bodyFormData.append('phone', phone)
    bodyFormData.append('otp', otp)
    bodyFormData.append('sender', process.env.SMS_SENDER);
    bodyFormData.append('ref_id', uuidv4())

    return axios({
        method: "post",
        url: `${process.env.SMS_API_BASE_URL}/voiceotp/send`,
        headers: { "Content-Type": "multipart/form-data" },
        data: bodyFormData
        
      })
}


const sendSMS = (toPhone, message) => {
    let type = 0 //enums exist in docs 
    let routing = 3 //enums exist in docs 
    let bodyFormData = new formData()
    bodyFormData.append('token', process.env.SMS_TOKEN)
    bodyFormData.append('sender', process.env.SMS_SENDER)
    bodyFormData.append('to', toPhone)
    bodyFormData.append('message', message)
    bodyFormData.append('type', type)
    bodyFormData.append('routing', routing)
    bodyFormData.append('ref_id', uuidv4())
    // bodyFormData.append('simserver_token', 'simserver-token');
    // bodyFormData.append('dlr_timeout', 'dlr-timeout');
    // bodyFormData.append('schedule', 'time-in-future');

    return fetch(`${process.env.SMS_API_BASE_URL}/sms/`, {
        body: bodyFormData,
        method: 'POST'
      })
}





module.exports = {
    sendSMSOTP,
    sendVoiceOTP,
    sendSMS
}