import mongoose from "mongoose";
import { validateEmail } from "../../util/validation.js ";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: "Email address is required",
        validate: [validateEmail, "Please fill a valid email address"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
    }
},
{
    timestamps: true, // to add createdAt and updatedAt
}  
)

//hash password before saving to database
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//generate token 
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id.toString(),role : user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
    return token
}
// compare password
userSchema.methods.comparePassword = async function(password) {
    const user = this
    return await bcrypt.compare(password, user.password)
}

const model = mongoose.model("User", userSchema);

// find user buy username or email
userSchema.statics.findByCredentials = async (usernameOrEmail) => {
    const user = await model.findOne({$or: [{username: usernameOrEmail}, {email: usernameOrEmail}]})
    return user
}

// find user by id
userSchema.statics.getUserDocById = async (id) => {
    const user = await model.findById(id)
    return user
}



export default model ;