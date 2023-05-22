const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  const BookModel = mongoose.model("Book");

  BooksList = await BookModel.find().populate("author").exec();

  res.status(200).json({
    success: true,
    message: "Book list",
    data: BooksList,
  });
};
