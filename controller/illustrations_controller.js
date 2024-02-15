// import { __getIllustration, __saveSIllustration } from "../models/illustrations_models";
import OpenAI from "openai";
import axios from "axios";
// import fs from "fs";
// import path from "path";
// import url from "url";

import AWS from 'aws-sdk';
// import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  
  const s3 = new AWS.S3();
  
  
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY, 
  });
    
 export const imageFromAI = async (req, res) => {
  const {prompt} = req.body;
  console.log (prompt)
    try {
      const completion = await openai.images.generate({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
  
      const imageUrl = completion.data[0].url;
      console.log(imageUrl);
  
      const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
      const buffer = Buffer.from(response.data, "utf-8");
  
      const bucketName = process.env.AWS_BUCKET;
      const filename = `generated-image-${Date.now()}.png`;
  
      const s3Response = await s3.upload({
          Bucket: bucketName,
          Key: filename,
          Body: buffer,
          ContentType: "image/png",
          // ACL: "public-read",
      }).promise();
  
      res.json({URL: s3Response.Location});
    } catch (err) {
      res.json({err})
      console.error(err);
    }
  };
  
//   ai();
