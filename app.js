const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { restoreDefaultPrompts } = require("inquirer");

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


let team = [];

function renderHTMl(){
    fs.writeFileSync(outputPath, render(team))
}


function createProfile() {
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
                    "Exit Profile Generator",
                ]
            },
        ])
        .then((employee) => {
            const role = employee.role
            switch (role) {
                case "Manager":
                    return renderManager(employee);
                case "Engineer":
                    return renderEngineer(employee);
                case "Intern":
                    return renderIntern(employee);
                case "Exit Profile Generator":
                    return renderHTMl();
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

            team.push(newManager)
            let results = render(team);

            fs.writeFile(outputPath, results, (err) => {
                if (err) throw err;
                console.log("This profile has been saved.");
            });
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

            team.push(newEngineer)
            let results = render(team);
            fs.writeFile(outputPath, results, (err) => {
                if (err) throw err;
                console.log("This profile has been saved.");
            });
            addProfile();
            // return 
        });
};

fs

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

            team.push(newIntern)
            let results = render(team);
            fs.writeFile(outputPath, results, (err) => {
                if (err) throw err;
                console.log("This profile has been saved.");
            });
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
                message: "Would you like to add another team member?",
                default: true
            },

        ])
        .then((userAnswer) => {
            team.push(userAnswer);
            switch (userAnswer) {
                case true:
                    return createProfile();
                default:
                    return console.log("profile completed")
            }


        });
};





createProfile();




