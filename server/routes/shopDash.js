const router = require('express').Router();
const pool = require('../db');
const shopAuth = require ('../middlewares/shopAuth');

// --- Get Shop Data ---
router.get('/shop-dashboard', shopAuth, async (req, res) => {
    
    try {
        const shop = await pool.query(
            'SELECT * FROM shops WHERE s_phone = $1',
            [req.user]
        );
       
        return res.json(shop.rows[0]);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(`Fetch error shop info \n`);
    }
});


module.exports = router;
    