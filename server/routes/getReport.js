const router = require("express").Router();
const pool = require("../db");

// Assuming you have already set up your database connection and Express server

// Define route to fetch shops and their reports
// app.get('/shops', async (req, res) => {
//     try {
//       const client = await pool.connect();
//       const result = await client.query('SELECT * FROM reports');
//       const shopsWithReports = {};

//       // Group reports by shop ID
//       result.rows.forEach(row => {
//         if (!shopsWithReports[row.s_id]) {
//           shopsWithReports[row.s_id] = {
//             shopName: row.s_name,
//             s_phone: row.s_phone,
//             s_div,
//             s_dist,
//             s_subdist,
//             s_union,
//             s_word,
//             s_road,
//             s_location,

//             reports: [],
//             reportsCount: 0
//           };
//         }
//         shopsWithReports[row.s_id].reports.push({
//           r_id: row.r_id,
//         //   s_name: row.s_name,
//           p_name: row.p_name,
//           p_photo: row.p_photo,
//           c_nmae: row.c_name,
//           c_phone: row.c_phone,
//           description: row.s_report_description,
//           r_status: row.status
//         });
//         shopsWithReports[row.s_id].reportsCount++;
//       });

//       // Convert the object to an array of shops
//       const shops = Object.values(shopsWithReports);
//       client.release();
//       res.json(shops);
//     } catch (error) {
//       console.error('Error fetching shops and reports:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

// Fetch all Reg shops and their reports
router.get("/shops", async (req, res) => {
  try {
    const query = `
        SELECT
        s_name,
        s_phone,
        s_photo,
        
        json_build_object(
            'address', json_build_object(
                's_div', s_div,
                's_dist', s_dist,
                's_subdist', s_subdist,
                's_union', s_union,
                's_word', s_word,
                's_road', s_road,
                's_location', s_location
            ),
            'reports', json_agg(json_build_object(
                'r_id', r_id,
                's_name', s_name,
                'c_phone', c_phone,
                'c_name', c_name,
                'c_phone', c_phone,
                'c_frontnid', c_frontnid,
                'c_backnid', c_backnid,
                'c_selfiephoto', c_selfiephoto,
                's_report_description', s_report_description,
                'date_time', date_time,
                'p_name', p_name,
                'p_photo', p_photo,
                
                'status', status
            )),
            'reportsCount', COUNT(CASE WHEN status = 'Unsolved' THEN 1 ELSE NULL END)
        ) AS shop_info
    FROM reports
    WHERE status = 'Unsolved'
    GROUP BY s_name, s_phone, s_photo,  s_div, s_dist, s_subdist, s_union, s_word, s_road, s_location;
    
        `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update the status of a report
router.put(
  "/regshops/updateStatus/:divisionID/:districtID/:subdistrictID/:unionID/:wordID/:roadID/:shopID",
  async (req, res) => {
    const {
      divisionID,
      districtID,
      subdistrictID,
      unionID,
      wordID,
      roadID,
      shopID,
    } = req.params;
    const { status } = req.body;

    // console.log("from server----------", req.params);

    try {
      // Update the status of the report in the database by union
      await pool.query(
        "UPDATE reports SET status = $1 WHERE s_div = $2 AND s_dist = $3 AND s_subdist = $4 AND  s_union = $5 AND s_word = $6 AND s_road = $7 AND s_name = $8",
        [
          status,
          divisionID,
          districtID,
          subdistrictID,
          unionID,
          wordID,
          roadID,
          shopID,
        ]
      );

      res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Fetch all Reg shops and their solved reports
router.get("/shopssolved", async (req, res) => {
  try {
    const query = `
        SELECT
        s_name,
        s_phone,
        s_photo,
        status,
        json_build_object(
            'address', json_build_object(
                's_div', s_div,
                's_dist', s_dist,
                's_subdist', s_subdist,
                's_union', s_union,
                's_word', s_word,
                's_road', s_road,
                's_location', s_location
            ),
            'reports', json_agg(json_build_object(
                'r_id', r_id,
                's_name', s_name,
                'c_phone', c_phone,
                'c_name', c_name,
                'c_phone', c_phone,
                'c_frontnid', c_frontnid,
                'c_backnid', c_backnid,
                'c_selfiephoto', c_selfiephoto,
                's_report_description', s_report_description,
                'date_time', date_time,
                'p_name', p_name,
                'p_photo', p_photo,
                'status', status
            )),
            'reportsCount', COUNT(CASE WHEN status = 'Solved' THEN 1 ELSE NULL END)
        ) AS shop_info
    FROM reports
    WHERE status = 'Solved'
    GROUP BY s_name, s_phone, s_photo, status, s_div, s_dist, s_subdist, s_union, s_word, s_road, s_location;
    
        `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all Non Reg shops and their reports
router.get("/nonreg/unions", async (req, res) => {
  try {
    const query = `
    WITH AggregatedReports AS (
      SELECT
          s_union,
          s_name,
          s_div,
          s_dist,
          s_subdist,
          s_road,
          s_word,
          json_build_object(
              'address', json_build_object(
                  's_div', s_div,
                  's_name', s_name,
                  's_dist', s_dist,
                  's_subdist', s_subdist,
                  's_union', s_union,
                  's_road', s_road,
                  's_word', s_word,
                  's_location', MAX(s_location) -- Store s_location in address
              ),
              'reports', json_agg(
                  json_build_object(
                      'r_id', r_id,
                      's_name', s_name,
                      'p_photo', p_photo,
                      's_photo', s_photo,
                      'c_phone', c_phone,
                      'c_name', c_name,
                      'c_frontnid', c_frontnid,
                      'c_backnid', c_backnid,
                      'c_selfiephoto', c_selfiephoto,
                      's_report_description', s_report_description,
                      'date_time', date_time,
                      'p_name', p_name,
                      'status', status
                  )
              ),
              'report_count', COUNT(*) FILTER (WHERE status = 'Unsolved') -- Count of reports for the shop
          ) AS shop_info,
          COUNT(*) FILTER (WHERE status = 'Unsolved') AS shop_reports_count
      FROM nonregreports
      WHERE status = 'Unsolved'
      GROUP BY s_union, s_name, s_div, s_dist, s_subdist, s_road, s_word
  )
  SELECT
      s_union,
      s_div,
      s_dist,
      s_subdist,
      json_build_object(
          'shop_info',
          json_object_agg(s_name || '_' || s_word || '_' || s_road, shop_info) -- Include s_word in the key
      ) AS shop_info,
      COUNT(*) AS union_reports_count,
      SUM(shop_reports_count) AS total_shop_reports_count,
      SUM(COUNT(*)) OVER (PARTITION BY s_union, s_div, s_dist, s_subdist) AS total_union_reports_count
  FROM AggregatedReports
  GROUP BY s_union, s_div, s_dist, s_subdist;
  
        
        `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update the status of a report by union
router.put(
  "/nonreg/updateStatus/:divisionID/:districtID/:subdistrictID/:unionID",
  async (req, res) => {
    const { divisionID, districtID, subdistrictID, unionID } = req.params;
    const { status } = req.body;

    // console.log("from server----------", reportId);

    try {
      // Update the status of the report in the database by union
      await pool.query(
        "UPDATE nonregreports SET status = $1 WHERE s_div = $2 AND s_dist = $3 AND s_subdist = $4 AND  s_union = $5",
        [status, divisionID, districtID, subdistrictID, unionID]
      );

      res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Update the status of a report by shop name
router.put(
  "/nonregshops/updateStatus/:divisionID/:districtID/:subdistrictID/:unionID/:wordID/:roadID/:shopID",
  async (req, res) => {
    const {
      divisionID,
      districtID,
      subdistrictID,
      unionID,
      wordID,
      roadID,
      shopID,
    } = req.params;
    const { status } = req.body;

    // console.log("from server----------", reportId);

    try {
      // Update the status of the report in the database by union
      await pool.query(
        "UPDATE nonregreports SET status = $1 WHERE s_div = $2 AND s_dist = $3 AND s_subdist = $4 AND  s_union = $5 AND s_word = $6 AND s_road = $7 AND s_name = $8",
        [
          status,
          divisionID,
          districtID,
          subdistrictID,
          unionID,
          wordID,
          roadID,
          shopID,
        ]
      );

      res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Fetch all Reg shops and their solved reports
router.get("/nonreg/shopssolved", async (req, res) => {
  try {
    const query = `
        SELECT
        s_name,
        s_phone,
        s_photo,
        status,
        json_build_object(
            'address', json_build_object(
                's_div', s_div,
                's_dist', s_dist,
                's_subdist', s_subdist,
                's_union', s_union,
                's_word', s_word,
                's_road', s_road,
                's_location', s_location
            ),
            'reports', json_agg(json_build_object(
                'r_id', r_id,
                's_name', s_name,
                'c_phone', c_phone,
                'c_name', c_name,
                'c_phone', c_phone,
                'c_frontnid', c_frontnid,
                'c_backnid', c_backnid,
                'c_selfiephoto', c_selfiephoto,
                's_report_description', s_report_description,
                'date_time', date_time,
                'p_name', p_name,
                'p_photo', p_photo,
                'status', status
            )),
            'reportsCount', COUNT(CASE WHEN status = 'Solved' THEN 1 ELSE NULL END)
        ) AS shop_info
    FROM reports
    WHERE status = 'Solved'
    GROUP BY s_name, s_phone, s_photo, status, s_div, s_dist, s_subdist, s_union, s_word, s_road, s_location;
    
        `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Data fetch for Barchart

// Division

// For reg shop count by division
router.get("/reg/count_unsolved_solved_div/", async (req, res) => {
  try {
    const query = `
                SELECT 
            s_div,
            COUNT(CASE WHEN status = 'Solved' THEN 1 END) AS solved_reports,
            COUNT(CASE WHEN status = 'Unsolved' THEN 1 END) AS unsolved_reports
        FROM 
            reports
        GROUP BY 
            s_div;

        `;

    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// For Non-reg shop count by division
router.get("/nonreg/count_unsolved_solved_div/", async (req, res) => {
  try {
    const query = `
                SELECT 
            s_div,
            COUNT(CASE WHEN status = 'Solved' THEN 1 END) AS solved_reports,
            COUNT(CASE WHEN status = 'Unsolved' THEN 1 END) AS unsolved_reports
        FROM 
            nonregreports
        GROUP BY 
            s_div;

        `;

    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// District

// For reg shop count by district
router.get(
  "/reg/count_unsolved_solved_district/:divisionID",
  async (req, res) => {
    try {
      const divisionID = req.params.divisionID;

      const query = `
    SELECT 
        s_dist,
        COUNT(CASE WHEN status = 'Solved' THEN 1 END) AS solved_reports,
        COUNT(CASE WHEN status = 'Unsolved' THEN 1 END) AS unsolved_reports
    FROM 
        reports
    WHERE 
        s_div = $1
    GROUP BY 
        s_dist;
`;

      const { rows } = await pool.query(query, [divisionID]);
      res.json(rows);
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
);

// For Non-reg shop count by district
router.get(
  "/nonreg/count_unsolved_solved_district/:divisionID",
  async (req, res) => {
    try {
      const divisionID = req.params.divisionID;

      const query = `
                SELECT 
            s_dist,
            COUNT(CASE WHEN status = 'Solved' THEN 1 END) AS solved_reports,
            COUNT(CASE WHEN status = 'Unsolved' THEN 1 END) AS unsolved_reports
        FROM 
            nonregreports
            WHERE s_div = $1
        GROUP BY 
            s_dist;

        `;

      const { rows } = await pool.query(query, [divisionID]);
      res.json(rows);
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
);

//   SubDistrict

// For reg shop count by subdistrict
router.get(
  "/reg/count_unsolved_solved_subdistrict/:divisionID/:districtID",
  async (req, res) => {
    try {
      const { divisionID, districtID } = req.params;

      const query = `
    SELECT 
        s_subdist,
        COUNT(CASE WHEN status = 'Solved' THEN 1 END) AS solved_reports,
        COUNT(CASE WHEN status = 'Unsolved' THEN 1 END) AS unsolved_reports
    FROM 
        reports
    WHERE 
        s_div = $1 AND s_dist = $2
    GROUP BY 
        s_subdist;
`;

      const { rows } = await pool.query(query, [divisionID, districtID]);
      res.json(rows);
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
);

// For reg shop count by subdistrict
router.get(
  "/nonreg/count_unsolved_solved_subdistrict/:divisionID/:districtID",
  async (req, res) => {
    try {
      const { divisionID, districtID } = req.params;

      const query = `
    SELECT 
        s_subdist,
        COUNT(CASE WHEN status = 'Solved' THEN 1 END) AS solved_reports,
        COUNT(CASE WHEN status = 'Unsolved' THEN 1 END) AS unsolved_reports
    FROM 
        nonregreports
    WHERE 
        s_div = $1 AND s_dist = $2
    GROUP BY 
        s_subdist;
`;

      const { rows } = await pool.query(query, [divisionID, districtID]);
      res.json(rows);
    } catch (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
);

// solved nonreg

router.get("/nonreg/solved/unions", async (req, res) => {
  try {
    const query = `
    WITH AggregatedReports AS (
      SELECT
          s_union,
          s_name,
          s_div,
          s_dist,
          s_subdist,
          s_road,
          s_word,
          json_build_object(
              'address', json_build_object(
                  's_div', s_div,
                  's_name', s_name,
                  's_dist', s_dist,
                  's_subdist', s_subdist,
                  's_union', s_union,
                  's_road', s_road,
                  's_word', s_word,
                  's_location', MAX(s_location) -- Store s_location in address
              ),
              'reports', json_agg(
                  json_build_object(
                      'r_id', r_id,
                      's_name', s_name,
                      'p_photo', p_photo,
                      's_photo', s_photo,
                      'c_phone', c_phone,
                      'c_name', c_name,
                      'c_frontnid', c_frontnid,
                      'c_backnid', c_backnid,
                      'c_selfiephoto', c_selfiephoto,
                      's_report_description', s_report_description,
                      'date_time', date_time,
                      'p_name', p_name,
                      'status', status
                  )
              ),
              'report_count', COUNT(*) FILTER (WHERE status = 'Solved') -- Count of reports for the shop
          ) AS shop_info,
          COUNT(*) FILTER (WHERE status = 'Solved') AS shop_reports_count
      FROM nonregreports
      WHERE status = 'Solved'
      GROUP BY s_union, s_name, s_div, s_dist, s_subdist, s_road, s_word
  )
  SELECT
      s_union,
      s_div,
      s_dist,
      s_subdist,
      json_build_object(
          'shop_info',
          json_object_agg(s_name || '_' || s_word || '_' || s_road, shop_info) -- Include s_word in the key
      ) AS shop_info,
      COUNT(*) AS union_reports_count,
      SUM(shop_reports_count) AS total_shop_reports_count,
      SUM(COUNT(*)) OVER (PARTITION BY s_union, s_div, s_dist, s_subdist) AS total_union_reports_count
  FROM AggregatedReports
  GROUP BY s_union, s_div, s_dist, s_subdist;
  
        
        `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// --- Get all reports
router.get("/all-reports/:custPhone", async (req, res) => {
  try {
    const custPhone = req.params.custPhone;
    console.log("Type of phone: ", typeof custPhone);
    const query = `
        SELECT
        CASE
            WHEN EXISTS (
                SELECT 1
                FROM nonregreports AS nrg
                WHERE nrg.c_phone ILIKE '%${custPhone}'
            )
            THEN (
                SELECT json_agg(
                    json_build_object(
                        'nr_id', nrg.r_id,
                        's_name', nrg.s_name,
                        's_div', nrg.s_div,
                        's_dist', nrg.s_dist,
                        's_subdist', nrg.s_subdist,
                        's_union', nrg.s_union,
                        's_word', nrg.s_word,
                        's_road', nrg.s_road,
                        's_location', nrg.s_location,
                        'p_pname', nrg.p_name,
                        'c_phone', nrg.c_phone,
                        'c_name', nrg.c_name,
                        's_report_description', nrg.s_report_description,
                        'date_time', nrg.date_time,
                        'status', nrg.status,
                        's_photo', nrg.s_photo,
                        'p_photo', nrg.p_photo,
                        'c_frontnid', nrg.c_frontnid,
                        'c_backnid', nrg.c_backnid,
                        'c_selfiephoto', nrg.c_selfiephoto
                    )
                )
                FROM nonregreports AS nrg
                WHERE nrg.c_phone ILIKE '%${custPhone}'
            )
            ELSE NULL
        END AS nrg_reports,
        CASE
            WHEN EXISTS (
                SELECT 1
                FROM reports AS r
                WHERE r.c_phone ILIKE '%${custPhone}'
            )
            THEN (
                SELECT json_agg(
                    json_build_object(
                        'r_id', r.r_id,
                        's_id', r.s_id,
                        's_name', r.s_name,
                        's_phone', r.s_phone,
                        's_div', r.s_div,
                        's_dist', r.s_dist,
                        's_subdist', r.s_subdist,
                        's_union', r.s_union,
                        's_word', r.s_word,
                        's_road', r.s_road,
                        's_location', r.s_location,
                        'c_phone', r.c_phone,
                        'c_name', r.c_name,
                        's_report_description', r.s_report_description,
                        'date_time', r.date_time,
                        'p_name', r.p_name,
                        'status', r.status,
                        'c_frontNID', r.c_frontNID,
                        'c_backNID', r.c_backNID,
                        'c_selfiePhoto', r.c_selfiePhoto,
                        'p_photo', r.p_photo,
                        's_photo', r.s_photo
                    )
                )
                FROM reports AS r
                WHERE r.c_phone ILIKE '%${custPhone}'
            )
            ELSE NULL
        END AS rg_reports

    `;

    const { rows } = await pool.query(query);
    const reportData = rows[0];
    console.log("!!!! Back end ------ ", rows[0]);
    res.json(reportData);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

// --- Get all reports for shop
router.get("/all-reports/shop/:shopPhone", async (req, res) => {
  try {
    const shopPhone = req.params.shopPhone;
    const query = `
      SELECT r_id, s_id, date_time, s_report_description, p_photo, p_name, status
      FROM reports
      WHERE s_phone = $1 AND status = 'Unsolved';
    `;

    const { rows } = await pool.query(query, [shopPhone]);
    res.json(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

module.exports = router;

// // Fetch all Reg shops and their reports
// router.get("/nonreg/unions", async (req, res) => {
//     try {
//         const query = `
//         WITH AggregatedReports AS (
//             SELECT
//                 s_union,
//                 s_name,
//                 json_build_object(
//                     'address', json_build_object(
//                         's_div', s_div,
//                         's_dist', s_dist,
//                         's_subdist', s_subdist,
//                         's_union', s_union,
//                         's_word', s_word,
//                         's_road', s_road,
//                         's_location', s_location
//                     ),
//                     'reports', json_agg(
//                         json_build_object(
//                             'r_id', r_id,
//                             's_name', s_name,
//                             's_photo', s_photo,
//                             'c_phone', c_phone,
//                             'c_name', c_name,
//                             'c_frontnid', c_frontnid,
//                             'c_backnid', c_backnid,
//                             'c_selfiephoto', c_selfiephoto,
//                             's_report_description', s_report_description,
//                             'date_time', date_time,
//                             'p_name', p_name,
//                             'status', status
//                         )
//                     )
//                 ) AS shop_info,
//                 COUNT(*) FILTER (WHERE s_name = nonregreports.s_name) AS shop_reports_count
//             FROM nonregreports
//             WHERE status = 'Unsolved'
//             GROUP BY s_union, s_name, s_div, s_dist, s_subdist, s_word, s_road, s_location
//         )
//         SELECT
//             s_union,
//             json_build_object(
//                 'shop_info',
//                 json_object_agg(s_name, shop_info)
//             ) AS shop_info,
//             COUNT(*) AS union_reports_count,
//             SUM(shop_reports_count) AS total_shop_reports_count,
//             SUM(COUNT(*)) OVER (PARTITION BY s_union) AS total_union_reports_count
//         FROM AggregatedReports
//         GROUP BY s_union;
//         `;
//         const { rows } = await pool.query(query);
//         res.json(rows);
//     } catch (error) {
//         console.error('Error fetching shops:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// SELECT
//     s_union,
//     jsonb_build_object(
//         'union_info', jsonb_build_object(
//             'reportsCounts', COUNT(*) FILTER (WHERE status = 'Unsolved'),
//             'shops', jsonb_object_agg(
//                 s_name,
//                 jsonb_build_object(
//                     'address', jsonb_build_object(
//                         's_div', s_div,
//                         's_dist', s_dist,
//                         's_subdist', s_subdist,
//                         's_union', s_union,
//                         's_word', s_word,
//                         's_road', s_road,
//                         's_location', s_location
//                     ),
//                     'reports', json_agg(jsonb_build_object(
//                         'r_id', r_id,
//                         's_name', s_name,
//                         'customer', jsonb_build_object(
//                             'c_name', c_name,
//                             'c_phone', c_phone,
//                             'c_frontnid', c_frontnid,
//                             'c_backnid', c_backnid,
//                             'c_selfiephoto', c_selfiephoto
//                         ),
//                         's_report_description', s_report_description,
//                         'date_time', date_time,
//                         'product', jsonb_build_object(
//                             'p_name', p_name,
//                             'p_photo', p_photo
//                         ),
//                         'status', status
//                     ))
//                 )
//             )
//         )
//     ) AS shop_info
// FROM reports
// WHERE status = 'Unsolved'
// GROUP BY s_union, s_div, s_dist, s_subdist, s_word, s_road, s_location;

// SELECT
//     s_union,
//     json_build_object(
//         'union_info', json_build_object(
//             s_union,
//             json_build_object(
//                 'address', json_build_object(
//                     's_div', s_div,
//                     's_dist', s_dist,
//                     's_subdist', s_subdist,
//                     's_union', s_union,
//                     's_word', s_word,
//                     's_road', s_road,
//                     's_location', s_location
//                 ),
//                 'reports', json_agg(json_build_object(
//                     'r_id', r_id,
//                     's_name', s_name,
//                     'customer', json_build_object(
//                         'c_name', c_name,
//                         'c_phone', c_phone,
//                         'c_frontnid', c_frontnid,
//                         'c_backnid', c_backnid,
//                         'c_selfiephoto', c_selfiephoto
//                     ),
//                     's_report_description', s_report_description,
//                     'date_time', date_time,
//                     'product', json_build_object(
//                         'p_name', p_name,
//                         'p_photo', p_photo
//                     ),
//                     'status', status
//                 )),
//                 'reportsCounts', COUNT(CASE WHEN status = 'Unsolved' THEN 1 ELSE NULL END)
//             )
//         ),
//         'shop_info', json_build_object(
//             s_name,
//             json_build_object(
//                 'address', json_build_object(
//                     's_div', s_div,
//                     's_dist', s_dist,
//                     's_subdist', s_subdist,
//                     's_union', s_union,
//                     's_word', s_word,
//                     's_road', s_road,
//                     's_location', s_location
//                 ),
//                 'reports', json_agg(json_build_object(
//                     'r_id', r_id,
//                     's_name', s_name,
//                     'customer', json_build_object(
//                         'c_name', c_name,
//                         'c_phone', c_phone,
//                         'c_frontnid', c_frontnid,
//                         'c_backnid', c_backnid,
//                         'c_selfiephoto', c_selfiephoto
//                     ),
//                     's_report_description', s_report_description,
//                     'date_time', date_time,
//                     'product', json_build_object(
//                         'p_name', p_name,
//                         'p_photo', p_photo
//                     ),
//                     'status', status
//                 )),
//                 'reportsCounts', COUNT(CASE WHEN status = 'Unsolved' THEN 1 ELSE NULL END)
//             )
//         )
//     ) AS report_info
// FROM reports
// WHERE status = 'Unsolved'
// GROUP BY s_union, s_div, s_dist, s_subdist, s_union, s_word, s_road, s_location, s_name;

// SELECT
//     s_union,
//     json_build_object(
//         'union_info',
//         json_build_object(
//             'reportsCount', COUNT(*) FILTER (WHERE status = 'Unsolved')
//         ),
//         'shop_info',
//         json_build_object(
//             s_name,
//             json_build_object(
//                 'address', json_build_object(
//                     's_div', s_div,
//                     's_dist', s_dist,
//                     's_subdist', s_subdist,
//                     's_union', s_union,
//                     's_word', s_word,
//                     's_road', s_road,
//                     's_location', s_location
//                 ),
//                 'reports', json_agg(json_build_object(
//                     'r_id', r_id,
//                     'c_phone', c_phone,
//                     'c_name', c_name,
//                     'c_frontnid', c_frontnid,
//                     'c_backnid', c_backnid,
//                     'c_selfiephoto', c_selfiephoto,
//                     's_report_description', s_report_description,
//                     'date_time', date_time,
//                     'p_name', p_name,
//                     'p_photo', p_photo,
//                     'status', status
//                 ))
//             )
//         )
//     ) AS result
// FROM reports
// WHERE status = 'Unsolved'
// GROUP BY s_union, s_name, s_div, s_dist, s_subdist, s_word, s_road, s_location;
