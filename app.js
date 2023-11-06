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
// app.use(express.static('public'));

// Initialize the database
// const database = db.initDb('./db', 'todolist.db');

// Routes
app.get('/', (req, res) => {res.sendFile(path.join(__dirname, '', 'index.html'));});

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
  console.log("Received request to fetch tasks for email:", req.query.email);
  try {
    const email = req.query.email; // Assume email is passed as a query parameter
    const tasks = await db.getTasksByUserEmail('./db', 'todolist.db', 'user@example.com');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new task
app.get('/api/addTask', async (req, res) => {
  // Using query parameters instead of body
  const { title, description, due_date } = req.query;
  
  if (!title || !description || !due_date) {  // <-- Updated this line
    return res.status(400).json({ error: "All fields are required" });
  }
  
  try {
    const email = "user@example.com";  // <-- The email is still hardcoded here
    const completed = false;  // <-- Assuming the task is not completed when added

    await db.addNewTask('./db', 'todolist.db', email, title, description, due_date, completed);
    res.status(200).json({ message: "Task added successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Update a task
app.get('/api/updateTask', async (req, res) => {
  // Extract the task fields from the query string
  const { id, title, description, due_date, completed } = req.query;
  
  // Check for the presence of the required fields
  if (!id || !title || !description || !due_date || completed === undefined) {
    return res.status(400).json({ error: "All task fields are required" });
  }

  // Convert completed to a boolean
  const completedBool = completed === 'true';

  try {
    // Call the updateTask function with the collected parameters
    await db.updateTask('./db', 'todolist.db', id, title, description, due_date, completedBool);
    res.status(200).json({ message: "Task updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Delete a task
app.get('/api/deleteTask', async (req, res) => {
  const taskId = req.query.id; // Get the id from the query string
  console.log("Received request to delete task with id:", taskId);
  if (!taskId) {
    return res.status(400).json({ error: "Task ID is required" });
  }
  try {
    await db.deleteTask('./db', 'todolist.db', taskId);
    res.status(200).json({ message: "Task deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
