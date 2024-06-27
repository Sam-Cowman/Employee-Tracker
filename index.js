const inquirer = require('inquirer');
const db = require('./db/queries');

// Main menu function to prompt user for action
const mainMenu = async () => {
    // Prompt user for action choice
    const { action } = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Exit'
        ]
    });

    // Switch case based on user action choice
    switch (action) {
        case 'View All Departments':
            await db.viewAllDepartments();
            break;
        case 'View All Roles':
            await db.viewAllRoles();
            break;
        case 'View All Employees':
            await db.viewAllEmployees();
            break;
        case 'Add a Department':
            // Prompt for department name and add department
            const { departmentName } = await inquirer.prompt({
                name: 'departmentName',
                type: 'input',
                message: 'Enter the name of the department:'
            });
            await db.addDepartment(departmentName);
            break;
        case 'Add a Role':
            // Prompt for role details and add role
            const roleDetails = await inquirer.prompt([
                { name: 'title', type: 'input', message: 'Enter the role title:' },
                { name: 'salary', type: 'input', message: 'Enter the salary for the role:' },
                { name: 'departmentId', type: 'input', message: 'Enter the department ID for the role:' }
            ]);
            await db.addRole(roleDetails.title, roleDetails.salary, roleDetails.departmentId);
            break;
        case 'Add an Employee':
            // Prompt for employee details and add employee
            const employeeDetails = await inquirer.prompt([
                { name: 'firstName', type: 'input', message: 'Enter the first name of the employee:' },
                { name: 'lastName', type: 'input', message: 'Enter the last name of the employee:' },
                { name: 'roleId', type: 'input', message: 'Enter the role ID for the employee:' },
                { name: 'managerId', type: 'input', message: 'Enter the manager ID for the employee (leave blank if none):', default: null }
            ]);
            await db.addEmployee(employeeDetails.firstName, employeeDetails.lastName, employeeDetails.roleId, employeeDetails.managerId);
            break;
        case 'Update an Employee Role':
            // Prompt for update details and update employee role
            const updateDetails = await inquirer.prompt([
                { name: 'employeeId', type: 'input', message: 'Enter the employee ID:' },
                { name: 'roleId', type: 'input', message: 'Enter the new role ID:' }
            ]);
            await db.updateEmployeeRole(updateDetails.employeeId, updateDetails.roleId);
            break;
        case 'Exit':
            // Close database connection and exit the application
            db.client.end();
            process.exit();
    }

    // Recursively call mainMenu to prompt for another action
    mainMenu();
};

mainMenu();