// const CommentModel = require('../model/commentModel')


// //@description: Malumot yaratish
// //@api: /api/comment/create
// //@method: POST

// exports.createComment = async (req, res, next) => {
//     const {
//         username, message, news_ID
//     } = req.body
//     const result = CommentModel({
//         username: username,
//         message: message,
//         news_ID: news_ID
//     })
//     await result.save()
//     .then(() => {
//         res.json(result);
//     })
//     .catch((error) => {
//         res.json(error);
//     })
// }

// //@description: Malumot yaratish
// //@api: /api/comment/:id
// //@method: GET

// exports.filterComment = async (req, res, next) => {
//     await CommentModel.find({ news_ID: req.params.id }).exec((error, data) => {
//         if (error) throw error
//         else {
//             res.json(data)
//         }
//     })
// }