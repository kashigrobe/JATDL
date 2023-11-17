# Project Overview: JATDL ToDo List Application

## Deployment Notes (As of November 16, 2023)
- **Hosted on:** Free version of render.com.
- **Storage Limitation:** Limited disk space impacts SQLite3 database storage. 
- **Subscription Note:** Paid subscription required for additional space.
- **Functionality Impact:** No adverse impact on app's functionality.
- **Deployment Choice:** Opted for this setup despite limitations due to free version constraints.

- **Behavior on VM Removal:** When render.com removes my Virtual Machine, the app is redeployed from Git, reverting the database to an older version.
  Our application is currently hosted on the free version of render.com. This version has limited disk space for storing files, including our SQLite3 database. To access more space, a paid subscription is required. The application functions properly as long as render.com maintains free apps. However, each time render.com removes our virtual machine, the code is redeployed from our Git repository. This process reinstalls an older version of our database, affecting the app's functionality. Despite this limitation, we have chosen this approach due to the constraints of the free version.


## Application Description
The **JATDL** ToDo List app helps users efficiently manage tasks. It features CRUD operations, a Google Material Design-based UI, and interactive JavaScript elements.

## Features
- **Create:** Add tasks with details and due dates.
- **Read:** View tasks in a sorted table format.
- **Update:** Toggle task completion status.
- **Delete:** Remove tasks.
- **In-Progress:** Due date notifications.

## Running the Application
- **Local:** Run `node app.js` in the terminal.
- **External Access:** Use `npx localtunnel --port 3000` for reverse proxy setup.

## Deployment Steps (onrender.com)
1. Visit onrender.com.
2. Either update the existing service or deploy afresh from GitHub.
3. Under 'Yarn', add `node app.js` as the launch command.
4. **Domain:** Deployed app accessible at dasbrot.render.com.

## API Endpoints
- Utilizes mostly GET method for ease of browser testing.
- Endpoint examples: 
  - Register: POST /api/register
  - Fetch Tasks: GET /api/getTasks
  - Add Task: POST /api/addTask
  - Update Task: GET /api/updateTask/
  - Delete Task: DELETE /api/deleteTasks/:id

## Project Structure
- **Directories:**
  - Frontend assets in `public/`
  - HTML files in `views/`
  - Backend server scripts in `server/`
  - Database file in `db/`
- **Important Files:**
  - `app.js` for server setup.
  - `database_utils.js` for database functions.

## Technology Stack
### Front-end
- HTML/CSS, JavaScript, Google Materialize CSS.

### Back-end
- Node.js, Express.js, Sequelize ORM, API endpoints.

### Database
- SQLite with sqlite3 library in Node.js.

### Development Tools
- ChatGPT4, Dirk the Nerd, VsCode, NPM, Localtunnel.

### Deployment and Running
- Hosted at [https://dasbrot.onrender.com](https://dasbrot.onrender.com).

## For internal testing of the Application
- **Express API Routes:** Tested for correct HTTP response and database interaction.

- **Individual Route Testing:**
  - Add Task: POST /api/addTask
  - https://dasbrot.onrender.com/api/addTask ... to
  - https://localhost:3000/api/addTask 
  - Update Task: GET /api/updateTask/?id=[ID]&completed=[true/false]
  
  - **Login and Register:** (coming soon)
  -  http://localhost:3000/login.html
  -  https://dasbrot.onrender.com/login.html


## Repository
- GitHub: [https://github.com/kashigrobe/JATDL.git](https://github.com/kashigrobe/JATDL.git)

## Challenges Encountered
- Complexity with multiple tech components.
- Maintaining clean project structure.
- Server management and code change reflection.
- Syntax confusion between ES6 'import' and CommonJS 'require'.
- ORM required additional fields in the tables to facilitate sync (workaround was to turn this off)

## SAM's Checklist
### HTML & CSS
- [x] Minimum 3 HTML pages (index.html, login.html, register.html, password-recovery.html)
- [x] Varied CSS styles ensuring style and responsiveness (google & self-made)

### Backend
- [x] Backend framework (express) used.
- [x] Minimum 3 routes, including dynamic ones (api/getTasks, api/addTask, api/updateTask, api/deleteTasks)
- [x] Content dynamically rendered using a templating language.

### Database Setup
- [x] Two models used: USER and TASK.
- [x] Dynamic content rendering from the database.

### CRUD & Deployment
- [x] All CRUD operations enabled.
- [x] Application deployed and functional online.

### Client-Side JavaScript
- [x] JavaScript included for DOM manipulation (main.js + index.html)

## Submission Details
- **GitHub Repository:** [https://github.com/kashigrobe/JATDL.git](https://github.com/kashigrobe/JATDL.git)
- **Deployed Application:** [https://dasbrot.onrender.com](https://dasbrot.onrender.com)
- **Hand-in Requirements:**
  - [x] Readme file.
  - [x] Self-reflection essay.