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
const managerQuery = `SELECT
    CONCAT(e.first_name, " ", e.last_name, " (", d.name, ")") managers
FROM employees e
    JOIN roles r
    ON r.id = e.role_id
    JOIN departments d
    ON d.id = r.department_id
WHERE manager_id IS NULL`;

// Update Employee query
const updateEmployee = (employeeId, managerId) => `UPDATE employees e SET e.manager_id = ${managerId} WHERE e.id = ${employeeId}`;

module.exports = { deptQuery, roleQuery, employeeQuery, managerQuery, updateEmployee };
