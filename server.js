// Require the following NPM modules
const inquirer = require("inquirer");
const mySqlPromise = require("mysql2/promise");
const cTable = require("console.table");

// Require Inquirer questions
const { actionMenu, addRoleQuestions, addDepartmentQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions, updateEmployeeManagerQuestions } = require("./lib/questions");

// Require SQL Queries
const { listEmployeesQuery, listRolesQuery, listManagersQuery, deptQuery, roleQuery, employeeQuery, addDepartmentQuery, addRoleQuery, addEmployeeQuery, updateEmployeeRoleQuery, updateEmployeeManagerQuery } = require("./db/queries");

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
                    updateEmployeeRole();
                    break;

                case "Update employee manager":
                    updateEmployeeManager();
                    break;

                case "View all roles":
                    queryRoles();
                    break;

                case "Add role":
                    addRole();
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
    inquirer.prompt(addEmployeeQuestions(roles, managers)).then(async (answers) => {
        // Map selected role to role ID. For each role object, compare the role to the user input
        const roleId = roleRecords.find((obj) => obj.role === answers.empRole).id;

        // Map selected employee to employee ID. For each manager object compare the manager to the user input
        const managerId = managerRecords.find((obj) => obj.manager === answers.empManager).id;

        // Insert the selected data into the database using a prepared statement.
        await connection.execute(addEmployeeQuery, [answers.empFirstName, answers.empLastName, roleId, managerId]);

        // Close the database connection
        await closeDatabaseConnection(connection);

        // Call the main menu system
        menuSystem();
    });
}

/**
 ** Update an employee role
 */
async function updateEmployeeRole() {
    // Open a connection to the database
    connection = await openDatabaseConnection();

    // Get the employees to dynamically populate the Inquirer function and then isolate employees into a simple array
    const [employeeRecords] = await connection.execute(listEmployeesQuery);
    const employees = employeeRecords.map((obj) => obj.employee);

    // Get the roles to dynamically populate the Inquirer function and then isolate roles into a simple array
    const [roleRecords] = await connection.execute(listRolesQuery);
    const roles = roleRecords.map((obj) => obj.role);

    // Ask which employee should have their role updated
    inquirer.prompt(updateEmployeeRoleQuestions(employees, roles)).then(async (answers) => {
        // Map selected employee to employee ID. For each employee object compare the employee to the user input
        const employeeId = employeeRecords.find((obj) => obj.employee === answers.selectedEmployee).id;

        // Map selected role to role ID. For each role object compare the role to the user input
        const roleId = roleRecords.find((obj) => obj.role === answers.selectedRole).id;

        // Update the selected data into the database using a prepared statement
        await connection.execute(updateEmployeeRoleQuery, [roleId, employeeId]);

        // Close the database connection
        await closeDatabaseConnection(connection);

        // Call the main menu system
        menuSystem();
    });
}

/**
 ** Update an employee manager
 */
async function updateEmployeeManager() {
    // Open a connection to the database
    connection = await openDatabaseConnection();

    // Get the managers to dynamically populate the Inquirer function and then isolate managers into a simple array
    const [managerRecords] = await connection.execute(listManagersQuery);
    const managers = managerRecords.map((obj) => obj.manager);

    // Get the employees to dynamically populate the Inquirer function and then isolate employees into a simple array
    const [employeeRecords] = await connection.execute(listEmployeesQuery);
    const employees = employeeRecords.map((obj) => obj.employee);

    // Ask which employee should have their role updated
    inquirer.prompt(updateEmployeeManagerQuestions(employees, managers)).then(async (answers) => {
        // Map selected role to employee ID. For each employee object compare the employee to the user input
        const employeeId = employeeRecords.find((obj) => obj.employee === answers.selectedEmployee).id;

        // Map selected role to employee ID. For each manager object compare the manager to the user input
        const managerId = managerRecords.find((obj) => obj.manager === answers.selectedManager).id;

        // Update the selected data into the database using a prepared statement
        await connection.execute(updateEmployeeManagerQuery, [managerId, employeeId]);

        // Close the database connection
        await closeDatabaseConnection(connection);

        // Call the main menu system
        menuSystem();
    });
}

/**
 ** Add a department
 */
async function addDepartment() {
    // Open a connection to the database
    connection = await openDatabaseConnection();

    inquirer
        .prompt(addDepartmentQuestions)
        .then(async (answers) => {
            // Insert the selected data into the database using a prepared statement
            await connection.execute(addDepartmentQuery, [answers.deptName]);

            // Close the database connection
            await closeDatabaseConnection(connection);

            // Call the main menu system
            menuSystem();
        })
        .catch((err) => console.error(err));
}

/**
 ** Add a role
 */
async function addRole() {
    // Open a connection to the database
    connection = await openDatabaseConnection();

    // Get the managers to dynamically populate the Inquirer function and then isolate managers into a simple array
    const [departmentRecords] = await connection.execute(deptQuery);
    const departments = departmentRecords.map((obj) => obj.name);

    inquirer
        .prompt(addRoleQuestions(departments))
        .then(async (answers) => {
            // Map selected department to employee ID. For each department object compare the department to the user input
            const departmentId = departmentRecords.find((obj) => obj.name === answers.selectedDept).id;

            // Insert the selected data into the database using a prepared statement
            await connection.execute(addRoleQuery, [answers.titleName, answers.salary, departmentId]);

            // Close the database connection
            await closeDatabaseConnection(connection);

            // Call the main menu system
            menuSystem();
        })
        .catch((err) => console.error(err));
}

menuSystem();
