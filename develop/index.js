const inquirer = require('inquirer');
const Manager = require('./lib/manager')
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const generateHtml = require('./util/generateHTML');
const fs = require('fs');
const generateHTML = require('./util/generateHTML');
const team = [];
//manager function
const createManager = () =>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the manager's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the manager's ID number?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the manager's email address?"
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the manager's office number?"
        }
    ]).then((response)=>{
        const newManager = new Manager(response.name, response.id, response.email, response.officeNumber);
        team.push(newManager);
        start();
    })
}
//engineer function 
const createEngineer = () =>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the engineer's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the engineer's ID number?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the engineer's email address?"
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the engineer's GitHub username?"
        }
    ]).then((response)=>{
        const newEngineer = new Engineer(response.name, response.id, response.email, response.github);
        team.push(newEngineer);
        start();
    })
}
//intern function
const createIntern = () =>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the intern's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the intern's ID number?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the intern's email address?"
        },
        {
            type: 'input',
            name: 'school',
            message: "What school does the intern attend?"
        }
    ]).then((response)=>{
        const newIntern = new Intern(response.name, response.id, response.email, response.school);
        team.push(newIntern);
        start();
    })
}

const start= () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which team member would you like to create?',
            name:'continue',
            choices:['Add Manager', 'Add Engineer', 'Add Intern', 'Done']
        }
    ]).then((response)=>{
        console.log(response.continue);
        switch (response.continue){
            case 'Add Manager':
                createManager();
                break;
            case 'Add Engineer':
                createEngineer();
                break;
            case 'Add Intern':
                createIntern();
                break;
            case 'Done':
            makeHTML();
        }
    })
}

const makeHTML= () => {
    fs.writeFile('./index.html', generateHTML(team), err =>{
        if(err){
            console.log(err)
        } else {
            console.log('Team completed!')
        }
    })
}

start();
