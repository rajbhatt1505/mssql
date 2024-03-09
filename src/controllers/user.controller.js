import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
// import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images
    // upload them to cloudinary
    // create user object - create entry in db
    // check for user creation
    // return res


    const {fullName, email, username} = req.body
    //console.log("email: ", email);
    if (
        [fullName, email, username].some((field) => field?.trim() === "")      
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {                                       
        throw new ApiError(409, "User with email or username already exists")
    }
   
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    const user = await User.create({
        fullName,
        coverImage: coverImage?.url || "",          //if coverimage is there store it if not save it blank
        email, 
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id)
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )




const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})





const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullName, email} = req.body                          //you can add as many field as you want to update

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {new: true}
        
    )

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});


const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(400, "User ID not found");
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, deletedUser, "User deleted successfully")
    );
});


export {registerUser,getCurrentUser,updateAccountDetails,deleteUser};



