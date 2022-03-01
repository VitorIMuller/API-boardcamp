import { Router } from "express";
import { postGames } from "../controllers/games.js";
import validateGame from "../middlewares/validateGame.js";

const gamesRouter = Router();

gamesRouter.post('/games', validateGame, postGames);

export default gamesRouter