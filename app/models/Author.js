const mongoose = require("mongoose");
const { Schema } = mongoose;

const AuthorSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "can't be blank"],
    },
    lastName: {
      type: String,
      required: [true, "can't be blank"],
    },
    age: {
      type: Number,
      required: [true, "can't be null"],
    },
    Books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);

module.exports = AuthorSchema;
