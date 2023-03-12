const {User, validate} = require("../models/users")
const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const router = express.Router() 
router.post("/", jsonParser, async(req,res) => {
    const error = validate(req.body).error
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send("user already registered")

    try{
        user = new User({
            name: req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        const result = await user.save()
        res.send (result)
    }
    catch(ex){
        res.send(ex)
    }
}) 

module.exports = router