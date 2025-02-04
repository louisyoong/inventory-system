import createCache from "@emotion/cache";

const createEmotionCache = () =>
  createCache({
    key: "mui",
    prepend: true, // Ensures MUI styles are inserted before Tailwind
  });

export default createEmotionCache;
