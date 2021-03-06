// List employees
const listEmployeesQuery = `SELECT e.id, CONCAT(e.first_name, " ", e.last_name) employee from employees e ORDER BY employee`;

// List roles
const listRolesQuery = `SELECT r.id, r.title role FROM roles r ORDER BY role`;

// Manager query
const listManagersQuery = `SELECT
    e.id, CONCAT(e.first_name, " ", e.last_name, " (", d.name, ")") manager
FROM employees e
    JOIN roles r
    ON r.id = e.role_id
    JOIN departments d
    ON d.id = r.department_id
WHERE manager_id IS NULL`;

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

// Add department using a prepared statement
const addDepartmentQuery = `INSERT INTO departments (name) VALUES (?)`;

// Add role
const addRoleQuery = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;

// Add employee using a prepared statement
const addEmployeeQuery = `INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES (?, ?, ?, ?)`;

// Update Employee manager query using a prepared statement
const updateEmployeeRoleQuery = `UPDATE employees e SET e.role_id = ? WHERE e.id = ?`;

// Update Employee manager query using a prepared statement
const updateEmployeeManagerQuery = `UPDATE employees e SET e.manager_id = ? WHERE e.id = ?`;

module.exports = { listEmployeesQuery, listRolesQuery, listManagersQuery, deptQuery, roleQuery, employeeQuery, addDepartmentQuery, addRoleQuery, addEmployeeQuery, updateEmployeeRoleQuery, updateEmployeeManagerQuery };
