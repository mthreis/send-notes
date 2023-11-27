const pg = require("pg");


console.log("url = ", process.env.DB_URL);

return;
const client = new pg.Pool({ 
    connectionString: process.env.DB_URL,
    min: 0
});


client.connect((err) => {
    if (err)
        throw err;

    console.log("Connected to PostgreDB.")
});

module.exports = client;