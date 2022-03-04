import { Router } from "express";
import { getCustomers, postCustomers } from "../controllers/customers.js";
import validateCustomers from "../middlewares/validateCustomers.js";

const customersRouter = Router();

customersRouter.post("/customers", validateCustomers, postCustomers);
customersRouter.get('/customers', getCustomers);

export default customersRouter;