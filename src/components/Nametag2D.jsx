import React, { useRef, useState } from "react";
import cardImageUrl from "../assets/new-id-card-kolab.png";

import PixelCard from "./PixelCard.jsx";

// Cek dukungan WebGL; layout mobile ditangani oleh carousel, bukan dimatikan.
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

// Komponen Mode 2D Interaktif menggunakan <PixelCard /> (Tali dihilangkan dan ukuran menyesuaikan gambar)
export function Nametag2DFallback({
  imageUrl = cardImageUrl,
  className = "nametag-2d-fallback",
  ariaLabel = "ID Card 2D Interaktif Jago Farm",
  isTeam = false,
  variant = "jago",
}) {
  return (
    <div
      className={isTeam ? "team-lanyard-2d-fallback" : `nametag-2d-fallback ${className}`}
      aria-label={ariaLabel}
    >
      <PixelCard
        variant={variant}
        className={isTeam ? "team-pixel-wrapper" : "hero-pixel-wrapper"}
      >
        <img
          src={imageUrl || cardImageUrl}
          alt="ID Card Jago Farm"
          className="id-card-image-2d"
        />
      </PixelCard>
    </div>
  );
}
