import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Shield, Network, Activity, RotateCw, Pause, Play, Sparkles } from 'lucide-react';

export type SceneMode = 'sentinel' | 'network' | 'firewall';

interface Cyber3DSceneProps {
  mode?: SceneMode;
  onModeChange?: (mode: SceneMode) => void;
}

export const Cyber3DScene: React.FC<Cyber3DSceneProps> = ({
  mode: controlledMode,
  onModeChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalMode, setInternalMode] = useState<SceneMode>('sentinel');
  const currentMode = controlledMode || internalMode;
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [activeTelemetry, setActiveTelemetry] = useState<{
    fps: number;
    threatsBlocked: number;
    activeNodes: number;
    encryption: string;
  }>({
    fps: 60,
    threatsBlocked: 1420,
    activeNodes: 64,
    encryption: 'AES-256 / ML-KEM',
  });

  const handleModeSwitch = (newMode: SceneMode) => {
    setInternalMode(newMode);
    if (onModeChange) onModeChange(newMode);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.025);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 32);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x07090e, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Root Group for transformation
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Color definitions
    const emeraldColor = new THREE.Color(0x10b981);
    const cyanColor = new THREE.Color(0x06b6d4);
    const redColor = new THREE.Color(0xf43f5e);
    const amberColor = new THREE.Color(0xf59e0b);
    const slateColor = new THREE.Color(0x1e293b);

    // -------------------------------------------------------------
    // 1. SENTINEL CORE OBJECTS
    // -------------------------------------------------------------
    const sentinelGroup = new THREE.Group();

    // Central pulsing Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: cyanColor,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sentinelGroup.add(coreMesh);

    // Inner solid glowing core
    const innerGeo = new THREE.SphereGeometry(2.4, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: emeraldColor,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    sentinelGroup.add(innerMesh);

    // Outer Geodesic Defense Shield
    const shieldGeo = new THREE.IcosahedronGeometry(7.2, 2);
    const shieldMat = new THREE.MeshBasicMaterial({
      color: slateColor,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    sentinelGroup.add(shieldMesh);

    // Concentric Cryptographic Gimbal Rings
    const createCryptoRing = (radius: number, tubeRadius: number, color: THREE.Color, rotX: number, rotY: number) => {
      const ringGeo = new THREE.TorusGeometry(radius, tubeRadius, 4, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      return ring;
    };

    const ring1 = createCryptoRing(8.8, 0.08, emeraldColor, Math.PI / 4, 0);
    const ring2 = createCryptoRing(10.2, 0.08, cyanColor, -Math.PI / 3, Math.PI / 6);
    const ring3 = createCryptoRing(11.8, 0.08, amberColor, Math.PI / 6, -Math.PI / 4);
    sentinelGroup.add(ring1, ring2, ring3);

    // Orbiting sentinel threat/data particles
    const sentinelPartCount = 350;
    const sentinelPartGeo = new THREE.BufferGeometry();
    const sentinelPartPos = new Float32Array(sentinelPartCount * 3);
    const sentinelPartColors = new Float32Array(sentinelPartCount * 3);

    for (let i = 0; i < sentinelPartCount; i++) {
      const radius = 12 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      sentinelPartPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      sentinelPartPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      sentinelPartPos[i * 3 + 2] = radius * Math.cos(phi);

      const isThreat = Math.random() > 0.85;
      const pColor = isThreat ? redColor : (Math.random() > 0.5 ? emeraldColor : cyanColor);
      sentinelPartColors[i * 3] = pColor.r;
      sentinelPartColors[i * 3 + 1] = pColor.g;
      sentinelPartColors[i * 3 + 2] = pColor.b;
    }

    sentinelPartGeo.setAttribute('position', new THREE.BufferAttribute(sentinelPartPos, 3));
    sentinelPartGeo.setAttribute('color', new THREE.BufferAttribute(sentinelPartColors, 3));

    const sentinelPartMat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const sentinelParticles = new THREE.Points(sentinelPartGeo, sentinelPartMat);
    sentinelGroup.add(sentinelParticles);

    // -------------------------------------------------------------
    // 2. NETWORK TOPOLOGY OBJECTS
    // -------------------------------------------------------------
    const networkGroup = new THREE.Group();

    // Node graph points
    const nodeCount = 42;
    const nodePositions: THREE.Vector3[] = [];
    const nodeMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 16
      );
      nodePositions.push(pos);

      const isGateway = i === 0;
      const isAttacked = i % 7 === 0;
      const nGeo = new THREE.BoxGeometry(isGateway ? 1.4 : 0.7, isGateway ? 1.4 : 0.7, isGateway ? 1.4 : 0.7);
      const nMat = new THREE.MeshBasicMaterial({
        color: isGateway ? cyanColor : isAttacked ? redColor : emeraldColor,
        wireframe: true,
      });
      const nMesh = new THREE.Mesh(nGeo, nMat);
      nMesh.position.copy(pos);
      nodeMeshes.push(nMesh);
      networkGroup.add(nMesh);
    }

    // Connect nodes with lines (proximity threshold)
    const linePositions: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 9.5) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }

    const netLineGeo = new THREE.BufferGeometry();
    netLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const netLineMat = new THREE.LineBasicMaterial({
      color: 0x1e293b,
      transparent: true,
      opacity: 0.75,
    });
    const netLines = new THREE.LineSegments(netLineGeo, netLineMat);
    networkGroup.add(netLines);

    // Network packets traveling
    const packetCount = 60;
    const packetsGeo = new THREE.BufferGeometry();
    const packetPos = new Float32Array(packetCount * 3);
    const packetColors = new Float32Array(packetCount * 3);
    const packetTargets: { start: THREE.Vector3; end: THREE.Vector3; progress: number; speed: number; threat: boolean }[] = [];

    for (let i = 0; i < packetCount; i++) {
      const idxA = Math.floor(Math.random() * nodeCount);
      let idxB = Math.floor(Math.random() * nodeCount);
      if (idxA === idxB) idxB = (idxB + 1) % nodeCount;
      const isThreat = Math.random() > 0.8;
      packetTargets.push({
        start: nodePositions[idxA],
        end: nodePositions[idxB],
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.012,
        threat: isThreat,
      });

      const pColor = isThreat ? redColor : emeraldColor;
      packetColors[i * 3] = pColor.r;
      packetColors[i * 3 + 1] = pColor.g;
      packetColors[i * 3 + 2] = pColor.b;
    }

    packetsGeo.setAttribute('position', new THREE.BufferAttribute(packetPos, 3));
    packetsGeo.setAttribute('color', new THREE.BufferAttribute(packetColors, 3));
    const packetsMat = new THREE.PointsMaterial({
      size: 0.55,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const packetPoints = new THREE.Points(packetsGeo, packetsMat);
    networkGroup.add(packetPoints);

    // -------------------------------------------------------------
    // 3. FIREWALL INTERCEPTOR OBJECTS
    // -------------------------------------------------------------
    const firewallGroup = new THREE.Group();

    // Central Firewall Grid Barrier
    const fwGridGeo = new THREE.PlaneGeometry(30, 20, 24, 16);
    const fwGridMat = new THREE.MeshBasicMaterial({
      color: cyanColor,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const fwGrid = new THREE.Mesh(fwGridGeo, fwGridMat);
    firewallGroup.add(fwGrid);

    // Perimeter boundary border
    const fwBorderGeo = new THREE.BoxGeometry(30.4, 20.4, 0.4);
    const fwBorderMat = new THREE.MeshBasicMaterial({
      color: emeraldColor,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const fwBorder = new THREE.Mesh(fwBorderGeo, fwBorderMat);
    firewallGroup.add(fwBorder);

    // Stream of incoming packets (moving Z -20 to +20)
    const streamCount = 500;
    const streamGeo = new THREE.BufferGeometry();
    const streamPositions = new Float32Array(streamCount * 3);
    const streamColors = new Float32Array(streamCount * 3);
    const streamSpeeds: number[] = [];
    const streamThreats: boolean[] = [];

    for (let i = 0; i < streamCount; i++) {
      const isThreat = Math.random() > 0.72;
      streamThreats.push(isThreat);
      streamSpeeds.push(0.12 + Math.random() * 0.18);

      streamPositions[i * 3] = (Math.random() - 0.5) * 26;
      streamPositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      streamPositions[i * 3 + 2] = -24 + Math.random() * 48;

      const pColor = isThreat ? redColor : emeraldColor;
      streamColors[i * 3] = pColor.r;
      streamColors[i * 3 + 1] = pColor.g;
      streamColors[i * 3 + 2] = pColor.b;
    }

    streamGeo.setAttribute('position', new THREE.BufferAttribute(streamPositions, 3));
    streamGeo.setAttribute('color', new THREE.BufferAttribute(streamColors, 3));
    const streamMat = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const streamPoints = new THREE.Points(streamGeo, streamMat);
    firewallGroup.add(streamPoints);

    // Add groups to master
    masterGroup.add(sentinelGroup);
    masterGroup.add(networkGroup);
    masterGroup.add(firewallGroup);

    // Visibility according to mode
    sentinelGroup.visible = currentMode === 'sentinel';
    networkGroup.visible = currentMode === 'network';
    firewallGroup.visible = currentMode === 'firewall';

    // Interactive pointer
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;
      }
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 500;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // FPS Calculation
      frameCount++;
      if (time - lastFpsUpdate > 1000) {
        const currentFps = Math.round((frameCount * 1000) / (time - lastFpsUpdate));
        setActiveTelemetry(prev => ({ ...prev, fps: currentFps }));
        frameCount = 0;
        lastFpsUpdate = time;
      }

      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      // Update groups visibility dynamically
      sentinelGroup.visible = currentMode === 'sentinel';
      networkGroup.visible = currentMode === 'network';
      firewallGroup.visible = currentMode === 'firewall';

      // Auto rotation
      if (isRotating && !isDragging) {
        masterGroup.rotation.y += 0.004;
        masterGroup.rotation.x = THREE.MathUtils.lerp(masterGroup.rotation.x, mouseY * 0.2, 0.05);
      } else {
        masterGroup.rotation.y = THREE.MathUtils.lerp(masterGroup.rotation.y, targetRotationY, 0.1);
        masterGroup.rotation.x = THREE.MathUtils.lerp(masterGroup.rotation.x, targetRotationX, 0.1);
      }

      // Sentinel animation
      if (sentinelGroup.visible) {
        coreMesh.rotation.x += 0.01;
        coreMesh.rotation.y += 0.015;
        innerMesh.rotation.y -= 0.02;

        const pulseScale = 1 + Math.sin(time * 0.003) * 0.08;
        coreMesh.scale.set(pulseScale, pulseScale, pulseScale);

        shieldMesh.rotation.y -= 0.003;
        shieldMesh.rotation.z += 0.002;

        ring1.rotation.z += 0.012;
        ring2.rotation.z -= 0.009;
        ring3.rotation.x += 0.007;

        sentinelParticles.rotation.y += 0.002;
      }

      // Network animation
      if (networkGroup.visible) {
        // Pulse nodes
        nodeMeshes.forEach((mesh, idx) => {
          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.015;
        });

        // Move network packets
        const pPositions = packetsGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < packetCount; i++) {
          const p = packetTargets[i];
          p.progress += p.speed;
          if (p.progress >= 1) {
            p.progress = 0;
            const newIdxA = Math.floor(Math.random() * nodeCount);
            let newIdxB = Math.floor(Math.random() * nodeCount);
            if (newIdxA === newIdxB) newIdxB = (newIdxB + 1) % nodeCount;
            p.start = nodePositions[newIdxA];
            p.end = nodePositions[newIdxB];
          }

          pPositions[i * 3] = THREE.MathUtils.lerp(p.start.x, p.end.x, p.progress);
          pPositions[i * 3 + 1] = THREE.MathUtils.lerp(p.start.y, p.end.y, p.progress);
          pPositions[i * 3 + 2] = THREE.MathUtils.lerp(p.start.z, p.end.z, p.progress);
        }
        packetsGeo.attributes.position.needsUpdate = true;
      }

      // Firewall Stream animation
      if (firewallGroup.visible) {
        fwGrid.rotation.z = Math.sin(time * 0.001) * 0.02;
        const sPositions = streamGeo.attributes.position.array as Float32Array;

        for (let i = 0; i < streamCount; i++) {
          sPositions[i * 3 + 2] += streamSpeeds[i];

          // If threat reaches the firewall plane (z ~ 0), deflect or reset
          if (streamThreats[i] && sPositions[i * 3 + 2] > 0 && sPositions[i * 3 + 2] < 2) {
            // Spark deflection
            sPositions[i * 3] += (Math.random() - 0.5) * 1.5;
            sPositions[i * 3 + 1] += (Math.random() - 0.5) * 1.5;
          }

          // Reset packet once passed
          if (sPositions[i * 3 + 2] > 22) {
            sPositions[i * 3 + 2] = -24;
            sPositions[i * 3] = (Math.random() - 0.5) * 26;
            sPositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
          }
        }
        streamGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate(performance.now());

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);

      // Dispose Three.js resources
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      shieldGeo.dispose();
      shieldMat.dispose();
      sentinelPartGeo.dispose();
      sentinelPartMat.dispose();
      netLineGeo.dispose();
      netLineMat.dispose();
      packetsGeo.dispose();
      packetsMat.dispose();
      fwGridGeo.dispose();
      fwGridMat.dispose();
      fwBorderGeo.dispose();
      fwBorderMat.dispose();
      streamGeo.dispose();
      streamMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [currentMode, isRotating]);

  return (
    <div className="relative w-full h-[540px] md:h-[620px] bg-cyber-bg border border-cyber-border rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between">
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-0"
        title="Click and drag to rotate the 3D scene"
      />

      {/* Top Telemetry HUD Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 p-4 bg-cyber-card/85 backdrop-blur-md border-b border-cyber-border text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-accent animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-accent absolute" />
            <span className="font-semibold text-cyber-accent uppercase tracking-wider">
              SENTINEL CORE v3.4 [LIVE]
            </span>
          </div>
          <span className="text-cyber-border">|</span>
          <span className="text-cyber-muted hidden sm:inline">
            FPS: <span className="text-cyber-text font-bold">{activeTelemetry.fps}</span>
          </span>
          <span className="text-cyber-border hidden sm:inline">|</span>
          <span className="text-cyber-muted">
            SHIELD: <span className="text-cyber-cyan font-bold">100% INTEGRITY</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-cyber-muted hidden md:inline">
            ENCRYPTION: <span className="text-cyber-text">{activeTelemetry.encryption}</span>
          </span>
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-cyber-surface hover:bg-cyber-border border border-cyber-border rounded-md text-cyber-text transition-colors text-xs"
            title={isRotating ? "Pause auto-rotation" : "Resume auto-rotation"}
          >
            {isRotating ? <Pause className="w-3.5 h-3.5 text-cyber-accent" /> : <Play className="w-3.5 h-3.5 text-cyber-cyan" />}
            <span>{isRotating ? 'Auto-Orbit: ON' : 'Auto-Orbit: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Center Interactive Watermark / Hint */}
      <div className="relative z-10 pointer-events-none p-4 text-center">
        <p className="text-[11px] font-mono text-cyber-muted/75 uppercase tracking-widest bg-cyber-bg/60 backdrop-blur-sm inline-block px-3 py-1 rounded-md border border-cyber-border/40">
          Click & Drag to Inspect 3D Defense Mesh • Toggle Tactical Views Below
        </p>
      </div>

      {/* Bottom Mode Switcher HUD */}
      <div className="relative z-10 p-4 bg-cyber-card/90 backdrop-blur-md border-t border-cyber-border flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-cyber-muted uppercase tracking-wider hidden sm:inline">Tactical View:</span>
          
          <button
            onClick={() => handleModeSwitch('sentinel')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
              currentMode === 'sentinel'
                ? 'bg-cyber-accent/15 border-cyber-accent text-cyber-accent font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-cyber-surface border-cyber-border text-cyber-muted hover:text-cyber-text hover:border-cyber-borderHover'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>1. Sentinel Core</span>
          </button>

          <button
            onClick={() => handleModeSwitch('network')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
              currentMode === 'network'
                ? 'bg-cyber-cyan/15 border-cyber-cyan text-cyber-cyan font-semibold shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'bg-cyber-surface border-cyber-border text-cyber-muted hover:text-cyber-text hover:border-cyber-borderHover'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>2. Network Mesh</span>
          </button>

          <button
            onClick={() => handleModeSwitch('firewall')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
              currentMode === 'firewall'
                ? 'bg-cyber-red/15 border-cyber-red text-cyber-red font-semibold shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                : 'bg-cyber-surface border-cyber-border text-cyber-muted hover:text-cyber-text hover:border-cyber-borderHover'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>3. Packet Interceptor</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-cyber-muted">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyber-accent" />
            <span>Clean Traffic</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyber-red" />
            <span>Blocked Threat</span>
          </div>
          <div className="flex items-center gap-1.5 hidden md:flex">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
            <span>Cryptographic Gateway</span>
          </div>
        </div>
      </div>
    </div>
  );
};
