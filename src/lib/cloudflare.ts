import { getOptionalRequestContext } from "@cloudflare/next-on-pages";

export function getSafeRequestContext() {
  if (typeof process !== "undefined" && process?.env?.NEXT_RUNTIME !== "edge") {
    return undefined;
  }
  try {
    return getOptionalRequestContext();
  } catch {
    return undefined;
  }
}
