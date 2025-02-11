import express from "express";
import upload from "../config/s3upload"; 

const router = express.Router();

// Upload a file to S3
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File upload failed" });
  }
  res.json({
    message: "File uploaded successfully",
    fileUrl: req.file.location,
  });
});

export default router;
