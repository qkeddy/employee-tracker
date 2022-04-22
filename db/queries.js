// List employees
const listEmployeesQuery = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) employee from employees e`;

// List roles
const listRolesQuery = `SELECT r.id, r.title role FROM roles r`;

// Department query
const deptQuery = `SELECT * from departments`;

// Role query
const roleQuery = `SELECT r.id, r.title, d.name AS department, r.salary
FROM roles r
    JOIN departments d
    ON d.id = r.department_id
ORDER BY department, salary`;

// Employee query
const employeeQuery = `SELECT
    e.id,
    e.first_name,
    e.last_name,
    r.title,
    d.name AS department,
    r.salary,
    CONCAT(e2.first_name, " ", e2.last_name) manager
FROM employees e
    JOIN roles r
    ON r.id = e.role_id
    JOIN departments d
    ON d.id = r.department_id
    LEFT OUTER JOIN employees e2
    ON e2.id = e.manager_id
ORDER BY department, manager ASC`;

// Manager query
const listManagersQuery = `SELECT
    e.id, CONCAT(e.first_name, " ", e.last_name, " (", d.name, ")") manager
FROM employees e
    JOIN roles r
    ON r.id = e.role_id
    JOIN departments d
    ON d.id = r.department_id
WHERE manager_id IS NULL`;

// Add department
const addDepartmentQuery = `INSERT INTO departments (name) VALUES (?)`;

// Add role

// Add employee
const addEmployeeQuery = (firstName, lastName, roleId, managerId) => `INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId})`;
const addEmployeeQueryX = `INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES (?, ?, ?, ?)`;

// Update Employee manager query
const updateEmployeeManagerQuery = (employeeId, managerId) => `UPDATE employees e SET e.manager_id = ${managerId} WHERE e.id = ${employeeId}`;

// Update Employee manager query
const updateEmployeeRoleQuery = (employeeId, roleId) => `UPDATE employees e SET e.role_id = ${roleId} WHERE e.id = ${employeeId}`;



module.exports = { listEmployeesQuery, listRolesQuery, deptQuery, roleQuery, employeeQuery, listManagersQuery, updateEmployeeManagerQuery, updateEmployeeRoleQuery, addDepartmentQuery, addEmployeeQuery };
