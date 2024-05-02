var fs = require('fs');
const { basename } = require('path');

var rollbackFiles = async (files) => {
  // console.log(files);
  if (files) {
    files.forEach((val) => {
      let path = `${val?.path}`;
      if (path != 'undefined') fs.unlinkSync(path);
    });
  }
};

module.exports = { rollbackFiles };
