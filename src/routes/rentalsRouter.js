import { Router } from "express";
import { deleteRental, finalizeRent, getRentals, postRentals } from "../controllers/rentals.js";
import { validateCheckOutRental } from "../middlewares/validateCheckoutRental.js";
import validateRental from "../middlewares/validateRentals.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateRental, postRentals)
rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals/:id/return", validateCheckOutRental, finalizeRent)
rentalsRouter.delete("/rentals/:id", deleteRental)
export default rentalsRouter
