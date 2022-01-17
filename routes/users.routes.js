const express = require('express')
const router = express.Router()
const usersController  = require('../controllers/users.controllers')



router.post('/user/create', usersController.createNewUser)

router.get('/user/:id', usersController.getUser )

router.put('/user/:id', usersController.updateUser)




module.exports = router
