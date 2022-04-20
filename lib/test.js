const inquirer = require("inquirer");

const mainMenu = [{
    name: "mainMenu",
    message: "Please select an action",
    choices: ["View all employees", "Add employee", "Update employee role", "View all roles", "Add role", "View all departments", "Add department", "Quit"],
    type: "list",
}];


inquirer.prompt(mainMenu).then(answers => {
    console.log(answers);
    
}).then(answers2 => {
    console.log(answers2);

});  