const Tag = require("../model/TagModel");

//@description: Malumot yaratish
//@api: /api/tag/create
//@Method: POST
exports.createTag = async (req, res, next) => {
    const {
        nameuz, nameru, nameen
    } = req.body
    const result = new Tag.create({
        name: {
            uz: nameuz,
            ru: nameru,
            en: nameen
        }
    })
    await result.save()
    .then(() => {
        res.json(result)
    })
    .catch((error) => {
        res.json(error)
    })

};
//@description: Alohida malumotlarni olish
//@api: /api/tag/:id
//@Method: GET
exports.getOne = async (req, res, next) => {
    await Tag.findById({_id: req.params.id})
    .exec((error, data) => {
        if(error) {
            throw error
        }else {
            res.json(data)
        }
    })
};
//@description: Barcha malumotlarni olish
//@api: /api/tag/:id
//@Method: GET
exports.getAll = async (req, res, next) => {
    await Tag.find().sort({createdAt: -1}).exec((error, data) => {
        if(error) {
            throw error
        }else {
            res.json(data)
        }
    })
};
//@description: Malumotlarni tahrirlash
//@api: /api/tag/:id
//@Method: PUT
exports.updateOne = async (req, res, next) => {
    await Tag.findByIdAndUpdate({ _id: req.params.id }).exec(
        async (error, data) => {
            if (error) throw error;
            else{
                data.name.uz = nameuz;
                data.name.ru = nameru;
                data.name.en = nameen;
                
                await data
                .save()
                .then(() => {
                    res.json(data)
                })
                .catch((error) => {
                    res.json(error);
                });
            }
        }
    )
};
//@description: Malumotni ochirish
//@api: /api/tag/:id
//@Method: DELETE
exports.delateOne = async (req, res, next) => {
    await Tag.findByIdAndDelete({ _id: req.params.id }).exec((error, data) => {
        if(error) {
            throw error
        }else {
            res.status(200).json({
                message: "Tag is deleted successfully"
            })
        }
    })
}