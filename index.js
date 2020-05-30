const fs = require('fs');
const axios = require('axios');
const inquirer = require('inquirer');

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
        message: 'Enter your project Table of Contents',
        name: 'table'
    },
    {
        message: 'Enter your project Installation',
        name: 'installation'
    },
    {
        message: 'Enter your project Usage',
        name: 'usage'
    },
    {
        message: 'Enter your project License',
        name: 'license'
    },
    {
        message: 'Enter your project Contributing',
        name: 'contribute'
    },
    {
        message: 'Enter your project Tests',
        name: 'tests'
    },
    {
        message: 'Enter your project Questions',
        name: 'questions'
    }
    ])
    .then( (answers) => {
        const queryURL = `https://api.github.com/users/${answers.username}?per_page=100`;
        getApiData(queryURL, answers );
    })


    
function getApiData (url, answers) {
    axios
        .get(url)
        .then( response => {
            const userEmail = response.data.email;
            const userProfileImg = response.data.avatar_url;
            generateFile(userProfileImg, userEmail, answers);
        });
}

function generateFile (img, email, answers) {
    const {username, title, description, table, installation, usage, license, contribute, tests, questions} = answers;
    if (email === null) {
        email = `${username}@gmail.com`;
    }

    const contents = `
    ![profile Avatar](${img})

    ###${username}  ![GitHub Follower](https://img.shields.io/github/followers/${username}?label=Follower&style=social)

    ####Email Address: ${email}

    ----------------------------------------------------------------------------------------------------------------------

    #${title}

    ##Project Desscription:

    ${description}

    ##Table of Contents:

    ${table}

    ##Installation:

    ${installation}

    ##Usage:

    ${usage}

    ##License:

    ${license}

    ##Contributing:

    ${contribute}

    ##Test:

    ${tests}

    ##Question:

    ${questions}
    `

    fs.writeFile('README.md', contents , err => {
        if (err) {
            return console.error(err);
        }
        console.log('write Success!');
    })
}