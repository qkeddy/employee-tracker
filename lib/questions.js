// Questions module

// General questions
const mainMenu = {
    name: "mainMenu",
    message: "Please select an action",
    choices: ["View all employees", "Add employee", "Update employee role", "View all roles", "Add role", "View all departments", "Add department", "Quit"],
    type: "list",
};

const addEmployee = [
    {
        name: "addEmployee",
        message: "What is the name of the employee?",
        type: "input",
    },
];

const addRole = [
    {
        name: "addRole",
        message: "What is the role?",
        type: "input",
    },
];

const addDepartment = [
    {
        name: "addRole",
        message: "What is the department?",
        type: "input",
    },
];

// Build the management question array by concatenating the sub arrays
const actionMenu = () => mainMenu;

// Build the employee question array by concatenating the sub arrays
const addEmployeeQuestions = () => [].concat(addEmployee, mainMenu);

// Build the role question array by concatenating the sub arrays
const addRoleQuestions = () => [].concat(addRole, mainMenu);

// Build the department question array by concatenating the sub arrays
const addDepartmentQuestions = () => [].concat(addDepartment, mainMenu);

// Build the update role question array by loading the current employees
const updateEmployeeRole = (employeeList, roleList) => {
    let buildQuestions = [
        {
            name: "selectEmployee",
            message: "Please select an employee to update",
            choices: employeeList,
            type: "list",
        },
        {
            name: "selectRole",
            message: "Please select a new role",
            choices: roleList,
            type: "list",
        },
        mainMenu,
    ];
    console.log(buildQuestions);
    return buildQuestions;
};

module.exports = { actionMenu, addEmployeeQuestions, addRoleQuestions, addDepartmentQuestions, updateEmployeeRole };
