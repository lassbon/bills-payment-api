const express = require('express')
const router = express.Router()
const usersController  = require('../controllers/users.controllers')
const {authentication} = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')

/**
 * create a new user
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: This Creates a new user
 *     tags:
 *       - Customer
 *     produces:	 
 *       - application/json	 
 *     parameters:	 
 *       - name: firstname	 
 *         in: body	 
 *         required: true
 *       - name: lastname	 
 *         in: body	 
 *         required: true
 *       - name: email	 
 *         in: body	 
 *         required: true
 *       - name: phone	 
 *         in: body	 
 *         required: true 
 *       - name: password	 
 *         in: body	 
 *         required: true
 *         format: password
 *     responses:
 *        201:
 *          description: User successfully created
 *        422:
 *          Bad Request
*/
router.post('/user/create', usersController.createNewUser)


/**
 * verify otp 
 * @swagger
 * /user/verify-otp/{customer}/{email}/{otp}:
 *   get:
 *     summary: Verify users otp
 *     description: This verifies the users otp
 *     tags:
 *       - Customer
 *     parameters:
 *       - in: path
 *         name: customer
 *         required: true
 *         description: This is the customer id.
 *         schema:
 *           type: string
 *       - in: path
 *         name: email
 *         required: true
 *         description: This is the customer email.
 *         schema:
 *           type: string
 *       - in: path
 *         name: otp
 *         required: true
 *         description: This is the otp sent to the customer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched users details.
 *                     
*/
router.get('/user/verify-otp/:customer/:email/:otp', usersController.verifyOTP)



/**
 * Get users details
 * @swagger
 * /user:
 *   get:
 *     summary: Get users details
 *     description: This get the users details
 *     tags:
 *       - Customer
 *     responses:
 *       200:
 *         description: Successfully fetched users details.
 *                     
*/
router.get('/user', authentication, usersController.getUser)



/**
 * Update Users account
 * @swagger
 * /user:
 *   put:
 *     summary: update users details
 *     description: This updates the users details
 *     tags:
 *       - Customer
 *     responses:
 *       200:
 *         description: Password successfully updated
 *                     
*/
router.put('/user', authentication, authorization, usersController.updateUser)





/**
 * resend otp 
 * @swagger
 * /user/resend-otp/{phone}:
 *   get:
 *     summary: Resend users otp
 *     description: This resends the users otp
 *     tags:
 *       - Customer
 *     parameters:
 *       - in: path
 *         name: phone
 *         required: true
 *         description: This is the customer phone.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully reset users otp details.
 *                     
*/
router.get('/user/resend-otp/:phone', usersController.resendOtp)




module.exports = router
