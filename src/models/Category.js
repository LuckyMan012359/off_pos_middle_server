const pool = require('../config/db');

const createUser = async (username) => {
  const [existingUser] = await pool.query('SELECT * FROM tbl_users WHERE email_address = ?', [
    username,
  ]);
  if (existingUser.length > 0) {
    throw new Error('Username already exists');
  }
  const [result] = await pool.query('INSERT INTO tbl_users (email_address) VALUES (?)', [username]);
  return { user_id: result.id, username, skillpoints: 0 };
};

module.exports = {
  createUser,
};
