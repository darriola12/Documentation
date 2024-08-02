import pool from '../config/db.js';

export const getTies = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ties');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};