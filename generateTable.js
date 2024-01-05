const inquirer = require("inquirer");
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mybusiness",
});

function generateTable(data) {
  if (data.businessQuestions === "View all departments") {
    console.log("View all departments");
    // Execute the SQL script
    connection.query(
      "SELECT * FROM Newdepartments",
      (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          return;
        }
        console.log("Query results:", results);
      }
    );

    // Close the connection
    connection.end();
  }
  if (data.businessQuestions === "View all roles") {
    console.log("View all roles");
    // Execute the SQL script
    connection.query("SELECT * FROM Role", (error, results, fields) => {
      if (error) {
        console.error("Error executing query:", error);
        return;
      }
      console.log("Query results:", results);
    });

    // Close the connection
    connection.end();
  }
  if (data.businessQuestions === "View all employees") {
    console.log("View all employees");
    // Execute the SQL script
    connection.query("SELECT * FROM employees", (error, results, fields) => {
      if (error) {
        console.error("Error executing query:", error);
        return;
      }
      console.log("Query results:", results);
    });

    // Close the connection
    connection.end();
  }
  if (data.businessQuestions === "Add a department") {
    // console.log("Add a department")
    const questions = [
      {
        type: "input",
        name: "text",
        message: "What department would you like to add?",
      },
    ];
    inquirer.prompt(questions).then((answers) => {
      // console.log(answers.text);
      connection.query(
        `INSERT INTO Newdepartments (name) VALUES ('${answers.text}');`,
        (error, results, fields) => {
          if (error) {
            console.error("Error executing query:", error);
            return;
          }
          console.log("Successfully added", answers.text);
        }
      );

      // Close the connection
      connection.end();
    });
    // Execute the SQL script
  }
  if (data.businessQuestions === "Add a role") {
    console.log("Add a role");
    //  let departmentArray;
    connection.query(
      "SELECT * FROM Newdepartments",
      (error, results, fields) => {
        if (error) {
          console.error("Error executing query:", error);
          return;
        }
        // console.log('Query results:', results);
        const departmentArray = results.map((obj) => obj.name);
        const questions = [
          {
            type: "input",
            name: "text",
            message: "What is the name of the role?",
          },
          {
            type: "input",
            name: "textSalary",
            message: "What is the salary of the role?",
          },
          {
            type: "list",
            name: "departmentList",
            message: "What text department do you want?",
            choices: departmentArray,
            default: departmentArray[0],
          },
        ];
        inquirer.prompt(questions).then((answers) => {
          // console.log(answers);
          // console.log(results);
          const targetName = answers.departmentList;
          const foundRole = results.find((role) => role.name === targetName);
          // console.log(foundRole)
          connection.query(
            `INSERT INTO Role (title, salary, newdepartments_id) VALUES ('${answers.text}', ${answers.textSalary}, ${foundRole.id});`,
            (error, results, fields) => {
              if (error) {
                console.error("Error executing query:", error);
                return;
              }
              console.log("Successfully added", foundRole.name);
            }
          );

          // // // Close the connection
          // connection.end();
        });
        // console.log(departmentArray);
      }
    );

    // Close the connection
    //   connection.end();
    // // Execute the SQL script
  }
  if (data.businessQuestions === "Add an employee") {
    // console.log("Add an employee");
    const sqlQuery = "SELECT * FROM Role";
    connection.query(sqlQuery, (error, results, fields) => {
      // console.log(results);
      // console.log(results[0]);
      // console.log(results[1]);
      if (error) {
        console.error("Error executing query:", error);
        return;
      }
      // console.log('Query results:', results);
      const rolesArray = results.map((obj) => obj.title);
      // console.log(rolesArray);
      const getEmployeesSql = "SELECT * FROM Employees;";
      // connection.query(getEmployeesSql, (error, results, fields) => {
      //   if (error) {
      //     console.error("Error executing multiple queries:", error);
      //   } else {
      //     const managerArray = results.map((obj) => obj.id);
      //     // console.log(managerArray);
      //     const target = answers.managerList;
      //     const foundManager = results.find(
      //       (employee) => employee.firstName === targetName
      //     );
      //     // Handle the results of the first query
      //     console.log("Results of first query:", results);
      //   }
      // });
      const questions = [
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
        },
        {
          type: "list",
          name: "rolesList",
          message: "What is the employee's role?",
          choices: rolesArray,
          default: rolesArray[0],
        },
        // {
        //   type: "list",
        //   name: "managerList",
        //   message: "What is the employee's manager?",
        //   choices: managerArray,
        //   default: managerArray[0],
        // },
      ];
      inquirer.prompt(questions).then((answers) => {
        // console.log(answers);
        // console.log(results);
        const targetName = answers.rolesList;
        const foundRole = results.find((role) => role.title === targetName);
        // console.log(foundRole);

        connection.query(
          `INSERT INTO Employees (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}', '${answers.lastName}', ${foundRole.id}, 2);`,
          (error, results, fields) => {
            if (error) {
              console.error("Error executing query:", error);
              return;
            }
            console.log(
              `successfully added ${answers.firstName} ${answers.lastName} to the database`
            );
          }
        );

        // // // Close the connection
        // connection.end();
      });
      // console.log(departmentArray);
    });

    // Close the connection
    //   connection.end();
    // Execute the SQL script
  }
}

module.exports = generateTable;
