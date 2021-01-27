const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



function createProfile(res) {
    inquirer
        .prompt([

            {
                type: "input",
                name: "name",
                message: " This documents generates Team Profiles for your organization. Please type in your name.",
            },
            {
                type: "input",
                name: "id",
                message: "If application, what's your ID Number?",
            },
            {
                type: "input",
                name: "email",
                message: "What's your email?",
            },
            {
                type: "list",
                name: "role",
                message: "Choose the following position that best fits your current role:",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                ]
            },
        ])
    .then((response) => {
        const role = response.role
        switch (role) {
            case "Manager":
                return renderManager(response);

            case "Engineer":
                return renderEngineer(response);
            case "Intern":
                return renderIntern(response);
            default:
                return addProfile();
        };
    });
};

function renderManager(answers) {
    inquirer
        .prompt([

            {
                type: "input",
                name: "officeNumber",
                message: "Hello Manager! What's your office number?",
            },

        ])
        .then((roleAnswer) => {
            const newManager = new Manager(answers.name, answers.id, answers.email, roleAnswer.officeNumber)
            console.log(newManager)
            addProfile();
            // return 
        });
};


function renderEngineer(answers) {
    inquirer
        .prompt([

            {
                type: "input",
                name: "github",
                message: "Hello Engineer! What's your github username?",
            },

        ])
        .then((roleAnswer) => {
            const newEngineer = new Engineer(answers.name, answers.id, answers.email, roleAnswer.github)
            console.log(newEngineer)
            addProfile();
            // return 
        });
};

function renderIntern(answers) {
    inquirer
        .prompt([

            {
                type: "input",
                name: "school",
                message: "Hello Intern! What's the name of your school?",
            },

        ])
        .then((roleAnswer) => {
            const newIntern = new Intern(answers.name, answers.id, answers.email, roleAnswer.school)
            console.log(newIntern)
            addProfile();
            // return 
        });
};

function addProfile() {
    inquirer
        .prompt([

            {
                type: "confirm",
                name: "add",
                message: "Would you like to add another team member",
            },

        ])
        .then((userAnswer) => {
            userAnswer.continue ? createProfile() : outputPath
        });
};


async function generateHTML(answers) {
    const renderHTML = render(file), {

    }
}

generateHTML();

createProfile();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
