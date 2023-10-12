const mongoose = require('mongoose')
const AdvertisementSchema = mongoose.Schema({
    image: {
        type: String,
        required: [true, "Advertisement file is required"]
    }

},
    {
        timestamps: true
    }
)

const Advertisement = mongoose.model("advertisement", AdvertisementSchema)
module.exports = Advertisement;