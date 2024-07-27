const express = require ("express");
const { register, login, allUsers, singleUser, updateUser, deleteUser, profilePhotoUploadCtrl, whoViewedMyProfileCtrl, followingCtrl, unFollowCtrl, blockedUserCtrl, unBlockCtrl, unBlockedUserCtrl } = require("../Controller/userCtrl");
const isLogin = require("../middlewares/isLogin");
const multer = require("multer");
const storage = require("../Config/cloudinary");
const userRouter = express.Router()

//instance of multer
const upload = multer({storage})




userRouter.post("/register", register);
// login user
userRouter.post("/login", login);
// All users
userRouter.get("/", allUsers);

userRouter.get("/profile/:id", singleUser);
userRouter.put("/profile/:id", updateUser);
userRouter.delete("/profile/:id", deleteUser);

// Get/api/v1/users/profile-viewers/:id
userRouter.get("/profile-viewers/:id", isLogin, whoViewedMyProfileCtrl);
userRouter.get("/following/:id", isLogin, followingCtrl);

// Get/api/v1/users/following/:id
userRouter.get("/unfollowing/:id", isLogin, unFollowCtrl);
// Get/api/v1/users/following/:id
userRouter.get("/block/:id", isLogin, blockedUserCtrl);
// Get/api/v1/users/unblock/:id
userRouter.get("/unblocked/:id", isLogin, unBlockedUserCtrl);
// POST/api/v1/user/profile-photo-upload
userRouter.post("/profile-upload",
  isLogin,
  upload.single("profile"),
 profilePhotoUploadCtrl,
);


module.exports = userRouter;

