import { useEffect, useRef, useState } from "react";
import { LanyardCanvas } from "./Nametag3D.jsx";
import { teamMembersDetailed } from "../data/aboutContent.js";
import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";

function TeamLanyard({ member, index }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setActive(true), index * 100);
        } else {
          setActive(false);
        }
      },
      { threshold: 0.05, rootMargin: "400px 0px 400px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [index]);

  useEffect(() => {
    if (active) {
      setLeaving(true);
      const timer = setTimeout(() => setLeaving(false), 600);
      return () => clearTimeout(timer);
    } else {
      setLeaving(false);
    }
  }, [active]);

  return (
    <article className="team-lanyard-card motion-item">
      <div className="team-lanyard" ref={ref}>
        {active && (
          <LanyardCanvas
            className="team-lanyard-3d"
            imageUrl={member.image}
            ariaLabel={`Model 3D ID card ${member.name} yang bisa ditarik`}
            originX={member.originX}
            originY={4.15}
            lineWidth={0.28}
            cameraPosition={[0, 0, 15]}
            fov={28}
            spotIntensity={90}
            fillIntensity={5.0}
            ambientIntensity={1.25}
          />
        )}
        {(leaving || !active) && (
          <div className={`lanyard-placeholder ${leaving ? 'is-leaving' : ''}`} aria-hidden="true">
            <div className="lanyard-shimmer" />
          </div>
        )}
      </div>
      <div className="team-member-info">
        <span className="team-role-badge">{member.role}</span>
        <h3>{member.name}</h3>
        {member.roles && (
          <div className="team-member-roles">
            {member.roles.map((r) => (
              <span className="team-role-tag" key={r}>{r}</span>
            ))}
          </div>
        )}
        <p className="team-member-bio">{member.bio}</p>
        <div className="team-member-socials">
          <a href={member.socials.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn ${member.name}`}>
            <LinkedinLogo size={20} weight="fill" />
          </a>
          <a href={member.socials.github} target="_blank" rel="noreferrer" aria-label={`GitHub ${member.name}`}>
            <GithubLogo size={20} weight="fill" />
          </a>
          <a href={member.socials.instagram} target="_blank" rel="noreferrer" aria-label={`Instagram ${member.name}`}>
            <InstagramLogo size={20} weight="fill" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function TeamLanyards({ data }) {
  const title = data?.title || "Kepemimpinan & Tim Inti";
  const subtitle = data?.subtitle || "Kolaborasi pemikir agronomi, rekayasawan perangkat lunak, dan praktisi IoT yang mendedikasikan diri untuk merombak masa depan pangan sirkular.";
  const members = Array.isArray(data?.members) && data.members.length > 0
    ? data.members.map((m, idx) => ({
        id: m.id || idx,
        name: m.name || '',
        role: m.role || '',
        bio: m.bio || '',
        image: m.image_url || m.image || '',
        socials: {
          linkedin: m.linkedin || '#',
          github: m.github || '#',
          instagram: m.instagram || '#',
        },
        originX: idx % 2 === 0 ? -1.8 : 1.8,
      }))
    : teamMembersDetailed;

  return (
    <section className="team-lanyards-container section-shell motion-section">
      <div className="section-heading">
        <h2 className="motion-item">{title}</h2>
        <p className="motion-item">{subtitle}</p>
      </div>
      <div className="team-lanyards" aria-label="Anggota startup">
        {members.map((member, index) => (
          <TeamLanyard member={member} index={index} key={member.id} />
        ))}
      </div>
    </section>
  );
}
