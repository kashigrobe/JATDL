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

// Fetch and display tasks from the API
async function fetchAndDisplayTasks() {
  const email = localStorage.getItem('email') || 'default@example.com';
  try {
    const response = await fetch(`/api/tasks?email=${email}`);
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
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Event listener for newTaskForm
  document.getElementById("newTaskForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const email = localStorage.getItem('email') || '@example.com';
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
    console.log("Register element:", document.getElementById("register")); // Debugging line

    document.getElementById("register").addEventListener("click", async function(event) {
      const email = document.getElementById("email").value;

      console.log("Email to register:", email); // Debugging line

      if (email) {
        localStorage.setItem("email", email);
        
        const response = await fetch('/api/register', { // Debugging line starts
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        console.log('Server Response:', response); // Debugging line ends
        
        fetchAndDisplayTasks();
      }
    });
  }
});
