const express = require('express')
const router = express.Router()
const advertisementController = require("../controller/advertisementController")
const multer = require('multer');
const md5 = require('md5')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback (null, "../public/advertisement");
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    }
});
const uploads = multer({
    storage: storage
})

router.post('/create', uploads.single("image"), advertisementController.createAuthor);
router.get("/all", advertisementController.getAll),
router.get("/:id", advertisementController.getOne)
router.put("/:id", uploads.single("image"), advertisementController.updateOne);
router.delete("/:id", advertisementController.getAll)

module.exports = router