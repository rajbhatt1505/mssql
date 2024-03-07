

import { Router } from "express";
import { 
    registerUser, 
    getCurrentUser,  
    updateAccountDetails,
    deleteUser
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post( 
    upload.fields([               //to upload files
        {
            name: "coverImage",
            maxCount: 1           //how many files to upload
        }
    ]),
    registerUser
    )

router.route("/current-user").get(getCurrentUser)
router.route("/update-account").patch(updateAccountDetails)
router.route("/update-account").delete(deleteUser)

export default router