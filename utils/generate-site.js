const fs = require('fs');

const writeFile = fileContent => {
  return new Promise ((resolve, reject) => {
    fs.writeFile('./dist/index.html', fileContent, err => {
      // if there's an error, reject the Promise and send the error to the Promise's '.catch()' method
      if (err) {
        reject(err);
        // an empty return prevents the code from trying to continue execution
        return;
      }

      // if accepted, the Promise is resolve and sends the data to the '.then()' method
      resolve({
        ok: true,
        message: 'file created!'
      });
    });
  });
};

const copyFile = () => {
  return new Promise ((resolve, reject) => {
    // copy file from location1 to location2 & if error, throw err
    fs.copyFile('./src/style.css', './dist/style.css', err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'stylesheet copied!'
      });
    });
  });
};

module.exports = { writeFile, copyFile };