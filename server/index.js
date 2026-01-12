const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-this';

app.use(cors());
app.use(bodyParser.json());

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../client/dist')));

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Username and password required" });

    const hashedPassword = bcrypt.hashSync(password, 8);
    
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(sql, [username, hashedPassword], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: "Username already exists" });
            }
            return res.status(500).json({ error: err.message });
        }
        const token = jwt.sign({ id: this.lastID, username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: "User registered", token, user: { id: this.lastID, username } });
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(400).json({ error: "User not found" });

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: "Login success", token, user: { id: user.id, username: user.username } });
    });
});

app.get('/api/assets', authenticateToken, (req, res) => {
  const sql = "SELECT * FROM assets WHERE user_id = ? ORDER BY purchase_date DESC";
  db.all(sql, [req.user.id], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

app.post('/api/assets', authenticateToken, (req, res) => {
  const { name, category, purchase_date, store, price, resale_price, photo_url, location, notes } = req.body;
  const sql = `INSERT INTO assets (user_id, name, category, purchase_date, store, price, resale_price, photo_url, location, notes) VALUES (?,?,?,?,?,?,?,?,?,?)`;
  const params = [req.user.id, name, category, purchase_date, store, price, resale_price, photo_url, location, notes];
  
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": { id: this.lastID, user_id: req.user.id, ...req.body },
      "id": this.lastID
    });
  });
});

app.put('/api/assets/:id', authenticateToken, (req, res) => {
  const { name, category, purchase_date, store, price, resale_price, photo_url, location, notes } = req.body;
  const sql = `UPDATE assets SET name=?, category=?, purchase_date=?, store=?, price=?, resale_price=?, photo_url=?, location=?, notes=? WHERE id=? AND user_id=?`;
  const params = [name, category, purchase_date, store, price, resale_price, photo_url, location, notes, req.params.id, req.user.id];
  
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": { id: req.params.id, user_id: req.user.id, ...req.body },
      "changes": this.changes
    });
  });
});

app.delete('/api/assets/:id', authenticateToken, (req, res) => {
    const sql = 'DELETE FROM assets WHERE id = ? AND user_id = ?';
    db.run(sql, [req.params.id, req.user.id], function (err, result) {
        if (err) {
            res.status(400).json({ "error": res.message });
            return;
        }
        res.json({ message: "deleted", changes: this.changes });
    });
});

// Catch all for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
