const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')


router.post('/create', userController.createUser)
router.get('all/', userController.getAll)
router.get('/:id', userController.getOne)
router.put('/:id', userController.updateOne)
router.delete('/:id', userController.delateOne)


module.exports = router