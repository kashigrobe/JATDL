const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const db = require('./database_utils');
const db_orm = require('./js/database_utils_orm');


const app = express();
const port = 3000;

// Middleware for parsing JSON and serving static files
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Helper function to handle errors
const handleAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    res.status(500).json({ error: err.message });
  });
};

// Register a new email
app.post('/api/register', handleAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });
  await db_orm.registerEmail(email);
  res.status(200).json({ message: "Email registered successfully." });
}));

// Fetch tasks by email
app.get('/api/getTasks', handleAsync(async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  // const tasks = await db.getTasksByUserEmail('./db', 'todolist.db', email);
  const tasks = await db_orm.getTasksByUserEmail(email);
  
  res.json(tasks);
}));

// Add a new task
app.post('/api/addTask', handleAsync(async (req, res) => {
  const { title, description, due_date } = req.body;
  if (!title || !description || !due_date) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const email = "user@example.com"; // This should be dynamic in a real application
  await db_orm.addNewTask(email, title, description, due_date, false);
  res.status(200).json({ message: "Task added successfully." });
}));

// Update a task. Helper function 'handleAsync' for err in asyncr operation
app.get('/api/updateTask', handleAsync(async (req, res) => {
  const { id, completed } = req.query;
  if (!id || completed === undefined) {
    return res.status(400).json({ error: "Task ID and completion status are required" });
  }
  await db_orm.updateTaskById(id, completed === 'true');
  res.status(200).json({ message: "Task updated successfully." });
}));

// Delete a task
app.delete('/api/deleteTasks/:id', handleAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Task ID is required" });
  await db_orm.deleteTask(id);
  res.status(200).json({ message: "Task deleted successfully." });
}));

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
