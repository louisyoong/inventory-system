import createCache from "@emotion/cache";

export default function createEmotionCache() {
  const isBrowser = typeof document !== "undefined";  // ✅ Now it's used inside the function

  return createCache({ key: isBrowser ? "css" : "server-css" });
}
