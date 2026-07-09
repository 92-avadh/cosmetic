import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gjlwnohlruwdfbjvrfas.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbHdub2hscnV3ZGZianZyZmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzMzI0MTUsImV4cCI6MjA5ODkwODQxNX0.obUZe_oorjj6RviQSsGHj5Hv_DFG76a6ZrEWpN4JVBk";

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
