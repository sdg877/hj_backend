const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Set your AWS credentials
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Function to fetch images by category
const getImagesByCategory = async (req, res) => {
  const { category } = req.params;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME, 
    Prefix: category + '/', 
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const images = data.Contents.map((item) => ({
      fileName: item.Key.split('/').pop(), // Extract file name
      fileUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`,
    }));

    if (!images.length) {
      return res.status(404).json({ message: `No images found for category ${category}` });
    }

    return res.status(200).json({ images });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching images from S3.' });
  }
};

module.exports = {
  getImagesByCategory,
};