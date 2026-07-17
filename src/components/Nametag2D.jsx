import React, { useRef, useState } from "react";
import cardImageUrl from "../assets/new-id-card-kolab.png";

// Cek apakah browser & perangkat mendukung WebGL secara penuh
export function checkWebGLSupport() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
    return !!gl;
  } catch (e) {
    return false;
  }
}

// Error Boundary khusus untuk menangkap error saat inisialisasi / render 3D (Three.js / Rapier / WebGL context loss)
export class ErrorBoundary3D extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn(
      "[3D Animation Fallback Triggered] Gagal menjalankan animasi 3D WebGL pada perangkat ini. Otomatis beralih ke animasi 2D Interaktif:",
      error
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

// Komponen Mode 2D Interaktif (Tilt, Sway & Glare) yang sangat mulus sebagai fallback 3D
export function Nametag2DFallback({
  imageUrl = cardImageUrl,
  className = "nametag-2d-fallback",
  ariaLabel = "ID Card 2D Interaktif Jago Farm",
  isTeam = false,
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    setTilt({
      x: deltaY * -13, // Sudut kemiringan vertikal
      y: deltaX * 13,  // Sudut kemiringan horizontal
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  return (
    <div
      className={isTeam ? "team-lanyard-2d-fallback" : `nametag-2d-fallback ${className}`}
      aria-label={ariaLabel}
    >
      {/* Tali Lanyard (Strap) 2D */}
      <div className="lanyard-strap-2d">
        <div className="strap-line-2d" />
        <div className="strap-clip-2d" />
      </div>

      {/* ID Card 2D dengan efek 3D perspective tilt dan floating animation */}
      <div
        ref={cardRef}
        className={`id-card-2d ${tilt.active ? "is-tilting" : "is-floating"}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          tilt.active
            ? {
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.03, 1.03, 1.03)`,
              }
            : {}
        }
      >
        <div className="id-card-inner-2d">
          <img
            src={imageUrl || cardImageUrl}
            alt="ID Card Jago Farm"
            className="id-card-image-2d"
          />
          <div
            className="id-card-glare-2d"
            style={
              tilt.active
                ? {
                    opacity: 0.42,
                    background: `radial-gradient(circle at ${50 + tilt.y * 3.5}% ${50 - tilt.x * 3.5}%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 65%)`,
                  }
                : { opacity: 0 }
            }
          />
        </div>
      </div>

      {!isTeam && (
        <div className="fallback-2d-badge">
          <span>✨ Mode 2D Interaktif (WebGL Fallback)</span>
        </div>
      )}
    </div>
  );
}
