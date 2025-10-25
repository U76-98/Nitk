// controllers/citizen.js
import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv"
dotenv.config();

const supabaseUrl =process.env.SUPABASE_URL;
const supabaseServiceRoleKey =process.env.SUPEBASE_SERVICE_KEY_ROLE;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

export async function createCitizen(req, res) {
  try {
    const { full_name, email, password, phone, address } = req.body;
    
    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'full_name, email and password are required' });
    }
    
    const { data: userData, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: false
    });

    if (createUserError) {
      return res.status(400).json({ error: createUserError.message || createUserError });
    }

    const userId = userData.user.id;

    await supabaseAdmin
      .from('profiles')
      .insert([{
        user_id: userId,
        full_name,
        phone,
        email,
        address
      }]);

    // ✅ Return only the data that was sent in POST
    return res.status(201).json({
      user_id: userId,
      full_name,
      email,
      phone,
      address
    });

  } catch (err) {
    console.error('createCitizen error', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
 



