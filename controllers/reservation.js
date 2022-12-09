import reservation from "../models/reservation.js";
import {  day } from "../index.js";
import { getvoyage } from "./voyage.js";
import  voyage   from  "../models/voyage.js"
import QRCode from "qrcode";




const QrGenrate = async text => {
  try {
    const qr = await QRCode.toString(text,{ type: 'terminal'})
    console.log(qr) ; 
  } catch(err){
    console.log(err)
  }
}



export const createreservation = async (req, res, next) => {
  const newreservation = new reservation(req.body);
  try {
    const savedreservation = await newreservation.save();
    //console.log(savedreservation) 
    var updatevoyage = await voyage.findById( req.body.voyage)
   // console.log(updatevoyage)
    for (  const index2 in savedreservation.Seatnumbers)
    {
      //console.log(savedreservation.Seatnumbers)  ;
      for (const index in updatevoyage.available)
     {
      //console.log(updatevoyage.available)  ;
             if(savedreservation.Seatnumbers[index2]== index)
             {
              console.log("3")  ;
              updatevoyage.available[index]=true
             }
        
     }
    }
    const newvoyage = new voyage(updatevoyage);
    const updatedV = await newvoyage.save()
    res.status(200).json(savedreservation);
  } catch (err) {
    next(err);
  }


};



export const updatereservation = async (req, res, next) => {
  try {
    const updatedreservation = await reservation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedreservation);
  } catch (err) {
    next(err);
  }
};
export const deletereservation = async (req, res, next) => {
  try {
    await reservation.findByIdAndDelete(req.params.id);
    res.status(200).json("reservation has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getreservation = async (req, res, next) => {
  try {
    const reservation = await reservation.findById(req.params.id);
    res.status(200).json(reservation);
  } catch (err) {
    next(err);
  }
};
export const getAll = async (req, res, next) => {

  const test = Date.now() ; 
   
      
      console.log("aaaaaaaaa")  ;
      const voy = await reservation.find({})
      .populate("user")
    
      .populate( 
        
        {
          path : 'voyage' ,
          populate :{
            path: 'vehicle',
            model: 'vehicle'
          }
          

       
    })
      .exec()
      .then((voy) => {
        res.status(200).json(voy);
      })
      .catch((err) => {
        console.log(err) ;
        res.status(500).json({ error: err });
      });
   
    
  
  
    
  }

