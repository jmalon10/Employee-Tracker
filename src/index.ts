import inquirer from "inquirer";
import { Pool } from 'pg';
class Queries {
    private pool: Pool;
    exit: boolean = false;
    constructor(dbConfig: { user: string, host: string, database: string, password: string, port: number }) {
                this.pool = new Pool(dbConfig); 
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
            console.log('user chose view all departments'),
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
        }if (!this.exit) {
             this.performActions(); // Recursively call to show the menu again
        }
      })
    }
    async viewAllDepartments() {
        const res = await this.pool.query('SELECT * FROM departments');
        console.log(res); 
    }
   
    // Add similar methods for other actions
    async viewAllRoles() {
        const res = await this.pool.query('SELECT * FROM roles');
        console.log(res.rows);
    }

    async viewAllEmployees() {
        const res = await this.pool.query('SELECT * FROM employees');
        console.log(res.rows);
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


// import inquirer from "inquirer";
// import { Pool } from 'pg'; // Import PostgreSQL pool

// class Queries {
//     private pool: Pool; // Declare a pool variable
//     exit: boolean = false;

//     constructor(dbConfig: { user: string, host: string, database: string, password: string, port: number }) {
//         this.pool = new Pool(dbConfig); // Initialize the pool
//     }

//     async performActions(): Promise<void> {
//         const answers = await inquirer.prompt([
//             {
//                 type: 'list',
//                 name: 'action',
//                 message: 'What Would You Like to Do?',
//                 choices: [
//                     'View All Departments',
//                     'View All Roles',
//                     'View All Employees',
//                     'Add a Department',
//                     'Add a Role',
//                     'Add an Employee',
//                     'Update an Employee Role',
//                     'Exit',
//                 ],
//             },
//         ]);

//         // Perform the selected action
//         switch (answers.action) {
//             case 'View All Departments':
//                 await this.viewAllDepartments();
//                 break;
//             case 'View All Roles':
//                 await this.viewAllRoles();
//                 break;
//             case 'View All Employees':
//                 await this.viewAllEmployees();
//                 break;
//             case 'Add a Department':
//                 await this.addDepartment();
//                 break;
//             case 'Add a Role':
//                 await this.addRole();
//                 break;
//             case 'Add an Employee':
//                 await this.addEmployee();
//                 break;
//             case 'Update an Employee Role':
//                 await this.updateEmployeeRole();
//                 break;
//             case 'Exit':
//                 console.log('Exiting...');
//                 this.exit = true;
//                 break;
//         }

//         if (!this.exit) {
//             await this.performActions(); // Recursively call to show the menu again
//         }
//     }

//     // Example methods for database actions
//     async viewAllDepartments() {
//         const res = await this.pool.query('SELECT * FROM departments');
//         console.log(res.rows); // Replace with your desired output formatting
//     }

//     // Add similar methods for other actions
//     async viewAllRoles() {
//         const res = await this.pool.query('SELECT * FROM roles');
//         console.log(res.rows);
//     }

//     async viewAllEmployees() {
//         const res = await this.pool.query('SELECT * FROM employees');
//         console.log(res.rows);
//     }

//     async addDepartment() {
//         // Implement add department logic
//     }

//     async addRole() {
//         // Implement add role logic
//     }

//     async addEmployee() {
//         // Implement add employee logic
//     }

//     async updateEmployeeRole() {
//         // Implement update employee role logic
//     }

//     async closeConnection() {
//         await this.pool.end(); // Close the database connection when done
//     }
// }


const dbConfig = {
    user: 'yourUser',
    host: 'localhost',
    database: 'yourDatabase',
    password: 'yourPassword',
    port: 5432,
};

const query = new Queries(dbConfig);
query.performActions();
        