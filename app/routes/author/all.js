const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  const AuthorModel = mongoose.model("Author");

  AuthorsList = await AuthorModel.find();

  res.status(200).json({
    success: true,
    message: "Authors list",
    data: AuthorsList,
  });
};
