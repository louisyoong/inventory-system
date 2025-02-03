import createCache from "@emotion/cache";

// Client-side cache, shared for the entire session
const isBrowser = typeof document !== "undefined";

export default function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}
