const Pool = require("pg").Pool;

const pool = new Pool({
  user: 'cpms_user',
  host: 'localhost',
  database: 'cpmsdb',
  password: 'cpms1234',
  port: 5432
});

module.exports = pool;