const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const AuthorModel = mongoose.model("Author");

  const NewAuthor = new AuthorModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
  });

  NewAuthor.save()
    .then((author) => {
      res.status(200).json({
        success: true,
        message: "Author created",
        data: author,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "Author not created",
        errors: err,
      });
    });
};
