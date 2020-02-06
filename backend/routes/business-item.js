const express = require("express");
const bcrypt = require("bcryptjs");
const item = require("../models/itemModel");
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
    cb(error, "backend/item-images");
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
  "/add-new-item", checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    // upload(req, res, function (err) {
    //   let url = req.protocol + "://" + req.get("host");
    //   if (err) {
    //     // An error occured when uploading
    //     return fails(res, err);
    //   } else {
    // everything went fine
    let imageUrlJsonArr = [];
    let offerJsonArr = [];
    const price = Number(JSON.parse(req.body.price));

    console.log(req.body.price);

    addItem(req.body.categoryId, req.body.category, req.body.name, JSON.parse(req.body.banner), price, req.body.description, JSON.parse(req.body.offers), res);

    // addItem(req.body.categoryId,  imageUrlJsonArr,req.body.name,price, req.body.description, offerJsonArr, res);


    //console.log(JSON.parse(req.body.banner));

    // if (JSON.parse(req.body.offers) !== null || JSON.parse(req.body.offers) !== 'undefined' || JSON.parse(req.body.offers) !== '') {
    //   offerJsonArr = offerJsonArr.concat(JSON.parse(req.body.offers));
    // }
    // console.log(offerJsonArr);
    // if (JSON.parse(req.body.banner).length <= 0 || JSON.parse(req.body.banner) === null) {
    //   addItem(req.body.categoryId, req.body.name, imageUrlJsonArr, price, req.body.description, offerJsonArr, res);

    // }
    // else {
    //   for (let count = 0; count < JSON.parse(req.body.banner).length; count++) {
    //     imageUrlJsonArr.push({
    //       url: (JSON.parse(req.body.banner))[count].url
    //     });
    //   }
    //   addItem(req.body.categoryId, req.body.name, imageUrlJsonArr, price, req.body.description, offerJsonArr, res);
    // }
    // //}
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
//}
//);


router.get("", (req, res, next) => {
  item.find({}, function (err, item) {
    if (err) {
      return fails(res, err);
    } else {
      successGet(res, item);
    }
   // res.end();
    // 200 application/json
  });
});

router.delete("", (req, res, next) => {
  item.remove({}, function (err, response) {
    if (err) {
      // An error occured
      return fails(res, err);
    } else {
      success(res, response);
    }
  });
});
router.get("/:categoryid/:itemid", (req, res, next) => {
  item.find({ "categoryId": req.params.categoryid, "_id": req.params.itemid }, function (err, item) {
    if (err) {
      // An error occured
      return fails(res, err);
    } else {
      successGet(res, item);
    }
    // 200, application/json
  });
});
router.delete("/:categoryid/:itemId", multer({ storage: storage }).single(""), (req, res, next) => {

  console.log( req.params.categoryid);
  console.log( req.params.itemId);
  item.findOneAndRemove({ "categoryId": req.params.categoryid, "_id": req.params.itemId }, function (err, response) {
    if (err) {
      // An error occured
      return fails(res, err);
    } else {
      success(res, response);
    }
  });
});
router.post("/update/:categoryid/:itemId", checkAuth, multer({ storage: storage }).single(""), (req, res, next) => {
  // const categoryid = req.params.categoryid;
  // upload(req, res, function (err) {
  //   if (err) {
  //     // An error occured when uploading
  //     return fails(res, err);
  //   } else {
  // Everything went fine
  // let imageUrlJsonArr = [];
  // let offerJsonArr = [];
  // if (JSON.parse(req.body.offers) !== null || JSON.parse(req.body.offers) !== 'undefined' || JSON.parse(req.body.offers) !== '' || JSON.parse(req.body.offers).indexOf('undefined') !== -1) {
  //   offerJsonArr = offerJsonArr.concat(JSON.parse(req.body.offers));
  // }
  // if (JSON.parse(req.banner.length <= 0)) {
  //   updateItem(req.params.itemId, req.params.categoryId, req.body.name, JSON.parse(req.body.price), imageUrlJsonArr, req.body.description, offerJsonArr, res);
  // } else {
  //   for (count = 0; count < JSON.parse(req.body.offers).length; count++) {
  //     imageUrlJsonArr.push({
  //       url: JSON.parse(req.body.offers)[count].url
  //     });
  //   }

  console.log(req.params.itemId);
  console.log(req.params.categoryid);
  console.log(req.body.price);
  console.log(req.body.name);
  console.log(Number(JSON.parse(req.body.price)));
  console.log(JSON.parse(req.body.banner));
  console.log(req.body.description);
  console.log(JSON.parse(req.body.offers));

  updateItem(req.params.itemId, req.params.categoryid, req.body.category, req.body.name, req.body.price, JSON.parse(req.body.banner), req.body.description, JSON.parse(req.body.offers), res);
  // }
  //  }
  // });
});

// Usable functions

addItem = (categoryid, category, name, urls, price, description, offers, res) => {
  console.log("name",name);
  item.create(((urls.length > 0) ? { "categoryId": categoryid, "category": category, "name": name, "price": price, "banner": urls, "description": description, "offers": offers } : { "categoryId": categoryid, "category": category, "name": name, "price": price, "description": description, "offers": offers }),
    (err, data) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          //Duplicate category insertion
          return fails(res,'Item already exist!');
        }
        return fails(res, err);

      } else {

        success(res, data);
      }
     // res.end();
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
success = (res, data) => {
  if (data === null) {
    fails(res, "No category available")
  } else {
    res.json({
      success: true,
      message: "",
      data: data
    })
  }
}
fails = (res, err) => {
  return res.status(500).send({ success: false, message: err });
}
updateItem = (itemid, categoryid, category, name, price, urls, description, offers, res) => {
  item.findByIdAndUpdate(itemid, { $set: ((urls.length > 0) ? { "categoryId": categoryid, "category": category, "name": name, "price": price, "banner": urls, "description": description, "offers": offers } : { "categoryId": categoryid, "category": category, "name": name, "price": price, "description": description, "offers": offers }) },
    { new: true }, (err, category) => {
      if (err) {
        //An error occured
        return fails(res, err);
      } else {
        res.json({
          success: true,
          message: "",
          data: category
        })
      }
    });
}
// end usable functions

module.exports = router;
