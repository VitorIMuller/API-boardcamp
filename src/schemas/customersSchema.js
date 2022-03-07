import joi from 'joi';

const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().required(),
    cpf: joi.string().required(),
    birthday: joi.date().less('now').required()
})

export default customersSchema