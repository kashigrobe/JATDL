const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

function initDb(db_path, db_name) {
  let db;
  const dbFilePath = path.join(db_path, db_name);

  if (fs.existsSync(dbFilePath)) {
    console.log('Database already exists. Skipping initialization.');
    db = new sqlite3.Database(dbFilePath);
    return db;
  }

  db = new sqlite3.Database(dbFilePath, (err) => {
    if (err) {
      console.log('Could not connect to database', err);
      return null;
    } else {
      console.log('Connected to database');
    }
  });

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        title TEXT,
        description TEXT,
        due_date TEXT,
        completed INTEGER
      );
    `, (err) => {
      if (err) {
        console.log('Error creating tasks table', err);
      }
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE
      );
    `, (err) => {
      if (err) {
        console.log('Error creating users table', err);
      }
    });
  });

  return db;
}

function registerEmail(db, email) {
  const sql = `
    INSERT INTO users(email)
    VALUES(?)
  `;
  db.run(sql, [email], (err) => {
    if (err) {
      console.log('Could not insert email into users table', err);
    }
  });
}

function addNewTask(db_path, db_name, email, title, description, due_date, completed) {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(`${db_path}/${db_name}`, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return reject(err);
      }

      const sql = `
        INSERT INTO tasks(email, title, description, due_date, completed)
        VALUES(?,?,?,?,?)
      `;

      db.run(sql, [email, title, description, due_date, completed], function(err) {
        if (err) {
          console.log('Could not insert task into tasks table', err);
          db.close();
          return reject(err);
        }
        console.log(`Task inserted with id ${this.lastID}`);
        db.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve(this.lastID);
        });
      });
    });
  });
}

// addNewTask('path_to_db', 'database_name.db', 'user@example.com', 'Task Title', 'Task Description', '2023-10-29', 0)
//     .then((taskId) => {
//         console.log('Task added successfully with ID:', taskId);
//     })
//     .catch(err => {
//         console.error('Failed to add task:', err);
//     });


function getTasksByUserEmail(db_path, db_name, email) {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(`${db_path}/${db_name}`, sqlite3.OPEN_READONLY, (err) => {
      if (err) {
        reject(err);
      }
    });

    let sql = `SELECT * FROM tasks WHERE email = ?`;
    db.all(sql, [email], (err, rows) => {
      db.close();
      if (err) {
        reject(err);
      }
      console.log(rows)
      resolve(rows);
    });
  });
}

function updateTask(db_path, db_name, taskId, title, description, due_date, completed) {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(`${db_path}/${db_name}`, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return reject(err);
      }

      const sql = `
        UPDATE tasks
        SET title = ?, description = ?, due_date = ?, completed = ?
        WHERE id = ?
      `;

      db.run(sql, [title, description, due_date, completed, taskId], (err) => {
        if (err) {
          console.log('Could not update task', err);
          return reject(err);
        }
        
        db.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  });
}

// updateTask('path_to_db', 'database_name.db', 1, 'New Title', 'New Description', '2023-10-29', 1)
//     .then(() => {
//         console.log('Task updated successfully');
//     })
//     .catch(err => {
//         console.error('Failed to update task:', err);
//     });


function deleteTask(db_path, db_name, taskId) {
  console.log('deleteTask', db_path, db_name, taskId) 
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(`${db_path}/${db_name}`, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error('Open database error:', err);
        return reject(err);
      }
    });

    const sql = `DELETE FROM tasks WHERE id = ?`;
    db.run(sql, [taskId], function (err) {
      if (err) {
        console.error('Delete task error:', err);
        db.close();
        return reject(err);
      }

      if (this.changes > 0) {
        console.log(`Task with ID ${taskId} deleted successfully`);
      } else {
        console.log(`No task found with ID ${taskId} to delete`);
      }

      db.close((err) => {
        if (err) {
          console.error('Close database error:', err);
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  });
}

// deleteTask('path_to_db', 'database_name.db', 1)
//     .then(() => {
//         console.log('Task deleted successfully');
//     })
//     .catch(err => {
//         console.error('Failed to delete task:', err);
//     });



module.exports = {
  initDb,
  registerEmail,
  addNewTask,
  getTasksByUserEmail,
  updateTask,
  deleteTask
};
