const inquirer = require("inquirer");
const { actionMenu, addEmployeeQuestions, addRoleQuestions, addDepartmentQuestions, updateEmployeeRole } = require("./lib/questions");


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
                            menuSystem(actionMenu()).then( () => {
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
    })

}

menuSystem(actionMenu());
