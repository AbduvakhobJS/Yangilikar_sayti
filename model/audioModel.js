const mongoose = require('mongoose')
const AudioSchema = mongoose.Schema({
    
    name: {
        uz: {
            type: String,
            required: [true, "Audio name is required in uzbek language"]
        },
        ru: {
            type: String,
            required: [true, "Audio name is required in russian language"]
        },
        en: {
            type: String,
            required: [true, "Audio name is required in english language"]
        }
    },
    image: {
        type: String,
        required: [true, "Audio file is required"]
    },
    category_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "category",
        required: [true, "Category is required"],
    },



},
    {
        timestamps: true,
    }
)
  
const Audio = mongoose.model("audio", AudioSchema)
module.exports = Audio