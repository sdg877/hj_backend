import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import News from "../models/newsModel.js";
import s3 from "../../config/awsConfig.js";
import multer from "multer";
import AWS from "aws-sdk";
import { authenticateJWT } from "../../config/auth.js";

dotenv.config();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
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

export const deleteImage = async (req, res) => {
  authenticateJWT(req, res, async () => {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required." });
    }

    try {
      const parsedUrl = new URL(imageUrl);
      const pathname = parsedUrl.pathname;
      const key = pathname.substring(1);

      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      };

      await s3.deleteObject(params).promise();

      res.json({ message: "Image deleted successfully." });
    } catch (error) {
      console.error("Error deleting image:", error);
      if (error.code === "AccessDenied") {
        res.status(403).json({
          message:
            "Access denied. Please check IAM permissions, bucket policy, and ensure AWS credentials are correctly configured.",
          error: error.message,
        });
      } else {
        res
          .status(500)
          .json({ message: "Error deleting image.", error: error.message });
      }
    }
  });
};

export const uploadImage = async (req, res) => {
  const { category, description } = req.body;

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

    const imageUrl = await uploadImageToS3(
      fileBuffer,
      fileName,
      mimeType,
      category,
      description
    );

    res
      .status(201)
      .json({ message: "Image uploaded successfully", imageUrl, description });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Error uploading image" });
  }
};

const uploadImageToS3 = async (
  fileBuffer,
  fileName,
  mimeType,
  category,
  description
) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `uploads/${category}/${fileName}`,
    Body: fileBuffer,
    ContentType: mimeType,
    Metadata: {
      description: description || "",
    },
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    throw new Error("Error uploading image to S3: " + error.message);
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

export const getImage = async (req, res) => {
  const s3 = new AWS.S3();

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();

    if (!data.Contents || data.Contents.length === 0) {
      console.log("No images found in bucket.");
      return res.status(404).json({ message: "No images found" });
    }

    const images = await Promise.all(
      data.Contents.map(async (item) => {
        const headParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: item.Key,
        };

        try {
          const headData = await s3.headObject(headParams).promise();
          const description = headData.Metadata?.description || "";

          return {
            url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${item.Key}`,
            category: extractCategoryFromKey(item.Key),
            text: description, // Retrieve stored text
          };
        } catch (headError) {
          console.error("Error retrieving metadata for:", item.Key, headError);
          return null;
        }
      })
    );

    res.json({ images: images.filter(Boolean) });
  } catch (err) {
    console.error("Error fetching images from S3:", err);
    res.status(500).json({ message: "Failed to load images" });
  }
};

function extractCategoryFromKey(key) {
  if (!key) return "uncategorized";

  const parts = key.split("/");
  if (parts.length >= 2) {
    return parts[1];
  } else if (parts.length === 1) {
    return parts[0].split(".")[0];
  } else {
    return "uncategorized";
  }
}

export const getSingleNews = async (req, res) => {
  const { id } = req.params;

  try {
    const newsItem = await News.findOne({
      "newsUpdates._id": id,
    });

    if (!newsItem) {
      return res.status(404).json({ message: "News item not found" });
    }

    const foundNews = newsItem.newsUpdates.find(
      (item) => item._id.toString() === id
    );

    if (!foundNews) {
      return res.status(404).json({ message: "News update not found" });
    }

    res.json({ newsItem: foundNews });
  } catch (error) {
    console.error("Error fetching news item:", error);
    res.status(500).json({ message: "Error fetching news item" });
  }
};
