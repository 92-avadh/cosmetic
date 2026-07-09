import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { withApiHandler } from "@/lib/api-helper";
import { logAudit } from "@/lib/audit";
import { verifySession } from "@/lib/session";

export const POST = withApiHandler(async (request: Request) => {
  let currentUser: any = null;
  try {
    const cookieStore = await cookies().catch(() => null);
    const sessionToken = cookieStore?.get("session")?.value;
    if (sessionToken) {
      currentUser = await verifySession(sessionToken);
    }

    cookieStore?.delete("session");
    
    if (currentUser) {
      await logAudit({
        action: "USER_LOGOUT",
        status: "SUCCESS",
        userId: currentUser.id,
        userEmail: currentUser.email,
      });
    }

    return { success: true };
  } catch (error: any) {
    if (currentUser) {
      await logAudit({
        action: "USER_LOGOUT",
        status: "FAILED",
        userId: currentUser.id,
        userEmail: currentUser.email,
        details: error.message || String(error),
      });
    }
    throw error;
  }
});

