import {createClient} from "@supabase/supabase-js"
import dotenv from "dotenv"
dotenv.config();


const supabaseUrl=process.env.SUPABASE_URL
const supabaseKey=process.env.SUPEBASE_SERVICE_KEY_ROLE
const port=process.env.PORT


const supabase = createClient(supabaseUrl,supabaseKey,port)

export default supabase;
