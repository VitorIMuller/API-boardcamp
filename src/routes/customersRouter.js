import { Router } from "express";
import { getCustomers, postCustomers, updateCustomer } from "../controllers/customers.js";
import validateCustomers from "../middlewares/validateCustomers.js";

const customersRouter = Router();

customersRouter.post("/customers", validateCustomers, postCustomers);
customersRouter.get('/customers', getCustomers);
customersRouter.put("/customers",validateCustomers, updateCustomer);

export default customersRouter;