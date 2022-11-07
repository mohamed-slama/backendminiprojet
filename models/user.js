const mongoose = require ('mongoose') 

const userSchema = mongoose.Schema({

    username : {
        type : String , 
        required : false ,

    } ,
    email : {
        type : String  , 
        required : true ,

    } ,
    passwordHash : {
        type : String  , 
        required : true ,

    }

}) ; 
module.exports= User = mongoose.model('user',userSchema) 
 
