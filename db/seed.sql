-- Drop and create employee_db and set it active
DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

-- Create departments table
CREATE TABLE
    departments (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL
    );

-- Create roles table
CREATE TABLE
    roles (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(30) NOT NULL,
        salary DECIMAL(10, 2) NOT NULL,
        department_id INT,
        FOREIGN KEY (department_id) REFERENCES departments(id)
        ON DELETE
        SET NULL
    );

-- Create employees table
CREATE TABLE
    employees (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INT,
        manager_id INT,
        FOREIGN KEY (role_id) REFERENCES roles(id)
        ON DELETE
        SET NULL
    );

-- Seed departments
INSERT INTO departments (name)
VALUES ('Sales'), ('Engineering'), ('Accounting'), ('IT');

-- Seed roles
INSERT INTO
    roles (title, salary, department_id)
VALUES ('Account Manager', 75000.00, 1), ('Regional Sales Director', 90000.00, 1), ('Principal Engineer', 250000.00, 2), ('QA Engineer', 150000.00, 2), ('Junior Engineer', 100000.00, 2), ('Tech Ops', 50000.00, 4), ('VP of Technology', 150000.00, 4), ('Finance Manager', 90000.00, 3), ('VP of Finance', 150000.00, 3);

-- Seed employees
INSERT INTO
    employees (first_name, last_name, role_id, manager_id)
VALUES ('Christian', 'Carter', 1, 2), ('Avery', 'Cromwel', 2, NULL), ('Kai', 'June', 5, 8), ('Victoria', 'Peterson', 6, 13), ('Kimberly', 'Wright', 5, 8), ('Aaliyah', 'Elsher', 1, 2), ('King', 'Sharpe', 1, 2), ('Lucia', 'Hall', 3, NULL), ('Ariella', 'Flores', 4, 14), ('Rachel', 'Gonzales', 8, 12), ('Calvin', 'Johnson', 5, 8), ('Vanessa', 'Hope', 9, NULL), ('Enzo', 'Gonzales', 7, NULL), ('Isla', 'Johnson', 3, NULL), ('Ariel', 'Hall', 4, 14), ('Raelynn', 'Johnson', 5, 8), ('Londyn', 'Allen', 1, 2), ('Maria', 'May', 5, 8), ('June', 'Gonzalez', 6, 13), ('Ruby', 'Melenia', 5, 8);