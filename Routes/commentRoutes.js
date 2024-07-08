const express = require("express"); 
const commentRouter = express.Router();

//----user----
commentRouter.post("/register", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "User register successfully"
    })
  } catch (error) {
    res.json(error.message)
  }
})

postRouter.post("/login", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "login successfully"
    })
  } catch (error) {
    res.json(error.message)
  }
})
commentRouter.get("/", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "single user"
    })
  } catch (error) {
    res.json(error.message)
  }
})

commentRouter.get("/profile/:id", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "All users"
    })
  } catch (error) {
    res.json(error.message)
  }
})

comment.put("/profile/:id", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "single user"
    })
  } catch (error) {
    res.json(error.message)
  }
})
commentRouter.delete("/profile/:Id", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "Single user"
    })
  } catch (error) {
    res.json(error.message)
  }
})

module.export = commentRouter