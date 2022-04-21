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
                    connection.end();
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
function addEmployeeX() {
    // Get list of roles
    connection
        .query(listRoles, (err, roles) => {
            if (err) console.error(err);
            // console.log(roles);
            // // Get list of managers
            connection.query(listManagers, (err, managers) => {
                if (err) console.error(err);
                console.log(managers);
                // console.log(addEmployeeQuestions(roles, managers));
                inquirer.prompt(addEmployeeQuestions(roles, managers)).then((answers) => {
                    // connection.query(addEmp, (err, results) => {
                    //     if (err) console.error(err);
                    //     menuSystem();
                    // });
                });
            });
        })
        .catch((err) => console.error(err));
}

async function addEmployee() {
    connection = await openDatabaseConnection();
    const [roleRecords] = await connection.execute(listRoles);
    const roles = roleRecords.map((obj) => obj.roles);
    const [managerRecords] = await connection.execute(listManagers);
    const managers = managerRecords.map((obj) => obj.managers);
    console.log(roles);
    console.log(managers);

    inquirer.prompt(addEmployeeQuestions(roles, managers)).then((answers) => {
        // connection.query(addEmp, (err, results) => {
        //     if (err) console.error(err);
        //     menuSystem();
        // });
    });

    // await closeDatabaseConnection(connection);
}

menuSystem();
