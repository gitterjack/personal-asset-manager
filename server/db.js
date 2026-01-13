const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DB_PATH || path.resolve(__dirname, 'assets.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to the SQLite database.');
    
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          gender TEXT,
          age INTEGER,
          job TEXT,
          location TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (!err) {
                // Auto-migration for existing tables
                const columns = ['gender', 'age', 'job', 'location'];
                columns.forEach(col => {
                    db.run(`ALTER TABLE users ADD COLUMN ${col} TEXT`, (err) => {
                        // Ignore error if column exists
                    });
                });
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS assets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          name TEXT NOT NULL,
          category TEXT NOT NULL,
          purchase_date TEXT NOT NULL,
          store TEXT,
          price REAL NOT NULL,
          resale_price REAL,
          photo_url TEXT,
          location TEXT,
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(user_id) REFERENCES users(id)
        )`);
    });
  }
});

module.exports = db;
