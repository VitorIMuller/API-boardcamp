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

        let rentDate = dayjs().format('YYYY-MM-DD')
        let returnDate = null;
        let originalPrice = daysRented * game.rows[0].pricePerDay
        let delayFee = null;

        await connection.query(`
                INSERT INTO
                rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);

        res.sendStatus(201)

    } catch {
        res.sendStatus(500);
    }
}