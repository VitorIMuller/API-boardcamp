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

        let rentDate = dayjs().format('YYYY-MM-DD');

        let returnDate = null;
        let originalPrice = daysRented * game.rows[0].pricePerDay
        let delayFee = null;
        await connection.query(`
                INSERT INTO
                rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);

        res.sendStatus(201)

    } catch (error) {
        console.log(error.message)
        res.sendStatus(500);
    }
}

export async function getRentals(req, res) {

    const { customerId, gameId } = req.query;

    if (customerId) {
        let rentals = await connection.query(`
            SELECT * FROM rentals WHERE "customerId"=$1
        `, [customerId])
        const resultGames = await connection.query(`
            SELECT 
                games.id, 
                games."categoryId", 
                games.name AS "name",
                categories.name AS "categoryName"
            FROM games 
                JOIN categories ON games."categoryId" = categories.id
        `);

        const resultCustomers = await connection.query(`SELECT id, name FROM customers `);

        rentals = rentals.rows.map(rental => ({
            ...rental,
            customer: resultCustomers.rows.find(customer => customer.id === rental.customerId),
            game: resultGames.rows.find(game => game.id === rental.gameId)
        }));

        if (rentals.length > 0) {

            res.send(rentals);
        } else {
            res.send("Não existe aluguel deste usuario").status(404)
        }


    } else if (gameId) {
        let rentals = await connection.query(`
            SELECT * FROM rentals WHERE "gameId"=$1
        `, [gameId])
        const resultGames = await connection.query(`
            SELECT 
                games.id, 
                games."categoryId", 
                games.name AS "name",
                categories.name AS "categoryName"
            FROM games 
                JOIN categories ON games."categoryId" = categories.id
        `);

        const resultCustomers = await connection.query(`SELECT id, name FROM customers`);

        rentals = rentals.rows.map(rental => ({
            ...rental,
            customer: resultCustomers.rows.find(customer => customer.id === rental.customerId),
            game: resultGames.rows.find(game => game.id === rental.gameId)
        }));

        if (rentals.length > 0) {

            res.send(rentals);
        } else {
            res.send("Não existem registros!")
        }

    } else {
        let rentals = await connection.query(`
            SELECT * FROM rentals 
        `)
        const resultGames = await connection.query(`
            SELECT 
                games.id, 
                games."categoryId", 
                games.name AS "name",
                categories.name AS "categoryName"
            FROM games 
                JOIN categories ON games."categoryId" = categories.id
        `);

        const resultCustomers = await connection.query(`SELECT id, name FROM customers`);

        rentals = rentals.rows.map(rental => ({
            ...rental,
            customer: resultCustomers.rows.find(customer => customer.id === rental.customerId),
            game: resultGames.rows.find(game => game.id === rental.gameId)
        }));

        res.send(rentals);
    }


}

export async function finalizeRent(req, res) {

    const { id } = req.params
    const returnDate = dayjs().format('YYYY-MM-DD')
    const delayDays = dayjs().diff(dayjs(req.locals.rentDate).add(parseInt(req.locals.daysRented), 'day'), 'day')
    const isDelayed = delayDays > 0
    const pricePerDay = parseInt(req.locals.originalPrice) / parseInt(req.locals.daysRented)
    const delayFee = isDelayed ? parseInt(delayDays) * pricePerDay : 0

    try {

        const banana = await connection.query(`UPDATE rentals SET "returnDate" = $1, "delayFee"=$2 WHERE id=$3`, [returnDate, delayFee, id]);
        res.sendStatus(200);

    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params;
    try {
        const checkDeletion = await connection.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
        if (checkDeletion.rows.length === 0) {
            res.sendStatus(404)
            return;
        }
        else if (checkDeletion.rows[0].returnDate) {
            res.sendStatus(400)
            return;
        }
        await connection.query('DELETE FROM rentals WHERE id = $1', [id]);
        res.sendStatus(200);
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    };
}