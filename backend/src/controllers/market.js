import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPEBASE_SERVICE_KEY_ROLE;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

// Multer memory storage
export const take = multer({ storage: multer.memoryStorage() });

export async function uploadMarketItem(req, res) {
  try {
    const { item_name, eco_cost } = req.body;
    const file = req.file;

    if (!item_name || !eco_cost || !file) {
      return res.status(400).json({ error: "item_name, eco_cost, and image are required" });
    }

    // Unique file name
    const fileName = `market_images/${uuidv4()}_${file.originalname}`;

    // Upload image to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from("market-images")
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (uploadError) return res.status(500).json({ error: uploadError.message });

    // Get public URL
    const { data } = supabaseAdmin.storage
  .from("market-images")
  .getPublicUrl(fileName);

const publicUrl = data.publicUrl;

    // Insert item into DB
    const { data: itemData, error: dbError } = await supabaseAdmin
      .from("market_items")
      .insert([{
        item_name,
        eco_cost,
        image_url: publicUrl
      }])
      .select();

    if (dbError) return res.status(500).json({ error: dbError.message });

    // ✅ Return same data as sent, plus the public URL
    return res.status(201).json({
      item_name,
      eco_cost,
      image_url: publicUrl
    });

  } catch (err) {
    console.error("uploadMarketItem error", err);
    return res.status(500).json({ error: "Server error" });
  }
}
