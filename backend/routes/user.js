const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
// const Performance = require("../models/performance");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};
const credentials = {
  "MONGO_ATLAS_PW": "Sopiste34",
  "JWT_KEY": "secret_this_should_be_longer"
}
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
    cb(error, "backend/profile-images");
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
  "/signup",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    //url_token=url;
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user
        .save()
        .then(result => {
          console.log("result", result);
          res.status(201).json({
            message: "User created!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
  }
);

router.get("/:id", (req, res, next) => {
  User.findById(req.params.id).then(user => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  });
});

// ///////////end performance


// envoyer les donnees aux server from frontend
router.post("/login", (req, res, next) => {
  let fetchedUser;
  // find user with the sent email, result is an promise
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "user don't exist"
        });
      }
      fetchedUser = user;
      // we can't unhash the password, we have to find a way to compare the passwords
      // here we have found the user
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      // here token has been cretead(server)
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id, imagePreview: fetchedUser.profileImage, title: fetchedUser.title },
        credentials.JWT_KEY,
        { expiresIn: "60000h" }
      );
      //console.log(token);
      // retun token to the browser,client
      res.status(200).json({
        token: token,
        userData: fetchedUser,
        expiresIn: 3600     // just to show expiresIn to frontend
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});
module.exports = router;
