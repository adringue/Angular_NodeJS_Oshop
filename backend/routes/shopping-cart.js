const express = require("express");
const bcrypt = require("bcryptjs");
const category = require("../models/categoryModel");
const item = require("../models/itemModel");
const orders = require("../models/ordersModel");
const ordr = require("../models/order");
const shoppingCart = require("../models/shoppingCartModel");
const shoppingCartItem = require("../models/shoppingCartItem");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const room = require("../models/test");
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
// item.find({},(err,respon)=>{
//   console.log('respon',respon);
// })
router.post(
  "/create-shopping-cart",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    addShoppingCart(res);
  }
);
// router.get("",(req, res, next) => {
//   category.find({}, function (err, category) {
//     if (err) {
//       return fails(res, err);
//     } else {
//       successGet(res, category);
//     }
//     // 200 application/json
//   });
// });
// router.delete("", (req, res, next) => {
//   category.remove({}, function (err, response) {
//     if (err) {
//       // An error occured
//       return fails(res, err);
//     } else {
//       success(res, response);
//     }
//   });
// });
// router.get("/:cartid", (req, res, next) => {
//   shoppingCart.findById(req.params.cartid, function (err, cart) {
//     if (err) {
//       // An error occured
//       return fails(res, err);
//     } else {
//       successGet(res, cart);
//     }
//     // 200, application/json
//   });
// });
//////delete cart from database/////////////
router.post("/remove-cart/:cartId", (req, res, next) => {
  ((x, y) => {
    removeAcart(x, y);
  })(res, req);
});
removeAcart = (res, req) => {
  shoppingCart.deleteOne({ _id: req.params.cartId }, (err, result) => {
    shoppingCartItem.remove({}, (err, result2) => {
      if (err) {
        console.log(err);
      } else {
        success(res, result);
      }
    });
  });
};
////////end delete cart from database//////
router.get("/myshoppingcart/:cartId", (req, res, next) => {
  shoppingCart.findById(req.params.cartId, (err, mycart) => {
    successMyCart(res, mycart);
  });
});
//////////////////remove Item From A cart///////////
router.post("/remove-from-cart/:cartId/:productId", (req, res, next) => {
  ((x, y) => {
    removeItemFromAcart(x, y);
  })(res, req);
});
////////////////////////////
removeItemFromAcart = (res, req) => {
  // console.log("boucleUpdate0");
  let myCart = shoppingCart
    .findById(req.params.cartId, function (err, cart) { })
    .then(res1 => {
      (res1_s => {
        console.log("boucleUpdate1");
        // console.log("cart:", res1);
        item
          .findById(req.params.productId, function (err, product) { })
          .then(res2 => {
            (res2_u => {
              // console.log("boucleUpdate2");
              // console.log("initial res2_u:", res2_u);
              shoppingCart.findById(res1_s._id, (err, result20) => {
                console.log("longueur:", result20.shoppingCartItems.length);
                ///// card empty
                if (result20.shoppingCartItems.length === 0) {
                  //   shoppingCartItem.create(
                  // {
                  //   myshoppingcart: res1_s._id,
                  //   product: res2_u,
                  //   quantity: 1
                  // },
                  const newItem = new shoppingCartItem({
                    myshoppingcart: res1_s._id,
                    product: res2_u,
                    quantity: 1
                  }).save((err, result) => {
                    console.log("result", result);
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("newitem:", newItem);
                      // console.log("cartItemCreate2", result);
                      console.log("verification7");
                      successCartItem(res, result);
                      // result.save();
                      shoppingCart.update(
                        { _id: res1_s._id },
                        { $push: { shoppingCartItems: result } },
                        (err, result70) => { }
                      );
                      //});
                      // shoppingCart.findById(res1_s._id, (err, result61) => successCartItem(res, result));
                      // successCartItem(res, result);
                    }
                  });
                } else {
                  //////////////////filter//////////
                  // console.log("res20:", result20.shoppingCartItems);
                  let containProduct = result20.shoppingCartItems.filter(
                    value => value.product.name === res2_u.name
                  );
                  console.log("longueur2:", containProduct.length);
                  if (containProduct.length === 0) {
                    console.log("elt not yet in cart!!!");
                    const newItem2 = new shoppingCartItem({
                      myshoppingcart: res1_s._id,
                      product: res2_u,
                      quantity: 1
                    }).save((err, result2) => {
                      if (err) {
                        console.log(err);
                      }
                      // shoppingCart.findById(res1_s._id, (err, result61) => successCartItem(res, result61));
                      // console.log("cartItemCreate2", result);
                      console.log("verification3");
                      // result.save();
                      shoppingCart.update(
                        { _id: res1_s._id },
                        { $push: { shoppingCartItems: result2 } },
                        (err, result70) => {
                          shoppingCart.findById(res1_s._id, (err, result61) =>
                            successCartItem(res, result70)
                          );
                        }
                      );
                      // successCartItem(res, result);
                    });
                  } else {
                    shoppingCart.findById(res1_s._id, (err, result62) => {
                      let selectedProduct = result62.shoppingCartItems.filter(
                        value => value.product.name === res2_u.name
                      );
                      //  shoppingCart.find({
                      //    shoppingCartItems:
                      //    {
                      //      $elemMatch:
                      //      {
                      //      "product.name": 'Banana'
                      //      }
                      //    }
                      //  },(err,redu)=>console.log("redu",redu));
                      shoppingCart.update(
                        {
                          _id: res1_s._id,
                          "shoppingCartItems.product.name": res2_u.name
                        },
                        { $inc: { "shoppingCartItems.$.quantity": -1 } },
                        function (err, resul) {
                          console.log("alull", resul);
                          shoppingCart.findById(res1_s._id, (err, result4) =>
                            successIncrementItem(res, result4)
                          );
                          // :selectedProduct[0].quantity+1
                        }
                      );
                      ////////////////////////////////// shoppingCartItem Beginn/////////////////////////////////////
                      // shoppingCartItem.update(
                      //   { _id: selectedProduct[0]._id },
                      //   { $set: { quantity: selectedProduct[0].quantity + 1 } },
                      //   function (err, result4) {
                      //     shoppingCartItem
                      //       .findById(selectedProduct[0]._id, function () { })
                      //       .then(result7 => {
                      //         // successIncrementItem(res, result7);
                      //         // console.log("cartItem:", result7);
                      //       });
                      //   }
                      // );
                      /////////////////////////
                      //////////////////////////////////////////////////////////shoppingCartItem enddd///////////////////////////////
                    });
                    // containProduct[0].product.quantity += 1;
                    console.log("product already in cart", containProduct[0]);
                    // successIncrementItem(res, containProduct[0]);
                  }
                }
                // }
              });
              ///////////////////////////////////////////////////////////////
            })(res2);
          });
      })(res1);
    });
};
/////////////remove Item from A cart end
////////////test room////////
// router.post("/add-a-room/:chairNumber/:roomColor", (req, res, next) => {
//   ((x, y) => {
//     addAroom(x, y);
//   })(res, req);
// });
// addAroom = (res, req) => {
//   new room({ color: req.params.roomColor, chairsNumber: Number(req.params.chairNumber) }).save((err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       success(res, result);
//     }
//   });
// }
// //////////end test room//////
// /////////////////////////test retrieve rooms/////////////
// router.get("/rooms", (req, res, next) => {
//   room.find((err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       successGet(res, result);
//     }
//   });
// });
/////////////////end test retrieve rooms//////////////
router.post("/delete-carts-and-shopping-cart-items", (req, res, next) => {
  shoppingCartItem.deleteMany({}, (err, resu) => {
    shoppingCart.deleteMany({}, (err, resu2) => {
      console.log(resu2);
      successDelete(res);
    });
  });
});
/////////////////////add Item To a cart///////////
router.post("/add-to-cart/:cartId/:productId", (req, res, next) => {
  ((x, y) => {
    addItemToAcart(x, y);
  })(res, req);
});
//////////////////// ///////////
addItemToAcart = (res, req) => {
  // console.log("boucleUpdate0");
  let myCart = shoppingCart
    .findById(req.params.cartId, function (err, cart) { })
    .then(res1 => {
      (res1_s => {
        console.log("boucleUpdate1");
        // console.log("cart:", res1);
        item
          .findById(req.params.productId, function (err, product) { })
          .then(res2 => {
            (res2_u => {
              // console.log("boucleUpdate2");
              // console.log("initial res2_u:", res2_u);
              shoppingCart.findById(res1_s._id, (err, result20) => {
                console.log("longueur:", result20.shoppingCartItems.length);
                ///// card empty
                if (result20.shoppingCartItems.length === 0) {
                  //   shoppingCartItem.create(
                  // {
                  //   myshoppingcart: res1_s._id,
                  //   product: res2_u,
                  //   quantity: 1
                  // },
                  const newItem = new shoppingCartItem({
                    myshoppingcart: res1_s._id,
                    product: res2_u,
                    quantity: 1
                  }).save((err, result) => {
                    console.log("result", result);
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("newitem:", newItem);
                      // console.log("cartItemCreate2", result);
                      console.log("verification7");
                      successCartItem(res, result);
                      // result.save();
                      shoppingCart.update(
                        { _id: res1_s._id },
                        { $push: { shoppingCartItems: result } },
                        (err, result70) => { }
                      );
                      //});
                      // shoppingCart.findById(res1_s._id, (err, result61) => successCartItem(res, result));
                      // successCartItem(res, result);
                    }
                  });
                } else {
                  //////////////////filter//////////
                  // console.log("res20:", result20.shoppingCartItems);
                  if (result20.shoppingCartItems) {
                    let containProduct = result20.shoppingCartItems.filter(
                      value => value.product.name === res2_u.name
                    );
                    console.log("longueur2:", containProduct.length);
                    if (containProduct.length === 0) {
                      console.log("elt not yet in cart!!!");
                      const newItem2 = new shoppingCartItem({
                        myshoppingcart: res1_s._id,
                        product: res2_u,
                        quantity: 1
                      }).save((err, result2) => {
                        if (err) {
                          console.log(err);
                        }
                        // shoppingCart.findById(res1_s._id, (err, result61) => successCartItem(res, result61));
                        // console.log("cartItemCreate2", result);
                        console.log("verification3");
                        // result.save();
                        shoppingCart.update(
                          { _id: res1_s._id },
                          { $push: { shoppingCartItems: result2 } },
                          (err, result70) => {
                            shoppingCart.findById(res1_s._id, (err, result61) =>
                              successCartItem(res, result70)
                            );
                          }
                        );
                        // successCartItem(res, result);
                      });
                    } else {
                      shoppingCart.findById(res1_s._id, (err, result62) => {
                        let selectedProduct = result62.shoppingCartItems.filter(
                          value => value.product.name === res2_u.name
                        );
                        //  shoppingCart.find({
                        //    shoppingCartItems:
                        //    {
                        //      $elemMatch:
                        //      {
                        //      "product.name": 'Banana'
                        //      }
                        //    }
                        //  },(err,redu)=>console.log("redu",redu));
                        shoppingCart.update(
                          {
                            _id: res1_s._id,
                            "shoppingCartItems.product.name": res2_u.name
                          },
                          { $inc: { "shoppingCartItems.$.quantity": 1 } },
                          function (err, resul) {
                            console.log("alull", resul);
                            shoppingCart.findById(res1_s._id, (err, result4) =>
                              successIncrementItem(res, result4)
                            );
                            // :selectedProduct[0].quantity+1
                          }
                        );
                        ////////////////////////////////// shoppingCartItem Beginn/////////////////////////////////////
                        // shoppingCartItem.update(
                        //   { _id: selectedProduct[0]._id },
                        //   { $set: { quantity: selectedProduct[0].quantity + 1 } },
                        //   function (err, result4) {
                        //     shoppingCartItem
                        //       .findById(selectedProduct[0]._id, function () { })
                        //       .then(result7 => {
                        //         // successIncrementItem(res, result7);
                        //         // console.log("cartItem:", result7);
                        //       });
                        //   }
                        // );
                        /////////////////////////
                        //////////////////////////////////////////////////////////shoppingCartItem enddd///////////////////////////////
                      });
                      // containProduct[0].product.quantity += 1;
                      console.log("product already in cart", containProduct[0]);
                      // successIncrementItem(res, containProduct[0]);
                    }
                  }
                }
                // }
              });
              ///////////////////////////////////////////////////////////////
            })(res2);
          });
      })(res1);
    });
};


/////////////////////Add Item to a cart end//////////
//////////////////////////////////save Orders///////////////////////
router.post("/save-order", multer({ storage: storage }).single("image2"), (req, res, next) => {
  saveOrder(req, res);
  console.log("zzzzzzzzzzzzzz");
}
);
saveOrder = (req1, res1) => {
  console.log("myorder", req1.body);
  console.log("res10", req1.body.items);
  const myorder = ordr.create({
    "userId": JSON.parse(req1.body.userId),
    "datePlace": JSON.parse(req1.body.datePlace),
    "shipping": JSON.parse(req1.body.shipping),
    "items": JSON.parse(req1.body.items)
    // "datePlace": 99999,
    // "shipping": {
    //   "name": "avion",
    //   "address": "yaounde",
    //   "address2": "yaounde3",
    //   "city": "douala"
    // },
    // "items": [
    //   {
    //     "product": {
    //       "name": "babane",
    //       "imageUrl": "frgttt",
    //       "quantity": 56,
    //       "totalPrice": 89
    //     }
    //   }
    // ]
  }, (err, result09) => {
    if (err) {
      console.log(err);
    } else {
      orders.find({ name: "ordersArray" }, (err, resul65) => {
        orders.findById(resul65[0]._id, (err, resulta) => {
          if (err) {
            console.log(err);
          } else {
            console.log("resulta", resulta);
            // resulta.orders.attibuteArray.push(result09);
            resulta.orders = resulta.orders.concat([result09]);
            resulta.save((err, result60) => {
              orders.findById(resul65[0]._id, (err, result50) => {
                console.log("resul50", result50);
                success(res1, { "ordersArray": result50, "addedOrder": result09 });
              });
            });
          }
          // orders.findOneAndUpdate({"id":req1.params.ordersId},{"$push":{"orders": result09}},
          //   (err, result70) => {
          //     // console.log("res99",result09);
          //    // orders.findById({id:req1.params.ordersId},(err, result3) => {
          //      console.log("res700",result70);
          //     //  result70.orders.push(result09);
          //       success(res1, result70);
          //    });
        });
      });
      // console.log("tat",resulta);
      // resulta.orders.push(result09);
      //   success(res1, resulta);
      // });
    }
    // orders.find((err2, result2) => {
    //    console.log("result2",result2[0]);
    //   result2[0].orders.push(result);
    //   orders.find((err, result3) => {
    //     success(res1, result3);
    //   });
    // });
  });
};
//////////////////////////////////end save Orders///////////////////
///////////////////  get all user Orders////////////////////
router.get("/get-user-orders/:userId", multer({ storage: storage }).single("ik"), (req, res, next) => {
  ordr.find({ userId: req.params.userId }, (err, result63) => {
    success(res, result63);
  })
});
////////////////////// end get all user Orders///////////
//////////////////create Orders////////////////
router.post(
  "/create-orders",
  multer({ storage: storage }).single("im"),
  (req, res, next) => {
    orders.create({ orders: [], name: "ordersArray" }, (err, result) => {
      success(res, result);
    })
    // new orders().save((err, result5) => {
    //   success(res, result5);
    //   console.log("wwwwwwwwwwwww");
    // });
  }
);
//////////////////get All Orders////////////
// orders.find({}, (err, results) => {
//   console.log("ordersoo", results);
// });
router.get("/get-all-orders", (req, res, next) => {
  orders.find({}, (err, results) => {
    success(res,results);
  });
});
//////////////////end get all Orders///////
////////////////end create Orders/////////////
addShoppingCart = res => {
  shoppingCart.create({ myshoppingCartItems: [] }, (err, data) => {
    if (err) {
      // myshoppingCartItems: [{myshoppingcart:"",product:null,quantity: null
      // if (err.name === "MongoError" && err.code === 11000) {
      //   //Duplicate category insertion
      //   return fails(res, "Cart already exist!");
      return fails(res, err);
    } else {
      successCart(res, data);
    }
    //res.end();
  });
};
successGet = (res, data) => {
  if (data === null || data[0] === null || data[0] === "undefined") {
    fails(res, "No item available");
  } else {
    res.json({
      success: true,
      message: "",
      data: data
    });
  }
};
success = (res, data) => {
  if (data === null) {
    fails(res, "");
  } else {
    res.json({
      success: true,
      message: "",
      data: data
    });
  }
};
successDelete = (res) => {
  res.json({
    success: true,
    message: "itemS deleted",
  });
}
successIncrementItem = (res, data) => {
  if (data === null) {
    fails(res, "");
  } else {
    // console.log(data);
    res.json({
      success: true,
      message: "Item has been incremented!",
      data: data
    });
  }
};
successCartItem = (res, data) => {
  if (data === null) {
    fails(res, "");
  } else {
    // console.log(data);
    res.json({
      success: true,
      message: "Item created and added to shopping cart!",
      data: data
    });
  }
};
successCart = (res, data) => {
  if (data === null) {
    fails(res, "");
  } else {
    res.json({
      success: true,
      message: "Shopping Cart created!",
      data: data
    });
  }
};
successMyCart = (res, data) => {
  if (data === null) {
    fails(res, "No shopping Cart!");
  } else {
    res.json({
      success: true,
      message: "My shopping cart!",
      data: data
    });
  }
};
fails = (res, err) => {
  return res.status(500).send({ success: false, message: err });
};
// createNewItem = (res, req) => {
//   // myCart.ShoppingCartItems.push(item.create({}));
//   shoppingCart.create({}, function (err, data) {
//     if (err) {
//       if (err.name === 'MongoError' && err.code === 11000) {
//         //Duplicate category insertion
//         return fails(res, 'Cart already exist!');
//       }
//       return fails(res, err);
//     } else {
//       success(res, data);
//     }
//     res.end();
//   });
// }
module.exports = router;
