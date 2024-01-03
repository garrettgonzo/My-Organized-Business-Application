const inquirer = require('inquirer');
const express = require('express');
const generateTable = require('./generatetable');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  const mybusinessarray = ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
  
  const questions = [
    {
      name: 'businessQuestions',
      type: "list",
      message: "What would you like to do?",
      choices: mybusinessarray,
      default: "Medium",
    },
  ];
  
  inquirer.prompt(questions).then(answers => {
    const table = generateTable(answers)
    // console.log(`Created ${answers.name}!`);
    // console.log(answers);
    // const svg = generateSVG(answers)
    // console.log(svg)
        // console.log(answers.name);
      //   console.log("sucess")
    });
  console.log(`Server is running on port ${port}`);
});
