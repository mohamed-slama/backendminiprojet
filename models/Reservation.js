import mongoose from "mongoose";
const reservationSchema = new mongoose.Schema(
  {
  
    user : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "user" , 
    }
    ,
    Seatnumbers : {
        type : [String]

    } , 
    ArrivalPoint : { 
        type : String

    },

    DepartureDate : {
        type : Date
    } , 

    ArrivalDate : {
        type : String 
    } , 

    Distance : {
        type : Number
    } , 




  },

);

export default mongoose.model("reservation", reservationSchema);
