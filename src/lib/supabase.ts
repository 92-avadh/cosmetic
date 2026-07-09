import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getEnv } from "./env";

// Lazily initialize the client so it's not created at module-evaluation time
// (which would fail during Next.js build since env vars are not available then).
let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!_client) {
    const validatedEnv = getEnv();
    const url = validatedEnv.SUPABASE_URL;
    const key = validatedEnv.SUPABASE_ANON_KEY;

    _client = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return _client;
}


// Proxy so all existing `supabase.from(...)` call-sites work without changes.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop: string | symbol) {
    return Reflect.get(getClient(), prop);
  },
});

