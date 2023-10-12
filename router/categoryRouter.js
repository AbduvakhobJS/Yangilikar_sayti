const mongosse = require('mongoose')
const express = require('express')
const router = express.Router()
const categoryController = require('../controller/categoryController')


router.post('/create', categoryController.createCategory)
router.get('all/', categoryController.getAll)
router.get('/:id', categoryController.getOne)
router.put('/:id', categoryController.updateOne)
router.delete('/:id', categoryController.delateOne)


module.exports = router