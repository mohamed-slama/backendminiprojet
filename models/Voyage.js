import mongoose from "mongoose";
const seatSchema = new mongoose.Schema(
  {
  
    vehicle :[ {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "vehicle" , 
    }
    ]  ,
    DeparturePoint : {
        type : String

    } , 
    ArrivalPoint : { 
        type : String

    },

    DepartureDate : {
        type : String
    } , 

    ArrivalDate : {
        type : String 
    } , 

    Distance : {
        type : Number
    } , 




  },

);

export default mongoose.model("voyage", seatSchema);
