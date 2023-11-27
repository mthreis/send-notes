const { Router } = require("express");

const data = require("../db/data.json") ;

const db = require("./db");

const router = Router();


router.get("/", async (req, res) => {
    const response = await db.query(`SELECT ARRAY_AGG(tablename::TEXT) as data FROM pg_catalog.pg_tables WHERE schemaname = 'public';`);

    const { data } = response.rows[0];

    console.log(data);

    res.status(200).json(data ?? []);
    

    //SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'information_schema'
});


module.exports = router;