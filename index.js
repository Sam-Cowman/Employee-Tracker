const inquirer = require('inquirer');
const db = require('./db/queries');

const mainMenu = async () => {
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
            const { departmentName } = await inquirer.prompt({
                name: 'departmentName',
                type: 'input',
                message: 'Enter the name of the department:'
            });
            await db.addDepartment(departmentName);
            break;
        case 'Add a Role':
            const roleDetails = await inquirer.prompt([
                { name: 'title', type: 'input', message: 'Enter the role title:' },
                { name: 'salary', type: 'input', message: 'Enter the salary for the role:' },
                { name: 'departmentId', type: 'input', message: 'Enter the department ID for the role:' }
            ]);
            await db.addRole(roleDetails.title, roleDetails.salary, roleDetails.departmentId);
            break;
        case 'Add an Employee':
            const employeeDetails = await inquirer.prompt([
                { name: 'firstName', type: 'input', message: 'Enter the first name of the employee:' },
                { name: 'lastName', type: 'input', message: 'Enter the last name of the employee:' },
                { name: 'roleId', type: 'input', message: 'Enter the role ID for the employee:' },
                { name: 'managerId', type: 'input', message: 'Enter the manager ID for the employee (leave blank if none):', default: null }
            ]);
            await db.addEmployee(employeeDetails.firstName, employeeDetails.lastName, employeeDetails.roleId, employeeDetails.managerId);
            break;
        case 'Update an Employee Role':
            const updateDetails = await inquirer.prompt([
                { name: 'employeeId', type: 'input', message: 'Enter the employee ID:' },
                { name: 'roleId', type: 'input', message: 'Enter the new role ID:' }
            ]);
            await db.updateEmployeeRole(updateDetails.employeeId, updateDetails.roleId);
            break;
        case 'Exit':
            db.client.end();
            process.exit();
    }

    mainMenu();
};

mainMenu();