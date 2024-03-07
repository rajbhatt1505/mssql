import mongoose, {Schema} from "mongoose";
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,                     //trim() removes whitespace from both sides of a string
            index: true                     //for making it searchable
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        coverImage: {
            type: String, // cloudinary url
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema);