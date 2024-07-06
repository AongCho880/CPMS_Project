const router = require('express').Router();
const pool = require('../db');
const custAuth = require ('../middlewares/custAuth');

// --- Get Customer Data ---
router.get('/cust-dashboard', custAuth, async (req, res) => {
    
    try {
        const customer = await pool.query(
            'SELECT * FROM customers WHERE c_phone = $1',
            [req.user]
        );
        // console.log("Name: ",customer.rows[0].c_selfiephoto);
        return res.json(customer.rows[0]);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(`Fetch error customer info \n`);
    }
});

// --- Get Customer Image ---
// router.get('/cust-dashboard/img', custAuth, async (req, res) => {
    
//     try {
//         const customer = await pool.query(
//             'SELECT c_frontnid, c_backnid, c_selfiephoto FROM customers WHERE c_phone = $1',
//             [req.user]
//         );
//         // console.log("Images: ",customer.rows[0]);
//         return res.json(customer.rows[0]);
//     } catch (err) {
//         console.log(err.message);
//         return res.status(500).send(`Fetch error customer info \n`);
//     }
// });


module.exports = router;
    