const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "can't be blank"],
    },
    year: {
      type: Number,
      required: [true, "can't be null"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: [true, "Wrong author id"],
    },
  },
  { timestamps: true }
);

module.exports = BookSchema;
