const express = require('express')
const router = express.Router()



router.get('/admin/dashboard', async (req, res, next) => {
    res.render('./admin/dashboard.ejs', { layout: './admin/layout.ejs'})
})


module.exports = router