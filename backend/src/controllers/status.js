import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl=process.env.SUPABASE_URL
const supabaseKey=process.env.SUPEBASE_SERVICE_KEY_ROLE

const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

// POST: Add new activity record
export const addActivity = async (req, res) => {
    try {
        const { date, people_trained, shg_trained, garbage_collected_kg, events_conducted, reports_received } = req.body;

        const { data, error } = await supabaseAdmin
            .from("community_activities")
            .insert([{ date, people_trained, shg_trained, garbage_collected_kg, events_conducted, reports_received }])
            .select("date, people_trained, shg_trained, garbage_collected_kg, events_conducted, reports_received"); // return inserted data

        if (error) return res.status(400).json({ error: error.message });
        res.status(201).json(data[0]); // return single object
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET: Fetch all activity records with only the fields sent
export const getActivities = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("community_activities")
            .select("date, people_trained, shg_trained, garbage_collected_kg, events_conducted, reports_received")
            .order("date", { ascending: false });

        if (error) return res.status(400).json({ error: error.message });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
