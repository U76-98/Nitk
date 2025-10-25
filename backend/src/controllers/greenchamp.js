// controllers/greenchamp.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";

dotenv.config();


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPEBASE_SERVICE_KEY_ROLE;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);


const upload = multer({ dest: "uploads/" });


export const uploadItem = [
  upload.single("image"), 
  async (req, res) => {
    try {
      const { item_name, eco_cost } = req.body;
      const file = req.file;

      if (!item_name || !eco_cost || !file) {
        return res.status(400).json({ error: "item_name, eco_cost, and image are required" });
      }

      // Create unique file name
      const fileExt = path.extname(file.originalname);
      const fileName = `${Date.now()}-${file.originalname}`;
      const bucketFilePath = `item-images/${fileName}`;

      
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from("item-images")
        .upload(bucketFilePath, fs.createReadStream(file.path), {
          contentType: file.mimetype,
          upsert: false,
        });

      
      fs.unlinkSync(file.path);

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        return res.status(500).json({ error: uploadError.message });
      }

      
      const { data: publicUrlData } = supabaseAdmin.storage
        .from("item-images")
        .getPublicUrl(bucketFilePath);

      const imageUrl = publicUrlData.publicUrl;

      
      const { data, error } = await supabaseAdmin
        .from("marketplace_items")
        .insert([{ item_name, eco_cost, image_url: imageUrl }]);

      if (error) {
        console.error("DB insert error:", error);
        return res.status(500).json({ error: error.message });
      }

      res.status(201).json({
        message: "Item uploaded successfully",
        item: data[0],
      });
    } catch (err) {
      console.error("Upload route error:", err);
      res.status(500).json({ error: "Server error" });
    }
  },
];
