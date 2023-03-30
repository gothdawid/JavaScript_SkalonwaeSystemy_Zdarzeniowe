const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  const BookModel = mongoose.model("Book");

  Book = await BookModel.findOneAndUpdate(
      {_id: req.params.id},
      {
        title: req.body.title,
        year: req.body.year,
        author: req.body.author,
      })

  res.status(200).json({
    success: true,
    message: "Book was updated",
    data: Book,
  });
};
