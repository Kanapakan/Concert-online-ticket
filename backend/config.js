const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'database-1.cewrrwfpydet.us-east-1.rds.amazonaws.com',
  user: 'root',
  password: '62070040',
  database: 'concert',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;