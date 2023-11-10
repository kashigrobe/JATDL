# Personal ToDo List Application

# Description
The Personal ToDo List application is a simple tool designed to help users manage their daily tasks efficiently. It allows users to create, update, and delete tasks, as well as mark them as completed. The application features a user interface built with Materialize CSS and interactive functionality implemented with JavaScript.

# Features
- Add new tasks with titles, descriptions, and due dates.
- Pick a date from a calendar
- View a list of all tasks in a responsive table format.
- Mark tasks as completed or toggle their completion status.
- Delete tasks from the list.
- Register to receive notifications on due dates (feature in progress).

## How to run
- node app.js  
- in order to use reverse proxy: npx localtunnel --port 3000
- node database.js  Run database script

## How to Deploy
Node for runtime situation e.g. render.com -- domain name is dasbrot.render.com
 - localhost becomes dasbrot.render.com

# Usage
### Adding a New Task
- Click the "New Task" button at the top of the page.
- Fill in the task title, description, and due date.
- Click the "Submit Task" button to add the task to the list.
### Completing a Task
- Find the task in the list you wish to mark as completed.
- Click the "Complete" button. The task will now be marked as completed and updated in the list.
### Deleting a Task
- Find the task in the list you wish to delete.
- Click the "Delete Task" button. The task will be removed from the list.

## API Endpoints
The application offers a set of API endpoints for task management:

- POST /api/register - Register a new email to receive notifications.
- GET /api/getTasks - Fetch all tasks for a specific email.
- POST /api/addTask - Add a new task.
- GET /api/updateTask/ - Update a task's completion status.
- DELETE /api/deleteTasks/:id - Delete a task with a specific ID.


## Project Structure
my-todo-app/
│
├── node_modules/              # Node.js packages
│
├── public/                    # Public assets
│   ├── css/                   # CSS stylesheets
│   ├── js/                    # Front-end JavaScript files
│   │   └── main.js            # Entry point for your JavaScript code
│   └── index.html             # Main HTML page
│
├── src/                       # Source files for the Node.js application
│   ├── controllers/           # Route controllers (taskController.js, etc.)
│   ├── middlewares/           # Express middlewares (auth, error handlers)
│   ├── models/                # Database models (taskModel.js, userModel.js)
│   ├── routes/                # Express routes (taskRoutes.js, userRoutes.js)
│   ├── utils/                 # Utility scripts and helper functions
│   └── app.js                 # Express app setup and middlewares
│
├── db/                        # Directory for database files
│   └── todolist.db            # SQLite database file
│
├── test/                      # Automated tests
│
├── .env                       # Environment variables
├── .gitignore                 # Specifies intentionally untracked files to ignore
├── package.json               # Node.js dependencies and scripts
├── package-lock.json          # Locked versions of each package that were installed
└── README.md                  # README for the project

# Tech stack used in application?
### Front-end:
- HTML/CSS for the structure and style of the application.
- JavaScript for client-side logic.
- Materialize CSS for responsive styling and UI components.

## Back-end:
- Node.js as the runtime environment.
- Express.js as the web application framework to handle HTTP requests.
- Body-parser middleware to parse incoming request bodies in a middleware before your handlers, available under the req.body property.

## Database:
- SQLite as the database engine.
- sqlite3 library in Node.js for interacting with the SQLite database.

## Development Tools:
- NPM for package management.
- Possibly a local tunnel tool for exposing local servers to the public internet.

## Testing:
- No specific testing framework implemented as per the provided package.json.

## Deployment and Running:
- Localhost (development environment setup).
Localtunnel for reverse proxy (as mentioned in the description of the package.json for public exposure).


# Testing the Application
Express API Routes
- Test to validate that the server responds correctly to HTTP requests and interacts with the database as expected.

## Testing Individual Routes
- Add Task (/api/addTask):
- To test the addition of a new task, send a POST request to http://localhost:3000/api/addTask with the task details as JSON in the request body. The test verifies that the task is added to the database and checks for a successful response.

### Update Task Completion Status (/api/updateTask):

- For updating a task's completion status, send a GET request to http://localhost:3000/api/updateTask/ with query parameters id and completed. For example, to mark the task with for example ID 50 as incomplete, the request would be:
GET http://localhost:3000/api/updateTask/?id=50&completed=false


### Assessment Criteria
- Using development tool
- Use git properly
- Progranming basics eg variables, functions,loops, conditions, complex data-
- ESSAY( self reflection, learning progress, how i reflect on my learning and outcome this semester), 
- Provide CODE REPOSITARY URL to DISPLAY SITE
- If code is clear based on requirement. There will be no oral exam. CODE HAS TO BE SUFFICIENT
- Be honest about code Chat Gpt otherwise it will be an issue. Transparency:
- I am accountable for what i publish or submit for an assessment


Some of the challenges you faced and features you hope to implement in the future.
I should have created the Api before the User Interface because i kept changing the code.
I had issues with get.Post and app.Get 
start 

How to Install and Run the Project

Include Credits
tutorials or referenced a certain material that might help the user to build that particular project, include links to those here as well.