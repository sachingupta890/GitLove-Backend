import AWS from "aws-sdk";


const rekognition = new AWS.Rekognition({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Compare Two Faces
export const compareFaces = async (sourceImage, targetImage) => {
  try {
    const params = {
      SourceImage: {
        S3Object: { Bucket: "your-bucket-name", Name: sourceImage },
      },
      TargetImage: {
        S3Object: { Bucket: "your-bucket-name", Name: targetImage },
      },
      SimilarityThreshold: 80, 
    };

    const result = await rekognition.compareFaces(params).promise();
    return result.FaceMatches.length > 0; 
  } catch (error) {
    console.error("AWS Rekognition Error:", error);
    return false;
  }
};
