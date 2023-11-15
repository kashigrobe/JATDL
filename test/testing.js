async function addMultipleTasks() {
    const tasks = [
        { title: 'Space Garden Planning', description: 'Design a garden layout for the new lunar greenhouse project.', due_date: '2023-12-01', email: 'user@example.com' },
        { title: 'Robot Chef Recipes', description: 'Compile a list of 10 gourmet recipes for the robot chef’s debut dinner.', due_date: '2023-12-02', email: 'user@example.com' },
        { title: 'Time Machine Debug', description: 'Run diagnostics and fix bugs found in the time machine’s latest software update.', due_date: '2023-12-03', email: 'user@example.com' },
        { title: 'Alien Language Lexicon', description: 'Translate and create a basic lexicon for the newly discovered alien language.', due_date: '2023-12-04', email: 'user@example.com' },
        { title: 'Virtual Reality Safari', description: 'Design a virtual reality safari experience, complete with 5 different ecosystems.', due_date: '2023-12-05', email: 'user@example.com' }
    ];
      
    for (const task of tasks) {
      try {
        const response = await fetch('https://dasBrot.onrender.com/api/addTask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
}

// Call the function
addMultipleTasks();
