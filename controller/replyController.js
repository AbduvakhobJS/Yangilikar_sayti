// const ReplyModel = require('../model/replyModel')


// //@description: Malumot yaratish
// //@api: /api/comment/create
// //Method: POST

// exports.createReply = async (req, res, next) => {
//     const {
//         username, message, comment_ID
//     } = req.body
//     const result = ReplyModel({
//         username: username,
//         message: message,
//         comment_ID: comment_ID
//     })
//     await result.save()
//         .then(() => {
//             res.json(result)
//         })
//         .catch((error) => {
//             res.json(error)
//         })
// }
// //@description: Malumot filterlash
// //@api: /api/reply/create
// //@Method: POST
// exports.filterReply = async (req, res, next) => {
//     await ReplyModel.find({ comment_ID: req.params.id }).exec((error, data) => {
//         if (error) throw error
//         else {
//             res.json(data)
//         }
//     })
// }