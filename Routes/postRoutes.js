const express = require("express"); 
const postRouter = express.Router();

//----user----
postRouter.post("/register", async (req,res)=>{
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
postRouter.get("/", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "single user"
    })
  } catch (error) {
    res.json(error.message)
  }
})
postRouter.get("/profile/:id", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "All users"
    })
  } catch (error) {
    res.json(error.message)
  }
})
postRouter.put("/profile/:id", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "single user"
    })
  } catch (error) {
    res.json(error.message)
  }
})
postRouter.delete("/profile/:Id", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "Single user"
    })
  } catch (error) {
    res.json(error.message)
  }
})

module.exports = postRouter