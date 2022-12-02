import express from "express";
import {
  countByCity,
  countByType,
  createvehicle,
  deletevehicle,
  getvehicle,
  getvehicleseats,
  getvehicles,
  updatevehicle,getvehiculesByType
} from "../controllers/vehicle.js";
import vehicle from "../models/vehicle.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/",  createvehicle);

//UPDATE
router.put("/:id", verifyAdmin, updatevehicle);
//DELETE
router.delete("/:id", verifyAdmin, deletevehicle);
//GET

router.get("/find/:id", getvehicle);
router.get("/find/vehicules",getvehiculesByType);
//GET ALL

router.get("/", getvehicles);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/seat/:id", getvehicleseats);

export default router;
