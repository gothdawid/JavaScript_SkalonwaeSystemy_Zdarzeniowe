const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  const BookModel = mongoose.model("Book");
  const AuthorModel = mongoose.model("Author");

  const NewBook = new BookModel({
    title: req.body.title,
    year: req.body.year,
    author: req.body.author,
  });

  NewBook.save()
    .then((book) => {
      res.status(200).json({
        success: true,
        message: "Book created",
        data: book,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "Book not created",
        errors: err,
      });
    });

    //append Book to Author books list

    

};
