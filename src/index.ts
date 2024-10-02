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
      ])
      .then((answers: any) => {
        if (answers.action === 'View All Departments') {
            this.viewAllDepartments();
        } else if (answers.action === 'View All Roles') {
             this.viewAllRoles();
        }else if (answers.action === 'View All Employees') {
             this.viewAllEmployees();
        }else if (answers.action === 'Add a Department') {
             this.addDepartment();
        }else if (answers.action === 'Add a Role') {
             this.addRole();
        }else if (answers.action === 'Add an Employee') {
             this.addEmployee();
        }else if (answers.action === 'Update an Employee Role') {
             this.updateEmployeeRole();
        }else if (answers.action === 'Exit') {
            this.exit = true;
            process.exit(0);
        }if (!this.exit) {
             this.performActions(); // Recursively call to show the menu again
        }
      })
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

    async addDepartment() {
        // Implement add department logic
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
        