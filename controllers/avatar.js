// const path = require("path"); //для статики

const uploadLogo = async (req, res, next) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      let avatar = req.files.avatar;
      avatar.mv("./uploads/" + avatar.name);

      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size,
          path: `http://localhost:3000/uploads/${avatar.name}`,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
  //   });
};

module.exports = {
  uploadLogo,
};
