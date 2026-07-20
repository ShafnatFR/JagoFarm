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
import defaultBandImage from "../assets/lanyard/lanyard.png";
import { checkWebGLSupport, ErrorBoundary3D, Nametag2DFallback } from "./Nametag2D.jsx";

extend({ MeshLineGeometry, MeshLineMaterial });

const CARD_WIDTH = 1.72;
const CARD_HEIGHT = 2.7;
const CARD_DEPTH = 0.08;

function Badge({
  frontImage = cardImageUrl,
  backImage = cardImageUrl,
  bandImage = defaultBandImage,
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
  const cardMap = useTexture(frontImage);
  const backMap = useTexture(backImage);
  const bandMap = useTexture(bandImage);
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
    [cardMap, backMap, bandMap].forEach((map) => {
      map.colorSpace = THREE.SRGBColorSpace;
      map.anisotropy = 16;
      map.needsUpdate = true;
    });
    bandMap.wrapS = bandMap.wrapT = THREE.RepeatWrapping;
    bandMap.repeat.set(-3, 1);
  }, [backMap, bandMap, cardMap]);

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
            <mesh position={[0, 0, -CARD_DEPTH / 2 - 0.002]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[CARD_WIDTH - 0.05, CARD_HEIGHT - 0.05]} />
              <meshPhysicalMaterial
                map={backMap}
                clearcoat={0.55}
                roughness={0.32}
                metalness={0.02}
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
          lineWidth={lineWidth}
        />
      </mesh>
    </>
  );
}

export function LanyardCanvas({
  className = "nametag-3d",
  imageUrl = cardImageUrl,
  backImageUrl = cardImageUrl,
  bandImageUrl = defaultBandImage,
  items = null,
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
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute("data-theme") || "light");
  const sceneItems = Array.isArray(items) && items.length
    ? items
    : [{ id: "lanyard", imageUrl, originX, originY, lineWidth }];
  const isTeamCard = typeof className === "string" && className.includes("team-lanyard");
  const fallbackContent = sceneItems.length > 1 ? (
    <div className={`${className} lanyard-2d-grid`} aria-label={ariaLabel}>
      {sceneItems.map((item) => <img key={item.id} src={item.imageUrl} alt="" decoding="async" />)}
    </div>
  ) : (
    <Nametag2DFallback
      imageUrl={sceneItems[0].imageUrl}
      className={className}
      ariaLabel={ariaLabel}
      isTeam={isTeamCard}
    />
  );

  useEffect(() => {
    if (force2D) {
      setCanRender3D(false);
      return;
    }
    const checkSupport = () => {
      setCanRender3D(checkWebGLSupport());
    };
    checkSupport();
    window.addEventListener("resize", checkSupport);
    return () => window.removeEventListener("resize", checkSupport);
  }, [force2D]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  // Jika WebGL / animasi 3D tidak didukung / error / force2D, langsung tampilkan mode 2D
  if (!canRender3D) {
    return fallbackContent;
  }

  return (
    <ErrorBoundary3D
      fallback={fallbackContent}
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
          <ambientLight intensity={theme === "dark" ? ambientIntensity * 0.55 : ambientIntensity} />
          <spotLight
            position={[3.2, 5.8, 6]}
            angle={0.5}
            penumbra={0.76}
            intensity={theme === "dark" ? spotIntensity * 0.55 : spotIntensity}
            color={theme === "dark" ? "#a9c9ff" : "#edf6e9"}
            castShadow
          />
          <pointLight
            position={[1.4, 0.2, 4.4]}
            intensity={theme === "dark" ? fillIntensity * 0.7 : fillIntensity}
            color={theme === "dark" ? "#89cf70" : "#ffffff"}
            distance={8}
            decay={2}
          />
          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            {sceneItems.map((item) => (
              <Badge
                key={item.id}
                frontImage={item.imageUrl}
                backImage={backImageUrl}
                bandImage={bandImageUrl}
                originX={item.originX}
                originY={item.originY ?? originY}
                lineWidth={item.lineWidth ?? lineWidth}
              />
            ))}
          </Physics>
        </Canvas>
      </div>
    </ErrorBoundary3D>
  );
}

export default function Nametag3D(props) {
  return <LanyardCanvas {...props} />;
}
