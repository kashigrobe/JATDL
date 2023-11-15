const { Sequelize, DataTypes, Model } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path_to_your_database/db_name.db' // Change this to your database path and name
});

// Define models
class Task extends Model {}
Task.init({
  email: DataTypes.STRING,
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  due_date: DataTypes.STRING,
  completed: DataTypes.BOOLEAN
}, { sequelize, modelName: 'task' });

class User extends Model {}
User.init({
  email: DataTypes.STRING
}, { sequelize, modelName: 'user' });

// Sync models with database
sequelize.sync();

// Add new task
async function addNewTask(email, title, description, due_date, completed) {
  try {
    const task = await Task.create({ email, title, description, due_date, completed });
    console.log(`Task inserted with id ${task.id}`);
    return task.id;
  } catch (error) {
    console.error('Could not insert task into tasks table', error);
    throw error;
  }
}

// Get tasks by user email
async function getTasksByUserEmail(email) {
  try {
    const tasks = await Task.findAll({ where: { email } });
    console.log(tasks);
    return tasks;
  } catch (error) {
    console.error('Error in fetching tasks:', error);
    throw error;
  }
}

// Update task by ID
async function updateTaskById(id, completed) {
  try {
    const result = await Task.update({ completed }, { where: { id } });
    console.log(`Task updated with id ${id}`);
    return result;
  } catch (error) {
    console.error('Could not update task in tasks table', error);
    throw error;
  }
}

// Delete task
async function deleteTask(taskId) {
  try {
    const result = await Task.destroy({ where: { id: taskId } });
    if (result > 0) {
      console.log(`Task with ID ${taskId} deleted successfully`);
    } else {
      console.log(`No task found with ID ${taskId} to delete`);
    }
    return result;
  } catch (error) {
    console.error('Delete task error:', error);
    throw error;
  }
}

module.exports = {
  addNewTask,
  getTasksByUserEmail,
  updateTaskById,
  deleteTask
};
