import connection from "../database.js";

export async function getCategories(req, res) {
    try {
        const categories = await connection.query('select * from categories');
        res.send(categories.rows)
    } catch {
        console.log("erro")
    }
}

export async function postCategories(req, res) {
    const { name } = req.body;
    if (!name) res.sendStatus(400);
    try {
        const categories = await connection.query(`SELECT * FROM categories`);

        const categoryFind = categories.rows.find(category => category.name === name);
        if (categoryFind) return res.sendStatus(409);

        await connection.query(`INSERT INTO categories (name) VALUES ($1)`, [name]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}