const express = require("express");
const app = express();
const port = 5000;
var dotenv = require("dotenv");
var cors = require("cors");

app.use(cors());
require("dotenv").config();

const postRouter = require("./routes/postRoute");
const commentRouter = require("./routes/commentRoute");
const userRouter = require("./routes/userRoute");

app.use(express.json());
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const connectToDb = require("./config/db");
connectToDb();
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API service running ",
  });
});
