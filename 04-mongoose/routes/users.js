const {User, validate} = require("../models/users")
const mongoose = require("mongoose")
const express = require("express")
const bcrypt= require("bcrypt")
const auth = require("../middleware/auth")

const router = express.Router() 

router.get("/me", auth, async(req,res)=> {
    const user = await User.findById(req.user._id).select("-password")
    res.send(user)
})

router.post("/", async(req,res) => {
    const error = validate(req.body).error
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send("user already registered")

    user = new User({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    const result = await user.save()
    const token = user.generateAuthToken()
    res.header("x-auth-token", token).send (result)
   
}) 

module.exports = router