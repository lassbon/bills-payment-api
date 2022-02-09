const refundServices = require('../services/refunds.services')

msgClass = require('../errors/error')

const createRefund = async (req, res) => {

    const { transaction, amount, customer_note, merchant_note } = req.body
try {
    const createRefundResponse = await refundServices.createRefund(req.body)

    if (createRefundResponse.data.status != true){
        throw new Error("Refund couldnt be completed at the time, please try again")
    }
    res.status(200).send({
        status: true,
        message: createRefundResponse.data.message,
        data: createRefundResponse.data.data
    })
}
catch(e){
    res.status(422).send({
        status: false,
        message: e.message || msgClass.GeneralError
    })
}

}
const getAllRefunds = async (req, res) => {
    const { reference_id, currency, from, to, perPage, page } = req.query

try{
    const responseGetRefunds= await refundServices.listRefunds(req.query)

    if (responseGetRefunds.data.status != true){
        throw new Error("Bad request")
    }
    res.status(200).send({
        status: true,
        message:responseGetRefunds.data.message,
        data: responseGetRefunds.data.data
    })
}
    catch(err){
        res.status(422).send({
            status: false,
            message: err.message || msgClass.GeneralError
        })
    }

}
const fetchAllRefunds = async (req, res) => {
    const { reference } = req.params

    try {
        const responseFetchRefunds = await refundServices.fecthRefunds(req.params)
        if (responseFetchRefunds.data.status != true){
            throw new Error("Bad Request")
        }
        res.status(200).send({
            status: true,
            message: responseFetchRefunds.data.message,
            data: responseFetchRefunds.data.data
        })
    }
    catch(err){
        res.send(422){
            status: false,
            message: err.message || msgClass.GeneralError
        }
    }

}

module.exports = {
    createRefund,
    getAllRefunds,
    fetchAllRefunds
}
