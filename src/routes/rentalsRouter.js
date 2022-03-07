import { Router } from "express";
import { getRentals, postRentals } from "../controllers/rentals.js";
import validateRental from "../middlewares/validateRentals.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateRental, postRentals)
rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals/:id/return", finalizeRent)
export default rentalsRouter
