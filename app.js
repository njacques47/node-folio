const fs = require('fs');
const generatePage = require('./src/page-template.js'); // receives exported function from the relative path string written in require()
const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

fs.writeFile('index.html', generatePage(name, github), err => {
  if (err) throw err;

  console.log('Portfolio complete! Check out the newly generated index.html to see the output!')
});