const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/playground", { useNewUrlParser: true })
    .then(()=> {console.log("connected")})
    .catch((err)=> {console.log("not connected", err)})

const courseSchema = new mongoose.Schema({
    name: String, 
    author: String, 
    tags: [String],
    date: {type:Date, default:Date.now},
    isPublished: Boolean
})
const Course = mongoose.model("Course", courseSchema)


async function getCourses (){
    // const result = await Course.find({name: "Mongoose"})
    const result = await Course.find()
                               .limit(2)
                               .sort({name:1})
                               .select({name:1, tags:1})
    console.log(result)
}

getCourses()