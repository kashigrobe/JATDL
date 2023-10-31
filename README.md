# Private To-Do List

## How to run
- node app.js  
- in order to use reverse proxy: npx localtunnel --port 3000
- node database.js  Run database script


## How to deploy
- initialize database using initDB in folder db/database_util.js
- when on render dot come deploy first using git, then call
http://dasBrot.renderc.com:3000/api/init to create new DB


#### check on running version
https://dasbrot.onrender.com/dashboard.html

## Learnings
- deployed prematurely, forgot to add sqlLit3 package, which created a failed deploy. took it out for now.
- hardcoded href e.g. http://localhost:3000/login.html haunted us. tool domain+port out. it's just /login.html

### more learning
- exported getTasksByUserEmail in database_util to be used in app.js 
- imported in app.js
- created routing api/tasks in app.js
- calling api/tasks in todo.html


## Node for runtime situation e.g. render.com -- domain name is dasbrot.render.com
 - localhost becomes dasbrot.render.com


## Assesment
This is a pass/fail module. To pass this module, projects must meet all qualification objectives listed below.

- Determine when and how to utilize web technologies as a software solution
(think about it)

- Create simple websites with responsive layouts (i.e., accessible HTML and CSS)

- Differentiate between the role of the web client and web server

- Create dynamic web backend applications (e.g., including dynamic routing)

- Apply both client-side and server-side rendering for dynamically changing content (i.e., - server-side templating languages and client-side JavaScript)

- Handle long-lived state and dynamically changing data on the backend (i.e., databases, ORMs/ODMs)

- Deploy and securely run dynamic web backends in a web server environment

## Suggesstion

1. **Build a static site with HTML and responsive CSS** (weeks 1 + 2)
    - A landing page (examples for inspiration: [blinkist](https://www.blinkist.com/), [basecamp](https://basecamp.com/))
    - Other static pages like an “about” page or a “legal” page.
    
2. **Create a web backend with dynamic routing** (weeks 2 + 3)
    - The barebone structure of a backend application with a framework
    - Definition of the various routes (URLs) needed for the application (and all its endpoints)
    - Initial static (HTML- & CSS-only) pages with static fake data (as there is no integration with a database or backend yet)
    - Forms to input data that is not yet stored in the backend (e.g., contact form)

3. **Store data in a database and render its content on pages dynamically** (weeks 4, 5, 6)
    - Schema and models for the various data sets of your application
    - Pages for all the different routes previously defined
    - Integration between forms and database
    - Dynamic rendering of content from the database on various pages

4. **Deploy the website** (week 7)
    - Upload the website to a web server
    - Use a production-ready database that works on a web server
    - Security Validation
    - Authentication system

5. **Polish for clean code and best practices** (week 8)
    - Unit tests to make the code more robust
    - Refactoring of the code base to make the code more maintainable





## User Stories

1. **User Registration**: 
[ ] As a new user, I want to register for an account so that I can use the To-Do List application.

2. **User Login**: 
[ ] As a registered user, I want to log in so that I can access my tasks.

3. **User Logout**: 
[ ] As a logged-in user, I want to log out so that my session is ended and my tasks are secure.

4. **View Tasks**: 
[x] As a logged-in user, I want to see a list of my tasks so that I know what I need to do.

5. **New Task**: 
[x] As a logged-in user, I want to add a new task so that I can remember to do it later.

6. **Update Task**: 
[ ] As a logged-in user, I want to edit an existing task so that its information is up-to-date.

7. **Delete Task**: 
[ ] As a logged-in user, I want to delete a task that I no longer need.

8. **Authorization**: 
[ ] As a logged-in user, I should not be able to view or modify tasks belonging to other users.

9. ** Use of SSL to secure all traffic between client & server - we'll be using a LetEncrypt cert because it's free

### Project Structure
```
| CLIENT Code (except for code in db folder, everything runs on local browser)

private-todo-list/
|-- index.html
|-- login.html
|-- register.html
|-- dashboard.html
|-- css/
|   |-- styles.css
|-- js/
|   |-- main.js
|   |-- auth.js
|   |-- tasks.js
|-- db/
|   |-- database.js
|-- README.md
```

#### File Descriptions:
- `index.html`: The landing page that allows users to navigate to login or registration pages.
- `login.html`: Page for user login.
- `register.html`: Page for new user registration.
- `dashboard.html`: The main page where tasks are displayed and managed.
- `styles.css`: Contains all the CSS styles.
- `main.js`: General JavaScript code, could include things like navigation.
- `auth.js`: Handles user authentication (login, logout, registration).
- `tasks.js`: Handles task operations (CRUD).
- `database.js`: Simulates database operations (Since we're not using a real database in this example).
- `README.md`: Documentation explaining your project.

## CRUD
- [ ] Create
- [x] Read
- [ ] Update
- [ ]Delete 



## Jump logic:
- user arrives on index.html
- check if user already logged in
-- if logged in --> dashboard and show todos

- if not logged in BUT has account  --> login page
- if not logged in AND NO account   --> register

- extra logic
-- user forgot password and needs to reset it --> we send email with reset link to email

---

# Questions for teacher/coach

**Long term I want to learn Python coding, so I can create ML models to be used in art.**

**Q**: is it ok to only show basic HTML, CSS & JS concepts (as in this example) as a concrete page
would require more complicated frameworks e.g. ReactJS, AngularJS or similar, plus the use of 
hosted databases (Postgresql).

**Q**: does the DB have to be on a server or can it be local (browser, cookie)

**Q**: where to deploy the page? Can it/ should it run in Docker on local machine to pretend it's
running on a server.

**Q**: is there a specific web-server that must be used?

**Q**:


## Progress

**Dashboard.html**
- I want to see my upcoming tasks in rows. Every row indicates the todo data and provides additional functionality (TBD)
- Row functionality is added later.

### Solve

create HTML table with header showing Title & Number of total tasks. Title is on the left side, number of task on the right side.
Create a sub-header that show the number of completed tasks on the left side, next to it on the left side is a CLEAR action button, on the right side Show/Hide button that shows or hides finished tasks.
every task has one row. for now we only show the task title in the row. we will add more content per task later.

#### Not solved
When I export the initDb in database_utils.js import in app.js the EB gets overwritten all the time
somehow the initDb function is triggered?
I only want to trigger, if i call /api/init



### Sam's requirement
What is the project about?

The project is a To-Do List application where users can view, manage tasks and also register and login. It features a front-end for users and a backend that interacts with a SQLite database.

What can you do with it?
-Users can view tasks on the main page (index.html).(in a table format)
-A login page (login.html) and a registration page (register.js) are provided for user authentication.
-Users' tasks are fetched from a backend API (/api/tasks), which interacts with a SQLite database.
-Users' tasks are also stored in LocalStorage (see main.js).

What is the tech stack? ...library's most important-key technologies?
-Front-end: HTML, Materialize CSS, JavaScript
-Back-end: Node.js with Express.js
-Database: SQLite 
-Client-side storage: LocalStorage


I use a local storage on the client-side to store tasks and and have a basic ExpressJS server set up. 

what can you do with it


How do i set this up locally?
-Uncomment the initDb function in database.js to initialize the SQLite database.
-Run node app.js to start the server.
-Open the browser and go to http://localhost:3000.
i.e Runs locally using express as a server

How do i test it? 

How to deploy and upload to a server
render.com

Assessment
Nov 17, 4:59pm
Next Friday-Register

Register for the combine assessemt
Using development tool
Use git properly
Progranming basics eg variables, functions,loops, conditions, complex data

ESSAY( self reflection, learning progress, how i reflect on my learning and outcome this semester), 
need to provide CODE REPOSITARY URL to DEPLAY SITE
If code is clear based on requirement. There will be no oral exam
CODE HAS TO BE SUFFICIENT


Be honest about code Chat Gpt otherwise it will be an issue. Transparent
i am accountable for waht i ublish or submit for an assessent


http://localhost:3000/api/addTask?email='default@example.com'?title='visit us'?description='Tasks are hard'?due_date='2023-12-05'?completed=1


### some interesting problems
The Materialized CCS that i used in the code has some cool features but it blocks the hidden feature.
In the table id, i had a object that has the argument "highlight centered responsive-table" "hidden" = hidden. The web page was still showing the new taskbutton. looked under styles in the webDev and realized that my function was being over write by materialized css(DISPLAY: BLOCK) get rid of display (blocky) i got rid of class alltogther
 newTaskTable.removeAttribute("hidden");         

<!-- Materialize CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">