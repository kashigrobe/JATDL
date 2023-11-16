
### Need to know! 

<!-- This is called endpoint or dynamic routes -->
<!-- '/api/register' -->
// Register a new email (No authentication)Crud
app.post('/api/register', async (req, res) => {
    // Implement the function registerEmail in database_utils
    await db.registerEmail('./db', 'todolist.db', email);

<!-- '/api/getTasks' -->
// Fetch tasks by email
app.get('/api/getTasks', async (req, res) => {
    const tasks = await db.getTasksByUserEmail('./db', 'todolist.db', email);

<!-- '/api/addTask' -->
// Add a new task
app.post('/api/addTask', async (req, res) => {
    await db.addNewTask('./db', 'todolist.db', email, title, description, due_date, completed);

<!-- '/api/updateTask/' -->
app.get('/api/updateTask/', async (req, res) => {
    await db.updateTaskById('./db', 'todolist.db', id, title, description, due_date, completedBool);

#### Example
http://localhost:3000/api/updateTask/?id=50&completed=false
 
<!-- '/api/deleteTasks -->
// Delete a task
app.delete('/api/deleteTasks/:id', async (req, res) => {
    await db.deleteTask('./db', 'todolist.db', taskId);

http://localhost:3000/api/addTask?email='default@example.com'?title='visit us'?description='Tasks are hard'?due_date='2023-12-05'?completed=1