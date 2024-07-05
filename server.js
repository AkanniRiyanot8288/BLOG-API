const express = require("express")
const app = express()

require("dotenv").config()
require("./Config/dbConnect")



//Routes
//------User route----------
//Register

app.post("/api/v1/user/register", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "User register successfully"
    })
  } catch (error) {
    res.json(error.message)
  }
})

app.post("/api/v1/user/login", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "login successfully"
    })
  } catch (error) {
    res.json(error.message)
  }
})

app.get("/api/v1/user/:id", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "single user"
    })
  } catch (error) {
    res.json(error.message)
  }
})

app.get("/api/v1/users", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "All users"
    })
  } catch (error) {
    res.json(error.message)
  }
})

app.put("/api/v1/user/:id", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "single user"
    })
  } catch (error) {
    res.json(error.message)
  }
})

app.put("/api/v1/users", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "All users"
    })
  } catch (error) {
    res.json(error.message)
  }
})

app.delete("/api/v1/user/:Id", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "Single user"
    })
  } catch (error) {
    res.json(error.message)
  }
})

app.delete("/api/v1/users", async (req,res)=>{
  try {
    res.json({
      status: "success",
      data: "All user"
    })
  } catch (error) {
    res.json(error.message)
  }
})










const PORT = process.env.PORT || 9000
app.listen(PORT, console.log(`server is running on ${PORT}`));
