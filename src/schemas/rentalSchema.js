import Joi from "joi";

const rentalSchema = Joi.object({
    customerId: Joi.number().required(),
    gameId: Joi.number().required(),
    daysRented: Joi.number().required()
})

export default rentalSchema