const fs = require('fs');
const axios = require('axios');
const inquirer = require('inquirer');

//Prompt the user to enter github username and answer question for README section
inquirer
    .prompt([
    {
        message: 'Enter your GitHub username',
        name: 'username'
    },
    {
        message: 'Enter your project Title',
        name: 'title'
    },
    {
        message: 'Enter your project Description',
        name: 'description'
    },
    {
        message: 'Enter your Email',
        name: 'email'
    },
    {
        type: 'editor',
        message: 'Enter your project Installation Instruction',
        name: 'installation'
    },
    {
        type: 'editor',
        message: 'Enter your project Usage Instruction',
        name: 'usage'
    },
    {
        type: 'checkbox',
        message: 'Choose your license type',
        name: 'license',
        choices: [
          'MIT', 
          'Apache', 
          'GPL'
        ]
    },
    {
        message: 'Enter your project Contributing',
        name: 'contribute'
    },
    {
        type: 'editor',
        message: 'Enter your project Tests Instruction',
        name: 'tests'
    }
  
    ])
    .then( (answers) => {
        const queryURL = `https://api.github.com/users/${answers.username}?per_page=100`;
        getApiData(queryURL, answers );
    })


// Call the API and create the README file    
function getApiData (url, answers) {
    axios
        .get(url)
        .then( response => {
            const userProfileUrl = response.data.html_url;
            console.log(response.data);
            generateFile(userProfileUrl, answers);
        });
}

//Construct README file
function generateFile (profileUrl, answers) {
    const {username, title, description, email, installation, usage, license, contribute, tests} = answers;

    
  
    const contents = `


# ${title}                                              ![Project license](https://img.shields.io/badge/license-${answers.license}-brightgreen)                                                       

## Project Desscription:

${description}

## Table of Contents:

*[Installation](#Installation%20Instruction)

*[Usage](#Usage)

*[License](#License)

*[Contributing](#Contributing)

*[Test Instruction](#Test%20Instruction)

*[Question](#Question)


## Installation Instruction:

${installation}

## Usage:

${usage}

## License:

${license}

## Contributing:

${contribute}

## Test Instruction:

${tests}

## Question:

if you have any question, Feel free to reach out to me at:

##### ${username}  ![GitHub Follower](https://img.shields.io/github/followers/${username}?label=Follower&style=social)
##### ${profileUrl}
##### Email Address: ${email}
`
    
    fs.writeFile('README.md', contents , err => {
        if (err) {
            return console.error(err);
        }
        console.log('write Success!');
    })
}