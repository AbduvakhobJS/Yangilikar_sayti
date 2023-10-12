const AdvertisementModel = require('../model/advertisementModel');
const fs = require('fs')
const path = require('path')

//@description: Malumot yaratish
//@api: /api/advertisement/create
//@method: POST
exports.createAuthor = async function (req, res, next) {
    const result = new AdvertisementModel({
        
        image: req.file.filename
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
//@api: /api/advertisement/:id
//@Method: GET
exports.getOne = async (req, res, next) => {
    await AdvertisementModel.findById({_id: req.params.id})
    .exec((error, data) => {
        if(error) {
            throw error
        }else {
            res.json(data)
        }
    })
};
//@description: Barcha malumotlarni olish
//@api: /api/advertisement/:id
//@Method: GET
exports.getAll = async (req, res, next) => {
    await AdvertisementModel.find().sort({createdAt: -1}).exec((error, data) => {
        if(error) {
            throw error
        }else {
            res.json(data)
        }
    })
};

//@description: Barcha malumotlarni olish
//@api: /api/advertisement/:id
//@Method: PUT
exports.updateOne = async (req, res, next) => {
    //Eski faylni o'chirish
    await AdvertisementModel.findById(req.params.id).exec((error, data) => {
        if(error) return error
        else{
            const filePath = path.join(__dirname,"../public/advertisement" + data.image)
            fs.unlink(filePath, function () {
                []
            })
        }
    })
    //Yangi faylni yuklash
    await AdvertisementModel.findById(req.params.id).exec( async (error, data) => {
        if(error) return error
        else{
            data.username = req.body.username
            data.position = req.body.position
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
//@api: /api/advertisement/:id
//@Method: PUT
exports.deleteOne = async (req, res, next) => {
    //Eski faylni o'chirish
    await AdvertisementModel.findById(req.params.id).exec( async (error, data) => { 
        if(error) return error
        else{
            const filePath = path.join(__dirname,"../public/advertisement" + data.image)
            fs.unlink(filePath, function () {
                []
            })
            await AdvertisementModel.findByIdAndDelete(req.params.id)
            res.json({
                message: "Advertisement data is deleted",
                data: []
            })
        }
    })
}