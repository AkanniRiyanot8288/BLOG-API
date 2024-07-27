const User = require("../Model/User/User");
const bcrypt = require("bcryptjs");
const appErr = require("../utils/appErr");
const generateToken = require("../utils/generateToken");


//Register
const register = async (req,res) =>{
    const {lastName, firstName, profilePhoto, email, password} = req.body;
  try{
    //check if email is exist
    const userFound = await User.findOne({ email });
    if (userFound) {
        return res.json({
            msg: "User already exists",
        });
    } 
    //hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create the user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    })
      res.json({
          status: "success",
          data: user,
      })
  } catch (error) {
      res.json(error.message);
  }
}

//Login
    const login = async (req,res, next) =>{
    const {email, password} = req.body;
    try {
    //check if email exists
    const userFound = await User.findOne({email});
    if(!userFound){
        return  next(appErr("Invalid credentials", 400));
    }
    
    //verify password
    const isPasswordMatched = await bcrypt.compare(
        password, 
        userFound.password
    );
    if(!isPasswordMatched){
        return next(appErr("Invalid credentials", 400));
    }
      res.json({
          status: "success",
          data: {
            firstName: userFound.firstName,
            email: userFound.email,
            token: generateToken(userFound._id)
          },
      });
  } catch (error) {
      res.json(error.message);
  }
};

// //All Users
const allUsers = async (req,res, next) =>{
  try{
      res.json({
          status: "success",
          data: "All User"
      })
  } catch (error) {
      next(appErr(error.message));
  }
};

//user profile (SingleUser)
const singleUser = async (req,res) =>{
    const user = await User.findById(req.userAuth);
  try{
      res.json({
          status: "success",
          data: User,
      })
  } catch (error) {
    res.json(error.message);
  }
};

//UpdateUser
const updateUser = async (req,res) =>{
  try{
      res.json({
          status: "success",
          data: "Update User"
      })
  } catch (error) {
      next(appErr(error.message));
  }
}

//DeleteUser
const deleteUser = async (req,res) =>{
  try{
      res.json({
          status: "success",
          data: "Delete User"
      })
  } catch (error) {
      res.json(error.message)
  }
};

const profilePhotoUploadCtrl = async (req, res, next) => {
    try {
        // 1. find the user to be update
        const userToUpdate = await User.findById(req.userAuth);
        // 2 check if user found 
        if(!userToUpdate) {
            return next(appErr("User not found", 403));
        }
        //3. check if user is blocked
        if(userToUpdate.isBlocked){
            return next(appErr("Action not allowed, your account is blocked", 403));
        }
        //4. check if a user is updating their photo
        if (req.file) {
            await User.findByIdAndUpdate(
                req.userAuth,
                {
                    $set: {
                        profilePhoto: req.file.path,
                    },
                },
                {
                    new: true,
                }
            );
            res.json({
                status: "success",
                data: "You have successfully updated your photo",
            });
        }   
    }   catch (error) {
        next(appErr(error.mess, 500));
    }
};


// who view user profile
const whoViewedMyProfileCtrl = async (req, res, next) => {
    try{
        // 1.  find the original user
        const user = await User.findById(req.params._id);
        // 2. find the user who viewed are found
        const userWhoViewed = await User.findById(req.userAuth);
        // 3. check if original and who viewed are found
        if(user && userWhoViewed) {
        // 4. check if userWhoViewed is already in the user viewer array
        const isUserAlreadyViewed = user.viewers.find(
            (viewer) => viewer.toString() === userWhoViewed._id.toJSON()
        );
        if (isUserAlreadyViewed) {
            return next(appErr("You already viewed this profile"));
        } else{

        // 5. push the userWhoViewed into the user's viewers array
        user.viewers.push(userWhoViewed._id);
        // 6. save the user
        await user.save();
        res.json({
            status: "sucess",
            msg: "You have sucessfully viewed the profile",
            data: "user.viewers"
        });
        }
        }
    } catch (error){
        next(error.message, 500)
    }
};

// Following
const followingCtrl = async (req, res, next) => {
    try{
        // 1. find the user to follow
        const userToFollow = await User.findById(req.params.id);
        // 2. find the user who is following
        const userWhoFollowed = await User.findById(req.userAuth);

        //3. check if user and userWhoFollowed are found 
        if (userToFollow && userWhoFollowed) {
        // 4.  check if userWhoFollowed is already in the user's followers array
        const isUserAlreadyFollowed = userToFollow.followers.find(
        (follower) => follower.toString() === userWhoFollowed._id.toString()
        );
        if (isUserAlreadyFollowed){
            return next(appErr("You already followed the user"));
        } else {
            //5. push userWhoFollowed in to the user's followers array
            userToFollow.followers.push(userWhoFollowed._id);
            // 6. push userToFollow to the useWhoFollowed following array
            userWhoFollowed.following.push(userToFollow._id);
            // 7. save
            await userWhoFollowed.save();
            await userToFollow.save();

            res.json({
                status: "successs",
                message: "You have successfully followed this user",
                followers: userToFollow.followers,
                following: userWhoFollowed.following,
            });
        }

        }
    } catch (error) {
        next(appErr(error.message));
    }
}
// Unfollow
const unFollowCtrl = async (req, res, next) => {
    try {
    // 1. find the user to unfollow
    const userToBeUnfollowed = await User.findById(req.params.id);
    // 2. find the user who is following
    const userWhoUnFollowed = await User.findById(req.userAuth);
    // 3. check if user and userWhoUnfollowed are found
    if (userToBeUnfollowed && userWhoUnFollowed) {
    // 4. Check if userWhoUnfollowed is already in the user's follower array
    const isUserAlreadyFollowed = userToBeUnfollowed.followers.find(
        (follower) => follower.toString() === userWhoUnFollowed._id.toString()
    );
    if(!isUserAlreadyFollowed) {
    return next(appErr("You have not followed this user"));
    }else {
    // 5. Remove userWhoUnfollowed from the user's followers array
    userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter(
        (follower) => follower.toString() !== userWhoUnFollowed._id.toString()
    );
    // 6. save the user
    await userToBeUnfollowed.save();

    // 7. Remove userToBeUnfollowed's following array
    userWhoUnFollowed.following =userToBeUnfollowed.following.filter(
        (following) =>
        following.toString() !== userWhoUnFollowed._id.toString()
    );
    // 8. Save the user
    await userWhoUnFollowed.save();
    res.json({
        status: "sucess",
        msg: "You have successfully unfollowed the user",
        usertobeunfollowed: userToBeUnfollowed.followers,
        userwhounfollowed: userWhoUnFollowed.following,
    });    
    }
    }
}catch (error){
    next(appErr(error.message));
}
};

// Blocked User
const blockedUserCtrl = async (req, res, next) => {
    try{
        // 1. find the user to block
        const userToBlocked = await User.findById(req.params.id);
        // 2. find the user who is Blocked
        const userWhoBlocked = await User.findById(req.userAuth);

        //3. check if user and userWhoBlocked are found 
        if (userToBlocked && userWhoBlocked) {
        // 4.  check if userWhoBlocked is already in the user's blocked array
        const isUserAlreadyBlocked = userWhoBlocked.blocked.find(
        (blocked) => blocked.toString() === userWhoBlocked._id.toString()
        );
        if (isUserAlreadyBlocked){
            return next(appErr("You already blocked the user"));
        } else {
            //5. push userToBlocked in to the user's followers array
            userWhoBlocked.blocked.push(userToBlocked._id);
        
            // 7. save
            await userWhoBlocked.save();
            
            res.json({
                status: "successs",
                message: "You have successfully blocked this user",
                blocked: userWhoBlocked.blocked,
               
            });
        }

        }
    } catch (error) {
        next(appErr(error.message));
    }
}

// UnBlock
const unBlockedUserCtrl = async (req, res, next) => {
    try {
    // 1. find the user to unblock
    const userToBeUnblocked = await User.findById(req.params.id);
    // 2. find the user who is unblock
    const userWhoUnBlocked = await User.findById(req.userAuth);
    // 3. check if user and userWhoUnblocked are found
    if (userToBeUnblocked && userWhoUnBlocked) {
    // 4. Check if userWhoUnblocked is already in the user's unblocked array
    const isUserAlreadyUnBlocked = userWhoUnBlocked.blocked.find(
        (unblocked) => unblocked.toString() === userToBeUnblocked._id.toString()
    );
    if(!isUserAlreadyUnBlocked) {
    return next(appErr("You have not unblocked this user"));
    }else {
    // 5. Remove userWhoUnblocked from the user's unblocked array
    userWhoUnBlocked.blocked = userWhoUnBlocked.blocked.filter(
        (unblocked) => unblocked.toString() !== userToBeUnblocked._id.toString()
    );
    // 6. save the user
    await userWhoUnBlocked.save();

    
    
    res.json({
        status: "sucess",
        msg: "You have successfully unblocked the user",
        userwhounblocked: userWhoUnBlocked.blocked,
    
    });    
    }
    }
}catch (error){
    next(appErr(error.message));
}
};


module.exports = {
  register,
  login,
  allUsers,
  singleUser,
  updateUser,
  deleteUser,
  profilePhotoUploadCtrl,
  whoViewedMyProfileCtrl,
  followingCtrl,
  unFollowCtrl,
  blockedUserCtrl,
  unBlockedUserCtrl,
}