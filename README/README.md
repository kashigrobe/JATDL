# ToDo List Application

# Description
The **JATDL** ToDo List application is a tool designed to help users manage their tasks efficiently. It allows users to create, update, and delete tasks, as well as mark them as completed (CRUD). 
The application features a user interface whichj utilizes the Google material design CSS and some interactive functionalities, implemented with JavaScript.

# Features (CRUD)
- Add new tasks with titles, descriptions, and due date from a calendar control (Create)
- View a list of all tasks in a responsive table format, sorted by Complete status and date (sort done in SQL in database) (Read)
- Mark tasks as completed or toggle their completion status (Update)
- Delete tasks from the list. (Delete)
- Register to receive notifications on due dates (feature in progress).

## How to run
- terminal -> node app.js  
- if used with reverse proxy to access from outside the local machine, use: **npx localtunnel --port 3000**

## How to Deploy (onrender.com)
1. go to onrender.com
2. update service OR deploy from GitHub (select Web Service Tile)
4. under yarn add node app.js as statement to launch

**Note:** domain name is dasbrot.render.com (localhost becomes dasbrot.render.com when deployed)


## API Endpoints (dynamic routes)
The application utilizes a set of API endpoints (I decided to mostly use the GET method so I could more easily test endpoints from the web browser):

- POST /api/register - Register a new email to receive notifications.
- GET /api/getTasks - Fetch all tasks for a specific email.
- POST /api/addTask - Add a new task.
- GET /api/updateTask/ - Update a task's completion status.
- DELETE /api/deleteTasks/:id - Delete a task with a specific ID.

The database_util.js file, initialized in line 4 of app.js (**const db = require('./database_utils'**);) created the db object with
the methods used in the API endpoints e.g. 

Endpoint OR dynammic route
**app.get('/api/getTasks', async (req, res)** => {
    ...
    **database function called on server**
    **const tasks = await db.getTasksByUserEmail('./db', 'todolist.db', email);**
    ...
});


## Project Structure (TODO - restructure current app to be more compliant with best practice)
JATDL/
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
- API endpoints/dynamic routes to create proper separation between front-end from back-end

## Database:
- SQLite as the database engine.
- sqlite3 library in Node.js for interacting with the SQLite database.

## Development Tools:
- ChatGPT4
- Dirk the Nerd
- VsCode
- NPM for package management.
- Possibly a local tunnel tool for exposing local servers to the public internet.

## Deployment and Running:
- https://dasbrot.onrender.com

- Localhost (development environment setup).
Localtunnel for reverse proxy (as mentioned in the description of the package.json for public exposure).

# Testing the Application
Express API Routes
- Test to validate that the server responds correctly to HTTP requests and interacts with the database as expected.
- Manual checks to make sure app behaves as described

## Testing Individual Routes
- Add Task (/api/addTask):

### Update Task Completion Status (/api/updateTask):
- For updating a task's completion status, send a GET request to http://localhost:3000/api/updateTask/ with query parameters id and completed. For example, to mark the task with for example ID 50 as incomplete, the request would be:
GET http://localhost:3000/api/updateTask/?id=50&completed=false

### Repository
- GitHub (https://github.com/kashigrobe/JATDL.git)
 
### Challenges along the way
- high complexity due to need to use lots of differnt tecch components e.g. database, SQL, javascript, Node, Express, API ...
- it's hard to mainain clean project structure

# SAM Notes from here on out
---

## Part 1: HTML & CSS
- [x] Have at least 3 HTML pages
- [x] Use a variety of CSS styles and make sure the website is responsive

## Part 2: Backend
- [x] Use a backend framework (express)
- [x] Have at least 3 routes through that framework - at least one should be dynamic (that means you use the parameters from the URL to render different content. E.g.: /todos/1 should render different content than /todos/2
- [x] onRender content dynamically using a templating language (jinja2)

## Part 3: Database Setup
# Use a database and ORM
- IS ORM use required given the small size of the project. We only have USER and TASK as Tables in DB
- [ ] Your application should have at least 2 models
- [x] At least 1 page renders content from the database dynamically

## Part 4: CRUD & Deployment
Users can: 
- [x] Create
- [x] Read 
- [x] Update 
- [x] Delete 

## The application is deployed online and works (Make sure to test it before the hand-in!)

## Part 5: Client-Side JavaScript
- Include JavaScript on the client-side
- Let users do anything on the page that uses JavaScript to manipulate the DOM. (This can be super simple).
EDIT: For the sake of completeness I also wanted to mention here: Don’t forget to add a 

- [x] Readme file and a self reflection essay. 

# Your hand-in should also include 2 URLs: 
- [x] One for your GitHub repository (https://github.com/kashigrobe/JATDL.git)
- [x] one of the deployed application (https://dasbrot.onrender.com)

That’s it.


