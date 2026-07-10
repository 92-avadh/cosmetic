import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiErrorMessage(resJson: unknown, defaultMessage: string = "An unexpected error occurred."): string {
  const errorObj = (resJson as Record<string, unknown>)?.error as Record<string, unknown> | undefined;
  if (!errorObj) return defaultMessage;

  // Format validation errors (Zod validation issues)
  if (errorObj.details && Array.isArray(errorObj.details) && errorObj.details.length > 0) {
    return (errorObj.details as Record<string, unknown>[])
      .map((d: Record<string, unknown>) => {
        const fieldName = d.field ? String(d.field).split(".").pop() : "";
        const cleanField = fieldName ? fieldName.charAt(0).toUpperCase() + fieldName.slice(1) : "";
        return cleanField ? `${cleanField}: ${String(d.message)}` : String(d.message);
      })
      .join(", ");
  }

  const code = typeof errorObj.code === "string" ? errorObj.code : "";
  const message = typeof errorObj.message === "string" ? errorObj.message : "";

  // Sanitize Database and Internal Server Errors for user display
  if (
    code === "DATABASE_ERROR" || 
    message.toLowerCase().includes("database") || 
    message.toLowerCase().includes("prisma") || 
    message.toLowerCase().includes("supabase")
  ) {
    return "A connection issue occurred while accessing our database. Please try again in a few moments.";
  }

  if (code === "INTERNAL_SERVER_ERROR" || message.toLowerCase().includes("unexpected error")) {
    return "A temporary server error occurred. Please try again in a few moments.";
  }

  return message || defaultMessage;
}
