const mongoose = require("mongoose")

const CategorySchema = mongoose.Schema(
    {
    name:{
        uz:{
            type: String,
            required: [true, "Category name is required in uzbek language"],
        },
        ru:{
            type: String,
            required: [true, "Category name is required in russian language"],
        },
        en:{
            type: String,
            required: [true, "Category name is required in english language"],
        },
    },
 },
 {
    timestamps: true,
 }
);

const Category = mongoose.model("cotegory", CategorySchema);
module.exports = Category
