import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('profiles.db');

// Create profiles table if it does not exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY,
    username TEXT
  )`, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created successfully');
    }
  });
});

export default db;
