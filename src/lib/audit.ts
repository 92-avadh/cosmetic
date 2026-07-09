import { supabase } from "./supabase";

export interface AuditLogParams {
  action: string;
  status: "SUCCESS" | "FAILED";
  userId?: string;
  userEmail?: string;
  ip?: string;
  userAgent?: string;
  details?: unknown;
}

export async function logAudit(params: AuditLogParams): Promise<void> {
  try {
    const { action, status, userId, userEmail, ip, userAgent, details } = params;
    
    const detailsStr = details 
      ? (typeof details === "string" ? details : JSON.stringify(details))
      : null;

    console.log(`[AUDIT LOG] Action: ${action} | Status: ${status} | User: ${userEmail || "GUEST"} | IP: ${ip || "UNKNOWN"}`);

    const { error } = await supabase
      .from("AuditLog")
      .insert({
        id: crypto.randomUUID(),
        userId: userId || null,
        userEmail: userEmail || null,
        action,
        status,
        ip: ip || null,
        userAgent: userAgent || null,
        details: detailsStr,
        createdAt: new Date().toISOString(),
      });

    if (error) {
      console.error("❌ Database insert error for audit log:", error.message);
    }
  } catch (error) {
    console.error("❌ Failed to log audit event:", error);
  }
}
