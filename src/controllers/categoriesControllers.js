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