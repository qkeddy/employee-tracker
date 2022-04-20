const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

const { actionMenu, addEmployeeQuestions, addRoleQuestions, addDepartmentQuestions, updateEmployeeRole } = require("./lib/questions");

const { deptQuery, roleQuery, employeeQuery, managerQuery, updateEmployee } = require("./db/queries");

// Init function
function menuSystem(questions) {
    // console.log(actionMenu());
    return new Promise((resolve, reject) => {
        inquirer
            .prompt(questions)
            .then((answers) => {
                switch (answers.mainMenu) {
                    case "View all employees":
                        console.log("Current employee list");
                        // Query all employees

                        // Call menuSystem with
                        resolve(answers);
                        menuSystem(actionMenu()).then(() => {
                            console.log("Viewing all employeesXXXXX");
                        });
                        break;

                    case "Add employee":
                        console.log("Adding an employee");

                        // Call menuSystem with
                        menuSystem(addEmployeeQuestions());
                        break;

                    case "Update employee role":
                        console.log("Updating an employee's role");

                        // Fetch current employees

                        // Call menuSystem with a list of current employees and roles
                        menuSystem(updateEmployeeRole(["John", "Jim", "Sally"], ["Sales", "Engineering", "Admin"]));

                        // MySQL Update employee with new role
                        // Add MySQL
                        break;

                    case "Quit":
                        console.log("Exiting system");
                        break;

                    default:
                        break;
                }
                console.log(answers.mainMenu);

                // Call the menu system function
            })
            .catch((err) => console.error(err));
    });
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

async function queryDatabase(db) {
    db.query(employeeQuery, (err, results) => {
        console.table(results);
    });
}

function init() {
    // Connect to MySQL
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "fltbsl0294",
        database: "employee_db",
    });

    // Test connection
    db.connect((err) => {
        if (err) {
            return console.error("error: " + err.message);
        }
        console.log("Connected to the MySQL server");
    });

    // Query database
    // db.query(employeeQuery, (err, results) => {
    //     console.table(results);
    // });
    queryDatabase(db);

    // Close the connection to MySQL
    db.end((err) => {
        if (err) {
            return console.log("error:" + err.message);
        }
        console.log("Close the database connection");
    });

    // Release the connection to MySQL
    // db.destroy();

    console.log("got here");
}

init();
