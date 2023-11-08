// 
// Utility functions
// 
function initializePage() {
  const newTaskButton = document.getElementById('newTaskBtn');
  newTaskButton.addEventListener("click", showNewTaskSection);

  const newTaskSubmitButton = document.getElementById('newTaskSubmitBtn');
  newTaskSubmitButton.addEventListener("click", sendNewTaskToServer);
}

// Fetch and display tasks from the API
async function fetchAndDisplayTasks() {
  const email = "default@example.com";
  try {
    const response = await fetch(`/api/getTasks?email=${email}`);
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
    // if this comes back, all indices (the numbers in brackets must be incremented by 1)
    row.insertCell(1).textContent = task.email;
    row.insertCell(2).textContent = task.title;
    row.insertCell(3).textContent = task.description;
    row.insertCell(4).textContent = task.due_date;
    row.insertCell(5).textContent = task.completed ? 'Yes' : 'No';

    //Create and append the toggle complete button
    createToggleCompleteButton(row, task);

    // Create and append the delete button
    createDeleteButton(row, task.id)

  });
}

async function fetchAndDisplayTasks() {
  const email = "user@example.com";
  try {
    const response = await fetch(`/api/getTasks?email=${email}`);
    const tasks = await response.json();
    console.log("Fetched tasks:", tasks);
    displayTasks(tasks);
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
  }
}

function displayTasks(tasks) {
  const tableBody = document.getElementById('taskTable').querySelector('tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  tasks.forEach(task => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = task.id;
    // if this comes back, all indices (the numbers in brackets must be incremented by 1)
    // row.insertCell(1).textContent = task.email;
    row.insertCell(1).textContent = task.title;
    row.insertCell(2).textContent = task.description;
    row.insertCell(3).textContent = task.due_date;
    row.insertCell(4).textContent = task.completed ? 'Yes' : 'No';

    //Create and append the toggle complete button
    createToggleCompleteButton(row, task);

    // Create and append the delete button
    createDeleteButton(row, task.id)
  });
}

function createToggleCompleteButton(tableRow, task) {
  const toggleCell = tableRow.insertCell(6); // The new button will be in the 7th cell
  const toggleButton = document.createElement('button');
  toggleButton.textContent = 'Mark Complete';
  toggleButton.addEventListener('click', async function () {
    const newCompletionStatus = !task.completed;
    const result = await toggleTaskCompleteAPI(task.id, newCompletionStatus);
    if (result) {
      console.log(`Task ${task.id} completion status toggled successfully`);
      fetchAndDisplayTasks();
    }
  });
  toggleCell.appendChild(toggleButton);
}

async function toggleTaskCompleteAPI(taskId, newStatus) {
  try {
    const response = await fetch(`/api/updateTask/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: newStatus })
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

function showNewTaskSection() {
  console.log("show me everything")

  const newTaskTable = document.getElementById("newTask");
  newTaskTable.removeAttribute("hidden");
}

async function sendNewTaskToServer() {
  console.log("Are you saved")
  // After submit is clicked => Tasks gets sent to DB
  // Read input values from form fields and create an object
  const newTaskTitle = document.getElementById('newTaskTitle').value;
  const newTaskDescription = document.getElementById('newTaskDescription').value;
  const newTaskDueDate = document.getElementById('newTaskDueDate').value;

  // Create a JavaScript object to hold the task data
  const newTask = {
    title: newTaskTitle,
    description: newTaskDescription,
    due_date: newTaskDueDate,
    // The email address should be Dynamic later on. best from the user login       
    email: "user@example.com", // Email will be dynamic later
    completed: false
  };

  // Send the created object to the server
  try {
    const response = await fetch('/api/addTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);

      fetchAndDisplayTasks()

    } else {
      const data = await response.json();
      console.log('Error:', data.error);
    }
  } catch (err) {
    console.error('Network or server error:', err);
  }

  // This function clears the input fields for new data entry
  clearNewTaskFields()

}

function clearNewTaskFields() {
  // Clear the input fields for new data entry
  document.getElementById('newTaskTitle').value = '';
  document.getElementById('newTaskDescription').value = '';
  document.getElementById('newTaskDueDate').value = '';

}

function createDeleteButton(tableRow, taskId) {
  const deleteCell = tableRow.insertCell(6);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
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
      method: 'DELETE',
      // headers: {
      //   'Content-Type': 'application/json',
      // }
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


//
// EVENT Listeners HERE
// 

document.addEventListener('DOMContentLoaded', () => {

  initializePage();
  fetchAndDisplayTasks()

});
