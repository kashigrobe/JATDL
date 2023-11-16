# ToDo List Application
November 11, 2023 Created Branch
November 16, 2023 
**Deployment Notes:**
Our application is currently hosted on the free version of render.com. This version has limited disk space for storing files, including our SQLite3 database. To access more space, a paid subscription is required. The application functions properly as long as render.com keeps the virtual server up and running. However, each time render.com removes our virtual machine, the code is redeployed from our Git repository. This process reinstalls an older version of our database but is NOT affecting the app's functionality. Despite this limitation, we have chosen this approach due to the constraints of the free version.


# Description
The **JATDL** ToDo List application is a tool designed to help users manage their tasks efficiently. It allows users to create, update, and delete tasks, as well as mark them as completed (CRUD). 
The application features a user interface which utilizes the Google material design CSS and some interactive functionalities, implemented with JavaScript.

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
ToDoListApp/
│
├── public/                  # Frontend assets
│   └── main.js              # Main JavaScript logic
│
├── views/                   # HTML files
│   ├── index.html           # Main page
│   └── register.html        # User registration page
│
├── server/                  # Backend server
│   ├── app.js               # Express.js server setup
│   └── database_utils.js    # Database utility functions
│
├── db/
│   └── todolist.db          # SQLite database file
│
├── node_modules/            # Node.js modules (ignored in version control)
│
├── package.json             # Project dependencies and metadata
├── package-lock.json        # Dependency lock file
├── .gitignore               # Specifies intentionally untracked files to ignore
├── .env                     # Environment variables (if needed)
└── README.md                # Project documentation


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
The API endpoint uses the POST method, whci requires for the URL to be created differently from GET. The function in the testing.js file is accounting for that and adds 5 example records as one. Note: in order to run this code against the local server the URL in the function must be changed e.g. 
- https://dasbrot.onrender.com/api/addTask ... to
- https://localhost:3000/api/addTask (mind the port use on locaalhost)
 
### Update Task Completion Status (/api/updateTask):
- For updating a task's completion status, send a GET request to http://localhost:3000/api/updateTask/ with query parameters id and completed. For example, to mark the task with for example ID 50 as incomplete, the request would be:
GET http://localhost:3000/api/updateTask/?id=50&completed=false

### Repository
- GitHub (https://github.com/kashigrobe/JATDL.git)
 
### Challenges along the way
- high complexity due to need to use lots of differnt tecch components e.g. database, SQL, javascript, Node, Express, API ...
- it's hard to mainain clean project structure
- Server Management, it took a  few weeks to mange the server state, like realizing when the server was still running and needed to be restarted to reflect code changes. 
- Initially, kept mixing up ES6 'import' syntax with CommonJS 'require' syntax
even though my Node environment wasn't set up to hadνδλε ΕS6 imports.Mixing Module Systems: Initially, there was a mix of ES6 import and CommonJS require syntax in the same file. Understanding when and how to use these different module systems in Node.js can be confusing


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
- IS ORM use required given the small size of the project. I only have USER and TASK as Tables in DB
  I have everything you asked for except the ORM part. seems complex given I have only 2 tables AND also because I created an API endpoint for all DB functions (so have it encapsulated already).
  
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


# EXTRAS TO DELETE
## Handin form link

https://app.code.berlin/handins/clocuqfzt0001mv0g3qmktbqi/submit

## Google drive Instructions
https://www.notion.so/codeuniversitywiki/Hand-in-Document-Uploads-January-2023-6aa06bcbbf7545e4a84eb8e88d95d09f