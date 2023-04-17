const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const User = require("../schemas/user-schema")

const passportJWT = require("passport-jwt")
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

// set up some JWT authentication options for passport
let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"), // look for the Authorization request header
  secretOrKey: process.env.JWT_SECRET, // an arbitrary string used during encryption - see the .env file
}
// console.log(jwtOptions) // debug to make sure the secret from the .env file is loaded correctly

// define the method that is used by passport to verify the contents (i.e. the payload) of the JWT token
const jwtVerifyToken = async function (jwt_payload, next) {
  // console.log("JWT payload received", jwt_payload) // debugging

  // check if the token has expired
  const expirationDate = new Date(jwt_payload.exp * 1000) // convert from seconds to milliseconds
  if (expirationDate < new Date()) {
    // the token has expired
    return next(null, false, { message: "JWT token has expired." })
  }

  // try to find a matching user in our database

  // find this user in the database
  console.log(jwt_payload)
  const userId = new ObjectId(jwt_payload.id) // convert the string id to an ObjectId
  const user = await User.findOne({ _id: userId }).exec()
  if (user) {
    // we found the user... keep going
    next(null, user)
  } else {
    // we didn't find the user... fail!
    next(null, false, { message: "User not found" })
  }
}

// passport can work with many authentication systems... here we are setting some middleware code for using JWT that we'll pass to passport to use
const jwtStrategy = jwtOptions => {
  const strategy = new JwtStrategy(jwtOptions, jwtVerifyToken)
  return strategy
}

module.exports = jwtStrategy(jwtOptions, jwtVerifyToken)
