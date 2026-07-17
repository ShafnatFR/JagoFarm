import { useEffect, useState, useMemo } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// JagoFarm palette — normalized 0-1 RGBA
const PALETTE = {
  light: {
    primary:   [0.047, 0.369, 0.212, 1], // #0c5e36 forest
    secondary: [0.071, 0.451, 0.267, 1], // #127344 forest-2
    accent:    [0.431, 0.659, 0.310, 1], // #6ea84f leaf
    dark:      [0.039, 0.133, 0.086, 1], // #0a2216 ink
    light:     [0.980, 0.965, 0.933, 1], // #faf6ee bg
  },
  dark: {
    primary:   [0.537, 0.812, 0.439, 1], // #89cf70 forest
    secondary: [0.639, 0.871, 0.553, 1], // #a3de8d forest-2
    accent:    [0.525, 0.776, 0.416, 1], // #86c66a leaf
    dark:      [0.945, 0.980, 0.937, 1], // #f1faef ink
    light:     [0.024, 0.067, 0.039, 1], // #06110a bg
  },
};

// Deep-clone a Lottie JSON object
function cloneLottie(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Collect all unique normalized color arrays from a Lottie JSON
function collectColors(obj, colors = new Map()) {
  if (!obj || typeof obj !== "object") return colors;

  // Solid layer color: { sc: "#hex" }
  if (typeof obj.sc === "string" && obj.sc.startsWith("#")) {
    const hex = obj.sc;
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const key = `${r.toFixed(3)},${g.toFixed(3)},${b.toFixed(3)}`;
    if (!colors.has(key)) colors.set(key, [r, g, b, 1]);
  }

  // Fill/Stroke color: c.k = [r, g, b, a] (normalized)
  if (obj.c && obj.c.k && Array.isArray(obj.c.k) && obj.c.k.length >= 3) {
    const [r, g, b] = obj.c.k;
    const a = obj.c.k[3] ?? 1;
    if (typeof r === "number" && typeof g === "number" && typeof b === "number") {
      const key = `${r.toFixed(3)},${g.toFixed(3)},${b.toFixed(3)}`;
      if (!colors.has(key)) colors.set(key, [r, g, b, a]);
    }
  }

  // Gradient colors
  if (obj.g && obj.g.k && typeof obj.g.k === "object") {
    const gradient = obj.g.k;
    if (gradient.c && Array.isArray(gradient.c)) {
      // Conic gradient
    }
    if (gradient.s && Array.isArray(gradient.s)) {
      // Gradient stops
    }
    if (Array.isArray(gradient)) {
      // Array of gradient stops: [{p: 0, c: [r,g,b]}]
    }
  }

  // Recurse into arrays and objects
  if (Array.isArray(obj)) {
    for (const item of obj) collectColors(item, colors);
  } else {
    for (const key of Object.keys(obj)) {
      if (key === "src" || key === "refId" || key === "nm" || key === "mn") continue;
      collectColors(obj[key], colors);
    }
  }

  return colors;
}

// Compute luminance (perceived brightness)
function luminance([r, g, b]) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

// Build a color map from original → palette colors
function buildColorMap(colors, palette) {
  const entries = Array.from(colors.entries()).map(([key, val]) => ({ key, color: val, lum: luminance(val) }));
  entries.sort((a, b) => a.lum - b.lum);

  // Remove white/transparent (near-white or very low alpha)
  const meaningful = entries.filter((e) => {
    const [r, g, b, a] = e.color;
    if (a < 0.2) return false;
    if (r > 0.95 && g > 0.95 && b > 0.95) return false; // white
    if (r < 0.02 && g < 0.02 && b < 0.02) return false; // black
    return true;
  });

  const map = new Map();
  const paletteColors = [
    palette.dark,
    palette.primary,
    palette.secondary,
    palette.accent,
    palette.light,
  ];

  if (meaningful.length === 0) {
    // If no meaningful colors found, just map all to primary
    for (const e of entries) {
      map.set(e.key, palette.primary);
    }
    return map;
  }

  // Map each meaningful color to the closest palette entry by luminance
  for (const e of meaningful) {
    const targetLum = luminance(e.color);
    let best = paletteColors[1]; // default to primary
    let bestDist = Infinity;
    for (const pc of paletteColors) {
      const dist = Math.abs(luminance(pc) - targetLum);
      if (dist < bestDist) {
        bestDist = dist;
        best = pc;
      }
    }
    map.set(e.key, best);
  }

  // For white-ish entries, map to transparent or bg color
  for (const e of entries) {
    if (!map.has(e.key)) {
      map.set(e.key, e.color); // keep original
    }
  }

  return map;
}

// Apply color map to a Lottie JSON (mutates)
function applyColorMap(obj, colorMap) {
  if (!obj || typeof obj !== "object") return;

  if (typeof obj.sc === "string" && obj.sc.startsWith("#")) {
    const hex = obj.sc;
    const r = (parseInt(hex.slice(1, 3), 16) / 255);
    const g = (parseInt(hex.slice(3, 5), 16) / 255);
    const b = (parseInt(hex.slice(5, 7), 16) / 255);
    const key = `${r.toFixed(3)},${g.toFixed(3)},${b.toFixed(3)}`;
    if (colorMap.has(key)) {
      const [nr, ng, nb] = colorMap.get(key);
      obj.sc = `#${Math.round(nr * 255).toString(16).padStart(2, "0")}${Math.round(ng * 255).toString(16).padStart(2, "0")}${Math.round(nb * 255).toString(16).padStart(2, "0")}`;
    }
  }

  if (obj.c && obj.c.k && Array.isArray(obj.c.k) && obj.c.k.length >= 3) {
    const [r, g, b] = obj.c.k;
    if (typeof r === "number" && typeof g === "number" && typeof b === "number") {
      const key = `${r.toFixed(3)},${g.toFixed(3)},${b.toFixed(3)}`;
      if (colorMap.has(key)) {
        const [nr, ng, nb, na = 1] = colorMap.get(key);
        obj.c.k = [nr, ng, nb, na];
      }
    }
  }

  if (Array.isArray(obj)) {
    for (const item of obj) applyColorMap(item, colorMap);
  } else {
    for (const key of Object.keys(obj)) {
      if (key === "src" || key === "refId") continue;
      applyColorMap(obj[key], colorMap);
    }
  }
}

const LOTTIE_URL = "https://lottie.host/2d39f249-5050-4a6a-873f-ee240e5af216/mNEItMoWfX.json";

export default function ThemedLottie({ style = {} }) {
  const [lottieData, setLottieData] = useState(null);
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute("data-theme") || "light");

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(t);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  // Fetch the Lottie JSON once
  useEffect(() => {
    let cancelled = false;
    fetch(LOTTIE_URL)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setLottieData(data);
      })
      .catch(() => {
        // Silently fail — CSS fallback will handle
      });
    return () => { cancelled = true; };
  }, []);

  // Generate theme-colored Lottie data
  const themedData = useMemo(() => {
    if (!lottieData) return null;
    const cloned = cloneLottie(lottieData);
    const palette = PALETTE[theme] || PALETTE.light;
    const colors = collectColors(cloned);
    const colorMap = buildColorMap(colors, palette);
    applyColorMap(cloned, colorMap);
    return cloned;
  }, [lottieData, theme]);

  if (!themedData) {
    // Fallback: render original Lottie via dotlottie-wc
    return (
      <div style={style}>
        <dotlottie-wc
          src={LOTTIE_URL}
          style={{ width: "100%", height: "100%" }}
          background="transparent"
          autoplay
          loop
        />
      </div>
    );
  }

  return (
    <DotLottieReact
      data={themedData}
      loop
      autoplay
      style={style}
    />
  );
}
