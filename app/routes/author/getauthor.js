const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  const AuthorModel = mongoose.model("Author");

  Authors = await AuthorModel.findOne({_id: req.params.id});

  res.status(200).json({
    success: true,
    message: "Author",
    data: Authors,
  });
};
