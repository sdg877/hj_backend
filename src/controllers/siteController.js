import AWS from "aws-sdk";
import News from "../models/newsModel.js";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const getImagesByCategory = async (req, res) => {
  const { category } = req.params;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Prefix: `uploads/${category}/`,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();

    if (!data.Contents || data.Contents.length === 0) {
      console.log(`No images found for category: ${category}`);
      return res
        .status(404)
        .json({ message: "No images found for this category" });
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
            category,
            text: description,
          };
        } catch (headError) {
          console.error("Error retrieving metadata for:", item.Key, headError);
          return null;
        }
      })
    );

    res.json({ images: images.filter(Boolean) });
  } catch (error) {
    console.error("Error retrieving images:", error);
    res.status(500).json({ message: "Error retrieving images" });
  }
};

export const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json({ news });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Error fetching news" });
  }
};
