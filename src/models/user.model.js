import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new.mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        username: {
            type: String,
            unique: true,
            lowercase: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true
        },

        avatar: {
            type: String,
            default: ""
        },

        bio: {
            type: String,
            default: ""
        },

        skills: [
        {
            type: String
        }],

        github: {
            type: String,
            default: ""
        },

        linkedin: {
            type: String,
            default: ""
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next()
        this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.method.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role
        },

        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export default userSchema