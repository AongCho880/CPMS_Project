const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const fs = require('fs');
const path = require('path');

const jwtGenerator = require("../utils/jwtGenerator");
const shopAuth = require("../middlewares/shopAuth");
require("dotenv").config();



// --- Register a new shop ---
router.post("/shop-register", async (req, res) => {
	// --- 1. Destructure the req.body
	const {s_name, s_password, s_div, s_dist, s_subdist, s_union, s_word, s_road, s_frontNID,s_backNID,s_Photo,s_selfiePhoto, s_location } = req.body;
	let { s_phone } = req.body;

	try {
		// --- 2. Check if all the required fields are present
		if (![s_name, s_phone, s_password, s_div, s_dist, s_subdist, s_union, s_word, s_road, s_frontNID,s_backNID,s_Photo,s_selfiePhoto, s_location].every(Boolean)) {
			return res.status(401).json({
				message: "Please enter all the required fields. From jwtAuth",
			});
		}

		// --- 3. Check if the shop is already registered
		s_phone = s_phone.replace(/[^\d+]/g, "");
		const shop = await pool.query(
			"SELECT s_phone FROM shops WHERE s_phone = $1",
			[s_phone]
		);
		if (shop.rows.length > 0) {
			return res.status(401).json({
				message: "The shop is already registered. From jwtAuth",
			});
		}

		// --- 4. Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(s_password, salt);

		// --- 5. Insert the shop into the database
		const newShop = await pool.query(
			`INSERT INTO shops (s_name, s_phone, s_password, s_div, s_dist, s_subdist, s_union, s_word, s_road, s_frontNID,s_backNID,s_Photo,s_selfiePhoto, s_location) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12, $13, $14) RETURNING *`,
			[s_name, s_phone, hashedPassword, s_div, s_dist, s_subdist, s_union, s_word, s_road, s_frontNID,s_backNID,s_Photo,s_selfiePhoto, s_location]
		);

		// --- 6. Generate a token

		const token = jwtGenerator(newShop.rows[0].s_phone);
		return res.json({ token }); // Set the token in the header
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({
			message: "Something went wrong. Please try again. From jwtAuth",
		});
	}
});  



// --- Login a shop ---
router.post("/shop-login", async (req, res) => {
	// --- 1. Destructure the req.body
	let { s_phone } = req.body;
	const { s_password } = req.body;

	// --- 2. Check if all the required fields are present
	console.log("From shop login server: ", s_phone, s_password);
	if (![s_phone, s_password].every(Boolean)) {
		return res.status(401).json({
			message: "Please enter all the required fields. From jwtAuth",
		});
	}

	try {
		// --- Remove all the non-numeric characters from the phone number
		s_phone = s_phone.replace(/[^\d+]/g, "");

		// --- 3. Check if the shop is already registered
		const shop = await pool.query(
			"SELECT * FROM shops WHERE s_phone = $1",
			[s_phone]
		);
		if (shop.rows.length === 0) {
			return res.status(401).json({
				message: "The shop is not registered. From jwtAuth",
			});
		}

		// --- 4. Check if the password is correct
		const isPasswordCorrect = await bcrypt.compare(
			s_password,
			shop.rows[0].s_password
		);

		if (!isPasswordCorrect) {
			return res.status(401).json({
				message: "Incorrect Credential. From jwtAuth",
			});
		}

		// --- 5. Generate a token
		const token = jwtGenerator(shop.rows[0].s_phone);

		return res.json({ token }); // Set the token in the header
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error. Please try again. From jwtAuth");
	}
});



// --- Register a new customer ---
router.post("/cust-register", async (req, res) => {
	console.log("Hello I am from cust reg backend");
    // Destructure the request body
    const {
        c_name,
        c_phone,
        c_password,
        c_frontNID, // Base64 encoded image data
        c_backNID, // Base64 encoded image data
        c_selfiePhoto // Base64 encoded image data
    } = req.body;

    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(c_password, salt);
		
        // // Decode Base64 encoded image data to binary
        // const frontNIDBinary = Buffer.from(c_frontNID, 'base64');
        // const backNIDBinary = Buffer.from(c_backNID, 'base64');
        // const selfiePhotoBinary = Buffer.from(c_selfiePhoto, 'base64');
		
        // Insert the customer into the database
        const newCustomer = await pool.query(
            `INSERT INTO customers (c_name, c_phone, c_password, c_frontNID, c_backNID, c_selfiePhoto) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [
                c_name,
                c_phone,
                hashedPassword,
                c_frontNID,
                c_backNID,
                c_selfiePhoto
            ]
        );

		// console.log("from JWT auth: ", selfiePhotoBinary);

        // Return success response
        return res.status(201).json({ message: "Customer registered successfully." });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error." });
    }
});

  

// --- Login a Customer ---

router.post("/cust-login", async (req, res) => {
	// --- 1. Destructure the req.body
	let { c_phone } = req.body;
	const { c_password } = req.body;

	// --- 2. Check if all the required fields are present
	console.log("From shop login server: ", c_phone, c_password);
	if (![c_phone, c_password].every(Boolean)) {
		return res.status(401).json({
			message: "Please enter all the required fields. From jwtAuth",
		});
	}

	try {
		// --- Remove all the non-numeric characters from the phone number
		c_phone = c_phone.replace(/[^\d+]/g, "");

		// --- 3. Check if the shop is already registered
		const customer = await pool.query(
			"SELECT * FROM customers WHERE c_phone = $1",
			[c_phone]
		);
		if (customer.rows.length === 0) {
			return res.status(401).json({
				message: "The customer is not registered. From jwtAuth",
			});
		}

		// --- 4. Check if the password is correct
		const isPasswordCorrect = await bcrypt.compare(
			c_password,
			customer.rows[0].c_password
		);

		if (!isPasswordCorrect) {
			return res.status(401).json({
				message: "Incorrect Credential. From jwtAuth",
			});
		}

		// --- 5. Generate a token
		const token = jwtGenerator(customer.rows[0].c_phone);

		return res.json({ token }); // Set the token in the header
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error. Please try again. From jwtAuth");
	}
});



// --- Check ShopAuthentication
router.get("/check-auth", shopAuth, (req, res) => {
	console.log("You are logged in. From jwtAuth");
	try {
		res.json({ message: "You are logged in. From jwtAuth" });
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server Error. Please try again. From jwtAuth");
	}
});




module.exports = router;
