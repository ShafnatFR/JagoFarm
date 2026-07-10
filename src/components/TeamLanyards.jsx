import { useEffect, useRef, useState } from "react";
import { LanyardCanvas } from "./Nametag3D.jsx";
import andiCard from "../assets/new-id-card-kolab.png";
import shafnatCard from "../assets/new-id-card-kolab-shafnat.png";

const members = [
  { id: "andi-1", image: andiCard, originX: -0.9 },
  { id: "shafnat-1", image: shafnatCard, originX: -0.3 },
  { id: "andi-2", image: andiCard, originX: 0.3 },
  { id: "shafnat-2", image: shafnatCard, originX: 0.9 },
];

function TeamLanyard({ member, index }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        window.setTimeout(() => setActive(true), index * 120);
        observer.disconnect();
      },
      { threshold: 0.28, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [index]);

  return (
    <article className="team-lanyard" ref={ref}>
      {active && (
        <LanyardCanvas
          className="team-lanyard-3d"
          imageUrl={member.image}
          ariaLabel="Model 3D ID card anggota yang bisa ditarik"
          originX={member.originX}
          originY={4.15}
          lineWidth={0.28}
          cameraPosition={[0, 0, 15]}
          fov={28}
          spotIntensity={28}
          fillIntensity={0.9}
        />
      )}
    </article>
  );
}

export default function TeamLanyards() {
  return (
    <section className="team-lanyards" aria-label="Anggota startup">
      {members.map((member, index) => (
        <TeamLanyard member={member} index={index} key={member.id} />
      ))}
    </section>
  );
}
