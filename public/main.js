// Simulating authenticated username
const username = "Peter Lustig";

// Create a task using API
async function createTaskAPI(task) {
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return await response.json();
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

// Function to delete a task using the API
async function deleteTaskAPI(taskId) {
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error("An error occurred:", err);
    return false;
  }
} // <-- This closing brace was missing


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
  const deleteCell = row.insertCell(6);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', async function() {
    if (confirm(`Are you sure you want to delete task ${task.id}?`)) {
      const result = await deleteTaskAPI(task.id);
      if (result) {
        console.log(`Task ${task.id} deleted successfully`);
        fetchAndDisplayTasks();
      }
    }
  });
  deleteCell.appendChild(deleteButton);
});
}


document.addEventListener('DOMContentLoaded', () => {
  // Event listener for newTaskForm
  document.getElementById("newTaskForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const email = localStorage.getItem('email') || 'default@example.com';
    const task = {
      email,
      title: document.getElementById("taskTitle").value,
      description: document.getElementById("taskDescription").value,
      due_date: document.getElementById("taskDueDate").value,
      completed: document.getElementById("taskCompleted").checked ? 1 : 0
    };
    
    const result = await createTaskAPI(task);
    if (result) {
      console.log("Task added successfully");
      fetchAndDisplayTasks();
    }
  });

  // Event listener for registration
  if (document.getElementById("register")) {
    document.getElementById("register").addEventListener("click", async function(event) {
      const email = document.getElementById("email").value;
      if (email) {
        localStorage.setItem("email", email);
        await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });      
        fetchAndDisplayTasks();
      }
    });
  }
})