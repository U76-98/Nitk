import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv'


dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPEBASE_SERVICE_KEY_ROLE;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function createCollectionSchedule(req, res) {
  try {
    const { area_name, collection_day, start_time, end_time, assigned_person } = req.body;

    // Validate required fields
    if (!area_name || !collection_day || !start_time || !end_time) {
      return res.status(400).json({ error: 'area_name, collection_day, start_time, and end_time are required' });
    }

    // Insert into database
    const { data: scheduleData, error: scheduleError } = await supabaseAdmin
      .from('collection_schedules')
      .insert([{
        area_name,
        collection_day,
        start_time,
        end_time,
        assigned_person
      }])
      .select();

    if (scheduleError) {
      return res.status(500).json({ error: scheduleError.message || scheduleError });
    }

    // Return the inserted schedule
    return res.status(201).json(scheduleData[0]);

  } catch (err) {
    console.error('createCollectionSchedule error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}


