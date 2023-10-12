const express = require('express')
const router = express.Router()
const audioController = require("../controller/audioController")
const multer = require('multer');
const md5 = require('md5')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback (null, "../public/audio");
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    }
});
const uploads = multer({
    storage: storage
})

router.post('/create', uploads.single("image"), audioController.createAuthor);
router.get("/all", audioController.getAll),
router.get("/:id", audioController.getOne)
router.put("/:id", uploads.single("image"), audioController.updateOne);
router.delete("/:id", audioController.getAll)

module.exports = router