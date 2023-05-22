const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  const AuthorModel = mongoose.model("Author");

  Author = await AuthorModel.findOne({_id: req.params.id}).populate("Books").exec();

  res.status(200).json({
    success: true,
    message: "Author",
    data: Author,
  });
};
