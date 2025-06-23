const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const dbConfig = { host: 'localhost', user: 'root', password: '', database: 'ticketshop' };

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields required.' });
  }
  const hash = await bcrypt.hash(password, 10);
  const db = await mysql.createConnection(dbConfig);
  try {
    await db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash]);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false, message: 'User already exists or invalid data.' });
  } finally {
    db.end();
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'All fields required.' });
  }
  const db = await mysql.createConnection(dbConfig);
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  db.end();
  if (rows.length && await bcrypt.compare(password, rows[0].password)) {
    const token = jwt.sign({ id: rows[0].id, username: rows[0].username }, 'your_jwt_secret');
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
