// pages/api/images.js

import { promises as fsPromises } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path: imgPath = "backgrounds" } = req.query;

  if (typeof imgPath !== "string" || imgPath.includes("..")) {
    return res.status(400).json({ error: "Invalid directory specified" });
  }
  const directoryPath = path.join(
    process.cwd(),
    "public",
    "images",
    "memeGenerator",
    imgPath
  );
  try {
    const files = await fsPromises.readdir(directoryPath);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif|avif)$/.test(file)
    );
    const imagePaths = imageFiles.map(
      (file) => `/images/memeGenerator/${imgPath}/${file}`
    );
    res.status(200).json(imagePaths);
  } catch (err) {
    console.error("Error reading directory:", err);
    res.status(500).json({ error: "Failed to read directory" });
  }
}
