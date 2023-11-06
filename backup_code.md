```javascript

// Event listener for newTaskForm
  // document.getElementById("newTaskForm").addEventListener("submit", async function (event) {
  //   event.preventDefault();
    
  //   const email = localStorage.getItem('email') || 'default@example.com';
  //   const task = {
  //     email,
  //     title: document.getElementById("taskTitle").value,
  //     description: document.getElementById("taskDescription").value,
  //     due_date: document.getElementById("taskDueDate").value,
  //     completed: document.getElementById("taskCompleted").checked ? 1 : 0
  //   };
    
  //   const result = await createTaskAPI(task);
  //   if (result) {
  //     console.log("Task added successfully");
  //     fetchAndDisplayTasks();
  //   }
  // });

  // Event listener for registration
  // if (document.getElementById("register")) {
  //   document.getElementById("register").addEventListener("click", async function(event) {
  //     const email = document.getElementById("email").value;
  //     if (email) {
  //       localStorage.setItem("email", email);
  //       await fetch('/api/register', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ email }),
  //       });      
  //       fetchAndDisplayTasks();
  //     }
  //   });
  // }
  ```