import { Router } from "express";
import { getCategories } from "../controllers/categoriesControllers.js";

const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);


export default categoriesRouter