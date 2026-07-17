import { useEffect, useRef, useState } from "react";
import { LanyardCanvas } from "./Nametag3D.jsx";
import { teamMembersDetailed } from "../data/aboutContent.js";
import { GithubLogo, InstagramLogo, LinkedinLogo, Sparkle } from "@phosphor-icons/react";

function TeamLanyard({ member, index, isActive3D, onSelect }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "50px 0px 50px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const show3D = isHovered || (inView && isActive3D);

  return (
    <article
      className={`team-lanyard-card motion-item ${show3D ? "is-active-3d" : ""}`}
      onMouseEnter={() => {
        setIsHovered(true);
        onSelect();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={() => {
        setIsHovered(true);
        onSelect();
      }}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <div className="team-lanyard" ref={ref} style={{ position: "relative", minHeight: "460px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {show3D ? (
          <>
            <LanyardCanvas
              className="team-lanyard-3d"
              imageUrl={member.image || teamMembersDetailed[index % teamMembersDetailed.length]?.image}
              ariaLabel={`Model 3D ID card ${member.name || ""} yang bisa ditarik`}
              originX={member.originX}
              originY={4.15}
              lineWidth={0.28}
              cameraPosition={[0, 0, 15]}
              fov={28}
              spotIntensity={90}
              fillIntensity={5.0}
              ambientIntensity={1.25}
            />
            <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", zIndex: 10, pointerEvents: "none", background: "var(--forest)", color: "#fff", padding: "6px 14px", borderRadius: "99px", fontSize: "0.75rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px", boxShadow: "0 4px 14px rgba(12, 107, 59, 0.4)", letterSpacing: "0.02em" }}>
              <Sparkle size={14} weight="fill" />
              Tarik ID Card 3D
            </div>
          </>
        ) : (
          <div className="lanyard-2d-view" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "400px", width: "100%", padding: "16px", position: "relative" }}>
            <img
              src={member.image || teamMembersDetailed[index % teamMembersDetailed.length]?.image}
              alt={`ID Card ${member.name || ""}`}
              style={{ maxHeight: "320px", maxWidth: "90%", objectFit: "contain", borderRadius: "16px", boxShadow: "0 14px 32px rgba(0,0,0,0.32)", transform: isActive3D ? "scale(1.03)" : "rotate(-2deg)", transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            />
            <div className="badge-3d-trigger" style={{ marginTop: "18px", padding: "6px 16px", borderRadius: "99px", background: "var(--leaf-soft)", border: "1px solid var(--line)", color: "var(--forest)", fontSize: "0.78rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px", transition: "all 0.25s ease" }}>
              ✨ Sentuh/Hover untuk Mode 3D
            </div>
          </div>
        )}
      </div>
      <div className="team-member-info">
        <span className="team-role-badge">{member?.role || "Tim JagoFarm"}</span>
        <h3>{member?.name || "Anggota Tim"}</h3>
        {Array.isArray(member?.roles) && member.roles.length > 0 && (
          <div className="team-member-roles">
            {member.roles.map((r, i) => (
              <span className="team-role-tag" key={i}>{r}</span>
            ))}
          </div>
        )}
        <p className="team-member-bio">{member?.bio || ""}</p>
        <div className="team-member-socials">
          <a href={member?.socials?.linkedin || "#"} target="_blank" rel="noreferrer" aria-label={`LinkedIn ${member?.name || ""}`}>
            <LinkedinLogo size={20} weight="fill" />
          </a>
          <a href={member?.socials?.github || "#"} target="_blank" rel="noreferrer" aria-label={`GitHub ${member?.name || ""}`}>
            <GithubLogo size={20} weight="fill" />
          </a>
          <a href={member?.socials?.instagram || "#"} target="_blank" rel="noreferrer" aria-label={`Instagram ${member?.name || ""}`}>
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
  const rawMembers = data ? (Array.isArray(data.members) ? data.members : (Array.isArray(data.team_members) ? data.team_members : (Array.isArray(data.items) ? data.items : null))) : null;
  const members = rawMembers && rawMembers.length > 0
    ? rawMembers.map((m, idx) => ({
        id: m?.id ?? idx,
        name: m?.name || "Tim JagoFarm",
        role: m?.role || "Contributor",
        bio: m?.bio || "",
        image: m?.image_url || m?.image || teamMembersDetailed[idx % teamMembersDetailed.length]?.image || "",
        roles: Array.isArray(m?.roles) ? m.roles : (typeof m?.roles === "string" ? m.roles.split(",") : []),
        socials: {
          linkedin: m?.linkedin || m?.socials?.linkedin || "#",
          github: m?.github || m?.socials?.github || "#",
          instagram: m?.instagram || m?.socials?.instagram || "#",
        },
        originX: idx % 2 === 0 ? -1.8 : 1.8,
      }))
    : teamMembersDetailed;

  const [activeId, setActiveId] = useState(members[0]?.id ?? null);

  useEffect(() => {
    if (members.length > 0 && activeId === null) {
      setActiveId(members[0].id);
    }
  }, [members, activeId]);

  if (members.length === 0) {
    return null;
  }

  return (
    <section className="team-lanyards-container section-shell motion-section">
      <div className="section-heading">
        <h2 className="motion-item">{title}</h2>
        <p className="motion-item">{subtitle}</p>
      </div>
      <div className="team-lanyards" aria-label="Anggota startup">
        {members.map((member, index) => (
          <TeamLanyard
            member={member}
            index={index}
            key={member.id}
            isActive3D={activeId === member.id}
            onSelect={() => setActiveId(member.id)}
          />
        ))}
      </div>
    </section>
  );
}
