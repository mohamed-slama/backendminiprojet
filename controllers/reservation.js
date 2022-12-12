import reservation from "../models/reservation.js";
import { day } from "../index.js";
import { getvoyage } from "./voyage.js";
import voyage from "../models/voyage.js";
import QRCode from "qrcode";

const QrGenrate = async (text) => {
  try {
    const qr = await QRCode.toDataURL(text);
    console.log(qr);
  } catch (err) {
    console.log(err);
  }
};

export const createreservation = async (req, res, next) => {
  const newreservation = new reservation(req.body);
  var list = [];
  try {

    //console.log(savedreservation)
    var updatevoyage = await voyage.findById(req.body.voyage);
   // console.log(updatevoyage)
    for (const index2 in newreservation.Seatnumbers) {
     console.log(newreservation.Seatnumbers[index2])  ;
      for (const index in updatevoyage.available ) {
        console.log(updatevoyage.available[index])  ;
        if (newreservation.Seatnumbers[index2] == index) {
          console.log(newreservation.Seatnumbers[index2])
          if (updatevoyage.available[index] == true) {
            return res.status(200).json("already reserved");
          } else {
          await newreservation.save();
            list.push(newreservation)
            let stJSON = JSON.stringify(newreservation);
            QRCode.toDataURL(stJSON, async function (err, code) {
              if (err) return console.log("error");
              const update = await reservation.findByIdAndUpdate(newreservation._id, {qr:code});
              //console.log(update);
              //console.log(savedreservation._id)
              //console.log(code);
            });

            updatevoyage.available[index] = true;
            updatevoyage.save();
            console.log(updatevoyage.available)  ;

            //const newvoyage = new voyage(updatevoyage);
            //const updatedV = await newvoyage.save();
           
          }
        }
      }
    }
    return res.status(200).json(list);
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
  const reservation = await reservation
    .findById(req.params.id)
    .populate("user")
    .populate({
      path: "voyage",
      populate: {
        path: "vehicle",
        model: "vehicle",
      },
    })
    .exec()
    .then((voy) => {
      res.status(200).json(voy);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
export const getAll = async (req, res, next) => {
  console.log("aaaaaaaaa");
  const voy = await reservation
    .find({})
    .populate("user")

    .populate({
      path: "voyage",
      populate: {
        path: "vehicle",
        model: "vehicle",
      },
    })
    .exec()
    .then((voy) => {
      res.status(200).json(voy);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
