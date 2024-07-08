const express = require("express"); 
const categoryRouter = express.Router();

//----user----
categoryRouter.post("/register", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "User register successfully"
    })
  } catch (error) {
    res.json(error.message)
  }
})

categoryRouter.post("/login", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "login successfully"
    })
  } catch (error) {
    res.json(error.message)
  }
})
categoryRouter.get("/", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "single user"
    })
  } catch (error) {
    res.json(error.message)
  }
})
categoryRouter.get("/profile/:id", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "All users"
    })
  } catch (error) {
    res.json(error.message)
  }
})
categoryRouter.put("/profile/:id", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "single user"
    })
  } catch (error) {
    res.json(error.message)
  }
})
categoryRouter.delete("/profile/:Id", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "Single user"
    })
  } catch (error) {
    res.json(error.message)
  }
})

module.export = categoryRouter