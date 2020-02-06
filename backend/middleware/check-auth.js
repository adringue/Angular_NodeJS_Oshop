// we will check if we are authenticated or not with help
// of token return  by the server
// a middleware is just a fction will get executed on the incoming requests
// module.exports=(req,res,next)=>{}
// will parse the request and then decide wether the request can continue or
// rejected.
// -you do have a token attached to your request, but that doesnt mean the token
// is valid
//- we have to validate thet token
const jwt = require("jsonwebtoken");
const credentials={
  "MONGO_ATLAS_PW": "Sopiste34",
    "JWT_KEY":"secret_this_should_be_longer"
}

module.exports = (req, res, next) => {
  try {
    // const token=req.query.auth
    // here we are extracting the token
    const token = req.headers.authorization.split(" ")[1]; // "bearer  token" , extracting token from the header
    jwt.verify(token, credentials.JWT_KEY);
    const decodedToken= jwt.verify(token, credentials.JWT_KEY);// we can access data stored in the token
    req.userData={email:decodedToken.email,userId:decodedToken.userId };// for accessing from outside, adding a field
    // every middleware running after the check-auth middelware will get this extra piece of information
    next(); // request will travel on
  } catch (error) {
    res.status(401).json({ message: "Auth failed2!" });
  }
};
