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


export async function getGames(req, res) {

    let sendGame = [];

    try {

        const games = (await connection.query(`
        SELECT * FROM games
        `)).rows;

        for (const game of games) {
            const { categoryId } = game;

            let categoryName = await connection.query(`
            SELECT name FROM categories WHERE id= $1
            `, [categoryId])

            categoryName = categoryName.rows[0].name;
            sendGame.push({ ...game, categoryName });
        }

    } catch {
        res.sendStatus(500);
    }

    res.send(sendGame);

}