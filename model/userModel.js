const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, " Username is required"],
        },
        email:{
            type: String,
            required: [true, "Email is required"],
            unique: [true, "This email in this database, Please rename again"],
        },
        passwords:{
            type: String,
            required: [true, "Password is required"],
        },
        role: {
            type: String,
            required: [true, "User's role is required"],
            enum: ["admin", "moderator"],
        },
        

},

    {
        timestamps: true,   
    }
)

const User = mongoose.model("user", UserSchema);
module.exports = User