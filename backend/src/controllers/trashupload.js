// controllers/trash.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid"; // For unique file names
import multer from "multer";

dotenv.config();

const supabaseUrl=process.env.SUPABASE_URL
const supabaseKey=process.env.SUPEBASE_SERVICE_KEY_ROLE
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

// Configure multer to use memory storage
export const upload = multer({ storage: multer.memoryStorage() });

export async function uploadTrashReport(req, res) {
  try {
    const { reporter_name, location, description } = req.body;
    const file = req.file; // single file upload

    if (!reporter_name || !location || !file) {
      return res.status(400).json({ error: "reporter_name, location, and photo are required" });
    }

    // Generate a unique file name
    const fileName = `trash_photos/${uuidv4()}_${file.originalname}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from("trash-photos") // your bucket name
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (uploadError) return res.status(500).json({ error: uploadError.message });

    
    const { publicUrl } = supabaseAdmin.storage
      .from("trash-photos")
      .getPublicUrl(fileName);

 
    const { data: reportData, error: dbError } = await supabaseAdmin
      .from("trash_reports")
      .insert([{
        reporter_name,
        location,
        description,
        photo_url: publicUrl
      }])
      .select();

    if (dbError) return res.status(500).json({ error: dbError.message });

    // Return inserted report including the photo URL
    return res.status(201).json(reportData[0]);

  } catch (err) {
    console.error("uploadTrashReport error", err);
    return res.status(500).json({ error: "Server error" });
  }
}
