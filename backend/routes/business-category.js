const express = require("express");
const bcrypt = require("bcryptjs");
const category = require("../models/categoryModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};
const credentials = {
  MONGO_ATLAS_PW: "Sopiste34",
  JWT_KEY: "secret_this_should_be_longer"
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
    cb(error, "backend/category-images");
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
  "/create-category",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    // upload(req, res, function (err) {
     const url = req.protocol + "://" + req.get("host");
    //   if (err) {
    //     // An error occured when uploading
    //     return fails(res, err);
    //   } else {
        // everything went fine
        // console.log(req.protocol);
        //------
        if (req.body.banner === "") {
          addCategory(req.body.name, "", req.body.description, res);
        } else {
          //const categoryImage = url + "/category-images/" + req.file.filename;
          addCategory(req.body.name, req.body.banner, req.body.description, res);
        }
        //-------
        // console.log(req.file);
        // if(req.file==- null || req.file === 'undefined'){
        //   addCategory(req.body.name, '', req.body.description,res);
        // } else{
        //   addCategory(req.body.name, req.file.path,req.body.description,res);
        // }
      //}
    });

    //url_token=url;
    //   bcrypt.hash(req.body.password, 10).then(hash => {
    //     const user = new User({
    //       email: req.body.email,
    //       password: hash,
    //       profileImage: url + "/category-images/" + req.file.filename,
    //       title: req.body.title
    //     });
    //     user

    //   });
    //
 // }
//);

router.get("",(req, res, next) => {
  category.find({}, function (err, category) {
    if (err) {
      return fails(res, err);
    } else {
      successGet(res, category);
    }
    // 200 application/json
  });
});

router.delete("", (req, res, next) => {
  category.remove({}, function (err, response) {
    if (err) {
      // An error occured
      return fails(res, err);
    } else {
      success(res, response);
    }
  });
});
router.get("/:categoryid", (req, res, next) => {
  category.findById(req.params.categoryid, function (err, category) {
    if (err) {
      // An error occured
      return fails(res, err);
    } else {
      successGet(res, category);
    }
    // 200, application/json
  });
});
router.delete("/:categoryid", (req, res, next) => {
  category.findOneAndRemove(req.params.categoryid, function (err, response) {
    if (err) {
      // An error occured
      return fails(res, err);
    } else {
      success(res, response);
    }
  });
});
router.post("/update/:categoryid", (req, res, next) => {
  const categoryid = req.params.categoryid;
  // upload(req, res, function (err) {
  //   if (err) {
  //     // An error occured when uploading
  //     return fails(res, err);
  //   } else {
      // Everything went fine
      if (req.body.banner === '') {
        updateCategory(categoryid, req.body.name, '', req.body.description, res);
      } else {
        updateCategory(categoryid, req.body.name, req.body.banner, req.body.description, res);
      }
   // }
 // });
});
// Usable functions
addCategory = (name, url, description, res) => {
  category.create({ "name": name, "banner": url, "description": description }, function (err, data) {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        //Duplicate category insertion
        return fails(res, 'Category already exist!');
      }
      return fails(res, err);
    } else {
      success(res, data);
    }
   // res.end();
  })

}
updateCategory = (categoryid, name, url, description, res) => {
  category.findByIdAndUpdate(categoryid, { $set: ((url === '') ? { "name": name, "description": description } : { "name": name, "banner": url, "description": description }) },
    { new: true }, (err, category) => {
      if (err) {
        // An error occured
        return fails(res, err);
      } else {
        success(res, category);
      }
    });
}
successGet = (res, data) => {
  if (data === null || data[0] === null || data[0] === 'undefined') {
    fails(res, "No item available")
  } else {
    res.json({
      success: true,
      message: "",
      data: data
    });
  }
}
success=(res,data)=>{
  if(data===null){
    fails(res,"No category available")
  }else{
    res.json({
      success: true,
      message:"",
      data: data
    })
  }
}
fails=(res, err)=>{
  return res.status(500).send({success: false, message: err});
}
module.exports = router;
