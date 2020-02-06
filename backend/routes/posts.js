

// module.exports = router;
//---------------------------------------------------

const express = require("express");
const multer = require("multer");

const Post = require("../models/post");
const checkAuth=require("../middleware/check-auth"); // insert it in the route we
// want to protect
const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
     if(req.file){
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
      messageStatus:req.body.messageStatus
    });
    post.save().then(createdPost => {
      console.log(createdPost);
      res.status(201).json({
        message: "Post added successfully",
        post: {
          title: createdPost.title,
          content: createdPost.content,
          id: createdPost._id,
          imagePath: createdPost.imagePath,
          messageStatus: createdPost.messageStatus
        }
      });
    });
  } else{
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: '',
      messageStatus:req.body.messageStatus
    });
    post.save().then(createdPost => {
      console.log(createdPost);
      res.status(201).json({
        message: "Post added successfully",
        post: {
          title: createdPost.title,
          content: createdPost.content,
          id: createdPost._id,
          messageStatus: createdPost.messageStatus
        }
      });
    });
  }//else end

}
);

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    if(req.body.imagePath){
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      messageStatus: req.body.messageStatus
    });
    // console.log(post);
    Post.updateOne({ _id: req.params.id }, post).then(result => {

      // res.status(200).json({ message: "Update successful!" });
      Post.findById(req.body.id).then(post=>{
        res.status(200).json({
          message: "Update successful!",
          post: post
        });
      });
    });
  } else{
    // let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
       imagePath:'',
      messageStatus: req.body.messageStatus
    });
    // console.log(post);
    Post.updateOne({ _id: req.params.id }, post).then(result => {

      // res.status(200).json({ message: "Update successful!" });
      Post.findById(req.body.id).then(post=>{
        res.status(200).json({
          message: "Update successful!",
          post: post
        });
      });
    });
  }// end else
}
);

router.get("", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id",checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;


