import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getSafeRequestContext() {
  if (typeof process !== "undefined" && process?.env?.NEXT_RUNTIME !== "edge") {
    return undefined;
  }
  try {
    return getCloudflareContext();
  } catch {
    return undefined;
  }
}
