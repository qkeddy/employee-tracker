// Require the following NPM modules
const inquirer = require("inquirer");
const mySqlPromise = require("mysql2/promise");
const cTable = require("console.table");

// Require Inquirer questions
const { actionMenu, addEmployeeQuestions, addRoleQuestions, addDepartmentQuestions, updateEmployeeRole } = require("./lib/questions");

// Require SQL Queries
const { listEmployeesQuery, listRolesQuery, deptQuery, roleQuery, employeeQuery, listManagersQuery, updateEmployeeQuery, updateEmployeeRoleQuery, addDepartmentQuery, addEmployeeQuery } = require("./db/queries");

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
                    updateEmployee();
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
async function queryEmployees() {
    // Open a connection to the database
    connection = await openDatabaseConnection();

    // Execute query to fetch employees
    const [rows] = await connection.execute(employeeQuery);

    // Display rows
    console.table(rows);
    await closeDatabaseConnection(connection);

    // Call the main menu system
    menuSystem();
}

/**
 ** Queries Roles
 */
async function queryRoles() {
    // Open a connection to the database
    connection = await openDatabaseConnection();

    // Execute query to fetch roles
    const [rows] = await connection.execute(roleQuery);

    // Display rows
    console.table(rows);
    await closeDatabaseConnection(connection);

    // Call the main menu system
    menuSystem();
}

/**
 ** Queries Departments
 */
async function queryDepartments() {
    // Open a connection to the database
    connection = await openDatabaseConnection();

    // Execute query to fetch departments
    const [rows] = await connection.execute(deptQuery);

    // Display rows
    console.table(rows);

    // Close the database connection
    await closeDatabaseConnection(connection);

    // Call the main menu system
    menuSystem();
}

/**
 ** Add an employee
 */
async function addEmployee() {
    // Open a connection to the database
    connection = await openDatabaseConnection();

    // Get the roles to dynamically populate the Inquirer function and then isolate roles into a simple array
    const [roleRecords] = await connection.execute(listRolesQuery);
    const roles = roleRecords.map((obj) => obj.role);

    // Get the managers to dynamically populate the Inquirer function and then isolate managers into a simple array
    const [managerRecords] = await connection.execute(listManagersQuery);
    const managers = managerRecords.map((obj) => obj.manager);

    // Ask questions about new employees
    // TODO - The only way to get this to work is to drop the async. Is this the correct approach?
    inquirer.prompt(addEmployeeQuestions(roles, managers)).then((answers) => {
        // Map selected role to role ID. For each record (role) compare the roles to the user input
        const roleId = roleRecords.find((record) => record.role === answers.empRole).id;

        // Map selected role to employee ID. For each record (employee) compare the employee to the user input
        const managerId = managerRecords.find((record) => record.manager === answers.empManager).id;

        // Insert the selected data into the database. Note that this should be a prepared statement, but the syntax is not currently working
        connection.execute(addEmployeeQuery(answers.empFirstName, answers.empLastName, roleId, managerId));

        // TODO Question - what is wrong with the syntax of this prepared statement?
        // connection.execute(`INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES ('${answers.empFirstName}', '${answers.empLastName}', ${roleId}, ${managerId})`);

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

/**
 ** Update an employee
 */
async function updateEmployee() {
    // Open a connection to the database
    connection = await openDatabaseConnection();

    // Get the roles to dynamically populate the Inquirer function and then isolate roles into a simple array
    const [roleRecords] = await connection.execute(listRolesQuery);
    const roles = roleRecords.map((obj) => obj.role);

    // Get the employees to dynamically populate the Inquirer function and then isolate employees into a simple array
    const [employeeRecords] = await connection.execute(listEmployeesQuery);
    const employees = employeeRecords.map((obj) => obj.employee);

    // Ask which employee should have their role updated
    inquirer.prompt(updateEmployeeRole(employees, roles)).then((answers) => {
        // Map selected role to employee ID. For each record (employee) compare the employee to the user input
        const employeeId = employeeRecords.find((record) => record.employee === answers.selectedEmployee).id;

        // Map selected role to role ID. For each record (role) compare the roles to the user input
        const roleId = roleRecords.find((record) => record.role === answers.selectedRole).id;

        // Insert the selected data into the database. Note that this should be a prepared statement, but the syntax is not currently working
        connection.execute(updateEmployeeRoleQuery(employeeId, roleId));

        // Close the database connection
        closeDatabaseConnection(connection);

        // Call the main menu system
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

menuSystem();
