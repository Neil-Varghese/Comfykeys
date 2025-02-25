if(process.env.NODE_ENV != "production"){   //to check if we are in development mode or production mode
    require('dotenv').config();             //to use environment variables
}



const express = require("express");                          //to use express
const app = express();                                       //instance of express aplication
const mongoose = require("mongoose");                        //to use mongoose
const path = require("path");                                //used to create paths
const methodOverride = require("method-override");           //to use method override
const ejsMate = require("ejs-mate");                         //to use ejs-mate which is used to make layouts
const ExpressError = require("./utils/ExpressError.js");     //to import custom made error class
const session = require("express-session");                  //to implement sessions
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");                      //to implement flash messages
const passport = require("passport");                        //for password storing (user model)
const LocalStrategy = require("passport-local");             //for password storing (user model)
const User = require("./models/user.js");                    //to use user model

const dbUrl = process.env.ATLASDB_URL;                       //url of the atlas database


//express routes
const listingRouter = require("./routes/listing.js");        //to use listing routes
const reviewRouter = require("./routes/review.js");          //to use review routes
const userRouter = require("./routes/user.js");              //to use user routes

app.set("view engine","ejs");                            //to set views to ejs
app.engine('ejs',ejsMate);                               //to use ejs mate
app.set("views",path.join(__dirname,"views"));           //to set views path

//middleware
app.use(express.urlencoded({extended: true}));              //to parse body
app.use(methodOverride("_method"));                         //to be able to send update / edit/ delete requests
app.use(express.static(path.join(__dirname, "/public")));   //to set directory name for static files source


//mongo session store
const store = MongoStore.create({                       //to store session in mongo db
    mongoUrl: dbUrl,                                    //session is going to get stored in the mongo atlas database
    crypto: {
        secret: process.env.SECRET,                  //to encrypt the session
    },
    touchAfter: 24 * 60 * 60,                           //to update session after 24 hours (in seconds)
});

store.on("error", () => {
    console.log("ERROR IN MONGO SESSION STORE", err);
})


//defining session attributes/options
const sessionOptions = {                                    //to set session options
    store: store,                                           //to store session in mongo db
    secret: "mysupersecretstring",                          //to encrypt the session
    resave: false,                                          //to not save the session if nothing has changed
    saveUninitialized:true,                                 //to not save the session if nothing has been 
    cookie: {                                               //to set cookie options
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,      //to set expiry date of cookie
        maxAge: 7 * 24 * 60 * 60 * 1000,                    //to set max age of cookie
        httpOnly: true,                                     //to make cookie http only
    },
};

//default route
// app.get("/",(req,res) => {
//     res.send("Hi, i am root")
// });




//initializing session and flash
app.use(session(sessionOptions));                         //to use session
app.use(flash());                                         //to use flash messages

//passport uses session so we are going to initialize passport after session is initialized
app.use(passport.initialize());                             //middleware that initializes passport
app.use(passport.session());                                //linking passport to session so that same user does not need to login everytime he opens a new page
passport.use(new LocalStrategy(User.authenticate()));       //so that every user gets authenticated by login or signup
passport.serializeUser(User.serializeUser());               //to serialize user (to store user information to session)
passport.deserializeUser(User.deserializeUser());           //to deserialize user (to unstore user information to session)

//to connect to databse
// const MONGO_URL = "mongodb://127.0.0.1:27017/ComfyKeys";  //url of the local database


async function main(){                                       //async function to connect to database
    await mongoose.connect(dbUrl);
}
main()
.then(() => {
    console.log("connected to DB.");
})
.catch((err) => {
    console.log(err);
});

//middleware to show flash message
app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;   //to show user information in navbar
    next();
})

/*
//route to demo test user registration
app.get("/demouser", async(req,res) => {    
    let fakeUser = new User({                           
        email: "student@gmail.com",
        username: "delta-student",   //even though usename is not defined in the schema we can give it it is default in passport
    });

    let registeredUser = await User.register(fakeUser,"helloworld");   //passport function to register user, helloworld is the password
    res.send(registeredUser);                                          //to display the response
                                                                       //all the registration logic is implemented by passport
                                                                       //like salting, hashing and checking uniqueness of username and stroing in db
})
*/

//express routing
app.use("/listings",listingRouter);                        
app.use("/listings/:id/reviews/",reviewRouter);
app.use("/",userRouter);   


//if url is not found
app.all("*", (req,res,next) => {
    next(new ExpressError(404,"Page not found!"));
})

//error handling middleware
app.use((err,req,res,next) => {
    let {statusCode = 500,message = "Something went wrong!"} = err;
    res.status(statusCode).render("error.ejs",{message});
    //res.status(statusCode).send(message);
});

//to start server
app.listen(8080, ()=> {
    console.log("server is listening to port 8080");
});