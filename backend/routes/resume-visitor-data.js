const express = require("express");
const bcrypt = require("bcryptjs");
const resumeVisitorDataModel = require("../models/resumevisitordata");
// const Performance = require("../models/performance");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");

//const url_token="";
const checkAuth = require("../middleware/check-auth"); // insert it in the route we
// want to protect


router.post(
  "",
  checkAuth,
  (req, res, next) => {

    const resumeData = new resumeVisitorDataModel({
      visitorEmail: req.body.email,
      visitDate: req.body.date

    });
    resumeData.save().then(createdResumeVisitorData => {
      console.log(createdResumeVisitorData);
      res.status(201).json({
        message: "resumeVisitorData added successfully",
        resumeVisitorData: {
          id: createdResumeVisitorData._id,
          visitorEmail: createdResumeVisitorData.email,
          visitDate: createdResumeVisitorData.date
        }
      });
    });
  }


);

router.get("", (req, res, next) => {
  resumeVisitorDataModel.find().then(documents => {
    res.status(200).json({
      message: "ResumeProfilePicture fetched successfully!",
      resumeVisitorsData: documents
    });
  });
});



module.exports = router;
