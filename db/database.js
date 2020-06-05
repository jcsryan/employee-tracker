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
        }
    })

  }
  
  viewEmployees = () => {
      connection.query(`SELECT * FROM work_db.Employee`, function (err, result) {
        if (err) throw err;
        console.table( result)
    });
    connection.end();
  };

  viewDepartment = () => {
    connection.query(`SELECT * FROM work_db.department`, function(err, result) {
        if(err) throw err;
        console.table( result)
    });
    connection.end();
  };

  viewRole = () => {
      connection.query(`SELECT * FROM work_db.Role`, function(err, result) {
          if(err) throw err;
          console.table( result)
      });
      connection.end()
  };

 addDepartment = () => {
     inquirer
     .prompt([
         {
             type: "input",
             name: "input",
             message: "What department would you like to add?"
         }
     ]).then
     let stmt = `INSERT INTO department(department) VALUES(?)`;
     connection.query(stmt,(err, result) => {
         if(err) throw err;
         console.table(result)
     })
     connection.end()
     
    }

  function quit() {
      console.log("quit")
      process.exit()
  }
