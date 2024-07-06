// getProducts.js

const express = require("express");
const router = express.Router();
const pool = require("../db");

//add products by addmin





// Get all products
router.get("/all-products", async (req, res) => {
    try {
        const products = await pool.query("SELECT * FROM products");
        return res.json(products.rows);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send(`Fetch error: ${err.message}`);
    }
});

// Get products not available in a specific shop
// router.get("/all-products/:s_id", async (req, res) => {
//     const shopID = req.params.s_id;
//     try {
//         const products = await pool.query(
//             `SELECT DISTINCT p.p_id, p.p_name, p.r_price, p.w_price, p.p_category
//             FROM products AS p
//             LEFT JOIN available AS a ON a.p_id = p.p_id AND a.s_id = $1
//             WHERE a.s_id IS NULL`,
//             [shopID]
//         );
//         return res.json(products.rows);
//     } catch (err) {
//         console.error(err.message);
//         return res.status(500).send(`Fetch error: ${err.message}`);
//     }
// });

// OR

router.get("/notAv-products/:s_id", async (req, res) => {
    const shopID = req.params.s_id;
    try {
        const products = await pool.query(
            `SELECT p_id, p_name, image_data, r_price, w_price, p_category
            FROM products
            WHERE NOT EXISTS (
                SELECT 1
                FROM available
                WHERE products.p_id = available.p_id
                AND available.s_id = $1)`,
            [shopID]
        );
        return res.json(products.rows);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send(`Fetch error: ${err.message}`);
    }
});


// Get products available in a specific shop
router.get("/shop-products/:s_id", async (req, res) => {
    const shopID = req.params.s_id;
    try {
        const products = await pool.query(
            `SELECT p.p_id, p.p_name,p.image_data, p.r_price, p.w_price, p.p_category
            FROM products AS p
            INNER JOIN available AS a ON a.p_id = p.p_id
            WHERE a.s_id = $1`,
            [shopID]
        );
        return res.json(products.rows);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Failed to fetch products for shop");
    }
});

// Add a product to a shop
router.post("/add-product", async (req, res) => {
    const { s_id, p_id } = req.body;
    try {
        await pool.query(
            `INSERT INTO available(p_id, s_id)
            VALUES ($1, $2)`,
            [p_id, s_id]
        );
        return res.status(201).send("Product added successfully");
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Failed to add product to database");
    }
});

// Update product details
router.put("/edit-product/:p_id", async (req, res) => {
    const productId = req.params.p_id;
    const { p_name, r_price, w_price, p_category } = req.body;
    try {
        await pool.query(
            `UPDATE products
            SET p_name = $1, r_price = $2, w_price = $3, p_category = $4
            WHERE p_id = $5`,
            [p_name, r_price, w_price, p_category, productId]
        );
        return res.status(200).send("Product updated successfully");
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Failed to update product");
    }
});

// Remove a product from a shop
router.delete("/remove-product", async (req, res) => {
    console.error("Delete");
    const { s_id, p_id } = req.body;
    try {
        await pool.query(
            `DELETE FROM available
            WHERE s_id = $1 AND p_id = $2`,
            [s_id, p_id]
        );
        return res.status(200).send("Product removed successfully");
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Failed to remove product from the shop");
    }
});


// Delete a product from products table
router.delete("/delete-product", async (req, res) => {
    console.error("Delete");
    const { p_id } = req.body;
    try {
        await pool.query(
            `DELETE FROM products
            WHERE p_id = $1`,
            [p_id]
        );
        return res.status(200).send("Product removed successfully");
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Failed to remove product from the shop");
    }
});



// add product to Products tabale by admin

router.post('/admin-add-product', async (req, res) => {
    const { p_name, r_price, w_price, p_category, image } = req.body;
    console.log("form server-----------",req.body.p_name);
    try {
      const newProduct = await pool.query(
        "INSERT INTO products (p_name, r_price, w_price, p_category, image_data) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [p_name, r_price, w_price, p_category, image]
      );

      console.log("form server------",newProduct);
  
      res.status(201).json({ success: true, data: newProduct.rows[0] });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });


  // Route to fetch products
// Route to fetch reports
router.get('/api/reports', async (req, res) => {
    try {
        const reports = await pool.query(
            'SELECT r_id, s_id, s_name, s_phone, CONCAT(s_div, ", ", s_dist, ", ", s_subdist, ", ", s_union, ", ", s_road) AS address, p_id, p_name, r_price, w_price, tr_price, tw_price, r_status FROM reports'
        );

        // console.log("ine prony end----------",reports)
        res.json(reports.rows);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// // Route to fetch products
// router.get('/api/products', async (req, res) => {
//     try {
//         const products = await pool.query(
//             'SELECT * FROM products'
//         );
//         res.json(products.rows);
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// Route to update report status
router.put('/api/shops/report/:shopId', async (req, res) => {
    const { newStatus } = req.body;
    const { shopId } = req.params;

    try {
        // Update the status of reports for the specified shopId
        await pool.query(
            'UPDATE reports SET r_status = $1 WHERE s_id = $2',
            [newStatus, shopId]
        );

        res.status(200).json({ success: true, message: 'Report status updated successfully' });
    } catch (error) {
        console.error('Error updating report status:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});



//   router.post("/save-image", async (req, res) => {
//     const { image } = req.body;
//     try {
//       // Save the image data to the database
//       const client = await pool.connect();
//       const query = "INSERT INTO images (image_data) VALUES ($1) RETURNING *";
//       const values = [image];
//       const result = await client.query(query, values);
//       client.release();
//       res.json({ success: true, message: "Image saved successfully" });
//     } catch (error) {
//       console.error("Error saving image:", error.message);
//       res.status(500).json({ success: false, message: "Failed to save image" });
//     }
//   });
  
//   // Route to fetch all images from PostgreSQL database
//   router.get("/get-images", async (req, res) => {
//     try {
//       // Fetch all images from the database
//       const client = await pool.connect();
//       const result = await client.query("SELECT * FROM images");
//       client.release();
//       res.json({ success: true, images: result.rows });
//     } catch (error) {
//       console.error("Error fetching images:", error.message);
//       res.status(500).json({ success: false, message: "Failed to fetch images" });
//     }
//   });

  
module.exports = router;
