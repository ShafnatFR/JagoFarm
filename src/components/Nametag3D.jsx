import React from "react";
import Lanyard from "./Lanyard.jsx";
import cardImageUrl from "../assets/new-id-card-kolab.png";

export function LanyardCanvas({
  className = "nametag-3d",
  imageUrl = cardImageUrl,
  ariaLabel = "Model 3D ID card Jago Farm yang bisa ditarik",
  position = [0, 0, 15],
  fov = 28,
}) {
  return (
    <div className={className} aria-label={ariaLabel} style={{ width: "100%", height: "100%", position: "relative" }}>
      <Lanyard frontImage={imageUrl} position={position} fov={fov} />
    </div>
  );
}

export default function Nametag3D() {
  return <LanyardCanvas />;
}
