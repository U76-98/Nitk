import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPEBASE_SERVICE_KEY_ROLE;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// ✅ Register new user (Supabase Auth + Profiles table)
export const createProfile = async (req, res) => {
  try {
    const { full_name, phone, email, password, address } = req.body;

    // Step 1: Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // optional: automatically confirms
    });

    if (authError) {
      console.error("Auth error:", authError.message);
      return res.status(400).json({ error: authError.message });
    }

    const userId = authData.user.id;

    // Step 2: Add entry to profiles table
    const { data, error } = await supabase
      .from("profiles")
      .insert([
        {
          id: userId,
          full_name,
          phone,
          email,
          password, // Not needed for security, but okay if you're keeping it temporarily
          address,
        },
      ])
      .select("id, full_name, phone, email, address, created_at");

    if (error) {
      console.error("DB error:", error.message);
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: "Citizen registered successfully",
      citizen: data[0],
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Fetch all citizens (excluding password)
export const getAllCitizens = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, phone, email, address, created_at")
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({ citizens: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
