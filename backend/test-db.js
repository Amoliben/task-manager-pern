const pool = require('./db');

async function test() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connected:', res.rows[0]);
  } catch (err) {
    console.error('Database error:', err.message);
  }
}

test();