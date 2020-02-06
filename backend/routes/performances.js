const express = require("express");
const Performance = require("../models/performance");
const router = express.Router();
const checkAuth = require("../middleware/check-auth"); // insert it in the route we
//////////performance
router.post("/performance", (req, res, next) => {
  const perf = new Performance({
    timeElapsed: req.body.timeElapsed,
    numberOfMoves: req.body.numberOfMoves,
    rating: req.body.rating,
    email: req.body.email
  });
  perf.save()
    .then(result => {
      console.log("result",result);
      res.status(201).json({
        message: "performance saved",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.get("", (req, res, next) => {
  console.log("enter");
  Performance.find().then(documents => {
    if(documents){
      console.log("allperfs",documents)
    res.status(200).json({
      message: "Performances fetched successfully!",
      performances: documents
    });
  }else{
    res.status(404).json({ message: "Performance not found!" });
  }
  });
})
router.get("/performance/:id", (req, res, next) => {
  Performance.findById(req.params.id).then(performance => {
    if (performance) {
      res.status(200).json(performance);
    } else {
      res.status(404).json({ message: "Performance not found!" });
    }
  });
});

router.put(
  "/performance/:id",
  checkAuth,
  (req, res, next) => {
    const performance = new Performance({
      _id: req.body.id,
      timeElapsed: req.body.timeElapsed,
      numberOfMoves: req.body.numberOfMoves,
      rating: req.body.rating,
      email: req.body.email
    });
    // console.log(post);
    Performances.updateOne({_id: req.params.id }, performance).then(result => {

      // res.status(200).json({ message: "Update successful!" });
      Performance.findOne(req.body.id).then(performance=>{
        res.status(200).json({
          message: "Update successful!",
          performance: performance
        });
      });
    });
  });
///////////end performance

module.exports = router;
