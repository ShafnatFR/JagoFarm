import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import ecosystemVideo from "../assets/Vid.scrub.mp4";

gsap.registerPlugin(ScrollTrigger);

const storyStages = [
  {
    headline: "Ekosistem JagoFarm Revolusi Circular Economy & Smart Farming.",
    side: "left",
  },
  {
    headline: "Kolam ikan, kandang ayam, dan kebun bergerak dalam satu alur.",
    side: "right",
  },
  { headline: "Data IoT menjaga setiap keputusan tetap tepat.", side: "left" },
];

export default function EcosystemPinnedScroll() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const activeStageRef = useRef(0);
  const seekFrameRef = useRef(0);
  const targetTimeRef = useRef(0);
  const [activeStage, setActiveStage] = useState(0);

  // Lenis owns scroll interpolation; explicitly forward each Lenis frame to GSAP.
  useLenis(() => ScrollTrigger.update(), [], 1);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    let trigger;

    const seekToTarget = () => {
      if (seekFrameRef.current || video.seeking) return;
      seekFrameRef.current = window.requestAnimationFrame(() => {
        seekFrameRef.current = 0;
        if (
          !video.seeking &&
          Math.abs(video.currentTime - targetTimeRef.current) > 1 / 120
        ) {
          video.currentTime = targetTimeRef.current;
        }
      });
    };

    const renderProgress = (progress) => {
      const duration = video.duration || 8;
      const targetTime = Math.min(duration, Math.max(0, progress * duration));
      const nextStage = Math.min(
        storyStages.length - 1,
        Math.floor(progress * storyStages.length),
      );

      targetTimeRef.current = targetTime;
      seekToTarget();
      if (nextStage !== activeStageRef.current) {
        activeStageRef.current = nextStage;
        setActiveStage(nextStage);
      }
    };

    const createTrigger = () => {
      trigger?.kill();
      video.pause();
      video.currentTime = 0;
      activeStageRef.current = 0;
      setActiveStage(0);

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * 2.6}`,
        pin: true,
        scrub: 0.05,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => renderProgress(progress),
        onRefresh: ({ progress }) => renderProgress(progress),
      });
      ScrollTrigger.refresh();
    };

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) createTrigger();
    else
      video.addEventListener("loadedmetadata", createTrigger, { once: true });
    video.addEventListener("seeked", seekToTarget);

    return () => {
      trigger?.kill();
      if (seekFrameRef.current)
        window.cancelAnimationFrame(seekFrameRef.current);
      video.removeEventListener("loadedmetadata", createTrigger);
      video.removeEventListener("seeked", seekToTarget);
    };
  }, []);

  return (
    <section className="ecosystem-video-pin" id="tentang" ref={sectionRef}>
      <div className="ecosystem-video-layout">
        <video
          className="ecosystem-video-media"
          ref={videoRef}
          src={ecosystemVideo}
          muted
          playsInline
          preload="auto"
          aria-label="Ekosistem JagoFarm dari greenhouse hingga pertanian berbasis IoT"
        />
        <div className="ecosystem-video-copy" aria-live="polite">
          {storyStages.map((stage, index) => (
            <h2
              className={`ecosystem-video-headline is-${stage.side} ${
                activeStage === index
                  ? "is-active"
                  : index < activeStage
                    ? "is-past"
                    : "is-future"
              }`}
              key={stage.headline}
              aria-hidden={activeStage !== index}
            >
              {stage.headline}
            </h2>
          ))}
        </div>
      </div>
    </section>
  );
}
