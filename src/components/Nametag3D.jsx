import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import cardImageUrl from "../assets/new-id-card-kolab.png";
import { checkWebGLSupport, ErrorBoundary3D, Nametag2DFallback } from "./Nametag2D.jsx";

extend({ MeshLineGeometry, MeshLineMaterial });

const CARD_WIDTH = 1.72;
const CARD_HEIGHT = 2.7;
const CARD_DEPTH = 0.08;

function makeBandTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 192;
  const ctx = canvas.getContext("2d");

  const base = ctx.createLinearGradient(0, 0, 64, 0);
  base.addColorStop(0, "#050605");
  base.addColorStop(0.14, "#252c27");
  base.addColorStop(0.5, "#0b0f0c");
  base.addColorStop(0.86, "#252c27");
  base.addColorStop(1, "#050605");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 64, 192);

  ctx.fillStyle = "rgba(255,255,255,0.18)";
  for (let y = -64; y < 256; y += 13) {
    ctx.save();
    ctx.translate(32, y);
    ctx.rotate(-0.56);
    ctx.fillRect(-46, -1, 92, 1.5);
    ctx.restore();
  }

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  for (let y = 0; y < 192; y += 6) ctx.fillRect(0, y, 64, 1);

  ctx.fillStyle = "rgba(210, 235, 214, 0.28)";
  ctx.fillRect(8, 0, 2, 192);
  ctx.fillRect(54, 0, 2, 192);
  ctx.fillStyle = "rgba(139, 214, 110, 0.22)";
  ctx.fillRect(13, 0, 1, 192);
  ctx.fillRect(50, 0, 1, 192);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 8);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  return texture;
}

function Badge({
  imageUrl = cardImageUrl,
  originX = 1.15,
  originY = 3.36,
  lineWidth = 0.34,
  maxSpeed = 50,
  minSpeed = 10,
}) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const cardMap = useTexture(imageUrl);
  const bandMap = useMemo(() => makeBandTexture(), []);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const { width, height } = useThree((state) => state.size);

  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2,
  };

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.74]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.74]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.74]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 0, 0],
  ]);

  useEffect(() => {
    if (!hovered) return undefined;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useEffect(() => {
    cardMap.colorSpace = THREE.SRGBColorSpace;
    cardMap.anisotropy = 16;
    cardMap.needsUpdate = true;
  }, [cardMap]);

  useEffect(
    () => () => {
      bandMap.dispose();
    },
    [bandMap],
  );

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (
      !fixed.current ||
      !j1.current ||
      !j2.current ||
      !j3.current ||
      !card.current
    )
      return;
    [j1, j2].forEach((ref) => {
      if (!ref.current.lerped)
        ref.current.lerped = new THREE.Vector3().copy(
          ref.current.translation(),
        );
      const clampedDistance = Math.max(
        0.1,
        Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
      );
      ref.current.lerped.lerp(
        ref.current.translation(),
        delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
      );
    });

    curve.points[0].copy(card.current.translation());
    curve.points[1].copy(j3.current.translation());
    curve.points[2].copy(j2.current.lerped);
    curve.points[3].copy(j1.current.lerped);
    curve.points[4].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(42));

    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.26, z: ang.z });
  });

  curve.curveType = "chordal";

  return (
    <>
      <group position={[originX, originY, 0]}>
        <RigidBody ref={fixed} type="fixed" colliders={false}>
          <mesh position={[0, 0.08, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.22, 0.08, 48]} />
            <meshStandardMaterial
              color="#d9e2dc"
              roughness={0.2}
              metalness={0.82}
            />
          </mesh>
          <mesh position={[0, -0.05, 0]}>
            <sphereGeometry args={[0.08, 24, 12]} />
            <meshStandardMaterial
              color="#f2f7f3"
              roughness={0.18}
              metalness={0.72}
            />
          </mesh>
        </RigidBody>
        <RigidBody position={[0, -0.72, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -1.44, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -2.16, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0, -2.18, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider
            position={[0, -1.56, 0]}
            args={[CARD_WIDTH / 2, CARD_HEIGHT / 2, CARD_DEPTH]}
          />
          <group
            position={[0, -1.56, -0.02]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event) => {
              event.target.releasePointerCapture(event.pointerId);
              drag(false);
            }}
            onPointerDown={(event) => {
              event.target.setPointerCapture(event.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(event.point)
                  .sub(vec.copy(card.current.translation())),
              );
            }}
          >
            <mesh castShadow receiveShadow>
              <boxGeometry args={[CARD_WIDTH, CARD_HEIGHT, CARD_DEPTH]} />
              <meshPhysicalMaterial
                color="#f7f9f5"
                clearcoat={1}
                clearcoatRoughness={0.16}
                roughness={0.28}
                metalness={0.08}
              />
            </mesh>
            <mesh position={[0, 0, CARD_DEPTH / 2 + 0.003]} receiveShadow>
              <planeGeometry args={[CARD_WIDTH - 0.03, CARD_HEIGHT - 0.03]} />
              <meshPhysicalMaterial
                map={cardMap}
                clearcoat={0.74}
                clearcoatRoughness={0.2}
                roughness={0.32}
                metalness={0.02}
              />
            </mesh>
            <mesh position={[0, 0, -CARD_DEPTH / 2 - 0.002]}>
              <planeGeometry args={[CARD_WIDTH - 0.05, CARD_HEIGHT - 0.05]} />
              <meshPhysicalMaterial
                color="#0b100d"
                clearcoat={0.55}
                roughness={0.42}
                metalness={0.14}
              />
            </mesh>
            <mesh position={[0, CARD_HEIGHT / 2 + 0.03, 0.06]} castShadow>
              <boxGeometry args={[0.7, 0.18, 0.16]} />
              <meshPhysicalMaterial
                color="#101712"
                clearcoat={0.75}
                roughness={0.26}
                metalness={0.24}
              />
            </mesh>
            <mesh position={[0, CARD_HEIGHT / 2 + 0.19, 0.08]} castShadow>
              <torusGeometry args={[0.2, 0.028, 12, 48]} />
              <meshStandardMaterial
                color="#e6ece8"
                roughness={0.18}
                metalness={0.86}
              />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#f2f4ef"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={bandMap}
          repeat={[-3, 1]}
          lineWidth={lineWidth}
        />
      </mesh>
    </>
  );
}

export function LanyardCanvas({
  className = "nametag-3d",
  imageUrl = cardImageUrl,
  ariaLabel = "Model 3D ID card Jago Farm yang bisa ditarik",
  originX = 0.65,
  originY = 3.36,
  lineWidth = 0.32,
  cameraPosition = [0, 0, 15.5],
  fov = 25,
  spotIntensity = 120.0,
  fillIntensity = 6.0,
  ambientIntensity = 1.25,
  force2D = false,
}) {
  const [canRender3D, setCanRender3D] = useState(() => !force2D && checkWebGLSupport());

  useEffect(() => {
    if (force2D) {
      setCanRender3D(false);
      return;
    }
    if (!checkWebGLSupport()) {
      setCanRender3D(false);
    }
  }, [force2D]);

  const isTeamCard = typeof className === "string" && className.includes("team-lanyard");

  // Jika WebGL / animasi 3D tidak didukung / error / force2D, langsung tampilkan mode 2D
  if (!canRender3D) {
    return (
      <Nametag2DFallback
        imageUrl={imageUrl}
        className={className}
        ariaLabel={ariaLabel}
        isTeam={isTeamCard}
      />
    );
  }

  return (
    <ErrorBoundary3D
      fallback={
        <Nametag2DFallback
          imageUrl={imageUrl}
          className={className}
          ariaLabel={ariaLabel}
          isTeam={isTeamCard}
        />
      }
    >
      <div className={className} aria-label={ariaLabel}>
        <Canvas
          camera={{ position: cameraPosition, fov }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              setCanRender3D(false);
            });
            gl.domElement.addEventListener("webglcontextcreationerror", () => {
              setCanRender3D(false);
            });
          }}
        >
          <ambientLight intensity={ambientIntensity} />
          <spotLight
            position={[3.2, 5.8, 6]}
            angle={0.5}
            penumbra={0.76}
            intensity={spotIntensity}
            color="#edf6e9"
            castShadow
          />
          <pointLight
            position={[1.4, 0.2, 4.4]}
            intensity={fillIntensity}
            color="#ffffff"
            distance={8}
            decay={2}
          />
          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Badge
              imageUrl={imageUrl}
              originX={originX}
              originY={originY}
              lineWidth={lineWidth}
            />
          </Physics>
        </Canvas>
      </div>
    </ErrorBoundary3D>
  );
}

export default function Nametag3D(props) {
  return <LanyardCanvas {...props} />;
}
