import connection from "../database.js";

export async function getCategories(req, res) {
    try {
        const categories = await connection.query('select * from categories');
        if (categories.rowCount === 0) {
            return res.sendStatus(404)
        } else {

            res.send(categories.rows)
        }
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500)
    }
}

export async function postCategories(req, res) {
    const { name } = req.body;
    if (!name) return res.sendStatus(400);
    try {
        const categories = await connection.query(`SELECT * FROM categories`);

        const categoryFind = categories.rows.find(category => category.name === name);
        if (categoryFind) return res.sendStatus(409);

        await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [name]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500);
    }
}