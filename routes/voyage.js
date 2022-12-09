import express from "express";
import {
  createvoyage,
  deletevoyage,
  getvoyage,
  getAll
} from "../controllers/voyage.js";
import voyage from "../models/voyage.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/",  createvoyage);


//DELETE
router.delete("/:id",  deletevoyage);
//GET

router.get("/find/:id", getvoyage);

//GET ALL
//             /DepartureDate=1670241415506
router.get("/allvoyages/:type/:DeparturePoint/:ArrivalPoint/:DepartureDate", getAll);

export default router;
