const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'assets.db');
const db = new sqlite3.Database(dbPath);

const newPassword = '123';
const hashedPassword = bcrypt.hashSync(newPassword, 8);

db.run(`UPDATE users SET password = ? WHERE username = 'admin'`, [hashedPassword], function(err) {
    if (err) {
        console.error("Error resetting password:", err);
    } else {
        console.log(`Password for 'admin' reset to '${newPassword}'. Changes: ${this.changes}`);
    }
    db.close();
});
