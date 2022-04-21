const inquirer = require("inquirer");
const mySqlPromise = require("mysql2/promise");
const cTable = require("console.table");

const { actionMenu, addEmployeeQuestions, addRoleQuestions, addDepartmentQuestions, updateEmployeeRole } = require("./lib/questions");

const { deptQuery, roleQuery, employeeQuery, managerQuery, updateEmployee } = require("./db/queries");

/**
 ** Main menu system
 */
function menuSystem() {
    inquirer
        .prompt(actionMenu())
        .then((answers) => {
            switch (answers.mainMenu) {
                case "View all employees":
                    queryEmployees();
                    menuSystem();
                    break;

                case "Add employee":
                    console.log("Adding an employee");

                    menuSystem();
                    break;

                case "Update employee role":
                    console.log("Updating an employee's role");

                    menuSystem();
                    break;

                case "View all roles":
                    queryRoles();
                    menuSystem();
                    break;

                case "Add role":
                    console.log("Add role");

                    menuSystem();
                    break;

                case "View all departments":
                    queryDepartments();
                    menuSystem();
                    break;

                case "Add department":
                    console.log("Add department");

                    menuSystem();
                    break;

                case "Quit":
                    console.log("Exiting system");
                    break;
            }
            // Add space for enhance viewing
            console.log(`\n\n`);
        })
        .catch((err) => console.error(err));
}

// Menu Function Take II - Pseudo code
/**
 * 
 * Menu function
    1. Inquirer #1 - Select main menu action
    2. Switch statement for action selected
        1. ACTION - View all employees selected —> go to View all employees function —> Query and display employees —> Call Init Function
        2. ACTION - Add employee selected —> go to Add employee function —> Inquirer #2 (enter employee details) —> Update database —> Call Init Function
        3. ACTION - Update employee role  —> go to Update employee function —> Query employees —> Inquirer #3 (with employee and role lists) —> Update database —> Call init Function
        4. ACTION - View all roles —> go to View all roles function —> Query and display roles —> Call Init Function
        5. ACTION - Add role —> go to Add role function —> Inquirer #4 (enter role details) —> Update database —> Call Init Function
        6. ACTION - View all departments —> go to View all departments function —> Query and display departments —> Call Init Function
        7. ACTION - Add department —> go to Add department function —> Inquirer #5 (enter department name) —> Update database —> Call Init Function
        8. ACTION - Quit —> Exit from system
 * 
 */

/**
 ** Opens a connection to the MySQL database
 * @returns connection to database
 */
async function openDatabaseConnection() {
    // Connect to MySQL
    console.log("Opening MySQL connection\n\n");
    const connection = await mySqlPromise.createConnection({
        host: "localhost",
        user: "root",
        password: "fltbsl0294",
        database: "employee_db",
    });
    return connection;
}

/**
 ** Closes a connection to the MySQL database
 * @param {*} connection
 */
async function closeDatabaseConnection(connection) {
    // Closing connection to MySQL
    await connection.end();
}

/**
 ** Queries Employees
 */
async function queryEmployees() {
    connection = await openDatabaseConnection();
    const [rows] = await connection.execute(employeeQuery);
    console.table(rows);
    await closeDatabaseConnection(connection);
}

/**
 ** Queries Roles
 */
async function queryRoles() {
    connection = await openDatabaseConnection();
    const [rows] = await connection.execute(roleQuery);
    console.table(rows);
    await closeDatabaseConnection(connection);
}

/**
 ** Queries Departments
 */
async function queryDepartments() {
    connection = await openDatabaseConnection();
    const [rows] = await connection.execute(deptQuery);
    console.table(rows);
    await closeDatabaseConnection(connection);
}

menuSystem();
