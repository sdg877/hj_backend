const mongoose = require("mongoose");

const { Schema } = mongoose;

const newsSchema = new Schema({
  newsUpdates: [
    {
      title: { type: String, required: true },
      comment: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("News", newsSchema);
