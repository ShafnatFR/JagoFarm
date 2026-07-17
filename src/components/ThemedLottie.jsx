import { useState, useEffect } from "react";

const LOTTIE_URL = "https://lottie.host/2d39f249-5050-4a6a-873f-ee240e5af216/mNEItMoWfX.json";

export default function ThemedLottie({ style = {} }) {
  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute("data-theme") || "light"
  );

  // Listen for theme changes via MutationObserver
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const t = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(t);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`themed-lottie themed-lottie--${theme}`}
      style={style}
    >
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
