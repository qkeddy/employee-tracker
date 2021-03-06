// Questions module

// General questions
const actionMenu = [
    {
        name: "mainMenu",
        message: "Please select an action",
        choices: ["View all employees", "Add employee", "Update employee role", "Update employee manager", "View all roles", "Add role", "View all departments", "Add department", "Quit"],
        type: "list",
    },
];

const addRoleQuestions = (departments) => [
    {
        name: "titleName",
        message: "What is the title?",
        type: "input",
    },
    {
        name: "salary",
        message: "What is the salary?",
        type: "input",
    },
    {
        name: "selectedDept",
        message: "What is the department?",
        choices: departments,
        type: "list",
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
const updateEmployeeRoleQuestions = (employeeList, roleList) => {
    let buildQuestions = [
        {
            name: "selectedEmployee",
            message: "Please select an employee to update",
            choices: employeeList,
            type: "list",
        },
        {
            name: "selectedRole",
            message: "Please select a new role",
            choices: roleList,
            type: "list",
        },
    ];
    return buildQuestions;
};

// Build the update role question array by loading the current employees
const updateEmployeeManagerQuestions = (employeeList, managerList) => {
    let buildQuestions = [
        {
            name: "selectedEmployee",
            message: "Please select an employee to update",
            choices: employeeList,
            type: "list",
        },
        {
            name: "selectedManager",
            message: "Please select a new manager",
            choices: managerList,
            type: "list",
        },
    ];
    return buildQuestions;
};


module.exports = { actionMenu, addRoleQuestions, addDepartmentQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions, updateEmployeeManagerQuestions };
