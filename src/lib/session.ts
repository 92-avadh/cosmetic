const encoder = new TextEncoder();
const decoder = new TextDecoder();

function uint8ToBase64(arr: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < arr.length; i++) {
    bin += String.fromCharCode(arr[i]);
  }
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function base64ToUint8(str: string): Uint8Array {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const bin = atob(base64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

import { getEnv } from "./env";

async function getSecretKey() {
  const validatedEnv = getEnv();
  const secret = validatedEnv.SESSION_SECRET;
  const rawKey = encoder.encode(secret);
  return await crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign", "verify"]
  );
}


export interface SessionPayload {
  email: string;
  role?: string;
  userId?: string;
  exp?: number;
  [key: string]: unknown;
}

const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export async function signSession(payload: SessionPayload): Promise<string> {
  const key = await getSecretKey();
  const withExpiry = { ...payload, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE };
  const data = encoder.encode(JSON.stringify(withExpiry));
  const signature = await crypto.subtle.sign("HMAC", key, data);
  
  const payloadBase64 = uint8ToBase64(data);
  const signatureBase64 = uint8ToBase64(new Uint8Array(signature));
  
  return `${payloadBase64}.${signatureBase64}`;
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const [payloadBase64, signatureBase64] = token.split(".");
    if (!payloadBase64 || !signatureBase64) return null;
    
    const key = await getSecretKey();
    const data = base64ToUint8(payloadBase64);
    const signature = base64ToUint8(signatureBase64);
    
    const isValid = await crypto.subtle.verify("HMAC", key, signature as Uint8Array<ArrayBuffer>, data as Uint8Array<ArrayBuffer>);
    if (!isValid) return null;
    
    const session = JSON.parse(decoder.decode(data)) as SessionPayload;
    
    // Check expiry
    if (session.exp && session.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    
    return session;
  } catch {
    return null;
  }
}
