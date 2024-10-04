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
            
    // async performActions(): Promise<void> {
    // const answers = await inquirer.prompt([       
    //     {
    //       type: 'list',
    //       name: 'action',
    //       message: 'What Would You Like to Do?',
    //       choices: [
    //         'View All Departments',
    //         'View All Roles',
    //         'View All Employees',
    //         'Add a Department',
    //         'Add a Role',
    //         'Add an Employee',
    //         'Update an Employee Role',
    //         'Exit',
    //       ],
    //     },
    //   ])
    //   .then((answers: any) => {
    //     if (answers.action === 'View All Departments') {
    //         this.viewAllDepartments();
    //     } else if (answers.action === 'View All Roles') {
    //          this.viewAllRoles();
    //     }else if (answers.action === 'View All Employees') {
    //          this.viewAllEmployees();
    //     }else if (answers.action === 'Add a Department') {
    //          this.addDepartment();
    //     }else if (answers.action === 'Add a Role') {
    //          this.addRole();
    //     }else if (answers.action === 'Add an Employee') {
    //          this.addEmployee();
    //     }else if (answers.action === 'Update an Employee Role') {
    //          this.updateEmployeeRole();
    //     }else if (answers.action === 'Exit') {
    //         this.exit = true;
    //         process.exit(0);
    //     }if (!this.exit) {
    //         await this.performActions(); // Wait for actions to complete before showing the menu again
    //     }
    //   })
    // }

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
    
    async addRole() {
        // Implement add role logic
    }

    async addEmployee() {
        // Implement add employee logic
    }

    async updateEmployeeRole() {
        // Implement update employee role logic
    }

    async closeConnection() {
        await this.pool.end(); // Close the database connection when done
    }
}

const query = new Queries(dbConfig);
query.performActions();
        