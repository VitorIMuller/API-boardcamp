import connection from "../database.js";

export async function postCustomers(req, res){
    const {name, phone, cpf, birthday} = req.body;
    try {
        const customers = await connection.query(`SELECT cpf FROM customers`);
        const customersFind = customers.rows.find(customer => customer.cpf === cpf);
        if (customersFind) return res.sendStatus(409);

        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }

}

export async function getCustomers(req, res){
    try {
        const cpf = req.query.cpf;  
        const id = req.query.id;  
        if(cpf){
            let customers = await connection.query(`
            SELECT * FROM customers WHERE cpf LIKE $1
            `, [`${cpf}%` ]);
            res.send(customers.rows)
        }else if(id){

            const ids = await connection.query(`SELECT * FROM customers`);
            
            const idFind = ids.rows.find(ids => ids.id === parseInt(id));
            
            if (!idFind) {
                return res.sendStatus(404);
            }else{
                let customers = await connection.query(`
                SELECT * FROM customers WHERE id=$1
                `, [id]);
                res.send(customers.rows)
            }
            
        } else{
            let customers = await connection.query(`SELECT * FROM customers`)
            res.send(customers.rows)
            
        }
    } catch {
        res.sendStatus(500);
    }
}