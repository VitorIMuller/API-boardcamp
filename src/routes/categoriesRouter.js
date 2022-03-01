import { Router } from "express";
import { getCategories, postCategories } from "../controllers/categories.js";


const categoriesRouter = Router();

categoriesRouter.get('/categories', getCategories);
categoriesRouter.post('/categories', postCategories);

export default categoriesRouter