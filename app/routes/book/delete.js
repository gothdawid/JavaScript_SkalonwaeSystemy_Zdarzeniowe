const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const BookModel = mongoose.model("Book");

  BookModel.findByIdAndDelete(req.params.id)
    .then((book) => {
      res.status(200).json({
        success: true,
        message: "Book deleted",
        data: book,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "Book not deleted",
        errors: err,
      });
    });
};
