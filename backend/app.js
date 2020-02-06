const multer = require("multer");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
// const Post = require("./models/post");
//const gamesPerformances=require("./routes/v")
const performancesRoutes=require("./routes/performances");
const myResume= require("./routes/my-resume");
const postsRoutes=require("./routes/posts");
const userRoutes=require("./routes/user");
const visitorData=require("./routes/resume-visitor-data");
const businessCategory=require("./routes/business-category");
const businessItem=require("./routes/business-item");
const shoppingCart=require("./routes/shopping-cart");

const credentials={
  "MONGO_ATLAS_PW": "your Password",
    "JWT_KEY":"your key"
}
// console.log(process.env.MONGO_ATLAS_PW);
mongoose.connect("mongodb+srv://adrien:" + credentials.MONGO_ATLAS_PW + "@cluster0-lsnox.mongodb.net/my-node-database",{ useNewUrlParser: true })
// mongoose.connect("mongodb+srv://adrien:Sopiste34@cluster0-lsnox.mongodb.net/my-node-database?retryWrites=true")
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
// use bodyParser to parse all data send
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/my-resume-image",express.static(path.join("backend/my-resume-image")));

// app.use("/images",express.static(path.join("backend/images")));
// app.use("/profile-images",express.static(path.join("backend/profile-images")));
app.use("/my-resume-image",express.static(path.join("backend/my-resume-image")));
app.use("/images",express.static(path.join("backend/images")));
app.use("/profile-images",express.static(path.join("backend/profile-images")));
app.use("/", express.static(path.join(__dirname, "angular")));
app.use("/category-images",express.static(path.join("backend/category-images")));
app.use("/item-images",express.static(path.join("backend/item-images")));
// app.use(multer({dest:' backend/category-images'}).single('file'));

// before all requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );
  next();
});

 app.use("/api/posts",postsRoutes) // to make express aware of this roure
 app.use("/api/user",userRoutes);
 app.use("/api/performances",performancesRoutes);
 app.use("/api/myresume",myResume);
 app.use("/api/resumeVisitorData",visitorData);
 app.use("/api/businessCategory", businessCategory);
 app.use("/api/businessItem", businessItem);
 app.use("/api/shoppingCart", shoppingCart);

module.exports = app;
// + process.env.MONGO_ATLAS_PW +
