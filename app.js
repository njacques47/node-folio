const fs = require('fs');
const profileDataArgs = process.argv.slice(2, process.argv.length);

const [name, github] = profileDataArgs;

// create an arrow function for generatePage() 
const generatePage = (name, github) => {
  return `
  <!DOCTYPE html> 
  <html lang="en"> 
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
  </head>

  <body>
    <h1>${name}</h1>
    <h2><a href="https://github.com/${github}">Github</a></h2>
  </body>
  </html>
  `;
};

// the fs.writeFile creates the html using the generatePage template literal, and has a callback function for errors & the success message. This is done by passing 3 arguments --> fs.writeFile(fileName.whatever, fileData, callbackErrorHandle)
fs.writeFile('index.html', generatePage(name, github), err => {
  if (err) throw err;

  console.log('Portfolio complete! Check out the newly generated index.html to see the output!')
});