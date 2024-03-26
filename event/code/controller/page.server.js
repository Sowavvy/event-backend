import env from 'dotenv';
import { createClient } from '@supabase/supabase-js';

env.config();

const { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } = process.env;

if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL,
    process.env.PUBLIC_SUPABASE_ANON_KEY
);

async function createEvent(req, res) {
    const { event_name, event_location, attendees, description, phone_number, event_date } = req.body;

    const { data, error } = await supabase
    .from("events")
    .insert([
        { event_name, event_location, attendees, description, phone_number, event_date }
    ]);

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
}