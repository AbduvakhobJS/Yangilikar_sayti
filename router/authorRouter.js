const express = require('express')
const router = express.Router()
const authorController = require("../controller/authorController")
const multer = require('multer');
const md5 = require('md5')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback (null, "../public/uploads");
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    }
});
const uploads = multer({
    storage: storage
})

router.post('/create', uploads.single("image"), authorController.createAuthor);
router.get("/all", authorController.getAll),
router.get("/:id", authorController.getOne)
router.put("/:id", uploads.single("image"), authorController.updateOne);
router.delete("/:id", authorController.getAll)

module.exports = router