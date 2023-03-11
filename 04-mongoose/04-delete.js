const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/playground",{ useNewUrlParser: true })
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


async function deleteCourse(id){
    const course = await Course.deleteOne({_id: id})
    // const course = await Course.deleteMany({isPublished: false})
    // const course = await Course.findByIdAndRemove(id)
}
deleteCourse("640b3d7d66bf2c7aba9a6848")