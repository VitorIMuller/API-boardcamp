import connection from "../database.js";

export async function getCategories(req, res) {
    try {
        const categories = await connection.query('select * from categories');
        console.log('e')
        res.send(categories.rows)
    } catch {
        console.log("erro")
    }
}

export async function postCategories(req, res) {
    const category = req.body.name;
    if (category.length === 0) res.sendStatus(400);
    try {
        await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [category]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}