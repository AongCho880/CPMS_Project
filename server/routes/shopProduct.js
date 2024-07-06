const route = require('express').Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    const { s_id } = req.body;
    try {
        const products = await pool.query(
            `SELECT p.p_id, p.p_name, p.r_price, p.w_price, p.p_category
            FROM products AS p
            JOIN available AS a ON a.p_id = p.p_id
            JOIN shops AS s ON s.s_id = a.s_id
            WHERE s.s_id = $1`,
            [s_id]
        );
        return res.json(products.rows);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Faild to fetch products for shop");
    }
    
});


module.exports = router;