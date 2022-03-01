import { Router } from "express";
import { getGames, postGames } from "../controllers/games.js";
import validateGame from "../middlewares/validateGame.js";

const gamesRouter = Router();

gamesRouter.post('/games', validateGame, postGames);
gamesRouter.get('/games', getGames);

export default gamesRouter