const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Create connection to MySQL
const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "fltbsl0294",
        database: "employee_db",
    },
    console.log("Connected to the employee_db MySQL database")
);

// Require Inquirer questions
const { actionMenu, addEmployeeQuestions, addRoleQuestions, addDepartmentQuestions, updateEmployeeRole } = require("./lib/questions");

// Require SQL Queries
const { deptQuery, roleQuery, employeeQuery, managerQuery, updateEmployee, addDept } = require("./db/queries");

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
                    console.log("Adding an employee");
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
            connection.query(addDept(), answers.deptName, (err, results) => {
                if (err) console.error(err);
                menuSystem();
            });
        })
        .catch((err) => console.error(err));
}

menuSystem();
