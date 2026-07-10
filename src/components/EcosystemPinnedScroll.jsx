import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  benefits,
  ecosystemFloaters,
  ecosystemSteps,
  icons,
} from "../data/content.js";

gsap.registerPlugin(ScrollTrigger);

export default function EcosystemPinnedScroll() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const [active, setActive] = useState(0);
  const { CheckCircle } = icons;

  useEffect(() => {
    const root = pinRef.current;
    if (!root) return undefined;

    const move = (event) => {
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      root.style.setProperty("--eco-mx", x.toFixed(3));
      root.style.setProperty("--eco-my", y.toFixed(3));
      root.classList.add("is-interacting");
    };
    const leave = () => {
      root.style.setProperty("--eco-mx", "0");
      root.style.setProperty("--eco-my", "0");
      root.classList.remove("is-interacting");
    };

    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);

    return () => {
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px)").matches;
    if (!desktop || !sectionRef.current || !pinRef.current) return undefined;

    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray(".step-scene");
      const images = gsap.utils.toArray(".active-step-image img");
      const floaters = gsap.utils.toArray(".floating-asset");
      const clamp = gsap.utils.clamp(0, 1);
      const smooth = gsap.parseEase("sine.inOut");

      const renderProgress = (progressValue) => {
        const exact = progressValue * (ecosystemSteps.length - 1);
        const next = Math.min(ecosystemSteps.length - 1, Math.round(exact));

        pinRef.current?.style.setProperty(
          "--ecosystem-parallax",
          (progressValue - 0.5).toFixed(3),
        );
        setActive((current) => (current === next ? current : next));

        scenes.forEach((scene, index) => {
          const distance = index - exact;
          const abs = Math.abs(distance);
          const visible = smooth(clamp(1 - abs));
          gsap.set(scene, {
            autoAlpha: visible,
            y: distance * 28,
            x: 0,
            scale: 0.96 + visible * 0.04,
            rotateX: 0,
            rotateY: 0,
            zIndex: 20 - Math.round(abs * 5),
            pointerEvents: abs < 0.45 ? "auto" : "none",
          });
        });

        images.forEach((image, index) => {
          const distance = index - exact;
          const visible = smooth(clamp(1 - Math.abs(distance)));
          gsap.set(image, {
            scale: 1.08 - visible * 0.04,
            xPercent: distance * -1,
          });
        });
      };

      renderProgress(0);

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () =>
          `+=${window.innerHeight * (ecosystemSteps.length - 1) * 0.82}`,
        pin: pinRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1.25,
        invalidateOnRefresh: true,
        onUpdate: (self) => renderProgress(self.progress),
        onRefresh: (self) => renderProgress(self.progress),
      });

      scrollTriggerRef.current = trigger;

      floaters.forEach((floater, index) => {
        gsap.to(floater, {
          y: index % 2 ? -18 : 18,
          x: index % 3 === 0 ? 10 : -10,
          rotate: index % 2 ? 7 : -7,
          duration: 3.8 + index * 0.32,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      gsap.from(".ecosystem-copy > *", {
        opacity: 0,
        y: 18,
        duration: 0.65,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      window.setTimeout(() => ScrollTrigger.refresh(), 350);
    }, sectionRef);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, []);

  const goToStep = (index) => {
    setActive(index);
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;
    const target =
      trigger.start +
      (trigger.end - trigger.start) * (index / (ecosystemSteps.length - 1));
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section className="ecosystem-pin" id="tentang" ref={sectionRef}>
      <div className="ecosystem section-shell" ref={pinRef}>
        <div className="ecosystem-copy">
          <h2>Lebih Dari Sekadar Peternakan</h2>
          <p>
            Kami menerapkan ekonomi sirkular dengan teknologi AI & IoT untuk
            menciptakan sistem pertanian dan peternakan yang efisien, produktif,
            dan tanpa limbah.
          </p>
          <div className="benefit-list">
            {benefits.map((benefit) => (
              <span key={benefit}>
                <CheckCircle size={18} weight="fill" />
                {benefit}
              </span>
            ))}
          </div>
          <div className="step-nav" aria-label="Tahapan ekosistem">
            {ecosystemSteps.map((item, index) => (
              <button
                className={active === index ? "is-active" : ""}
                key={item.title}
                onClick={() => goToStep(index)}
                type="button"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.title}
              </button>
            ))}
          </div>
        </div>

        <div className="ecosystem-stage">
          <div className="floating-assets" aria-hidden="true">
            {ecosystemFloaters.map((item) => (
              <img
                className={`floating-asset ${item.className}`}
                key={item.label}
                src={item.image}
                alt=""
              />
            ))}
          </div>
          <div className="step-stack" aria-live="polite">
            {ecosystemSteps.map((item, index) => {
              return (
                <article
                  className={`step-scene ${active === index ? "is-active" : ""}`}
                  key={item.title}
                  aria-hidden={active !== index}
                >
                  <div className="active-step-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mobile-steps">
          {ecosystemSteps.map((item, index) => (
            <article key={item.title}>
              <img src={item.image} alt={item.title} />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
