const express = require ("express") 
const app = express()  
const cors =require ("cors");
const router = express.Router();
const mongoose = require ("mongoose")
const User = require ("../models/user")
const bodyParser = require("body-parser")  
const passport = require("passport")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const LocalStrategy = require("passport-local")
const passportLocalMongoose = require("passport-local-mongoose")
const { AsyncResource } = require("async_hooks");
const { collection } = require("../models/user");
const port = process.env.PORT || 3000;
const databaseName = 'EasyWay';
module.exports = router;

/* 
app.use(passport.initialize());
app.use(passport.session());
 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); */


app.use(bodyParser.urlencoded({extended:false}))

//parse application /json

app.use(bodyParser.json()) 


mongoose.connect(`mongodb://0.0.0.0:27017/${databaseName}`).then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

  app.use(cors());

//// routes 
/* app.post("/register", function (req, res) {
    const username = req.body.username
    const password = req.body.password
    User.register(new User({ username: username }),
            password, function (err, user) {
        if (err) {
            console.log(err);
            res.send (err)
        }
 
        passport.authenticate("local")(
            req, res, function () {
            res.send("registred");
        });
    });
}); */
app.post("/signup", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // validation
  
      if (!email || !password )
        return res
          .status(400)
          .json({ errorMessage: "Please enter all required fields." });
  
      if (password.length < 6)
        return res.status(400).json({
          errorMessage: "Please enter a password of at least 6 characters.",
        });
  
  // hash the password
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      // save a new user account to the db
  
      const newUser = new User({
        email,
        passwordHash,
      });
  
      const savedUser = await newUser.save();
  
      const token = jwt.sign(
        {
          user: savedUser._id,
        },
        'YL8J97Akpwf"5wZZ9skbK)KRb?m7Dv(x=cLrzM#4s]vJ74~+$~'
      );
  
      // send the token in a HTTP-only cookie
  
      res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // validate
  
      if (!email || !password)
        return res
          .status(400)
          .json({ errorMessage: "Please enter all required fields." });
  
      const existingUser = await User.findOne({ email });
      if (!existingUser)
        return res.status(401).json({ errorMessage: "Wrong email or password." });
  
      const passwordCorrect = await bcrypt.compare(
        password,
        existingUser.passwordHash
      );
      if (!passwordCorrect)
        return res.status(401).json({ errorMessage: "Wrong email or password." });
  
      // sign the token
  
      const token = jwt.sign(
        {
          user: existingUser._id,
        },
        'YL8J97Akpwf"5wZZ9skbK)KRb?m7Dv(x=cLrzM#4s]vJ74~+$~'
      );
  
      // send the token in a HTTP-only cookie
  
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send();
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  });
  app.get("/logout", (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send();
  });
  
  app.get("/loggedIn", (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.json(false);
  
      jwt.verify(token, 'YL8J97Akpwf"5wZZ9skbK)KRb?m7Dv(x=cLrzM#4s]vJ74~+$~');
  
      res.send(true);
    } catch (err) {
      res.json(false);
    }
  });

/* app.post('/signup',(req,res)=>   {

        const newUser = {
            username :  req.body.username , 
            email :  req.body.email , 
            password :  req.body.password , 
        }

        const query ={ email : newUser.email}  

        collection.findOne(query , (err,result) => {
            if (result == null ) {
                collection.insertOne(newUser,(err,result)=> {
                    res.status(200).send()
                })
            }else {
                res.status(400).send()
            }
        })

}) */


/* app.post('/login' ,(req,res)=> {
    const query = {
        email : req.body.email ,
        password : req.body.password 
    }
    collection.findOne(query , (err , result) => {
        if(result != null ) {
            const objToSend = {
                username : result.username , 
                email : result.email 
            }
            res.status(200).send(JSON.stringify(objToSend))
        } else {
            res.status(404).send()
        }
    })

}) */



app.get ('/users',async (req,res)=>{

    try {
        await User.find ({}) 
        .then (result=>{
            res.send(result)
        })
        
    } catch (error) {
        console.log(err)
        
    }
  
       

})


app.delete('/deleteuser/:id',async (req,res) => {
    try {
        await  User.findOneAndDelete ({id:req.params.id})
        res.send('deleted with succes')
    } catch (err) {
        res.send(err)
        
    }
})

app.put('/updateuser/:id' , async (req, res) => {
    try {
        await User.findOneAndUpdate ( {_id : req.params.id},{
            email : req.body.email 
        })
        res.send (" updated")
        
    } catch (error) {
        res.send(error)
        
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });

