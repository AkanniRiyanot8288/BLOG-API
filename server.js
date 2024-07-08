const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouters");
const postRouter = require("./routes/postRouters");
const commentRouter = require("./routes/postRouters");
const categoryRouter = require("./routes/postRouters");





require("dotenv").config();
require("./Config/dbConnect");
//
const app = express();


//middleware
//routes
//-----User-----


app.use("/api/v1/user", userRouter);
app.use("/api/v1/user", postRouter);
app.use("/api/v1/user", commentRouter);
app.use("/api/v1/user", categoryRouter);






//Error handlers middleware
//Listen to server



const PORT = process.env.PORT || 9000
app.listen(PORT, console.log(`server is running on ${PORT}`));
