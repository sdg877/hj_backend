import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Set your AWS credentials
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const getImagesByCategory = async (req, res) => {
  const { category } = req.params;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Prefix: `${category}/`,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const imageUrls = data.Contents.map(
      (item) =>
        `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${item.Key}`
    );
    res.json({ images: imageUrls });
  } catch (error) {
    console.error("Error retrieving images:", error);
    res.status(500).json({ message: "Error retrieving images" });
  }
};
