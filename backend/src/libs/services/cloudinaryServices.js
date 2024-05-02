const { uploader, cloudinaryConfig } = require('../../config/cloudinary');

const uploadFiles = async (files) => {
  cloudinaryConfig();
  if (!(files instanceof Array)) files = [files];

  let promises = files.map((val) => {
    return val ? uploader.upload(`${val.path}`) : null;
  });

  let output = await Promise.all(promises);
  return output;
};

const removeFiles = async (files) => {};
module.exports = { uploadFiles };
