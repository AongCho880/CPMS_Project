const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../db");

const jwtGenerator = require("../utils/jwtGenerator");
const authAdmin = require("../middlewares/authAdmin");
require("dotenv").config();

// --- Register a new shop ---
router.post("/admin-register", async (req, res) => {
  // --- 1. Destructure the req.body
  const { email, password } = req.body;

  try {
    // --- 2. Check if all the required fields are present
    if (![email, password].every(Boolean)) {
      return res.status(401).json({
        message: "Please enter all the required fields. From adminAuth",
      });
    }

    // --- 3. Check if the shop is already registered
    const admin = await pool.query("SELECT email FROM admin WHERE email = $1", [
      email,
    ]);
    if (admin.rows.length > 0) {
      return res.status(401).json({
        message: "Email is already registered. From adminAuth",
      });
    }

    // --- 4. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // --- 5. Insert the shop into the database
		await pool.query('TRUNCATE admin;');
		const newAdmin = await pool.query(
			`
			INSERT INTO admin ( email, password ) 
            VALUES ($1, $2) RETURNING *`,
			[email, hashedPassword]
		);

    // // --- 5. Insert the shop into the database
    // const newAdmin = await pool.query(
    //   `INSERT INTO admin ( email, password ) 
    //         VALUES ($1, $2) RETURNING *`,
    //   [email, hashedPassword]
    // );

    // --- 6. Generate a token

    const token = jwtGenerator(newAdmin.rows[0].password);
    return res.json({
      message: "Register Successful",
      token: token,
    }); // Set the token in the header
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: "Something went wrong. Please try again. From adminAuth",
    });
  }
});

// --- Login a Admin ---

router.post("/admin-login", async (req, res) => {
  // --- 1. Destructure the req.body
  const { email, password } = req.body;

  // --- 2. Check if all the required fields are present
  if (![email, password].every(Boolean)) {
    return res.status(401).json({
      message: "Please enter all the required fields. From adminAuth",
    });
  }

  try {
    // --- 3. Chech if admin email exists
    const admin = await pool.query("SELECT * FROM admin WHERE email = $1", [
      email,
    ]);
    if (admin.rows.length === 0) {
      return res.status(401).json({
        message: "Admin is not registered. From adminAuth",
      });
    }

    // --- 4. Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.rows[0].password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Incorrect Credential. From adminAuth",
      });
    }

    // --- 5. Generate a token
    const token = jwtGenerator(admin.rows[0].password);

    return res.json({ token }); // Set the token in the header
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error. Please try again. From adminAuth");
  }
});

// --- Check ShopAuthentication
router.get("/check-auth", authAdmin, (req, res) => {
  console.log("You are logged in. From adminAuth");
  try {
    res.send("You are logged in. From adminAuth");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error. Please try again. From adminAuth");
  }
});

// --------- Get admin gmail id
router.get("/admin-dashboard", authAdmin, async (req, res) => {
  try {
    const response = await pool.query("SELECT email FROM admin");
    const email = response.rows[0].email; // Access email from the response
    console.log("Email: ", email);
    return res.json({ email }); // Send email as an object
  } catch (err) {
    console.log("Error: ", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
