import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import News from "../models/newsModel.js";
import s3 from "../../config/awsConfig.js";
import multer from "multer";

dotenv.config();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadImageToS3 = async (fileBuffer, fileName, mimeType, category) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `uploads/${category}/${fileName}`, 
    Body: fileBuffer,
    ContentType: mimeType,
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    throw new Error("Error uploading image to S3: " + error.message);
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

export const deleteImage = async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: "Image URL is required." });
  }

  try {
    const key = imageUrl.split("amazonaws.com/")[1];

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    };

    await s3.deleteObject(params).promise();
    res.json({ message: "Image deleted successfully." });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Error deleting image.", error });
  }
};

export const uploadImage = async (req, res) => {
  const { category } = req.body;

  console.log("Incoming request:", req.body);
  console.log("File received:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file provided." });
  }

  if (!category) {
    return res.status(400).json({ message: "Category is required." });
  }

  try {
    const fileBuffer = req.file.buffer;
    const fileName = `${Date.now()}_${req.file.originalname}`;
    const mimeType = req.file.mimetype;

    console.log("File details:", { fileName, mimeType });

    const imageUrl = await uploadImageToS3(
      fileBuffer,
      fileName,
      mimeType,
      category
    );

    console.log("S3 upload result:", imageUrl);

    res.status(201).json({ message: "Image uploaded successfully", imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
};

export const addNews = async (req, res) => {
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
    res.status(500).json({ message: "Error adding news update" });
  }
};

export const updateNews = async (req, res) => {
  const { newsId } = req.params;
  const { title, comment } = req.body;

  if (!title || !comment) {
    return res.status(400).json({ message: "Title and comment are required." });
  }

  try {
    const news = await News.findOne();
    if (!news) {
      return res.status(404).json({ message: "No news found" });
    }

    const newsUpdate = news.newsUpdates.find(
      (update) => update._id.toString() === newsId
    );

    if (!newsUpdate) {
      return res.status(404).json({ message: "News update not found." });
    }

    newsUpdate.title = title;
    newsUpdate.comment = comment;

    await news.save();
    res.status(200).json({ message: "News updated successfully", newsUpdate });
  } catch (error) {
    console.error("Error updating news:", error);
    res.status(500).json({ message: "Error updating news" });
  }
};

export const deleteNews = async (req, res) => {
  const { newsId } = req.params; // Get the news ID from the URL

  try {
    const news = await News.findOne();
    if (!news) {
      return res.status(404).json({ message: "No news found" });
    }

    news.newsUpdates = news.newsUpdates.filter(
      (update) => update._id.toString() !== newsId
    );

    await news.save();
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("Error deleting news:", error);
    res.status(500).json({ message: "Error deleting news" });
  }
};
