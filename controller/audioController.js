const AudioModel = require('../model/audioModel');
const fs = require('fs')
const path = require('path')

//@description: Malumot yaratish
//@api: /api/audio/create
//@method: POST
exports.createAuthor = async function (req, res, next) { 
    const {
        nameuz, nameru, nameen, category_ID
    } = req.body
    const result = new AudioModel({
        name: {
            uz: nameuz,
            ru: nameru,
            en: nameen,
        },
        category_ID: req.body.category_ID,
        image: req.file.filename,
    });
    await result
        .save()
        .then(() => {
            res.json(result);
        })
        .catch((error) => {
            res.json(error);
        });
    
};
//@description: Alohida malumotlarni olish
//@api: /api/audio/:id
//@Method: GET
exports.getOne = async (req, res, next) => {
    await AudioModel.findById({_id: req.params.id})
    .exec((error, data) => {
        if(error) {
            throw error
        }else {
            res.json(data)
        }
    })
};
//@description: Barcha malumotlarni olish
//@api: /api/audio/:id
//@Method: GET
exports.getAll = async (req, res, next) => {
    await AudioModel.find().sort({createdAt: -1}).exec((error, data) => {
        if(error) {
            throw error
        }else {
            res.json(data)
        }
    })
};

//@description: Barcha malumotlarni olish
//@api: /api/audio/:id
//@Method: PUT
exports.updateOne = async (req, res, next) => {
    //Eski faylni o'chirish
    await AudioModel.findById(req.params.id).exec((error, data) => {
        if(error) return error
        else{
            const filePath = path.join(__dirname,"../public/audio" + data.image)
            fs.unlink(filePath, function () {
                []
            })
        }
    })
//Yangi faylni yuklash
    const {
        nameuz, nameru, nameen, category_ID
    } = req.body
    await AudioModel.findById(req.params.id).exec( async (error, data) => {
        if(error) return error
        else{
            data.name.uz = nameuz
            data.name.ru = nameru
            data.name.en = nameen

            data.category_ID = req.body.category_ID
            data.image = req.file.filename
            await data
            .save()
            .then(() => {
                res.json(result);
            })
            .catch((error) => {
                res.json(error)
            })
        }
    })
}


//@description: Barcha malumotlarni olish
//@api: /api/author/:id
//@Method: PUT
exports.deleteOne = async (req, res, next) => {
    //Eski faylni o'chirish
    await Author.findById(req.params.id).exec( async (error, data) => {
        if(error) return error
        else{
            const filePath = path.join(__dirname,"../public/audio" + data.image)
            fs.unlink(filePath, function () {
                []
            })
            await Author.findByIdAndDelete(req.params.id)
            res.json({
                message: "Author deleted",
                data: []
            })
        }
    })
}