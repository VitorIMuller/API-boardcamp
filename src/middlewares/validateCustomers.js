import customersSchema from '../schemas/customersSchema.js'

export default function validateCustomers(req, res, next){
    const cpf = req.body.cpf
    const phone = req.body.phone
    const validation = customersSchema.validate(req.body);
    if (validation.error) return res.send("validation error").status(400);
    if (!req.body.name) res.sendStatus(400);
    if(isNaN(cpf)) return res.sendStatus(400);
    if(cpf.length != 11) return res.sendStatus(400);
    if(isNaN(phone)) return res.sendStatus(400);
    if(phone.length != 10 && phone.length != 11) res.sendStatus(400);

    next();
}