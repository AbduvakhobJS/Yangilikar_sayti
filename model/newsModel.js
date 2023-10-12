const mongoose = require('mongoose')
const NewsSchema = mongoose.Schema(
  {
    category_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "category",
        required: [true, "Category is required"],
    },
    tag_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "tag",
        required: [true, "tag is required"]
    },
    tag_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "Author",
        required: [true, "Author is required"]
    }, 
    title: {
        uz: {
            type: String,
            required: [true, "Title name is required in uzbek language"]
        },
        ru: {
            type: String,
            required: [true, "Title name is required in russian language"]
        },
        en: {
            type: String,
            required: [true, "Title name is required in english language"]
        },
    },
    description: {
        uz: {
            type: String,
            required: [true, "Description name is required in uzbek language"]
        },
        ru: {
            type: String,
            required: [true, "Description name is required in russian language"]
        },
        en: {
            type: String,
            required: [true, "Description name is required in english language"]
        },
    },


    quotation_mark: {
        uz: {
            type: String,
        },
        ru: {
            type: String,
        },
        en: {
            type: String,
        },
    },
    countView: {
        type: Number,
        default: 0
    },
    image: [
        {
            type: String, required: [true, "Image are required"]
        }
    ],
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    link: {
            facebook: {
                type:String,  required: [true, "Facebook link is required"]
            },
            twitter: {
                type:String,  required: [true, "Twitter link is required"]
            },
            Telegram: {
                type:String,  required: [true, "Telegram link is required"]
            },
            youtube: {
                type:String,  required: [true, "Youtube link is required"]
            }
    },
    rating: {
        type: String,
        default: 0
    }

    
 },
 {
    timestamps: true,
 }
);

const News = mongoose.model("new", NewsSchema)
module.exports = News