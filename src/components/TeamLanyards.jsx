import { useEffect, useMemo, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { LanyardCanvas } from "./Nametag3D.jsx";
import cardBackImage from "../assets/lanyard/card-back.png";
import bandImage from "../assets/lanyard/lanyard-kolab-transparent.png";
import egaImage from "../assets/lanyard/member-ega.png";
import shafnatImage from "../assets/lanyard/member-shafnat.png";
import haykalImage from "../assets/lanyard/member-haykal.png";
import bayuImage from "../assets/lanyard/member-bayu.png";
import { paginate } from "../lib/teamLanyards.js";

const DESKTOP_PAGE_SIZE = 4;
const MEMBERS = [
  { id: "ega", imageUrl: egaImage, role: "Leader" },
  { id: "shafnat", imageUrl: shafnatImage, role: "Staff" },
  { id: "haykal", imageUrl: haykalImage, role: "Staff" },
  { id: "bayu", imageUrl: bayuImage, role: "Staff" },
];

function useCardsPerPage() {
  const [size, setSize] = useState(() => (typeof window !== "undefined" && window.innerWidth < 768 ? 1 : DESKTOP_PAGE_SIZE));

  useEffect(() => {
    const update = () => setSize(window.innerWidth < 768 ? 1 : DESKTOP_PAGE_SIZE);
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

export default function TeamLanyards() {
  const cardsPerPage = useCardsPerPage();
  const [page, setPage] = useState(0);
  const touchStart = useRef(null);
  const pages = useMemo(() => paginate(MEMBERS, cardsPerPage), [cardsPerPage]);

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(0, pages.length - 1)));
  }, [pages.length]);

  if (!pages.length) return null;

  const currentPage = pages[page] || pages[0];
  const maxPage = pages.length - 1;
  const move = (delta) => setPage((current) => Math.max(0, Math.min(maxPage, current + delta)));
  const onTouchStart = (event) => { touchStart.current = event.touches[0]?.clientX ?? null; };
  const onTouchEnd = (event) => {
    if (touchStart.current == null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
    touchStart.current = null;
    if (Math.abs(distance) >= 48) move(distance < 0 ? 1 : -1);
  };

  const sceneItems = currentPage.map((member, index) => ({
    ...member,
    originX: cardsPerPage === 1 ? 0 : (index - (currentPage.length - 1) / 2) * 3,
    originY: cardsPerPage === 1 ? 3.55 : 3.85,
    lineWidth: cardsPerPage === 1 ? 0.52 : 0.48,
  }));

  return (
    <section className="team-lanyards-container" aria-label="Kartu anggota tim">
      <div
        className="team-lanyard-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Kartu anggota tim"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="team-lanyard-viewport">
          <LanyardCanvas
            key={`${cardsPerPage}-${page}`}
            className="team-lanyard-carousel-3d"
            items={sceneItems}
            backImageUrl={cardBackImage}
            bandImageUrl={bandImage}
            ariaLabel="Kartu anggota tim yang bisa ditarik"
            cameraPosition={[0, 0, 13]}
            fov={27}
            spotIntensity={90}
            fillIntensity={5}
            ambientIntensity={1.25}
          />
        </div>
        <div className="team-lanyard-roles" style={{ "--lanyard-count": currentPage.length }}>
          {currentPage.map((member) => <strong key={member.id}>{member.role}</strong>)}
        </div>
        {pages.length > 1 && (
          <div className="team-lanyard-controls">
            <button type="button" onClick={() => move(-1)} disabled={page === 0} aria-label="Kartu sebelumnya">
              <CaretLeft size={22} weight="bold" />
            </button>
            <div className="team-lanyard-dots" aria-label="Pilih halaman kartu">
              {pages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={index === page ? "is-active" : ""}
                  aria-label={`Halaman ${index + 1}`}
                  aria-current={index === page ? "true" : undefined}
                  onClick={() => setPage(index)}
                />
              ))}
            </div>
            <button type="button" onClick={() => move(1)} disabled={page === maxPage} aria-label="Kartu berikutnya">
              <CaretRight size={22} weight="bold" />
            </button>
          </div>
        )}
        <p className="sr-only" aria-live="polite">Halaman {page + 1} dari {pages.length}</p>
      </div>
    </section>
  );
}
