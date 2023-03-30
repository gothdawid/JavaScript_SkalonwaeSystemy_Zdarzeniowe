const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  const AuthorModel = mongoose.model("Author");

  Author = await AuthorModel.findOneAndUpdate(
      {_id: req.params.id},
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
      })

  res.status(200).json({
    success: true,
    message: "Author was updated",
    data: Author,
  });
};
