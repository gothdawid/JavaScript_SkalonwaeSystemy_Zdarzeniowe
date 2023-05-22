const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  const AuthorModel = mongoose.model("Author");
  const BookModel = mongoose.model("Book");

  AuthorsList = await AuthorModel.find().populate('Books').exec();

  res.status(200).json({
    success: true,
    message: "Authors list",
    data: AuthorsList,
  });
};
