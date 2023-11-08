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




  function updateTask(db_path, db_name, taskId, title, description, due_date, completed) {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database(`${db_path}/${db_name}`, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return reject(err);
      }

      let fieldsToUpdate = [];
      let sqlValues = [];
      
      if (title !== undefined) {
        fieldsToUpdate.push('title = ?');
        sqlValues.push(title);
      }
      if (description !== undefined) {
        fieldsToUpdate.push('description = ?');
        sqlValues.push(description);
      }
      if (due_date !== undefined) {
        fieldsToUpdate.push('due_date = ?');
        sqlValues.push(due_date);
      }
      if (completed !== undefined) {
        fieldsToUpdate.push('completed = ?');
        sqlValues.push(completed);
      }

      if (fieldsToUpdate.length === 0) {
        return reject(new Error('No fields provided for update'));
      }

      sqlValues.push(taskId);

      const sql = `
        UPDATE tasks
        SET ${fieldsToUpdate.join(', ')}
        WHERE id = ?
      `;

      db.run(sql, sqlValues, (err) => {
        if (err) {
          console.log('Could not update task', err);
          return reject(err);
        }
        
        db.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
  });
}
