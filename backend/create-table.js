const pool = require('./db');

async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      deadline DATE NOT NULL,
      is_complete BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  try {
    await pool.query(query);
    console.log('✅ Tasks table created successfully');
  } catch (err) {
    console.error('❌ Error creating table:', err.message);
  } finally {
    pool.end();
  }
}

createTable();