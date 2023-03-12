const { User } = require("../models/users")
const mongoose = require("mongoose")
const express = require("express")
const bcrypt= require("bcrypt")
const Joi = require("joi")

const router = express.Router() 
router.post("/", async(req,res) => {
    const error = validate(req.body).error
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send("invalid emial or password")

    const isVaild = await bcrypt.compare(req.body.password, user.password)
    if(!isVaild) return res.status(400).send("invalid emial or password")
    res.send(true)
}) 

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(req)
}


module.exports = router