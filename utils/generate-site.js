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