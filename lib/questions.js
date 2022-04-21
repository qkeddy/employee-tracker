// Questions module

// General questions
const actionMenu = [
    {
        name: "mainMenu",
        message: "Please select an action",
        choices: ["View all employees", "Add employee", "Update employee role", "View all roles", "Add role", "View all departments", "Add department", "Quit"],
        type: "list",
    },
];

const addRoleQuestions = [
    {
        name: "roleName",
        message: "What is the role?",
        type: "input",
    },
    {
        name: "roleSalary",
        message: "What is the role?",
        type: "input",
    },
    {
        name: "roleDept",
        message: "What is the role?",
        type: "input",
    },
];

const addDepartmentQuestions = [
    {
        name: "deptName",
        message: "What is the department?",
        type: "input",
    },
];

// Build questions for adding an employee based upon current departments and
const addEmployeeQuestions = (roles, managers) => {
    let buildQuestions = [
        {
            name: "empFirstName",
            message: "What is the first name of the employee?",
            type: "input",
        },
        {
            name: "empLastName",
            message: "What is the last name of the employee?",
            type: "input",
        },
        {
            name: "empRole",
            message: "What role does the employee belong to?",
            choices: roles,
            type: "list",
        },
        {
            name: "empManager",
            message: "Who will be the employee's manager?",
            choices: managers,
            type: "list",
        },
    ];
    return buildQuestions;
};

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
