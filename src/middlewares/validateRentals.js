import rentalSchema from "../schemas/rentalSchema.js";


export default function validateRental(req, res, next) {
    const { daysRented } = req.body;

    const validation = rentalSchema.validate(req.body);
    if (validation.error) return res.sendStatus(400);

    if (daysRented <= 0) return res.sendStatus(400);

    next();
}