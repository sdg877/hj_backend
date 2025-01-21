import mongoose from "mongoose"; 

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

export default mongoose.model("News", newsSchema);
