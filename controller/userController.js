const User = require("../model/userModel");

//@description: Royhatdan o'tish
//@api: /api/user/create
//@Method: POST
exports.createUser = async (req, res, next) => {
    const result = await User.create(req.body)
    await result.save()
    .then(() => {
        res.json(result)
    })
    .catch((error) => {
        res.json(error)
    })

};
//@description: Alohida malumotlarni olish
//@api: /api/user/:id
//@Method: GET
exports.getOne = async (req, res, next) => {
    await User.findById({_id: req.params.id})
    .exec((error, data) => {
        if(error) {
            throw error
        }else {
            res.json(data)
        }
    })
};
//@description: Barcha malumotlarni olish
//@api: /api/user/:id
//@Method: GET
exports.getAll = async (req, res, next) => {
    await User.find({
        role: {
            $eq: "moderator"
        }
    }).exec((error, data) => {
        if(error) {
            throw error
        }else {
            res.json(data)
        }
    })
};
//@description: Malumotlarni tahrirlash
//@api: /api/user/:id
//@Method: PUT
exports.updateOne = async (req, res, next) => {
    const { name, email, password } = req.body;
    await User.findByIdAndUpdate({ _id: req.params.id }).exec(
        async (error, data) => {
            if (error) throw error;
            else{
                data.name = name;
                data.email = email;
                data.password = password;
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
//@api: /api/user/:id
//@Method: DELETE
exports.delateOne = async (req, res, next) => {
    await User.findByIdAndDelete({ _id: req.params.id }).exec((error, data) => {
        if(error) {
            throw error
        }else {
            res.status(200).json({
                message: "User is deleted successfully"
            })
        }
    })
}