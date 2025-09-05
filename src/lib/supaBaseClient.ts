import { createClient } from "@supabase/supabase-js";
import { ENV } from "./env";
const supabaseUrl = ENV.url;
const supabaseAnonKey = ENV.serviceRole;
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variable");
}
export const supabaseServer = createClient(supabaseUrl, supabaseAnonKey);
