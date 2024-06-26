const { Client } = require('pg');
require("dotenv").config();

// Create a new PostgreSQL client instance with connection details
const client = new Client({
    user: process.env.DB_USER,
    host: 'localhost',
    database: 'employees_db',
    password: process.env.DB_PW,
    port: 5432,
}, console.log("connected"));

client.connect();

// Function to view all departments
const viewAllDepartments = async () => {
    const res = await client.query('SELECT * FROM department');
    console.table(res.rows);
};

// Function to view all roles, joining with department table
const viewAllRoles = async () => {
    const res = await client.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id');
    console.table(res.rows);
};

// Function to view all employees, joining with role and department tables, and self-joining for managers
const viewAllEmployees = async () => {
    const res = await client.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id');
    console.table(res.rows);
};

// Function to add a new department
const addDepartment = async (name) => {
    await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
    console.log(`Added ${name} to the database`);
};

// Function to add a new role
const addRole = async (title, salary, departmentId) => {
    await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
    console.log(`Added ${title} to the database`);
};

// Function to add a new employee
const addEmployee = async (firstName, lastName, roleId, managerId) => {
    await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
    console.log(`Added ${firstName} ${lastName} to the database`);
};

// Function to update an employee's role
const updateEmployeeRole = async (employeeId, roleId) => {
    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
    console.log(`Updated employee's role`);
};

// Export functions to be used in other modules
module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};