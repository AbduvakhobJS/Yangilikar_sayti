const mongosse = require('mongoose')
const express = require('express')
const router = express.Router()
const tagController = require('../controller/tagController')


router.post('/create', tagController.createTag)
router.get('all/', tagController.getAll)
router.get('/:id', tagController.getOne)
router.put('/:id', tagController.updateOne)
router.delete('/:id', tagController.delateOne)


module.exports = router