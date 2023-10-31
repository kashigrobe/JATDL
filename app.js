const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database_utils');

//initialize a new Express application
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files
// app.use(express.static(path.join(__dirname, 'public')));

// Initialize the database
const database = db.initDb('./db', 'todolist.db');
// db.initDb('./db', 'todolist.db');

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '', 'index.html'));
});

// Register a new email (No authentication)Crud
app.post('/api/register', async (req, res) => {
  const email = req.body.email;
  //Debugger
  console.log("Received email for registration:", req.body.email);

  if (!email) {
    return res.status(400).json({ error: "Email is required for registration" });
  }
  try {
    // Implement the function registerEmail in database_utils
    await db.registerEmail('./db', 'todolist.db', email);
    res.status(200).json({ message: "Email registered successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch tasks by email
app.get('/api/getTasks', async (req, res) => {
  try {
    const email = req.query.email; // Assume email is passed as a query parameter
    const tasks = await db.getTasksByUserEmail('./db', 'todolist.db', 'user@example.com');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new task
app.post('/api/addTask', async (req, res) => {
  const { email, title, description, due_date, completed } = req.body;

  if (!email || !title || !description || !due_date || completed === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  }
  
  try {
    await db.addNewTask('./db', 'todolist.db', email, title, description, due_date, completed);
    res.status(200).json({ message: "Task added successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update a task
app.put('/api/updateTask/:id', async (req, res) => {
  try {
    await db.updateTask('./db', 'todolist.db', req.params.id, req.body);
    res.status(200).json({ message: "Task updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
app.delete('/api/deleteTask/:id', async (req, res) => {
  try {
    await db.deleteTask('./db', 'todolist.db', req.params.id);
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
