// region page intialization

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

  fetchAndDisplayTasks()


  // Initialize the page
  function initializePage() {
    const newTaskButton = document.getElementById('newTaskBtn');
    newTaskButton.addEventListener("click", showNewTaskSection);

    const newTaskSubmitButton = document.getElementById('newTaskSubmitBtn');
    newTaskSubmitButton.addEventListener("click", sendNewTaskToServer);
  }

  initializePage();
});

// endregion

// region list of Tasks

// Fetch and display tasks from the API
async function fetchAndDisplayTasks() {
  const email = localStorage.getItem('email') || 'default@example.com';
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
    row.insertCell(1).textContent = task.email;
    row.insertCell(2).textContent = task.title;
    row.insertCell(3).textContent = task.description;
    row.insertCell(4).textContent = task.due_date;
    row.insertCell(5).textContent = task.completed ? 'Yes' : 'No';


    // Create and append the delete button
    createDeleteButton(row, task.id)
  });
}


// endregion

// region Tasks Creation

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
    email: "user@example.com",
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

// endregion


// region Tasks Deletion

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

// Function to delete a task using the API
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


// endregion