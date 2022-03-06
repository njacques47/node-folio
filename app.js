const { writeFile, copyFile } = require('./utils/generate-site');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template.js'); // receives exported function from the relative path string written in require()



const promptUser = () => {
  return inquirer
    .prompt([{
        type: 'input',
        name: 'name',
        message: 'What is your name? (required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'What is your Github username? (required)',
        validate: githubInput => {
          if (githubInput) {
            return true;
          } else {
            console.log('Please enter your Github username!');
            return false;
          }

        }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to add some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some info about yourself:',
        when: ({ confirmAbout }) => confirmAbout
      }
    ]);
};

const promptProject = portfolioData => {
  console.log(`
  ==================
  Add a New Project
  ==================
  `);

  // if there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([{
        type: 'input',
        name: 'name',
        message: 'What is the name of your project? (required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your project name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your project (required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('Please enter your project description!');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the path name to your Github project (required)',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('Please enter your project link!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature your project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to add another project?',
        default: false
      },
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData); // if true, the promptProject(portfolioData) function gets called
      } else {
        return portfolioData; // if the user doesn't want to add more projects, only the recorded responses are returned
      }
    });
};

//const pageHTML = generatePage(mockData);

promptUser()
  .then(promptProject) // captures the data from promptUser and combines it with project data. project data then gets pushed into an array
  .then(portfolioData => { // bundles all the previously collected data to pass to the next .then()
     return generatePage(portfolioData);
  })
  .then(pageHTML => { // pageHTML accepts the newly created template of data and writes that to a new file in dist/. the return passes the promise to the next .then()
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => { //
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => { //
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });