const router = require("express").Router();
const pool = require("../db");

// Route handler to fetch districts based on the selected division
router.get("/shop-loc/:division", async (req, res) => {
  const division = req.params.division;
  try {
    const districts = await pool.query(
      "SELECT DISTINCT district FROM locations WHERE division = $1",
      [division]
    );
    return res.json(districts.rows);
  } catch (error) {
    console.error("Error fetching districts:", error);
    return res.status(500).json({ error: "Failed to fetch districts" });
  }
});

// Route handler to fetch sub-districts based on the selected district
router.get("/shop-locsub/:district", async (req, res) => {
  const district = req.params.district;
  console.log("sub_dis-----------", district);
  try {
    const subDistricts = await pool.query(
      "SELECT DISTINCT upazila FROM locations WHERE district = $1",
      [district]
    );
    return res.json(subDistricts.rows);
  } catch (error) {
    console.error("Error fetching sub-districts:", error);
    return res.status(500).json({ error: "Failed to fetch sub-districts" });
  }
});

// Route handler to fetch sub-districts based on the selected district
router.get("/shop-locuc/:subdistrict", async (req, res) => {
  const subdistrict = req.params.subdistrict;
  console.log("sub_dis-----------", subdistrict);
  try {
    const UCs = await pool.query(
      "SELECT DISTINCT unions FROM locations WHERE upazila = $1",
      [subdistrict]
    );
    return res.json(UCs.rows);
  } catch (error) {
    console.error("Error fetching sub-districts:", error);
    return res.status(500).json({ error: "Failed to fetch sub-districts" });
  }
});

module.exports = router;
