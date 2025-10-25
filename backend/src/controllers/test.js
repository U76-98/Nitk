import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"

dotenv.config();

const supabaseUrl=process.env.SUPABASE_URL
const supabaseKey=process.env.SUPEBASE_SERVICE_KEY_ROLE

const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

export async function createTest(req, res) {
  try {
    const { test_name, description, time_duration, eco_coins } = req.body;

    // Validate required fields
    if (!test_name || !time_duration || !eco_coins) {
      return res.status(400).json({ error: 'test_name, time_duration, and eco_coins are required' });
    }

    // Insert into database
    const { data: testData, error: testError } = await supabaseAdmin
      .from('tests')
      .insert([{
        test_name,
        description,
        time_duration,
        eco_coins
      }])
      .select();

    if (testError) {
      return res.status(500).json({ error: testError.message || testError });
    }

    // Return the inserted test
    return res.status(201).json(testData[0]);

  } catch (err) {
    console.error('createTest error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
