const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'Butcher12!',
    database: 'work_db'
  });

  connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    //viewEmployees()
    firstQuestion()
  });

  function firstQuestion() {
    inquirer
        .prompt([
           {
               type: "list",
               name: "initial",
               message: "What would you like to do?",
               choices: [
                   {
                       name: "View all employees",
                       value: "VIEW_EMPLOYEES"
                   },
                   {
                       name: "View all departments",
                       value: "VIEW_DEPARTMENT" 
                   },
                   {
                       name: "View all roles",
                       value: "VIEW_ROLE"
                   },
                   {
                       name: "Add a Department",
                       value: "ADD_DEPARTMENT"
                   },
                   {
                       name: "Add a role",
                       value: "ADD_ROLE"
                   },
                   {
                       name: "Add an Employee",
                       value: "ADD_EMPLOYEE"
                   },
                   {
                       name: "Update an existing employee",
                       value: "UPDATE_EMPLOYEE",
                   },
                   {
                       name: "Delete an employee.",
                       value: "DELETE_EMPLOYEE",
                   },
                   {
                       name: "Quit",
                       value: "QUIT"
                   }
                ]
           } 
    ]).then((answers) => { console.log(answers)
        switch(answers.initial){
            case "VIEW_EMPLOYEES":
                return viewEmployees()
            case "VIEW_DEPARTMENT":
                return viewDepartment()
            case "VIEW_ROLE":
                return viewRole()
            case "ADD_DEPARTMENT":
                return addDepartment()
            case "ADD_ROLE":
                return addRole()
            case "ADD_EMPLOYEE":
                return addEmployee()
            case "UPDATE_EMPLOYEE":
                return updateEmployee()
            case "DELETE_EMPLOYEE":
                return deleteEmployee()
            case "QUIT":
                return quit()
        }
    })

  }
  
  viewEmployees = () => {
      connection.query(`SELECT * FROM work_db.Employee`, function (err, result) {
        if (err) throw err;
        console.table( result)
    });
    firstQuestion()
  };

  viewDepartment = () => {
    connection.query(`SELECT * FROM work_db.departments`, function(err, result) {
        if(err) throw err;
        console.table( result)
    });
    firstQuestion()
  };

  viewRole = () => {
      connection.query(`SELECT * FROM work_db.Role`, function(err, result) {
          if(err) throw err;
          console.table( result)
      });
      firstQuestion()
  };

addDepartment = () => {
     inquirer
     .prompt([
         {
             type: "input",
             name: "department",
             message: "What department would you like to add?",
             validate: name => {
                if(name) {
                    return true;
                } else{
                    return false;
                }
             }
         }
     ]).then( res => {
       let name = res;
       departmentAdd(name)
       firstQuestion()  
     })
    };
     
departmentAdd = (department) => {    
     return connection.query("INSERT INTO departments SET ?", department)        
    }

addRole = () => {
    inquirer
     .prompt([
         {
             type: "input",
             name: "title",
             message: "What role would you like to add?",
             validate: name => {
                if(name) {
                    return true;
                } else{
                    return false;
                }
             }
         },
         {
             type: 'input',
             name: 'salary',
             messaage: 'What is the salary?',
             validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('Please enter your desc!');
                  return false;
                }
              }
         },
         {
             type: 'input',
             name: 'department_id',
             message: 'What is the department id?',
             validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  console.log('Please enter your desc!');
                  return false;
                }
              }
         }
     ]).then( res => {
       let name = res;
       roleAdd(name)
       firstQuestion()  
     })
    };
     
roleAdd = (role) => {    
     return connection.query("INSERT INTO Role SET ?", role) 
}

addEmployee = () => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "first_name",
            message: "First Name?",
            validate: name => {
               if(name) {
                   return true;
               } else{
                   return false;
               }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            messaage: 'Last Name?',
            validate: nameInput => {
               if (nameInput) {
                 return true;
               } else {
                 return false;
               }
             }
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the department id?',
            validate: nameInput => {
               if (nameInput) {
                 return true;
               } else {
                 return false;
               }
             }
        },
        {
            type: "input",
            name: 'manager_id',
            message: "What is their manager's id?",
            validate: nameInput => {
                if (nameInput) {
                  return true;
                } else {
                  return false;
                }
              }
        }
    ]).then( res => {
      let name = res;
      employeeAdd(name)
      firstQuestion()  
    })
   };


employeeAdd = (role) => {    
    return connection.query("INSERT INTO Employee SET ?", role) 
}

updateEmployee = () => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "id",
            message: "Employee id?",
            validate: name => {
               if(name) {
                   return true;
               } else{
                   return false;
               }
            }
        },
        {
            type: "input",
            name: "role_id",
            message: "New Role?",
            validate: name => {
               if(name) {
                   return true;
               } else{
                   return false;
               }
            }
        },
    ]).then( res => {
        let name = res;
        addUpdate(name)
        firstQuestion() 
    })
};

addUpdate = (role) => {   
 
    return connection.query("UPDATE Employee SET role_id = ? WHERE id=?", [role[0], role[1]]) 
}

deleteEmployee = () => {
    inquirer
    .prompt([
        {
            type: "input",
            name: "id",
            message: "What is the employee's id?",
            validate: name => {
               if(name) {
                   return true;
               } else{
                   return false;
               }
            }
        }
    ]).then( res => {
      let name = res;
      Employeedelete(name)
      firstQuestion()  
    })
   };
    
Employeedelete = (department) => {    
    console.log(department)
    return connection.query("DELETE FROM departments WHERE id=?", department)        
   }

function quit() {
        console.log("quit")
        process.exit()
    };
  