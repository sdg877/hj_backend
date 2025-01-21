import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import News from "../models/newsModel.js";
import s3 from "../../config/awsConfig.js";

dotenv.config();

export const uploadImageToS3 = async (fileBuffer, fileName, mimeType) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: mimeType,
    ACL: "public-read",
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    return uploadResult;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};

export const addNewsUpdate = async (req, res) => {
  const { title, comment } = req.body;

  if (!title || !comment) {
    return res.status(400).json({ message: "Title and comment are required." });
  }

  try {
    const newNewsUpdate = {
      title,
      comment,
      timestamp: new Date(),
    };

    const news = await News.findOne();
    if (news) {
      news.newsUpdates.push(newNewsUpdate);
      await news.save();
    } else {
      const newNews = new News({
        newsUpdates: [newNewsUpdate],
      });
      await newNews.save();
    }

    res
      .status(201)
      .json({ message: "News update added successfully", newNewsUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, process.env.SECRET, { expiresIn: "1h" });

  res.json({ token });
};
