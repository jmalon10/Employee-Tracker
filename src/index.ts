import inquirer from "inquirer";
import { Pool } from 'pg';
import { QueryResult } from 'pg';
import { dbConfig, connectToDb } from './connection.js';

await connectToDb();
class Queries {
    private pool: Pool;
    exit: boolean = false;
    constructor(pool: Pool) {
                this.pool = pool; 
            }
            async performActions(): Promise<void> {
                const answers = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'action',
                        message: 'What Would You Like to Do?',
                        choices: [
                            'View All Departments',
                            'View All Roles',
                            'View All Employees',
                            'Add a Department',
                            'Add a Role',
                            'Add an Employee',
                            'Update an Employee Role',
                            'Exit',
                        ],
                    },
                ]);
            
                switch (answers.action) {
                    case 'View All Departments':
                        await this.viewAllDepartments();
                        break;
                    case 'View All Roles':
                        await this.viewAllRoles();
                        break;
                    case 'View All Employees':
                        await this.viewAllEmployees();
                        break;
                    case 'Add a Department':
                        await this.addDepartment(); // Await this so the prompt stays until the action is done
                        break;
                    case 'Add a Role':
                        await this.addRole();
                        break;
                    case 'Add an Employee':
                        await this.addEmployee();
                        break;
                    case 'Update an Employee Role':
                        await this.updateEmployeeRole();
                        break;
                    case 'Exit':
                        this.exit = true;
                        process.exit(0);
                        break;
                    default:
                        console.log('Invalid action');
                }
            
                if (!this.exit) {
                    await this.performActions(); // Wait for actions to complete before showing the menu again
                }
            }
            
    async viewAllDepartments(): Promise<any> {
        try {
            const result = await this.pool.query('SELECT * FROM department');
            console.table(result.rows);  
        } catch (err) {
            console.error(err);
            throw new Error('Something went wrong while fetching departments'); 
        }
    }
   
    // Add similar methods for other actions
    async viewAllRoles(): Promise<any> {
        try {
            const result = await this.pool.query('SELECT * FROM role');
            console.table(result.rows);  
        } catch (err) {
            console.error(err);
            throw new Error('Something went wrong while fetching roles');  
        }
    }

    async viewAllEmployees() : Promise<any> {
        try {
            const result = await this.pool.query('SELECT * from employee');
            console.table(result.rows);  
        } catch (err) {
            console.error(err);
            throw new Error('Something went wrong while fetching roles');  
        }
    }

    async addDepartment(): Promise<void> {
        try {
            // Prompt the user for department input
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'department',
                    message: 'Enter the department you would like to add:',
                }
            ]);
    
            const department = answers.department;
    
            // Perform the database insert operation
            const result = await this.pool.query(`INSERT INTO department (name) VALUES ($1) RETURNING *;`, [department]);
    
            // Log the result to the console
            console.log('Department added:');
            console.table(result.rows); 
    
        } catch (err) {
            console.error('Something went wrong while adding a department:', err);
        } 
       
    }
    
    async addRole() : Promise<void> {
        try {
            // Prompt the user for department input
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'role',
                    message: 'Enter the title of the role you would like to add:',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the annual salary of the role you would like to add:',
                },
                {
                    type: 'input',
                    name: 'department',
                    message: 'Enter the department id of the role you would like to add:',
                }
            ]);
    
            const { role, salary, department } = answers;
    
            // Perform the database insert operation
            const result = await this.pool.query(`INSERT INTO role (title, salary, department_id)
                        VALUES ($1, $2, $3) RETURNING *;`, [role, salary, department]);
    
            // Log the result to the console
            console.log('Role added:');
            console.table(result.rows); 
    
        } catch (err) {
            console.error('Something went wrong while adding a role:', err);
        } 
       
    }

    async addEmployee() : Promise<void> {
        try {
            // Prompt the user for department input
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the first name of the employee you would like to add:',
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the last name of the employee you would like to add:',
                },
                {
                    type: 'input',
                    name: 'role',
                    message: 'Enter the role id of the employee:',
                },
                {
                    type: 'input',
                    name: 'department',
                    message: 'Enter the department id of the department the employee belongs to:',
                }
            ]);
    
            const { firstName, lastName, role, department} = answers;
    
            // Perform the database insert operation
            const result = await this.pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ($1, $2, $3, $4) RETURNING *;`, [firstName, lastName, role, department]);
    
            // Log the result to the console
            console.log('employee added:');
            console.table(result.rows); 
    
        } catch (err) {
            console.error('Something went wrong while adding an employee:', err);
        } 
       
    }

    async updateEmployeeRole() : Promise<void> {
        try {
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter the first name of the employee whos role you would like to update:',
                },
                {
                    type: 'input',
                    name: 'role',
                    message: 'Enter the role id of the new role for the employee:',
                }
            ]);
    
            const { name, role} = answers;
    
            // Perform the database insert operation UPDATE employee SET role_id = ($1) WHERE first_name = ($2);
            const result = await this.pool.query(`UPDATE employee SET role_id = ($1) WHERE first_name = ($2) RETURNING *;`, [role, name]);

            // Log the result to the console
            console.log('Role updated:'); 
            console.table(result.rows);
    
        } catch (err) {
            console.error('Something went wrong while updating an employee role:', err);
        } 
       
    }

    async closeConnection() {
        await this.pool.end(); // Close the database connection when done
    }
}

const query = new Queries(dbConfig);
query.performActions();
        