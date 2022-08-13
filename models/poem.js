const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const poemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 255
    },
    album: {
      type: String,
      trim: true,
      required: true,
      maxlength: 125
    },
    content: {
      type: String,
      required: true
    },
    date: {
      type: String,
      maxlength: 16
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    author: {
      type: ObjectId,
      ref: "User"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Poem', poemSchema);
