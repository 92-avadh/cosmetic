import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { withApiHandler } from "@/lib/api-helper";

export const dynamic = "force-dynamic";

/**
 * Keep-alive endpoint — prevents Supabase free tier from pausing the project
 * after 7 days of inactivity.
 *
 * Called by:
 * - GitHub Actions cron (every 3-4 days) — see .github/workflows/keep-alive.yml
 * - Cloudflare Workers cron trigger (backup) — see workers/keep-alive/
 *
 * No auth required — this is a public health-check style endpoint.
 * The query itself is what keeps Supabase alive, not the response.
 */
export const GET = withApiHandler(async () => {
  // Lightweight query — just needs to hit the DB
  const { error } = await supabase
    .from("AnnouncementBar")
    .select("id")
    .eq("id", "default")
    .single();

  // PGRST116 = no rows returned, which is fine — the query still hits the DB
  if (error && error.code !== "PGRST116") {
    throw new Error(`Keep-alive query failed: ${error.message}`);
  }

  return { status: "ok", timestamp: new Date().toISOString() };
});
