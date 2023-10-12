const mongoose = require('mongoose')

const AuthorSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Author name is required, Please enter name"]
    },
    image: [{
        type: String,
        required: [true, "Author name is required, Please enter name"]
    }],
    position: {
        type: String,
        required: [true, "Author name is required, Please enter name"]
    },
    postCount: {
        type: Number,
        default: 0
    }
},
 {
    timestamps: true,
 }
)

const Author = mongoose.model("author", AuthorSchema)
module.exports = Author