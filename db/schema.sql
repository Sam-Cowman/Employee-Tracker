DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db

-- Create the department table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,    -- Primary key for the department
    name VARCHAR(30) UNIQUE NOT NULL   -- Unique and not null department name
);

-- Create the role table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,    -- Primary key for the role
    title VARCHAR(30) UNIQUE NOT NULL,  -- Unique and not null role title
    salary DECIMAL NOT NULL,  -- Not null salary for the role
    department_id INTEGER REFERENCES department(id)  -- Foreign key referencing the department table
);

-- Create the employee table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,    -- Primary key for the employee
    first_name VARCHAR(30) NOT NULL,   -- Not null first name
    last_name VARCHAR(30) NOT NULL,    -- Not null last name
    role_id INTEGER REFERENCES role(id),  -- Foreign key referencing the role table
    manager_id INTEGER REFERENCES employee(id)  -- Self-referencing foreign key for the manager
);