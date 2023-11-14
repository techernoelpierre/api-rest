const express = require("express");
const connectDB = require("./config/db")
const cors = require("cors");
const dotenv= require("dotenv").config()
const port = 5000;

connectDB()

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./Routes/post.router"));

app.listen(port, () => console.log("the server is started on port " + port))