# Employee-Tracker

## Description
Employee Tracker is a command-line application that allows you to manage a company's employee database. It uses Node.js, Inquirer, and PostgreSQL to perform CRUD operations on the database, providing functionalities to view, add, and update employees, roles, and departments.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Database Setup](#database-setup)
- [Walkthrough Video](#walkthrough-video)
- [Features](#features)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation
1. Clone the repository:
   
        git clone git@github.com:Sam-Cowman/Employee-Tracker.git 
        cd employee-tracker

2. Install the dependencies:

        npm install

## Usage
1. Set up the database by following the instructions in the Database Setup section.
2. Start the application:

        node index.js
## Database Setup
1. Ensure you have PostgreSQL installed and running on your machine.
2. Create the database and tables:

        psql -U postgres -f db/schema.sql

3. Seed the database with initial data:

        psql -U postgres -f db/seeds.sql

## Walkthrough Video

Watch the walkthough video at this link: [Screencastify: Employee Tracker](https://drive.google.com/file/d/1ZE-zb6dxsbPArs9PZUobW6BHiqpFtMEF/view)



## Features
* View All Departments: Displays a list of all departments.
* View All Roles: Displays a list of all roles along with their department and salary.
* View All Employees: Displays a list of all employees, their roles, departments, salaries, and managers.
* Add a Department: Allows the user to add a new department.
* Add a Role: Allows the user to add a new role, specifying the title, salary, and department.
* Add an Employee: Allows the user to add a new employee, specifying the first name, last name, role, and manager.
* Update an Employee Role: Allows the user to update the role of an existing employee.

## Environment Variables 
Create a .env file in the root directory and add the following environment variables:

        DB_USER="your_postgres_username"
        DB_PW="your_postgres_password"

## License 
This project is licensed under the ISC License.