const express = require ("express") 
const app = express()  
const cors =require ("cors");
const mongoose = require ("mongoose")
const User = require ("./models/user")
const bodyParser = require("body-parser")  
const passport = require("passport")

const LocalStrategy = require("passport-local")
const passportLocalMongoose = require("passport-local-mongoose")
const { AsyncResource } = require("async_hooks");
const { collection } = require("./models/user");
const port = process.env.PORT || 9090;
const databaseName = 'EasyWay';

/* 
app.use(passport.initialize());
app.use(passport.session());
 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); */


app.use(bodyParser.urlencoded({extended:false}))

//parse application /json

app.use(bodyParser.json()) 
<<<<<<< Updated upstream


mongoose.connect(`mongodb://0.0.0.0:27017/${databaseName}`).then(() => {
=======
mongoose
  .connect(`mongodb://0.0.0.0:27017/${databaseName}`)
  .then(() => {
>>>>>>> Stashed changes
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

app.post('/signup',(req,res)=>   {

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

})


app.post('/login' ,(req,res)=> {
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

})



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

app.post ('/adduser',async(req,res)=> {
try {
    let new_user = new User ({
        iduser :  req.body.iduser , 
        username :  req.body.username , 
        email :  req.body.email , 
        password :  req.body.password , 
    }) ; 

await new_user.save() 
res.send('added with success')
    
} catch (error) {
    console.log(error)
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

