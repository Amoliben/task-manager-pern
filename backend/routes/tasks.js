const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all tasks (sorted by deadline soonest first)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY deadline ASC, created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  const { title, description, deadline } = req.body;
  if (!title || !deadline) {
    return res.status(400).json({ error: 'Title and deadline are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, deadline) VALUES ($1, $2, $3) RETURNING *',
      [title, description || null, deadline]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// PUT (full update OR toggle complete)
// Supports both:
// 1. Toggle: { "is_complete": true/false }
// 2. Full edit: { "title": "...", "description": "...", "deadline": "YYYY-MM-DD" }
// 3. Partial edit: any combination of fields
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, deadline, is_complete } = req.body;
  
  try {
    let query, params;
    // Build dynamic update based on provided fields
    const updates = [];
    const values = [];
    let idx = 1;
    
    if (title !== undefined) {
      updates.push(`title = $${idx++}`);
      values.push(title);
    }
    if (description !== undefined) {
      updates.push(`description = $${idx++}`);
      values.push(description);
    }
    if (deadline !== undefined) {
      updates.push(`deadline = $${idx++}`);
      values.push(deadline);
    }
    if (is_complete !== undefined) {
      updates.push(`is_complete = $${idx++}`);
      values.push(is_complete);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    
    query = `UPDATE tasks SET ${updates.join(', ')} WHERE id = $${idx} RETURNING *`;
    values.push(id);
    
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;