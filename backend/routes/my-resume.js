const express = require("express");
const bcrypt = require("bcryptjs");
const myResumeModel = require("../models/resumedata");
// const Performance = require("../models/performance");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

//const url_token="";
const checkAuth = require("../middleware/check-auth"); // insert it in the route we
// want to protect
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "my-resume-image");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
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
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
    //   myResumeModel.find().then(data=>{data.deleteMany({});
    // });
      const resumeData = new myResumeModel({
        profileImagePath: url + "/my-resume-image/" + req.file.filename,
      });
      resumeData.save().then(createdResumeData => {
        console.log(createdResumeData);

        const token_resume = jwt.sign(
          { resumePictureId: createdResumeData._id },
         JWT_KEY,
          { expiresIn: "20h" });
        console.log(token_resume);
        res.status(201).json({
          message: "resumeData added successfully",
          resumeData: {
            id: createdResumeData._id,
            token_resume: token_resume,
            resumeImagePath: createdResumeData.profileImagePath
          }
        });
      });
    } else {
      const url = req.protocol + "://" + req.get("host");
      //req.userData.pictureURL=url;
      const resumeData = new myResumeModel({
        resumeImagePath: ''
      });
      resumeData.save().then(createdResumeData => {
        // console.log(createdResumeData);
        const token_resume = jwt.sign(
          { resumePictureId: createdResumeData._id },
          "secret_this_should_be_longer_two",
          { expiresIn: "20h" });

        res.status(201).json({
          message: "resumeImagePath added successfully",
          resumeData: {
            id: createdResumeData._id,
            token_resume: token_resume,
            resumeImagePath: createdResumeData.profileImagePath
          }
        });
      });
    }//else end

  }
);

router.get("",(req, res, next) =>{

  myResumeModel.find().then(documents => {
    //console.log(req.userData);

    res.status(200).json({
      message: "ResumeProfilePicture fetched successfully!",
      resumePictures: documents
    });
  });
});
module.exports = router;
