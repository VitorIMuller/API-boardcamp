import connection from "../database.js"

export async function validateCheckOutRental(req, res, next) {

    const { id } = req.params

    try {
        const rental = await connection.query(`
        SELECT *
        FROM rentals
        WHERE id = $1
        `, [id])
        if (rental.rowCount === 0) {
            return res.sendStatus(404)
        }

        if (rental.rows[0].returnDate !== null) {
            return res.sendStatus(400)
        }

        req.locals = rental.rows[0]

        next();

    } catch {
        res.sendStatus(500)
    }
}