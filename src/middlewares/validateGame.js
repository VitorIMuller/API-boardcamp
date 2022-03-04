import gameSchema from "../schemas/gameSchema.js";

export default function validateGame(req, res, next) {
    const validation = gameSchema.validate(req.body);
    if (validation.error) return res.sendStatus(400);

    

    const categoryId = parseInt(req.body.categoryId);
    const pricePerDay = parseInt(req.body.pricePerDay)

    if (categoryId <= 0 || pricePerDay <= 0) return res.sendStatus(400);

    next();
}