const expressEjsLayouts = require('express-ejs-layouts');
const { populate } = require('../model/newsModel');
const NewsModel = require('../model/newsModel')
const fs = require('fs')
const path = require('path')

//@description: Malumot yaratish
//@api: /api/news/create
//@method: POST
exports.createNews = async (req, res, next) => {
    const {
        category_ID,
        tag_ID,
        author_ID,
        titleuz,
        titleru,
        titleen,
        descriptionuz,
        descriptionru,
        descriptionen,
        quotation_markuz,
        quotation_markru,
        quotation_marken,
        facebook,
        twitter,
        telegram,
        youtube
    } = req.body;

    const urls = req.files
    const files = [];
    for (let item of urls) {
        let { filename } = item
        files.push(filename)
    }




    const result = new NewsModel({
        category_ID: category_ID,
        tag_ID: tag_ID,
        author_ID: author_ID,
        title: {
            uz: titleuz,
            ru: titleru,
            en: titleen,
        },
        description: {
            uz: descriptionuz,
            ru: descriptionru,
            en: descriptionen,
        },
        quotation_mark: {
            uz: quotation_markuz,
            ru: quotation_markru,
            en: quotation_marken,
        },
        link: {
            facebook: facebook,
            twitter: twitter,
            telegram: telegram,
            youtube: youtube
        },
        image: files
    })
    await result
        .save()
        .then(() => {
            res.json(result)
        })
        .catch((error) => {
            res.json(error)
        })
};

//@description: Alohida malumotlarni olish
//@api: /api/news/:id
//@Method: GET
exports.getOne = async (req, res, next) => {
    await NewsModel.findById({ _id: req.params.id })
        .populate(['category_ID'])
        .populate(['tag_ID'])
        .populate(['author_ID'])
        .exec((error, data) => {
            if (error) {
                throw error
            } else {
                res.json(data)
            }
        })
};
//@description: Barcha malumotlarni olish
//@api: /api/news/:id
//@Method: GET
exports.getAll = async (req, res, next) => {
    await NewsModel.find()
        .populate(['category_ID'])
        .populate(['tag_ID'])
        .populate(['author_ID'])
        .sort({ createdAt: -1 }).exec((error, data) => {
            if (error) {
                throw error
            } else {
                res.json(data)
            }
        })
};
//@description: Malumotdagi contentlar alohida tahrirlash uchun
//@api: /api/news/:id
//@method: PUT
exports.updateContent = async (req, res, next) => {
    const {

        titleuz,
        titleru,
        titleen,
        descriptionuz,
        descriptionru,
        descriptionen,
        quotation_markuz,
        quotation_markru,
        quotation_marken,
        facebook,
        twitter,
        telegram,
        youtube
    } = req.body;
    await NewsModel.findById(req.params.id).exec(async (err, data) => {
        if (error) throw error
        else {
            data.title.uz = titleuz
            data.title.ru = titleru
            data.title.en = titleen

            data.descriptionuz.uz = descriptionuz
            data.descriptionru.en = descriptionen
            data.descriptionen.ru = descriptionru

            data.quotation_mark.uz = quotation_markuz
            data.quotation_mark.ru = quotation_markru
            data.quotation_mark.en = quotation_marken

            data.facebook = facebook
            data.twitter = twitter
            data.telegram = telegram
            data.youtube = youtube
            await result
                .save()
                .then(() => {
                    res.json(result)
                })
                .catch((error) => {
                    res.json(error)
                })

        }
    })
}
//@description: Malumotdagi fillear bilan alohida tahrirlash uchun
//@api: /api/news/image/:id
//@method: PUT
exports.updateImage = async (req, res, next) => {
    //Eski fayllarni o'chirish
    await NewsModel.findById(req.params.id).exec((err, data) => {
        if (err) return err
        else {
            const isMatch = data.image // [aaa.jpg, bbbb.jpg, .....]
            for (let i = 0; i < isMatch.length; i++) {
                const filePath = path.join(path.dirname(__dirname), isMatch[i])
                fs.unlink(filePath, function () {
                    []
                })

            }

        }
    })






    //Yangi fayllarni qoshish

    const urls = req.files
    const files = [];
    for (let item of urls) {
        let { filename } = item
        files.push(filename)
    }


    await NewsModel.findById(req.params.id).exec(async (err, data) => {
        if (error) throw error
        else {

            data.image = urls

            await data
                .save()
                .then(() => {
                    res.json(data)
                })
                .catch((error) => {
                    res.json(error)
                })

        }
    })


}


//@description: Malumotni o'chirish
//@api: /api/news/:id
//@method: DELETE
exports.deleteOne = async (req, res, next) => {
    //Eski faylni o'chirish
    await NewsModel.findById(req.params.id).exec(async (error, data) => {
        if (error) return error
        else {
            const isMatch = data.image // [aaa.jpg, bbbb.jpg, .....]
            for (let i = 0; i < isMatch.length; i++) {
                const filePath = path.join(path.dirname(__dirname), isMatch[i])
                fs.unlink(filePath, function () {
                    []
                })
            }
            await NewsModel.findByIdAndDelete(req.params.id)
            res.json({
                message: "News deleted",
                data: []
            })
        }
    })
}
