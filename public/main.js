// Utility functions
function initializePage() {
  const newTaskButton = document.getElementById('newTaskBtn');
  newTaskButton.addEventListener("click", showNewTaskSection);

  const newTaskSubmitButton = document.getElementById('newTaskSubmitBtn');
  newTaskSubmitButton.addEventListener("click", sendNewTaskToServer);

  // Fetch and display tasks from the API on page initialization
  fetchAndDisplayTasks();
}

// Fetch and display tasks from the API
async function fetchAndDisplayTasks() {
  const email = "user@example.com"; // I will make this dynamic later
  try {
    const response = await fetch(`/api/getTasks?email=${email}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const tasks = await response.json();
    console.log("Fetched tasks:", tasks);
    displayTasks(tasks);
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
  }
}

// Display tasks
function displayTasks(tasks) {
  const tableBody = document.getElementById('taskTable').querySelector('tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  tasks.forEach(task => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = task.id;
    row.insertCell(1).textContent = task.title;
    row.insertCell(2).textContent = task.description;
    row.insertCell(3).textContent = task.due_date;
    row.insertCell(4).textContent = task.completed ? 'Yes' : 'No';

    // Create and append the toggle complete button
    createToggleCompleteButton(row, task);

    // Create and append the delete button
    createDeleteButton(row, task.id);
  });
}

function createToggleCompleteButton(tableRow, task) {
  const toggleCell = tableRow.insertCell(5); // Adjusting cell index to 5
  const toggleButton = document.createElement('button');
  
  // Adding Material Design classes
  toggleButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect';
  
  // toggleButton.classList.add('waves-effect', 'waves-light', 'btn'); // Materialize classes for styling
  toggleButton.textContent = task.completed ? ' Incomplete' : ' Complete';

  toggleButton.addEventListener('click', async function () {
    const newCompletionStatus = !task.completed;
    // Attempt to update the task's completion status
    try {
      // Construct query string
      const queryString = new URLSearchParams({ id: task.id, completed: newCompletionStatus }).toString();
      const response = await fetch(`/api/updateTask/?${queryString}`, {
        method: 'GET'
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      const result = await response.json();
      if (result) {
        console.log(`Task ${task.id} completion status toggled successfully`);
        fetchAndDisplayTasks();
      }
    } catch (err) {
      console.error("An error occurred:", err);
    }
  });

  toggleCell.appendChild(toggleButton);
}



function showNewTaskSection() {
  console.log("Showing new task section");
  const newTaskTable = document.getElementById("newTask");
  newTaskTable.removeAttribute("hidden");
}
// collect value from input field to create new task object, send to server
async function sendNewTaskToServer() {
  console.log("Sending new task to server");
  const newTaskTitle = document.getElementById('newTaskTitle').value;
  const newTaskDescription = document.getElementById('newTaskDescription').value;
  const newTaskDueDate = document.getElementById('newTaskDueDate').value;

  const newTask = {
    title: newTaskTitle,
    description: newTaskDescription,
    due_date: newTaskDueDate,
    email: "user@example.com", // This should be dynamic in a real app
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

    if (response.ok) {
      console.log("Task added successfully");
        // Reload the page
      window.location.reload();
      // fetchAndDisplayTasks();
    } else {
      console.error("Failed to add task:", await response.json());
    }
  } catch (err) {
    console.error("Network or server error:", err);
  }

  clearNewTaskFields();
}

function clearNewTaskFields() {
  document.getElementById('newTaskTitle').value = '';
  document.getElementById('newTaskDescription').value = '';
  document.getElementById('newTaskDueDate').value = '';
}

function createDeleteButton(tableRow, taskId) {
  const deleteCell = tableRow.insertCell(5); // Adjusting cell index to 5
  const deleteButton = document.createElement('button');
  // Adding Material Design classes
  deleteButton.className = 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent';
  deleteButton.textContent = 'Delete Task';

  deleteButton.addEventListener('click', async function () {
    if (confirm(`Are you sure you want to delete task ${taskId}?`)) {
      const result = await deleteTaskAPI(taskId);
      if (result) {
        console.log(`Task ${taskId} deleted successfully`);
        fetchAndDisplayTasks();
      }
    }
  });
  deleteCell.appendChild(deleteButton);
}

async function deleteTaskAPI(taskId) {
  try {
    const response = await fetch(`/api/deleteTasks/${taskId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error("An error occurred:", err);
    return false;
  }
}

// Initialize the page when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);
