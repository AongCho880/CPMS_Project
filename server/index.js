// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser module
const pool = require('./db');

const app = express();

// Middleware
app.use(cors());

// Increase payload size limit (10MB in this example)
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/admin', require('./routes/adminAuth'));
app.use('/auth', require('./routes/jwtAuth'));
app.use('/auth', require('./routes/shopDash'));
app.use('/auth', require('./routes/custDash'));
app.use('/products', require('./routes/getProducts'));
app.use('/shop', require('./routes/custReq'));
app.use('/location', require('./routes/locationReq'));
app.use('/adminreport', require('./routes/getReport'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
