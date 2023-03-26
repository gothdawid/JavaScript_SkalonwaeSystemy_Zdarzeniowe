const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const AuthorModel = mongoose.model("Author");

  AuthorModel.findByIdAndDelete(req.params.id)
    .then((author) => {
      res.status(200).json({
        success: true,
        message: "Author deleted",
        data: author,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "Author not deleted",
        errors: err,
      });
    });
};
