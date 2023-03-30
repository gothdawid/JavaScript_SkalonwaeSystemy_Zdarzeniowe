const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  const BookModel = mongoose.model("Book");

  Book = await BookModel.findOne({_id: req.params.id});

  res.status(200).json({
    success: true,
    message: "Author",
    data: Book,
  });
};
