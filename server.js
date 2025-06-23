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

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Save cart for logged-in user
app.post('/api/cart', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const cart = JSON.stringify(req.body.cart || []);
  const db = await mysql.createConnection(dbConfig);
  await db.execute('REPLACE INTO carts (user_id, cart) VALUES (?, ?)', [userId, cart]);
  db.end();
  res.json({ success: true });
});

// Load cart for logged-in user
app.get('/api/cart', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const db = await mysql.createConnection(dbConfig);
  const [rows] = await db.execute('SELECT cart FROM carts WHERE user_id = ?', [userId]);
  db.end();
  res.json({ cart: rows.length ? JSON.parse(rows[0].cart) : [] });
});

// --- EVENTS CRUD API ---
// CREATE event
app.post('/api/events', adminAuthMiddleware, async (req, res) => {
  const { title, date, location, price, description } = req.body;
  if (!title || !date || !location || price === undefined) {
    return res.status(400).json({ success: false, message: 'All fields required.' });
  }
  const db = await mysql.createConnection(dbConfig);
  try {
    await db.execute('INSERT INTO events (title, date, location, price, description) VALUES (?, ?, ?, ?, ?)', [title, date, location, price, description]);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false, message: 'Failed to add event.' });
  } finally {
    db.end();
  }
});

// READ all events
app.get('/api/events', async (req, res) => {
  const db = await mysql.createConnection(dbConfig);
  const [rows] = await db.execute('SELECT * FROM events');
  db.end();
  res.json(rows);
});

// READ single event
app.get('/api/events/:id', async (req, res) => {
  const { id } = req.params;
  const db = await mysql.createConnection(dbConfig);
  try {
    const [rows] = await db.execute('SELECT * FROM events WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to fetch event.' });
  } finally {
    db.end();
  }
});

// UPDATE event
app.put('/api/events/:id', adminAuthMiddleware, async (req, res) => {
  const { title, date, location, price, description } = req.body;
  const { id } = req.params;
  if (!title || !date || !location || price === undefined) {
    return res.status(400).json({ success: false, message: 'All fields required.' });
  }
  const db = await mysql.createConnection(dbConfig);
  try {
    await db.execute('UPDATE events SET title=?, date=?, location=?, price=?, description=? WHERE id=?', [title, date, location, price, description, id]);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false, message: 'Failed to update event.' });
  } finally {
    db.end();
  }
});

// DELETE event
app.delete('/api/events/:id', adminAuthMiddleware, async (req, res) => {
  const { id } = req.params;
  const db = await mysql.createConnection(dbConfig);
  try {
    await db.execute('DELETE FROM events WHERE id=?', [id]);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false, message: 'Failed to delete event.' });
  } finally {
    db.end();
  }
});

app.post('/api/orders', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const username = req.user.username;
  const { items } = req.body;
  console.log('Order attempt:', { userId, username, items });
  if (!Array.isArray(items) || items.length === 0) {
    console.log('Order failed: No items in order.');
    return res.status(400).json({ success: false, message: 'No items in order.' });
  }
  const db = await mysql.createConnection(dbConfig);
  try {
    await db.execute(
      'INSERT INTO orders (user_id, username, order_date, items) VALUES (?, ?, NOW(), ?)', 
      [userId, username, JSON.stringify(items)]
    );
    res.json({ success: true });
  } catch (e) {
    console.error('Order DB error:', e);
    res.status(500).json({ success: false, message: 'Failed to save order.' });
  } finally {
    db.end();
  }
});

function adminAuthMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err || user.username !== 'admin') return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get('/api/orders', adminAuthMiddleware, async (req, res) => {
  const db = await mysql.createConnection(dbConfig);
  const [rows] = await db.execute('SELECT * FROM orders ORDER BY order_date DESC LIMIT 50');
  db.end();

  const orders = rows.map(row => ({
    id: row.id,
    username: row.username,
    date: row.order_date,
    items: JSON.parse(row.items)
  }));
  res.json(orders);
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
