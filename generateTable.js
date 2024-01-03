const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mybusiness'
});

function generateTable(data) {
    if (data.businessQuestions === "View all departments"){
       console.log("View all departments")
       // Execute the SQL script
  connection.query('SELECT * FROM Newdepartments', (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      return;
    }
    console.log('Query results:', results);
  });

    // Close the connection
    connection.end();

  } 
  if (data.businessQuestions === "View all roles"){
     console.log("View all roles")
    // Execute the SQL script
connection.query('SELECT * FROM Role', (error, results, fields) => {
 if (error) {
   console.error('Error executing query:', error);
   return;
 }
 console.log('Query results:', results);
});

 // Close the connection
 connection.end();

} 
if (data.businessQuestions === "View all employees"){
  console.log("View all employees")
 // Execute the SQL script
connection.query('SELECT * FROM employees', (error, results, fields) => {
if (error) {
console.error('Error executing query:', error);
return;
}
console.log('Query results:', results);
});

// Close the connection
connection.end();

}
if (data.businessQuestions === "Add a department"){
  console.log("Add a department")
  const questions = [
    {
      type: 'input',
      name: 'text',
      message: "What department would you like to add?",
    },]
    inquirer.prompt(questions).then(answers => {
      // console.log(answers.text);
      connection.query(`INSERT INTO Newdepartments (name) VALUES ('${answers.text}');`, (error, results, fields) => {
      if (error) {
      console.error('Error executing query:', error);
      return;
      }
      console.log('Successfully added', answers.text);
      });
      
      // Close the connection
      connection.end();
    })
 // Execute the SQL script
 

}  
}


module.exports = generateTable;