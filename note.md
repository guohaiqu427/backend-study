# Errors :
1.  ``` shell 
    Unsupported OP_QUERY command: insert. The client driver may require an upgrade
    reasoon:  mongoose version has become old or it has not been installed yet
    
    ```
    fix: npm i mongoose

2. module.exports = auth VS exports = auth

# Getting Started 

1. what is node: 
    is a runtime envrioment for executing js code, node 
    is not a programming language, (therefore should not be compared with other backend languages.)
    is chrome's v8 engine embeded in C++


2. how node works:  
    non-blocking and async
    a signel thread is used to with multiple request.

3. install node : 
    check node version : ``` node -v ```

    install node : nodejs.org 

4. execute a node js file in node envrionment. ``` node filename.js```


    ```js 
	function say (name) {
        console.log("hello", name)
    }
    say("vincent")

# Module System 

1. global object difference between v8 and node. <br>

    in brower: native methods and declared variables are all under the window object. 
	
	```javascript
	1. window.console.log()
	2. var a = "x" 
	```
                
    in node:  variables declared in a file only contained in that file, unless exported. 

	```javascript
	var a = "x"
	console.log(global.a) // undefined
	```

2. module: <br>
    in node, every file is a module. every node application has at least one module, the main module. 

    What properties does a module have? 
	```javascript 
	console.log(module)
	```

3. export: <br>
    how to export a variable or method, what does that mean for a module system in node? 

    how: 
	```javascript
	function log(message) {
		console.log(message)
	}
	module.exports.log = log	// add a property to module object's export property.
	```
        

4. load: <br>
    how to load a module? <br>
    use the "require" keyword <br>
    ``` javascript 
	const logger = require("./logger.js")
	```

5. what is a module wrapper function? <br>
    when node exectue a file, it wraps the code in an IIFE, that IIFE is a module wrapper function.<br>

    in the IIFE, there are a few useful arguments passed in: <br>
    - exports
    - require
    - module
    - __filename
    - __dirname
	
	```javascript
    (function(exports, require, module, __filename, __dirname){
        the module ...
    })()
	```

6. built-in module - path module
	```javascript
    const path = require("path")
    const pathObj = path.parse(__filename)
    console.log(pathObj)
	```
	``` shell
    
	{
        root: '/',
        dir: '/Users/vincent/Documents/GitHub/node/backend/my-express',
        base: 'app.js',
        ext: '.js',
        name: 'app'
    }
	```

7. built-in module - os module
	```javascript
    const os = require("os")

    const totalMemory = os.totalmem()
    const freeMemory = os.freemem()

    console.log(totalMemory, freeMemory )
	```
	```shell
   17179869184 4901146624
	```

8. built-in module - fs module

    all the methods in the fs module has a sync and async variant.  <br>
    always use the async one, reason: node is async non-blocking <br>
	
	```javascript
    const fs = require("fs")
     
    // sync: 
    const files = fs.readdirSync("./")
    console.log(files)
     // ==> [ 'app.js', 'node.md' ]


    // async: 
    for all the async method, take a fn as the last argument, 
    the last function(callback) is called when async is finished. 

    fs.readdir("./", function(err, files) {
        if(err) console.log("err ")
        console.log(files)  
    })
	```

    *err and files, only one will have value*

9. built-in module - events module <br>
    waht is a event? <br>
    event is the core function of node, singal something has happened<br>
    
    what is a EventEmitter ?<br>
    It is a class, to use it, make a instance of the Class. <br>
	
   	```javascript
	const EventEmitter = require("events")
    const emitter = new EventEmitter();
	```

    what is the most common method used from EventEmitter? <br>
	```javascript 
     // 1. emit: raise an event 
     emitter.emit("messageLoaded", { args... })

     // 2. on (=== addListener): register a listener
     emitter.on("messageLoaded", function(args){
     	console.log("listener called")
     })
	```

  	
	a. the order matters: on ==> emit

    b. pass arguments as object is better practise

    c. on and emit has to be registered on the same object instance

    d. when work with EventEmitter, extend the class 


   
    what is the common way of using EventEmitter?  <br>
    extend a new class out of EventEmitter. <br>
 	```javascript
    const EventEmitter = require("events")
    class Logger extends EventEmitter {
        log ( message ) {
            console.log(message)
            this.emit("messageLoaded", {a: 1})
        }
    }
    module.exports = Logger 
	```

	```javascript
    const Logger = require("./logger")
    const logger = new Logger() 

    logger.on("messageLoaded", (arg) => {
        console.log("listens emit from instance", arg)
    })

    logger.log ("calls emit function from instance")
	```

10. built-in module - http 

    1. what method is used to create a server? <br>

    ``` javascript
	const server = http.createServer()
	// servers created with http.createServer is a eventEmitter
	```
    

    2. create a server that listens on port 3000 <br>
    ``` javascript
	const server = http.createServer()
    server.listen(3000)
	```

    3. base on the created server, when request "/", send a string to the client. <br>
       base on the created server, when request "/api/courses", send an array. <br>
	```javascript
    const server = http.createServer((req,res)=> {
        if(req.url === "/" ) {
            res.write ("Hello world")
            res.end()
        }
        if(req.url === "/api/courses" ) {
            res.write (JSON.stringify([1,2,3]))
            res.end()
        }

    })
	```

# NPM : node package manager 

1. how to create a package.json
    ```bash 
	npm init -y
	```

2. check npm and node version 
	```bash
    npm -v 
    node -v 
	```

3. install a package gloablly 
	```bash
    npm i -g  packagename@version
	```

4. install nvm 
	```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
	```

    ``` bash 
	// .zshrc
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

5. some command nvm commands: 
    - list all node versions on this machine 
    - list all node versions available 
    - install a node version 
    - use a different version of node 
    - uninstall a version of node 
    - locate .bashrc .zshrc
    - open .zshrc

	``` bash
    nvm ls 
   	nvm ls-remote
    nvm install <version>
    nvm use <version>
    nvm uninstall <version>
    ls -a
    open -e .zshrc
	```

    
6. how require look for files <br>
    - core modules  then 
    - file or folder in the application  ("./") then  
    - node_modules

7. how to use a installed package <br>
	```javascript
    const _ = require("underscore")
    const result = _.contains([1,2,3],1)
    console.log(result)
	```

8. how to not monitor a file in git <br>
   in .gitignore file, specify path 

9. what does  **^1.10.0** and **~1.10.0** mean in package.json
    
    - Major, Minor, Patch
    
    - ^1.10.0 = 1.x <br>
    - ~1.10.0 = 1.10.x <br>
    - 1.10.0 = 1.10.0 <br>

10. check deps versions of the packages installed <br>
	```shell 
    npm list
    npm list --depth=0
	```

11. say that you have install a libray called mongoose, how to see the meta data of mongoose <br>
	```shell     
	npm view mongoose
    npm view mongoose dependencies 
    npm view mongoose versions
	```

12. how to find out the outdated packages in a project, and how to update them <br>
	```shell
    npm outdated
    npm update
	```

13. how to update packages to the latest version.<br>
	```shell
    sudo npm i -g npm-check-updates
    ncu -u 
    npm i
	```

14. how to install a dev dep. <br>
	```shell
    npm i -D <package>
	```
15. how to uninstall a package <br>
	```shell
    npm uninstall <package>
    npm un <package>
	```
16. install a npm version <br>
	```shell
    sudo npm i -g npm<version> 
	```


# Express 

1. what is RESTfful? <br>
    client talks to the server with http protocol <br>
    Representational State Transfer <br>
    server exposes resources to the client with a simple meaningful address along with operations. 

2. install express and create a server that listens on port 3000 <br>
	```shell
    npm i express
	```
	```javascript
    const express = require("express")
    const app = express()
    app.listen(3000, ()=> {
        console.log("listening on port 3000")
    })
	```

3. when port receive "/" send a string "hello world" to the client <br>
	```javascript
    app.get("/", (req, res)=> {
        res.send("hello world")
    })
	```

4. when the port receives "/api/courses", send an array of numbers<br>
	```javascript
    app.get("/api/courses", (req, res)=> {
        res.send([1,2,3])
    })
	```

5. install nodemon and use nodemon to run file <br>
	**latest version of nodemon has some issues. use 1.14.11**

	``` shell
    npm i -g nodemon
	```
   
6. export a ENVIRONMENT VARIABLE 
	```shell
    export port=5000
	```
    
7. get ENVIRONMENT VARIABLE port in node.js
	``` javascript
    const port = process.env.PORT || 3000
    app.listen(port, ()=> {
        console.log(`listening on port ${port}...`)
    })
	```
8. when the port receives "/api/course/1", how to get "1" <br>
	```javascript
    app.get("/api/courses/:id", (req, res)=> {
        res.send(req.params.id)
    })
	```

9. what is the difference between params and query string param? <br>
	```javascript
    param : required    :id             req.params.id            
    query : optional    ?sortBy=name    req.query
	```

10. create a get request and get by id request with the given data, if not found, return 404 <br>
    ``` javascript
	const courses = [
        { id: 1, name: "course1"},
        { id: 2, name: "course2"},
        { id: 3, name: "course3"},
    ]

    app.get("/api/courses", (req, res)=> {
        res.send(courses)
    })

    app.get("/api/courses/:id", (req, res)=> {
        const course = courses.find(item => item.id === parseInt(req.params.id))
        if(!course) return res.status(404).send("the course with given id is not found")
        res.send(course)
    })
	```

11. create a post request to "/api/courses" with the given data, then test it with postman <br>
    **hint**: enable parsing json object in the body of the quest: app.use(express.json())<br>
   	**by convention**, when post an object to server, should return that object in the body of response.  
	``` javascript
    const courses = [
        { id: 1, name: "course1"},
        { id: 2, name: "course2"},
        { id: 3, name: "course3"},
    ]

    app.use(express.json())

    app.post("/api/courses", (req, res)=> {
        const course = {
            id: courses.length + 1, 
            name: req.body.name
        }
        courses.push(course)
        res.send(course)
    })
	```

12. add simple input validation to a request. <br>
	explain why add input validation. <br>
	what is the status code for bad request. <br>
	``` javascript
    if(!req.body.name || req.body.name.length < 3) {
        res.status(400).send("Name is required and should be minimum 3 characters long")
    }
	```
    we should never trust what the user sends to the server. <br>
    400<br>

13. install Joi to validate<br>
	**the latest version of Joi has a different way of validate.**
    ``` shell 
	npm i joi
	``` 
	``` javascript
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema)

    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }
	```

14. create a put request to update course to "/api/courses" <br>
	explain the steps in a put request<br>

    1. find course, if not found ==> 404 : normally done in "/api/courses/:id" already
    2. validate course, if invalid ==> 400 : extract validation in a fn, also use this fn in post method
    3. update the course
    4. return to the client 

	```javascript
    app.put("/api/courses/:id", (req,res) => {
    const course = courses.find(item => item.id === parseInt(req.params.id))
    if(!course) return res.status(404).send("the course with given id is not found")
    
    const result = validateCourse(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return
    }

    course.name = req.body.name
    res.send(course)
    })

    function validateCourse(course) {
        const schema = {
            name: Joi.string().min(3).required()
        };
        return Joi.validate(course, schema)
    }
	```

15. create a delete request to  "/api/courses" <br>
	explain the setps in a delete request <br>

    1. find course, if not found  ==> 404 
    2. delete 
    3. return the same couse   

	```javascript
    app.delete("/api/courses/:id", (req,res) => {
        const course = courses.find(item => item.id === parseInt(req.params.id))
        if(!course) return res.status(404).send("the course with given id is not found")

        const index = courses.indexOf(course)
        courses.splice(index, 1) 

        res.send(course)

    })
	```


16. what is a middleware ? <br>

    middleware is a function that takes a request object and returns to another middleware function  or to the client.  <br>
    experss is nothing but a bunch of middleware functions.

17. how to create a custom middleware function?  <br>
    how to use a middleware function? <br>
    how to pass control to the next middleware function? <br>
	```javascript
    function log(req,res,next) {
        console.log("loggging")
        next()
    }
    app.use(log)
	```

18. built-in and third-party middlewares
	```javascript
    express.json()
    express.urlencoded()
    express.static()

    halmet()        // set various headers 
    morgain("tiny") // log requests
	```

19. set and use ENVIRONMENT VARIABLES
	```javascript
    process.env.NODE_ENV
    app.get('env')  // default is development
	```
	```shell
    export NODE_ENV=production 
	```

20. use third party library config to set configration and map ENVIRONMENT VARIABLES <br>

    - config 
        - production.json 
        - development.json 
        - default.json 
        - **custom-environment-variables.json** : **map ENVIRONMENT VARIABLES**

21. use third party library debug
	```shell
    npm i debug (3.1.0)
	export DEBUG=app:startup
    export DEBUG=app:db
    export DEBUG=app:db, app:startup
    export DEBUG=
    export DEBUG=app:*
	```
	```javascript
    const startupdebugger = require("debug")("app:startup")
    const dbDebugger = require("debug")("app:db")

    startupdebugger("startup")
    dbDebugger("connected to db")
	```


22. use third party library to render pug template to the client 
	```shell
    npm i pug (2.0.0)
	```
	```javascript
    app.set("view engine", "pug")   // set template engine
    app.set("view","./views") // opt, default

	res.render("index", {var1: 'h', var2: "2"}) 

	```
	file Structure: <br>
   	- views 
        - index.pug 
	
    
    

23. how to integrate a database(mongodb) 
    1. install a driver for that database: ```npm i mongodb```
    2. require driver 
    3. connect to mongodb 
    4. use its APIs

24. file structures: <on going>

    - middleware 
    - routes 
    - views 

25. exercise: express.Router() <br >

    - routes
        - home
        - courses 

	``` javascript
    conost express = require("express")
    const router= express.Router()

    const courses = [...]

    router.get("/", ()=> {})
    router.get("/:id", ()=> {})
    router.post("/", ()=> {})
    router.put("/:id", ()=> {})
    router.delete("/:id", ()=> {})

	--

    const courses = require("./routes/courses")
    const home = require("./routes/home")

    app.use("/", home)
    app.use("/api/courses", courses)
	```

# Mongoose

0. what is mongoose <br>
    mongoose is build on top of mongoDB<br>
    mongoDB is a Document DataBase<br>

1. install mongodb on mac <br>
    https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/<br>

    a. use brew to install <br>
        install home brew => brew.sh<br>

    b. brew install mongodb <br>
		```mongod --version```


    c. create a directory for mongodb to store data (different in mac os) <br>
		```bash sudo mkdir -p /data/db ``` &&
       ``` bash sudo chown -R `id -un` /data/db ```

    d. find out where data is stored:  <br>
        ```bash 
		ps -xa | grep mongod```
		
		- /usr/local/opt/mongodb-community/bin/mongod  ==> data <br>
        - --config /usr/local/etc/mongod.conf          ==> config file
		
    e. run mongodb as a macos service <br>

        brew services start mongodb-community
        brew services stop mongodb-community 
        brew services restart mongodb-community

    f. Connect and Use MongoDB : mongosh <br>

    	download mongoDB compass : give the port

2. install mongoose 5.0.1  / 7.0.1 <br>

    ```shell 
	npm i mongoose
	```

3. connect to mongodb server with mongoose <br>
	**only connect to mongodb once in the index.js.**
	```javascript
    const mongoose = require("mongoose")

    mongoose.connect("mongodb://localhost/playground")  
        .then(()=> { console.log( " connected" ) })
        .catch((err)=> {console.log(" could not connect ")})
    ```

4. what is a Schema ? <br>
    define the shape of document within a collectiion in MongoDB <br>
    it is specific to mongoose, not part of mongodb<br>
    it is a class<br>

5. define a schema 
	```javascript
    const courseSchema = new mongoose.Schema({
        name: String, 
        author: String, 
        tags: [String],
        date: {type:Date, default:Date.now},
        isPublished: Boolean
    })
	```

6. complie a schema into a model
	```javascript
    const Course = mongoose.model("Course", courseSchema)
                                   collection name, schema for that collection
	```

7. create a new instance with the Course class and SAVE it to mongodb database
	```javascript
    async function createCourse(){
        const course = new Course({
            name: "Mongoose", 
            author: "Guohai", 
            tags: ["Backend", "Node", "full-stack"],
            isPublished: false
        })
        const result = await course.save()
        console.log(result)
    }

    createCourse()
	```

8. Querying document 
	- GET all courses from the data base, <br>
   	- GET course with the name Mongoose, <br>
	- add query options to the result (limit to 2, sort by name, only select the name and isPublished property) <br>
	```javascript
    async function getCourses (){
        // const result = await Course.find()
                        .limit(2)
                        .sort({name:1})
                        .select({name:1, tags:1})

        const result = await Course.find({name: "Mongoose"})
        console.log(result)
    }
    getCourses()
	```

9. Comparison operator in mongodb 
	```shell
    eq      equal 
    ne      not equel 
    gt      greater than
    gte     greater than and equal to 
    lt      less than 
    lte     less than and equel to 
    in      in
    nin     not in 
	```    
	```javascript
    .find({price: {$gt: 10, $lte:20} })    // find items that price is greater than 10  and less than or equal to 20 
    .find({price: {$in: [ 10, 15, 20] } }) // find items that price is 10 , 15, or 20
	```

10. Logic operator in monogodb
	```javascript
    .find()
    .or([{author: "Guohai"},{isPublished: true}])
    .and([{author: "Tom"},{isPublished: false}])
	```

11. regular experssion in query
	```javascript
    .find({author: /regExp/})
	```

12. GET total item count from a query. <br>
    use the count method
	```javascript
    .find()
    .count()
	```

13. pagination 
	``` javascript
    const pageNumber = 1
    const pageSize = 10 

    .find()
    .skip((pageNumber - 1 ) * pageSize)
    .limit(pageSize)
	```

14. explain two ways of UPDATE in mongoose and give example <br>
    - query -> modifiy  approch 
    - update directly 

	```javascript
    async function updateCourse(id){
        const course = await Course.findById(id)
        if(!course) return 
        // course.isPublished = true, 
        // course.author = "Ioan"
        course.set({
            isPublished: true,
            author: "other"
        })
        const result = await course.save()
        console.log(result)
    }
    updateCourse("640b3c1fc14b4a7a9bf5af79")
	```
	```javascript
    async function updateCourse(id){
        const result = await Course.update({_id: id}, {     // or use : findByIdAndUpdate(id, {...})
            $set: {
                author: "Mosh", 
                isPublished: false
            }
        })
        console.log(result)
    }
    updateCourse("640b3c1fc14b4a7a9bf5af79")
	```

15. Delete document from the data base <br>
	```javascript
    const course = await Course.deleteOne({_id: id})
    const course = await Course.deleteMany({isPublished: false})
    const course = await Course.findByIdAndRemove(id)
	```

# Data validation 

1. Mongoose validation concepts 

    a. validation only meaningful in monogoose, mongodb does not care. <br>

    b.Joi is to validate data sent from the client via REST api is valid  <br>
      Mongoose built-in validators are used to make sure data send to the database is valid<br>

    c. CRUD operations in mongoose are async, when validation fails need to handle error same as other promises. <br>

2. built-in validators 
	
    required : 
	```javascript	
	name: {type: String, required: true}
                         required: function(){ return this.isPublished} // can not use arrow function here

    type: [String, Number, Boolean ....] 
    String. minlength: 
    String. maxlength: 
    String. match: 
    String. enum: ["a","b","c"] : match one of those strings
    String.lowercase
    String.uppercase
    String.trim

    common.get  : gets called when get data from the database
    common.set  : gets called when set data in the database
	```

3. custom validators 
	```javascript
    tags: {
        type: Array, 
        validate: {
            validator: function(v) {
                return v && v.length > 0
            }
            message: "error message: couse should have at least one tag"
        }
    }
	```

4. async custom validator <br>
	Todo: 


5. Error handing when validation fails (2 ways)

	```javascript
    const courseSchema = new mongoose.Schema ({
        name: { type: String, required: true },
        author: String
    })
    const Course = new mongoose.model("Course", courseSchema )
	```
	 method 1:

	```javascript
   
    async function createCourse(){
        const course = new Course({
            // error: not giving couse name
           author: "Guohai" 
        })

        try {
            const result = await course.save()
            console.log(result)
        }
        catch(ex){
            console.log(ex.message)
        }
	```

    method 2:
	```javascript
    async function createCourse(){
        ** mongoose design flaw. that course.validate return a promise VOID instead of boolean,
        ...
        try {
           const result =  await course.validate() // short

           course.validate((err)=> { // long 
            if(err) {
                //err handling logic
            }
           }) 

        }
        catch(ex){
            console.log(ex.message)
        }
    }
	```



6. Validation error display <br>
	```javascript
    catch(ex){
        for(field in ex.errors) {
            console.log(ex.errors[field].message)
        }
    }
	```


# Model Relation

1. Relate Documents Approches:
    1. Normalization   :   References   | CONSISTENCY
		```javascript
        let author : {
            name: "Vincent"
        }

        let course: {
            author : "id"
        }
		```
    2. DeNormalization :   Embeded Documents    | PERFORMANCE
		```javascript
        let course : {
            author: {
                name : "Vincent"
            }
        }
		```
    3. Hybrid   : Reference to entire, Embed a few 
		```javascript
        let author = {
            name : "Vincent", 
            job: "developer",
            from: "SH"
        }

        let course = {
            author: {
                id: "reference"     // REFFERENCE
                name: "Vincent"     // EMBED
            }
        }
		```

2. NORMALIZATION: reference documents : reference objectID and doc<br>
	
	```javascript
    const courseSchema = new mongoose.Schema({
        author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: ‘Author’ 
        }
    })
	```

3. NORMALIZATION: Poplute References <br>
    populate referenced data using poplulate() & include / exclude properties from referenced document

	```javascript
    const course = await Course
        .find()
        .poplulate("author", "name -id")
        .select("name author")
	```
4. DeNormalization: embed schema 
    ```javascript
    	//1. the document to be embeded 
        const authorSchema = new mongoose.Schema({
            name: String, 
            bio: String
        })
        const Author = mongoose.model("Author", authorSchema)

   	 	//2. embed the document
    	const courseSchema = new mongoose.Schema({
        	name: String,
        	author: authorSchema
   		})
    	const Course = mongooose.model ("Course", courseSchema)
   
    	//3. embed arry of documents: [document]
        const courseSchema = new mongoose.Schema({
            name: String
            authors: [authorSchema]
        }) 
        const Course = mongoose.model("Course", courseSchema)

	```

5. DeNormalization : update embeded document  / delete <br>
    **sub doc Can not be save on their own, save in context of its parent.**
    ```javascript
    //1. method1: query -> update
        const course = await Course.findById(courseId); 
        course.author.name = ‘New Name’; 
        course.save();

    //2. method2: update directly  / delete
    const course = await Course.update({_id: courseId},{
        $set: {                                         $unset {
            "author.name" : "john"                          "author" : ""
        }                                               }
    })

    //3. update the embeded array type document
        const course = await Course.findById(courseId); 
        course.author.push(author) 
        course.save();

    //4. remove and iteme from the array type document
        const course = await Course.findById(courseId); 
        const author =  course.authors.id(authorId) 
        author.remove()
        course.save()
	```

6. DeNormalization : create data with embeded documents <br>
	```javascript
    //1. object
    async function createCourse( name , author ) {
        const course = new Course({
            name, 
            author,
        })
    }

    createCourse("namePassed", new Author({name: "Vincnet"})) 

    //2. [ object ]
    async function createCourse( name , authors ) {
        const course = new Course({
            name, 
            authors,
        })
    }

    createCourse("namePassed", [new Author({name: "Vincnet"}), new Author({name: "Vincnet"})])
	``` 

7. NPM packages to deal with Model relations (2-phase commit & objectid)<br>
    1. Fawn <br>
        usage: deals with 2-phase commit, <br>

        reason: when perform CRUD opertions with embeded documents, we need to: <br>
            - perform CRUD operation on embeded document. <br>
            - perfrom CRUD operation on the parent document. 

            with 2-phase commit approach to ensure that: 
            only 2 tasks are both successful, then update the data base. 
        use: <br>
        ```shell    
		npm i fawn
		```
		```javascript

            try {
                await new Fawn.Task() 
                .task1()
                .task2() 
                .run()
            }
            catch (ex) { 
            // At this point, all operations are automatically rolled back 
            }
		```

    2. joi-objectid <br>
        usage: <br>
		validate user inputed objectid. <br>

        reason: mongodb does not care if the objectID is valid or not, it will query the document with the user provided id, if its not valid id, will throw error, therefore, we need to validate the use provided id. <br>

        use: <br>
        ```npm i joi-objectid```

			
		```javascript
        const Joi = require("joi")
       	Joi.objectId = require("joi-objectid")(Joi)

       	Joi.objectId().required()
		```

        implementation: <br>
            extract joi-objectid to global, so that the entire app could use it. 

# Authentication & Authorization 

/api/users  => POST register <br>
/api/logins => POST  login <br>

1. Authentication VS Authorization <br>
Authentication :  check if the user is who they claim they are <br>
Authorization: check if the user has the right to perfom such action <br>

2. create /api/users  => POST register
    **if input validation failss**

    - User Model :  <br>
        - Import <Joi Mongoose>
        - Schema 
        - Model 
        - Validate 
        - Export
    
    - Router <br>
        - Import 
        - Post
            - validate input  >  app.use(express.json()) VS bodyParser
                **can use both of them. However, since express.json() is now already built into express, it is wiser to use express.json() than the bodyParser.json().**
                **Joi's new version has different implementation**
            - validate existence
            - save: "if validation fails, does not save to data base"
        -Export

    - Index <br>
        - Import <mongoose, express,users>
        - Connect
        - Middleware
        - Listen 

    ``` javascript 
    const Joi = require("joi")
    const mongoose = require("mongoose")

    const userSchema = new mongoose.Schema({
        name: {
            type:String, 
            required: true,
            minlength: 5,
            maxlength: 50
        },
        email: {
            type:String, 
            required: true,
            minlength: 5,
            maxlength: 250,
            unique:true
        }, 
        password: {
            type:String, 
            required: true,
            minlength: 5,
            maxlength: 1024,
        }
    })

    const User = mongoose.model( "User", userSchema)

    function validateUser(user) {
        const schema = Joi.object({
            name: Joi.string().min(5).max(50).required(),
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(255).required()
        })
        console.log(user)
        return schema.validate(user)
    }

    exports.User = User 
    exports.validate = validateUser
    ```

    ``` javascript
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
    ```


    ```javascript 
    const mongoose = require("mongoose")
    const express = require("express")
    const users = require("./routes/users")
    const app= express()

    mongoose.connect("mongodb://127.0.0.1:27017/playground",{ useNewUrlParser: true })
        .then(()=> {console.log("connected")})
        .catch((err)=> {console.log("not connected", err)})

    app.use("/api/users", users)
    app.use(express.json())

    const port = process.env.PORT || 3000 
    app.listen(port, ()=> { console.log(`listening on port ${port}`) })
   
    ```

3. lodash
    npm i lodash
    _.pick(obj, [prop1, prop2, ....])

4. Hash password
    ```shell
    npm i bcrypt 1.0.3 / bcrypt@5.1.0
    ```
    ``` javascript
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    ```

5. Authentication  => POST login

    - Routes : auth.js 
        - validate input 
        - check existence 
        - compare password
        - return 

    ```javascript 
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
    ```

6. JSON WEBTOKEN 
    Store:  localstorage 
    usage:  when the login is successful, return JWT to the client,
            for the user to identify himself later for future api calls 
    jwt.io 
    {
        header: standard 
        payload: public properties of the user, this is the information fronend needs. 
        signature: generated on the server (created base on the content, and secret key )
    }

7. genreate JWT
    ```shell
    npm i  jsonwebtoken@8.1.1 / 9.0.1
    ```
    ```javascript
    const jwt = require("jsonwebtoken")
    const token = jwt.sign({payload}, "secretKey")
    res.send(token)
    ```

8. Store secret key with "config"
    1. install config
    2. map secret key 
    3. check secret key existence in index.js 
    4. get secret in auth.js 

    ```shell 
    npm i config 

    ```
    file structure
    - config
        - default: ```{"jwtPrivateKey": ""}```
        - custom-environment-variables : ```{"jwtPrivateKey": "vincent_jwtPrivateKey"}```
    
    - set environment variable: ```export vincent_jwtPrivateKey=myPassword```

    ```javascript
        config.get("jwtPrivateKey") // auth.js
    ```

    ```javascript 
        if(!config.get("jwtPrivateKey")) {  // index.js 
            console.log("FATAL....")
            process.exit(1)
        }
    ```

9. where to implement token. 
    - token should be set on the header 
    - token should be generate inside user object

    ``` javascript
    const jwt = require("jsonwebtoken")
    const config = require("config")

    userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, config.get("jwtPrivateKey"))
        return token
    }
    ```

    ``` javascript 
    const token = user.generateAuthToken()
    res.send(token)
    ```

    ``` javascript 
    const result = await user.save()
    const token = user.generateAuthToken()
    res.header("x-auth-token", token).send (result)
    ```

10. use auth middleware to protect routes

    - middleware 
        - auth.js
    
    ```javascript 
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
    module.exports = auth // when using exports = auth gives err :
                          // Error: Route.post() requires a callback function but got a [object Object]

    ```

    ``` javascript 
    const auth = require("path to middleware: auth")
    router.post("/", auth, (req, res)=> {})
    ```

11. get current user
    use auth middleware to get the use id from req.body, <br>
    since userId has been added to req obj when passing through auth middlewaere<br>
    ```javascript 
    const auth = require("path to middleware: auth")
    router.get("/me", auth, async(req,res)=> {
    const user = await User.findById(req.user._id).select("-password")
    res.send(user)
    })
    ```

12. Role-based Auth 
    - **need to have a an user who has the property admin first**
    - **make sure change the user schema, to include the possiblity of having it.**
    - provide Role information in the jwt, deocde it in auth
    - pass jwt : auth -> isAdmin 
    - check isAdmin
        - 403 : provided token, and you can not access the content
        - 401 : did not provide token 
    - pass to route


    ```javascript
    // User model
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"))
    ```

    ```javascript 
    // admin middleware
        module.exports = function (req, res, next) {
            if(!req.user.isAdmin) return res.status(403).send("Access Deined")
            next()
        }
    ```

    ```javascript 
    router.post("/", [auth, admin], async(req, res)=> {})

    ```

# Handling & logging Errors 

- method1: 
    - middleware
        - async : extract try/catch 
        - error : extract error handling 
    - index : import and use middleware

    1. try/catch method
        ```javascript
        try{
            throw new Error("LOL")
            const result = await course.save()
            res.send(result)
        }
        catch(ex) {
            res.status(500).send("Error Message")
        }
        ```

    2. extract error handling from "catch" into a middleware function 

        ```javascript
        module.exports = function (err, req, res, next) {
            res.status(500).send("Failed")
        }
        ```
        ```javascript
        const error = require("../middleware/error")
        ...
        app.use(error)
        ```
        ```javascript 
        try {
            throw new Error("LOL")
            const result = await course.save()
            res.send(result)
        }
        catch(ex) {
            next(ex)
        }
        ```

    3. extact try/catch into a functory function (in middware file) that wraps the original function
        ``` javascript 
        module.exports = function asyncMiddleware(handler) {
            return async (req, res, next) => {
                try{
                    await handler(req,res)
                }
                catch(ex) {
                    next(ex)
                }
            }
        }
        ```
        ```javascript
        const asyncMiddleware = require("../middleware/async")

        router.post("/", asyncMiddleware(
                            async (req,res) => {..} 
                        )) 
        ```

- method 2 : 
    express-async-errors 2.1.0
    require("express-async-errors") 
    remove asyncMiddleware() wrapper

- logging error to: file, console & mongodb
    ```shell
    npm i winston 
    npm i winston-mongodb
    ```

    - middleware / logger.js 
        ```javascript
        const winston = require("winston")
        require('winston-mongodb');
        const logger = winston.createLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'combined.log' }),
                new winston.transports.MongoDB({db:"mongodb://localhost:27017/playground"})
            ]
        });
        module.exports = logger
        ```
    - error.js
        ```javascript
        const winston = require("winston")
        winston.log("error", err.message) || winston.err(err.message)
        ```

- uncaught exception in console + in file + in db  //sync 
    ```javascript
    const logger = require("./middleware/logger")

    process.on("uncaughtException", (ex)=> {
        logger.error(ex.message, ex)
        process.exit(1)
    })
    
    throw new Error ("failed during startup")
    ```

- uncaught rejection in file + in db // async
    ```javascript
    const logger = require("./middleware/logger")

    process.on("unhandledRejection", (ex)=> {
        logger.error(ex.message, ex)
        process.exit(1)
    })

    const p = Promise.reject(new Error("Promise Error"))
    p.then(()=> {console.log("Done")})
    ```


- handing exception & rejection with  logger.exceptions.handle & logger.rejections.handle <br>
    process.exit(1) is implemented
    ```javascript
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'combined.log' }),
            new winston.transports.MongoDB({db:"mongodb://localhost:27017/playground"})
            
        ]
    });

    logger.exceptions.handle(
        new winston.transports.File({ filename: 'exceptions.log' })
    )
    
    logger.rejections.handle(
        new winston.transports.File({ filename: 'rejections.log' })
    );
    ```

- extract: 
    - startup 
        - routes.js 
        - db.js
        - logging.js
        - config.js
        - validation.js 
    - index.js

# Unit Testing