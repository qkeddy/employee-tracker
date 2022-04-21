// Require the following NPM modules
const inquirer = require("inquirer");
const mysql = require("mysql2");
const mySqlPromise = require("mysql2/promise");
const cTable = require("console.table");

// Require Inquirer questions
const { actionMenu, addEmployeeQuestions, addRoleQuestions, addDepartmentQuestions, updateEmployeeRole } = require("./lib/questions");

// Require SQL Queries
const { listEmployees, listRoles, deptQuery, roleQuery, employeeQuery, listManagers, updateEmployee, addDept, addEmp } = require("./db/queries");

// Create connection to MySQL
// const connection = mysql.createConnection(
//     {
//         host: "localhost",
//         user: "root",
//         password: "fltbsl0294",
//         database: "employee_db",
//     },
//     console.log("Connected to the employee_db MySQL database")
// );

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
 ** Main menu system
 */
function menuSystem() {

    inquirer
        .prompt(actionMenu)
        .then((answers) => {
            switch (answers.mainMenu) {
                case "View all employees":
                    queryEmployees();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "Update employee role":
                    console.log("Updating an employee's role");
                    break;

                case "View all roles":
                    queryRoles();
                    break;

                case "Add role":
                    break;

                case "View all departments":
                    queryDepartments();
                    break;

                case "Add department":
                    addDepartment();
                    break;

                case "Quit":
                    console.log("Exiting system");
                    process.exit();
            }
        })
        .catch((err) => console.error(err));
}

/**
 ** Queries Employees
 */
function queryEmployees() {
    connection.query(employeeQuery, (err, results) => {
        console.table(results);
        menuSystem();
    });
}

/**
 ** Queries Roles
 */
function queryRoles() {
    connection.query(roleQuery, (err, results) => {
        console.table(results);
        menuSystem();
    });
}

/**
 ** Queries Departments
 */
function queryDepartments() {
    connection.query(deptQuery, (err, results) => {
        console.table(results);
        menuSystem();
    });
}

/**
 ** Add a department
 */
function addDepartment() {
    inquirer
        .prompt(addDepartmentQuestions)
        .then((answers) => {
            connection.query(addDept, answers.deptName, (err, results) => {
                if (err) console.error(err);
                menuSystem();
            });
        })
        .catch((err) => console.error(err));
}

/**
 ** Add an employee
 */
async function addEmployee() {
    // Open a connection to the database
    connection = await openDatabaseConnection();

    // Get the roles to dynamically populate the Inquirer function and then isolate roles into a simple array
    const [roleRecords] = await connection.execute(listRoles);
    const roles = roleRecords.map((obj) => obj.roles);

    // Get the managers to dynamically populate the Inquirer function and then isolate managers into a simple array
    const [managerRecords] = await connection.execute(listManagers);
    const managers = managerRecords.map((obj) => obj.managers);

    // Ask questions about new employees
    // TODO - The only way to get this to work is to drop the async. Is this the correct approach?
    inquirer.prompt(addEmployeeQuestions(roles, managers)).then((answers) => {

        // Map selected role to role ID. For each record (role) compare the roles to the user input
        const roleId = roleRecords.find((role) => role.roles === answers.empRole).id;

        // Map selected role to employee ID. For each record (employee) compare the employee to the user input
        const managerId = managerRecords.find((manager) => manager.managers === answers.empManager).id;

        // Insert the selected data into the database. Note that this should be a prepared statement, but the syntax is not currently working
        connection.execute(`INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES ('${answers.empFirstName}', '${answers.empLastName}', ${roleId}, ${managerId})`);

        // TODO Question - what is wrong with the syntax of this prepared statement?
        // connection.execute(`INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES (?, ?, ?, ?)`, `['quin', 'eddy', 2, 8]`, function (err, results, fields) {
        //     console.log(results); // results contains rows returned by server
        //     console.log(fields); // fields contains extra meta data about results, if available
        // } );

        // Close the database connection
        closeDatabaseConnection(connection);

        // Call the main menu system
        menuSystem();
    });
}

menuSystem();
