const mongoose = require('mongoose')

const TagSchema = mongoose.Schema({
    name: {
        uz: {
            type: String, 
            required: [true, "This tag's name is required in uzbek language"],
            unique: [true, "This tag name is duplicated"]
        },
        ru: {
            type: String, 
            required: [true, "This tag's name is required in russian language"],
            unique: [true, "This tag name is duplicated"]
        },
        en: {
            type: String, 
            required: [true, "This tag's name is required in english language"],
            unique: [true, "This tag name is duplicated"]
        },
        
    },
},
    {
    timestamps: true,
    }
);

const Tag = mongoose.model("tag", TagSchema)
module.exports = Tag;