const express = require('express')
const router = express.Router()
const newsController = require("../controller/newsController")
const multer = require('multer');
const md5 = require('md5')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "../public/newsImages");
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    }
});
const uploads = multer({
    storage: storage
})

router.post('/create', uploads.array("image", 12), newsController.createNews);
router.get("/all", newsController.getAll),
router.get("/:id", newsController.getOne)
router.put("/image/:id", uploads.single("image", 12), newsController.updateImage);
router.put("/:id", newsController.updateContent);
router.delete("/:id", newsController.deleteOne)

module.exports = router 