import connection from "../database.js";
import dayjs from "dayjs";

export async function postRentals(req, res) {
    const { customerId, gameId, daysRented } = req.body
    try {
        const idCustomer = await connection.query(`SELECT id FROM customers WHERE id=$1`, [customerId]);
        if (!idCustomer.rowCount) {
            return res.send("Cliente não encontrado").status(400);
        }

        const game = await connection.query(`SELECT * FROM games WHERE id=$1`, [gameId]);
        if (!game.rowCount) {
            return res.send("game não encontrado").status(400)
        }
        const rentedGames = await connection.query(`SELECT * FROM rentals WHERE "gameId"=$1`, [gameId])
        if (game.rows[0].stockTotal === rentedGames.rowCount) {
            return res.send("Jogo esgotado").status(400)
        }

        const rentalFormat = {
            customerId,
            gameId,
            daysRented,
            rentDate: dayjs().format('YYYY-MM-DD'),
            returnDate: null,
            originalPrice: daysRented * game.rows[0].pricePerDay,
            delayFee: null
        }



        res.sendStatus(201)

    } catch {
        res.sendStatus(500);
    }
}