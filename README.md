# Cybersecurity Student 3D WebGL Portfolio & Defense Operations Console

A high-performance, interactive 3D WebGL portfolio designed for cybersecurity students, SOC analysts, and security systems engineers. Built with Three.js, React 18, TypeScript, and Tailwind CSS.

![Portfolio Preview](/public/og-image.png)

## Core Architectural Features

### 1. Interactive Three.js 3D Sentinel Core
- **Mode 1: Sentinel Cyber Core** — Multi-layered geodesic defense shield, concentric cryptographic gimbal rings, and real-time orbiting threat telemetry particles.
- **Mode 2: Network Topology & Threat Map** — Dynamic 3D network node discovery with real-time packet propagation.
- **Mode 3: Packet Interceptor Collider** — High-speed packet stream filtered by firewall plane into Clean Traffic (Emerald) and Blocked Threats (Crimson).
- **User Orbit Controls** — Full interactive mouse dragging and inspection with zero scroll-jacking.

### 2. Live Interactive Security Operations Terminal
- Embedded Unix-style CLI with command history and autocomplete:
  - `help`: Comprehensive command index
  - `whoami`: Candidate profile, academic degree, and specialization
  - `skills`: Categorized offensive, defensive, and cryptography skill matrix
  - `projects`: Open-source security tool inspection
  - `certs`: CompTIA Security+, CEH, and eJPT validation
  - `scan <target>`: Real-time asynchronous TCP SYN probe with banner fingerprinting
  - `ctf`: Interactive cryptographic micro-challenge
  - `decrypt <hash>`: String analysis and entropy calculation
  - `pgp`: Export ASCII-armored PGP public key block

### 3. Client-Side Interactive Security Lab
- **Cryptographic Hasher & Entropy Calculator**: Real-time SHA-256 digests via Web Crypto API and Shannon entropy scoring.
- **TCP Packet Header Inspector**: Interactive flag builder (SYN, ACK, FIN, RST, PSH, URG) with attack detection (Xmas scan, Null scan, SYN flood).
- **MITRE ATT&CK Framework Navigator**: Tactics and techniques breakdown (Initial Access, Execution, Persistence, Defense Evasion, Discovery) mapped directly to mitigation projects.

### 4. Technical Projects Showcase
- **SpectreScan**: High-throughput asynchronous TCP SYN port and vulnerability probe (Go, AF_PACKET raw sockets).
- **KryptonEDR**: Zero-overhead Linux endpoint telemetry hook intercepting suspicious syscalls via eBPF kprobes.
- **ZeroTrust-Gateway**: Identity-aware reverse proxy enforcing mutual TLS (mTLS) and OPA policies.
- **ShadowVault**: Post-quantum hybrid cryptographic key store implementing NIST ML-KEM (Kyber-768) and AES-256-GCM.
- **DeceiveNet**: Distributed deception mesh capturing attacker payloads and generating automated IOCs.

### 5. Production Web Essentials & Anti-Vibe-Coding Compliance
- Compliant with strict production web standards (no purple gradient slop, no pill buttons, no fake reviews or metrics).
- Full custom favicon suite (`/favicon.ico`, `/icon.svg`, `/apple-touch-icon.png`, OpenGraph metadata).
- Dedicated `/privacy` and `/terms` compliance pages.
- Native OS cursor preserved with accessible, responsive layout.

## Tech Stack
- **Framework**: React 18 + TypeScript 5.6 + Vite 6
- **3D Graphics Engine**: Three.js (WebGL 2.0)
- **Styling**: Tailwind CSS + Custom Tactical Monospace Theming
- **Icons**: Lucide React + Crisp Vector SVGs

## Getting Started

```bash
# Clone the repository
git clone https://github.com/parth2024-tech/cybersecurity-portfolio.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## License
Released under the [MIT License](LICENSE).
