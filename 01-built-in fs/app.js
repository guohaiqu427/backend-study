const fs = require("fs")

fs.readdir("./", function(err, files) {
    if(err) console.log("err ")
    console.log(files)
})

const files = fs.readdirSync("./")
console.log(files)
