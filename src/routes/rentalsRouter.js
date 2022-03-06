import { Router } from "express";
import { postRentals } from "../controllers/rentals.js";
import validateRental from "../middlewares/validateRentals.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateRental, postRentals)

export default rentalsRouter
