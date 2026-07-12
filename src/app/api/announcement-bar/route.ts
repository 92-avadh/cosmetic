import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifySession } from "@/lib/session";
import { withApiHandler } from "@/lib/api-helper";
import { z } from "zod";

export const dynamic = "force-dynamic";

async function checkAdminAuth() {
  const cookieStore = await cookies().catch(() => null);
  const sessionCookie = cookieStore?.get("session")?.value;
  if (!sessionCookie) return false;
  const payload = await verifySession(sessionCookie);
  return payload?.role === "ADMIN";
}

const announcementBarSchema = z.object({
  isActive: z.boolean(),
  backgroundColor: z.string().min(1),
  textColor: z.string().min(1),
  interval: z.number().int().min(100),
  announcements: z.array(z.string()),
});

const DEFAULT_ANNOUNCEMENTS = [
  "FREE SHIPPING ON ALL ORDERS ACROSS INDIA — RESTORING RESILIENCE",
  "NEW CLIENT EXCLUSIVE: USE CODE 'RECOVER10' FOR 10% OFF YOUR BAG",
  "CELLULAR BODYCARE SCIENCE — 100% BIODEGRADABLE SURFACTANTS"
];

export const GET = withApiHandler(async () => {
  let { data, error } = await supabase
    .from("AnnouncementBar")
    .select("*")
    .eq("id", "default")
    .single();

  if (error || !data) {
    // If not found, create a default record
    const defaultData = {
      id: "default",
      isActive: true,
      backgroundColor: "#2d1c14",
      textColor: "#F6F4EE",
      interval: 4500,
      announcements: JSON.stringify(DEFAULT_ANNOUNCEMENTS),
    };

    const { data: inserted, error: insertError } = await supabase
      .from("AnnouncementBar")
      .insert(defaultData)
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting default announcement bar:", insertError);
      return defaultData;
    }
    data = inserted;
  }

  return data;
});

export const POST = withApiHandler(async (request) => {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = announcementBarSchema.parse(body);

  const updateData = {
    isActive: parsed.isActive,
    backgroundColor: parsed.backgroundColor,
    textColor: parsed.textColor,
    interval: parsed.interval,
    announcements: JSON.stringify(parsed.announcements),
  };

  const { data, error } = await supabase
    .from("AnnouncementBar")
    .upsert({ id: "default", ...updateData })
    .select()
    .single();

  if (error) {
    throw new Error("Failed to update announcement");
  }

  return data;
});
