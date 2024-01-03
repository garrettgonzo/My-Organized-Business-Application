const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mybusiness'
});

function generateTable(data) {
    if (data.textColor === "View all departments"){
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
}

module.exports = generateTable;