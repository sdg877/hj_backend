import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import News from "../models/newsModel.js";
import s3 from "../../config/awsConfig.js";
import multer from "multer";

dotenv.config();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

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

export const uploadImageOnly = async (req, res) => {
  console.log("Incoming request:", req.body);
  console.log("File received:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file provided." });
  }

  try {
    const fileBuffer = req.file.buffer;
    const fileName = `${Date.now()}_${req.file.originalname}`;
    const mimeType = req.file.mimetype;

    console.log("File details:", { fileName, mimeType });

    const imageUrl = await uploadImageToS3(fileBuffer, fileName, mimeType);

    console.log("S3 upload result:", imageUrl);

    res.status(201).json({ message: "Image uploaded successfully", imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
};

const uploadImageToS3 = async (fileBuffer, fileName, mimeType, category) => {
  // Ensure the category is sanitized (only letters, numbers, hyphens, underscores)
  const sanitizedCategory = category
    ? category.replace(/[^a-zA-Z0-9-_]/g, "")
    : "default";

  // Construct the S3 key (path)
  const key = `${sanitizedCategory}/${fileName}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key, // Use category and file name for the S3 path
    Body: fileBuffer,
    ContentType: mimeType,
    ACL: "public-read", // Optional: makes the file publicly accessible
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    console.log("S3 upload result:", uploadResult);
    return uploadResult.Location; // URL of the uploaded image
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};

export const addNewsOnly = async (req, res) => {
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

export const addNewsWithImage = async (req, res) => {
  const { title, comment } = req.body;

  if (!title || !comment) {
    return res.status(400).json({ message: "Title and comment are required." });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Image file is required." });
  }

  try {
    const fileBuffer = req.file.buffer;
    const fileName = `${Date.now()}_${req.file.originalname}`;
    const mimeType = req.file.mimetype;

    const imageUrl = await uploadImageToS3(fileBuffer, fileName, mimeType);

    const newNewsUpdate = {
      title,
      comment,
      imageUrl,
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

    res.status(201).json({
      message: "News update with image added successfully",
      newNewsUpdate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding news update with image" });
  }
};
