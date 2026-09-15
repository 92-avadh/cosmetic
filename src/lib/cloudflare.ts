import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getSafeRequestContext() {
  try {
    return getCloudflareContext();
  } catch {
    return undefined;
  }
}
