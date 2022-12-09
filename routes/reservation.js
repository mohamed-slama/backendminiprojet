import express from "express";
import {
  createreservation,
  deletereservation,
  getreservation,
  getAll
} from "../controllers/reservation.js";
import reservation from "../models/reservation.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/",  createreservation);


//DELETE
router.delete("/:id",  deletereservation);
//GET

router.get("/find/:id", getreservation);

//GET ALL
//             /DepartureDate=1670241415506
router.get("/allreservations", getAll);

export default router;
