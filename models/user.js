const mongoose = require ('mongoose') 

const userSchema = mongoose.Schema({

    iduser : {
        type : Number , 
        required : true ,

    } , 
    username : {
        type : String , 
        required : true ,

    } ,
    email : {
        type : String  , 
        required : true ,

    } ,
    password : {
        type : String  , 
        required : true ,

    }

}) ; 
module.exports= User = mongoose.model('user',userSchema) 
 
