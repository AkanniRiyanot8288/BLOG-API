const express = require("express"); 
const userRouter = express.Router();

//----user----
userRouter.post("/register", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "User register successfully"
    })
  } catch (error) {
    res.json(error.message)
  }
})

userRouter.post("/login", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "login successfully"
    })
  } catch (error) {
    res.json(error.message)
  }
})
userRouter.get("/", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "single user"
    })
  } catch (error) {
    res.json(error.message)
  }
})
userRouter.get("/profile/:id", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "All users"
    })
  } catch (error) {
    res.json(error.message)
  }
})
userRouter.put("/profile/:id", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "single user"
    })
  } catch (error) {
    res.json(error.message)
  }
})
userRouter.delete("/profile/:Id", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "Single user"
    })
  } catch (error) {
    res.json(error.message)
  }
})

module.export = userRouter

