import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiErrorMessage(resJson: unknown, defaultMessage: string = "An unexpected error occurred."): string {
  const errorProp = (resJson as Record<string, unknown>)?.error;
  if (!errorProp) return defaultMessage;

  if (typeof errorProp === "string") {
    if (
      errorProp.toLowerCase().includes("database") || 
      errorProp.toLowerCase().includes("prisma") || 
      (errorProp.toLowerCase().includes("supabase") && 
       !errorProp.toLowerCase().includes("storage") && 
       !errorProp.toLowerCase().includes("bucket") && 
       !errorProp.toLowerCase().includes("upload"))
    ) {
      return "A connection issue occurred while accessing our database. Please try again in a few moments.";
    }
    return errorProp;
  }

  const errorObj = errorProp as Record<string, unknown>;

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
    (message.toLowerCase().includes("supabase") && 
     !message.toLowerCase().includes("storage") && 
     !message.toLowerCase().includes("bucket") && 
     !message.toLowerCase().includes("upload"))
  ) {
    return "A connection issue occurred while accessing our database. Please try again in a few moments.";
  }

  if (code === "INTERNAL_SERVER_ERROR" || message.toLowerCase().includes("unexpected error")) {
    return "A temporary server error occurred. Please try again in a few moments.";
  }

  return message || defaultMessage;
}
