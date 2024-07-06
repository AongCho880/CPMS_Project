const router = require("express").Router();
const pool = require("../db");

// --- Get Shop Data ---
router.get("/cust_shop_info/:id", async (req, res) => {
  const s_id = req.params.id;

  try {
    const products = await pool.query(
      `SELECT p.* FROM products AS p
            JOIN available AS a ON a.p_id = p.p_id
            WHERE a.s_id = $1`,
      [s_id]
    );

    return res.json(products.rows[0]);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Err ShopId Check");
  }
});

// --- Get Shop info ---
router.get("/:id", async (req, res) => {
  const s_id = req.params.id;

  // console.log("Hello from serger custReq: s_id:", s_id);

  try {
    const products = await pool.query(
      `SELECT * FROM shops
            WHERE s_id = $1`,
      [s_id]
    );

    return res.json(products.rows[0]);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Err ShopId Check");
  }
});

// --- Get Product info ---
router.get("/product/:id", async (req, res) => {
  const p_id = req.params.id;

  // console.log("Hello from serger custReq: s_id:", p_id);

  try {
    const products = await pool.query(
      `SELECT * FROM products
            WHERE p_id = $1`,
      [p_id]
    );

    return res.json(products.rows[0]);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Err ShopId Check");
  }
});

// --- Submit Report ---
// --- Submit Non-Registered Shop Report ---
router.post("/submit-report-non-reg", async (req, res) => {
  const reportData = req.body;

  try {
    // Destructure reportData
    const {
      currentDateTime,
      currentLocation,
      c_phone,
      c_name,
      c_frontNID,
      c_backNID,
      c_selfiePhoto,
      shopName,
      division,
      district,
      subDistrict,
      UC,
      Word,
      Road,
      shopPhoto,
      productName,
      productPhoto,
      s_report_description,
      status,
    } = reportData;

    // console.log("from Report-----------", reportData);

    // Insert the non-reg report into the database
    await pool.query(
      `INSERT INTO nonregreports (s_name, s_div, s_dist, s_subdist, s_union, s_word, s_road, s_location, s_photo, p_name, p_photo, c_name,c_phone,  c_frontnid, c_backnid, c_selfiephoto, s_report_description, date_time, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
      [
        shopName,
        division,
        district,
        subDistrict,
        UC,
        Word,
        Road,
        currentLocation,
        shopPhoto,
        productName,
        productPhoto,
        c_name,
        c_phone,
        c_frontNID,
        c_backNID,
        c_selfiePhoto,
        s_report_description,
        currentDateTime,
        status,
      ]
    );

    res.status(200).send("Report submitted successfully");
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).send("Failed to submit report");
  }
});

// --- Submit Registered Shop Report ---
router.post("/submit-report", async (req, res) => {
  const reportData = req.body;

  console.log("Cust data : --- ",);

  try {
    // Destructure reportData
    const {
      s_id,
      s_name,
      s_phone,
      s_frontNID,
      s_backNID,
      s_div,
      s_dist,
      s_subdist,
      s_union,
      s_word,
      s_road,
      s_location,
      c_phone,
      c_name,
      c_selfiePhoto,
      c_frontNID,
      c_backNID,
      s_report_description,
      date_time,
      p_name,
      p_photo, // Product photo
      s_photo,
      status,
    } = reportData;

    // console.log("from backend report--------------",reportData);

    // Insert the report into the database
    await pool.query(
      `INSERT INTO reports (s_id, s_name, s_phone, s_frontnid, s_backnid, s_div, s_dist, s_subdist, s_union, s_word, s_road, s_location, c_phone, c_name, c_frontnid, c_backnid, c_selfiephoto, s_report_description, date_time, p_name, p_photo, s_photo, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15 , $16, $17, $18, $19, $20, $21, $22, $23)`,
      [
        s_id,
        s_name,
        s_phone,
        s_frontNID,
        s_backNID,
        s_div,
        s_dist,
        s_subdist,
        s_union,
        s_word,
        s_road,
        s_location,
        c_phone,
        c_name,
        c_frontNID,
        c_backNID,
        c_selfiePhoto,
        s_report_description,
        date_time,
        p_name,
        p_photo,
        s_photo,
        status,
      ]
    );

    res.status(200).send("Report submitted successfully");
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).send("Failed to submit report");
  }
});

module.exports = router;
