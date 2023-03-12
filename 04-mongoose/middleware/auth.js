const jwt = require("jsonwebtoken")
const config = require("config")

function auth ( req, res, next ) {
    const token = req.header("x-auth-token")
    if(!token) return res.status(401).send("Access deined")
    try{
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"))  //returns jwt payload
        req.user = decoded  // add a user property to the req object! pass it to the next middleware
        next() // pass to next miiddleware
    }
    catch(ex){
        res.status(400).send("Invalid token")
    }
}

module.exports = auth