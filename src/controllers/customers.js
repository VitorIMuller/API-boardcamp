import connection from "../database.js";

export async function postCustomers(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
        const customers = await connection.query(`SELECT cpf FROM customers`);
        const customersFind = customers.rows.find(customer => customer.cpf === cpf);
        if (customersFind) return res.sendStatus(409);

        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (error) {
        console.log(error.message)
        res.sendStatus(500);
    }

}

export async function getCustomers(req, res) {
    try {
        const cpf = req.query.cpf;
        if (cpf) {
            let customers = await connection.query(`
            SELECT * FROM customers WHERE cpf LIKE $1
            `, [`${cpf}%`]);
            res.send(customers.rows)
        } else {
            let customers = await connection.query(`SELECT * FROM customers`)
            res.send(customers.rows)

        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export async function updateCustomer(req, res) {
    const { id } = req.query;
    const { name, phone, cpf, birthday } = req.body;
    await connection.query(`UPDATE customers SET name=($1), phone=($2), cpf=($3), birthday=($4) WHERE id=($5)`, [name, phone, cpf, birthday, id])
    res.sendStatus(200);
}

export async function getCustomer(req, res) {
    const { id } = req.params;
    try {
        const customer = await connection.query("SELECT * FROM customers WHERE id = $1", [
            id,
        ]);

        if (customer.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.send(customer.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}