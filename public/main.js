// Utility Functions
const getElement = id => document.getElementById(id);

// Event Handlers
function initializeEventListeners() {
  getElement('newTaskBtn').addEventListener("click", showNewTaskSection);
  getElement('newTaskSubmitBtn').addEventListener("click", createAndSendNewTask);
}

// Page Initialization
async function initializePage() {
  initializeEventListeners();
  await updateTaskDisplay();
}
// Tasks Management functions
// Task Display and Manipulation
async function updateTaskDisplay() {
  try {
    const tasks = await fetchTasks("user@example.com"); // Dynamic email in the future
    displayTasks(tasks);
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
  }
}

async function fetchTasks(email) {
  const response = await fetch(`/api/getTasks?email=${email}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

function displayTasks(tasks) {
  const tbody = getElement('taskTable').querySelector('tbody');
  tbody.innerHTML = ''; // Clear existing rows
  tasks.forEach(task => addTaskRow(tbody, task));
}

// Add new task row to the Table
function addTaskRow(tbody, task) {
  const row = tbody.insertRow();
  ['id', 'title', 'description', 'due_date', 'completed'].forEach((prop, index) => {
    row.insertCell(index).textContent = (prop === 'completed') ? (task[prop] ? 'Yes' : 'No') : task[prop];
  });
  row.appendChild(createToggleButton(task));
  row.appendChild(createDeleteButton(task.id));
}
//Tasks completion Toggling
function createToggleButton(task) {
  const button = createButton(task.completed ? 'Incomplete' : 'Complete', 'toggle');
  button.addEventListener('click', () => toggleTaskCompletion(task));
  return wrapInTableCell(button);
}

function createDeleteButton(taskId) {
  const button = createButton('Delete Task', 'delete');
  button.addEventListener('click', () => deleteTask(taskId));
  return wrapInTableCell(button);
}

function clearNewTaskFields() {
  getElement('newTaskTitle').value = '';
  getElement('newTaskDescription').value = '';
  getElement('newTaskDueDate').value = '';
}


function createButton(text, type) {
  const button = document.createElement('button');
  button.textContent = text;
  return button;
}

function wrapInTableCell(element) {
  const cell = document.createElement('td');
  cell.appendChild(element);
  return cell;
}

async function toggleTaskCompletion(task) {
  try {
    const newCompletionStatus = !task.completed;
    const queryString = new URLSearchParams({ id: task.id, completed: newCompletionStatus }).toString();
    const response = await fetch(`/api/updateTask/?${queryString}`, { method: 'GET' });
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    await updateTaskDisplay();
  } catch (err) {
    console.error("Error toggling task completion:", err);
  }
}
// delete Tasks
async function deleteTask(taskId) {
  if (!confirm(`Are you sure you want to delete task ${taskId}?`)) return;
  try {
    const result = await deleteTaskAPI(taskId);
    if (result) await updateTaskDisplay();
  } catch (err) {
    console.error("Error deleting task:", err);
  }
}

async function deleteTaskAPI(taskId) {
  const response = await fetch(`/api/deleteTasks/${taskId}`, { method: 'DELETE' });
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  return await response.json();
}

// New Task Creation
function showNewTaskSection() {
  getElement("newTask").removeAttribute("hidden");
}

async function createAndSendNewTask() {
  const newTask = {
    title: getElement('newTaskTitle').value,
    description: getElement('newTaskDescription').value,
    due_date: getElement('newTaskDueDate').value,
    email: "user@example.com", // To be dynamic
    completed: false
  };

  try {
    const response = await fetch('/api/addTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });

    if (!response.ok) {
      throw new Error("Failed to add task: " + await response.text());
    }

    console.log("Task added successfully");
    await updateTaskDisplay();
    window.location.reload();
  } catch (err) {
    console.error("Network or server error:", err);
  }

  clearNewTaskFields();
}


document.addEventListener('DOMContentLoaded', initializePage);
