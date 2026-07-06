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

async function getSecretKey() {
  const secret = process.env.SESSION_SECRET || "default-secret-key-32-characters-long-bodybarrel";
  const rawKey = encoder.encode(secret);
  return await crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign", "verify"]
  );
}

export async function signSession(payload: any): Promise<string> {
  const key = await getSecretKey();
  const data = encoder.encode(JSON.stringify(payload));
  const signature = await crypto.subtle.sign("HMAC", key, data);
  
  const payloadBase64 = uint8ToBase64(data);
  const signatureBase64 = uint8ToBase64(new Uint8Array(signature));
  
  return `${payloadBase64}.${signatureBase64}`;
}

export async function verifySession(token: string): Promise<any | null> {
  try {
    const [payloadBase64, signatureBase64] = token.split(".");
    if (!payloadBase64 || !signatureBase64) return null;
    
    const key = await getSecretKey();
    const data = base64ToUint8(payloadBase64);
    const signature = base64ToUint8(signatureBase64);
    
    const isValid = await crypto.subtle.verify("HMAC", key, signature as any, data as any);
    if (!isValid) return null;
    
    return JSON.parse(decoder.decode(data));
  } catch (e) {
    console.error("verifySession Error:", e);
    return null;
  }
}
