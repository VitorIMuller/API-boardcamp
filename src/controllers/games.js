import connection from "../database.js";

export async function postGames(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        const ids = await connection.query(`SELECT id FROM categories`)
        console.log(ids.rows)
        console.log(parseInt(categoryId))
        const findId = ids.rows.find(id => parseInt(categoryId) == id);
        console.log("ads")
        if (findId) return res.sendStatus(400);

        const names = await connection.query(`SELECT name FROM games`);
        console.log(names.rows)
        console.log(name)
        const findName = names.rows.find(n => name == n.name);
        console.log('sdadas')
        if (findName) return res.sendStatus(409);

        await connection.query(`
        INSERT INTO games 
            (name, image, "stockTotal", "categoryId", "pricePerDay")
        VALUES
            ($1, $2, $3, $4, $5)
        `, [name, image, parseInt(stockTotal), categoryId, parseInt(pricePerDay * 100)]);

        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}