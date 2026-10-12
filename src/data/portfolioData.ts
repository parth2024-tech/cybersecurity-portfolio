export interface Project {
  id: string;
  title: string;
  category: 'Offensive Security' | 'Defensive Engineering' | 'Cryptography' | 'Cloud & Systems';
  tagline: string;
  description: string;
  architecture: string[];
  techStack: string[];
  metrics: string[];
  githubUrl: string;
  demoUrl?: string;
  mitreCoverage: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  status: 'Active' | 'In Progress';
  date: string;
  credentialId: string;
  badgeUrl?: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; proficiency: number; level: string; description: string }[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Alex Vance",
    role: "Cybersecurity Student & Threat Intelligence Researcher",
    tagline: "Bridging binary exploitation and defensive architecture with automated threat telemetry.",
    bio: "Undergraduate student specializing in Cybersecurity, Digital Forensics, and Distributed Systems Security. Passionate about reverse engineering, Linux kernel eBPF observability, zero-trust network access, and threat hunting in enterprise SOC environments.",
    location: "San Francisco, CA / Remote",
    status: "Available for Security Engineering & SOC Internships (Summer 2026/Fall 2026)",
    email: "alex.vance.sec@proton.me",
    github: "https://github.com/parth2024-tech",
    linkedin: "https://linkedin.com",
    hackTheBox: "https://app.hackthebox.com",
    tryHackMe: "https://tryhackme.com",
    pgpFingerprint: "7F3E 99B2 018C 4D7A 69A1 EE32 F04B C951 88A2 4E01",
    metrics: [
      { label: "CTF Flags Captured", value: "480+", detail: "HackTheBox & TryHackMe" },
      { label: "Vulnerabilities Disclosed", value: "14", detail: "Responsible disclosures & Bug Bounty" },
      { label: "TryHackMe Global Rank", value: "Top 1%", detail: "Over 180 machines solved" },
      { label: "Open-Source SecTools", value: "6", detail: "Scanners, eBPF probes, and parsers" }
    ]
  },

  projects: [
    {
      id: "spectre-scan",
      title: "SpectreScan - Distributed Asynchronous Port & Vuln Probe",
      category: "Offensive Security",
      tagline: "High-throughput asynchronous TCP SYN scanner with automated CVE lookup engine.",
      description: "A fast security reconnaissance engine built in Go. Capable of scanning a /16 subnet in under 12 seconds with raw socket packet generation, automated service fingerprinting, and real-time CVE correlation against the National Vulnerability Database (NVD).",
      architecture: [
        "Raw TCP SYN packet crafting using AF_PACKET raw sockets to bypass OS network stack overhead",
        "Lock-free worker pool with token bucket rate-limiting to evade IDS/IPS rate triggers",
        "Deterministic heuristic fingerprinting matching banner strings to CPE specifications",
        "Local embedded SQLite cache of CVE records for sub-millisecond offline vulnerability mapping"
      ],
      techStack: ["Go", "Raw Sockets", "pcap", "SQLite", "Linux", "Docker"],
      metrics: ["100k packets/sec throughput", "99.4% banner match accuracy", "Zero OS socket leaks"],
      githubUrl: "https://github.com/parth2024-tech/spectre-scan",
      demoUrl: "#terminal",
      mitreCoverage: ["T1046 - Network Service Discovery", "T1595 - Active Scanning"]
    },
    {
      id: "krypton-edr",
      title: "KryptonEDR - Kernel-Level Threat Detection with eBPF",
      category: "Defensive Engineering",
      tagline: "Zero-overhead Linux endpoint telemetry hook intercepting suspicious syscall patterns.",
      description: "An open-source endpoint detection agent that attaches eBPF kprobes and tracepoints to kernel syscalls (sys_enter_execve, sys_enter_connect, sys_enter_ptrace) to detect process injection, privilege escalation, and unauthorized network egress in real-time.",
      architecture: [
        "BCC/libbpf programs compiled to eBPF bytecode loaded directly into Linux ring buffers",
        "User-space Go daemon processing structured telemetry events at sub-50 microsecond latency",
        "Anomaly detection state engine flagging suspicious child-parent processes (e.g. nginx spawning /bin/sh)",
        "Zero-trust kill signal dispatcher capable of terminating rogue PIDs instantly upon policy breach"
      ],
      techStack: ["C (eBPF)", "Go", "Linux Kernel", "libbpf", "Prometheus"],
      metrics: ["<1.2% CPU overhead", "50µs event latency", "100% memory isolation"],
      githubUrl: "https://github.com/parth2024-tech/krypton-edr",
      demoUrl: "#terminal",
      mitreCoverage: ["T1055 - Process Injection", "T1059 - Command and Scripting Interpreter", "T1068 - Exploitation for Privilege Escalation"]
    },
    {
      id: "zero-trust-gateway",
      title: "ZeroTrust-Gateway - Identity-Aware Mutual TLS Proxy",
      category: "Cloud & Systems",
      tagline: "Microsegmentation gateway enforcing cryptographic device attestation and RBAC.",
      description: "An identity-aware reverse proxy that eliminates implicit network trust. Every incoming connection requires mutual TLS client certificate verification, OpenID Connect JWT claims validation, and continuous risk scoring before routing traffic to backend microservices.",
      architecture: [
        "Automated internal PKI issuing ephemeral short-lived X.509 client certificates",
        "Open Policy Agent (OPA) integration for declarative Rego-based RBAC and ABAC policies",
        "Stateless session verification via signed Ed25519 tokens with distributed revocation lists",
        "Full audit stream output formatted to CEF (Common Event Format) for SIEM ingestion"
      ],
      techStack: ["Rust", "Tokio", "Rustls", "OPA", "Redis", "Docker"],
      metrics: ["15k req/sec at <2ms p99", "100% mutual TLS verified", "OWASP API Top 10 hardened"],
      githubUrl: "https://github.com/parth2024-tech/zero-trust-gateway",
      demoUrl: "#terminal",
      mitreCoverage: ["T1190 - Exploit Public-Facing Application", "T1556 - Modify Authentication Process"]
    },
    {
      id: "shadow-vault",
      title: "ShadowVault - Post-Quantum Hybrid Cryptographic Store",
      category: "Cryptography",
      tagline: "Quantum-resistant secret management utilizing NIST ML-KEM & AES-256-GCM.",
      description: "A cryptographic key storage and file encryption tool implementing the NIST-standardized Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM / Kyber-768) combined with classical X25519 and AES-256-GCM to defend against Harvest Now, Decrypt Later (HNDL) attacks.",
      architecture: [
        "Hybrid key exchange encapsulating symmetric session keys with both Kyber-768 and X25519",
        "Authenticated encryption with AES-256-GCM ensuring both confidentiality and ciphertext integrity",
        "Secure memory wiping with memzero upon key deallocation to prevent cold-boot memory dumps",
        "CLI interface with PBKDF2 / Argon2id password-based key derivation"
      ],
      techStack: ["Rust", "Kyber/ML-KEM", "AES-GCM", "Argon2id", "CLI"],
      metrics: ["NIST PQC compliant", "Immune to Shor's algorithm attacks", "Zero plaintext leaks"],
      githubUrl: "https://github.com/parth2024-tech/shadow-vault",
      demoUrl: "#terminal",
      mitreCoverage: ["T1552 - Unsecured Credentials", "T1003 - OS Credential Dumping"]
    },
    {
      id: "deceive-net",
      title: "DeceiveNet - Distributed Honeypot & Deception Mesh",
      category: "Defensive Engineering",
      tagline: "Low-interaction deception network logging attacker TTPs and automated brute-force.",
      description: "A distributed deceptive architecture mimicking vulnerable SSH, RDP, and HTTP administration portals. Collects attacker payloads, credentials, and scan patterns into a centralized threat intelligence database for automated IOC generation.",
      architecture: [
        "Simulated emulated shells with realistic fake file systems to keep attackers engaged",
        "Session recording capturing every keystroke, curl payload, and injected bash script",
        "Automated YARA rule engine scanning dropped binary payloads in a sandboxed quarantine",
        "Real-time Discord/Slack webhook and STIX/TAXII threat feed generation"
      ],
      techStack: ["Python", "Asyncio", "Docker", "ELK Stack", "YARA"],
      metrics: ["Captured 42k+ unauthorized probes/mo", "Generated 350+ validated IOCs", "99.9% uptime"],
      githubUrl: "https://github.com/parth2024-tech/deceive-net",
      demoUrl: "#terminal",
      mitreCoverage: ["T1110 - Brute Force", "T1046 - Network Service Discovery"]
    }
  ] as Project[],

  certifications: [
    {
      name: "CompTIA Security+ (SY0-701)",
      issuer: "CompTIA",
      status: "Active",
      date: "Valid through 2027",
      credentialId: "COMP0010294819",
      description: "Core competence in threats, attacks, vulnerabilities, security architecture, incident response, and risk management."
    },
    {
      name: "eJPT - eLearnSecurity Junior Penetration Tester",
      issuer: "INE Security",
      status: "Active",
      date: "Issued 2024",
      credentialId: "INE-99210-EJPT",
      description: "Hands-on, practical penetration testing covering network scanning, host enumeration, vulnerability analysis, and manual exploitation."
    },
    {
      name: "CEH Practical (Certified Ethical Hacker)",
      issuer: "EC-Council",
      status: "Active",
      date: "Issued 2025",
      credentialId: "ECC9481023",
      description: "Rigorous 6-hour hands-on exam demonstrating real-world ethical hacking techniques and perimeter security defense."
    },
    {
      name: "B.S. in Cybersecurity & Information Assurance",
      issuer: "University College of Engineering",
      status: "In Progress",
      date: "Expected Graduation May 2027",
      credentialId: "GPA: 3.92 / Dean's Honor Roll",
      description: "Coursework: Cryptography, Computer Network Security, Operating System Internals, Digital Forensics, Malware Analysis, Cloud Security."
    }
  ] as Certification[],

  skillCategories: [
    {
      title: "Offensive Security & Red Teaming",
      iconName: "Crosshair",
      skills: [
        { name: "Penetration Testing", proficiency: 92, level: "Advanced", description: "Network, web app, and active directory exploitation methodology" },
        { name: "Burp Suite & Web App Security", proficiency: 90, level: "Advanced", description: "OWASP Top 10, SQLi, XSS, SSRF, IDOR, and API authorization bypasses" },
        { name: "Network Recon & Scanning", proficiency: 95, level: "Expert", description: "Nmap scripting engine (NSE), Wireshark packet capture, raw socket craft" },
        { name: "Metasploit & Exploit Frameworks", proficiency: 85, level: "Proficient", description: "Payload generation, meterpreter handlers, privilege escalation" },
        { name: "Reverse Engineering", proficiency: 75, level: "Intermediate", description: "Ghidra, GDB, x86_64 assembly decompilation, basic binary analysis" }
      ]
    },
    {
      title: "Defensive Security & Blue Teaming",
      iconName: "Shield",
      skills: [
        { name: "SIEM & Log Analysis", proficiency: 88, level: "Advanced", description: "Splunk search processing language (SPL), Elastic SIEM, log correlation" },
        { name: "eBPF & Linux Kernel Telemetry", proficiency: 84, level: "Advanced", description: "Kernel tracepoints, kprobes, real-time syscall interception" },
        { name: "IDS/IPS & Network Monitoring", proficiency: 86, level: "Advanced", description: "Suricata, Zeek, Snort rule development, packet inspection" },
        { name: "Endpoint Security & EDR", proficiency: 85, level: "Proficient", description: "Wazuh, Sysmon rule tuning, process injection detection, YARA rules" },
        { name: "Incident Response", proficiency: 82, level: "Proficient", description: "Digital triage, memory forensics with Volatility, live forensics" }
      ]
    },
    {
      title: "Systems, Cloud & Cryptography",
      iconName: "Lock",
      skills: [
        { name: "Linux Systems & Hardening", proficiency: 94, level: "Expert", description: "Arch, Debian, RHEL, systemd, SELinux, AppArmor, kernel sysctl tuning" },
        { name: "Applied Cryptography", proficiency: 88, level: "Advanced", description: "RSA, ECC, AES-GCM, Diffie-Hellman, Post-Quantum ML-KEM/Kyber" },
        { name: "Programming (Go, Rust, Python)", proficiency: 90, level: "Advanced", description: "Building high-performance security utilities, scanners, and daemons" },
        { name: "Cloud & Container Security", proficiency: 82, level: "Proficient", description: "Docker sandboxing, Kubernetes RBAC, AWS IAM least-privilege policies" },
        { name: "Compliance & Frameworks", proficiency: 85, level: "Proficient", description: "MITRE ATT&CK mapping, NIST CSF 2.0, CIS Benchmarks, ISO 27001" }
      ]
    }
  ] as SkillCategory[],

  ctfAchievements: [
    { platform: "Hack The Box", rank: "Pro Hacker", percent: "Top 5%", details: "Active machines, pwn, web exploitation, forensics" },
    { platform: "TryHackMe", rank: "Legend (Top 1%)", percent: "Rank #1,420 / 3M+", details: "180+ completed rooms, 140-day consecutive streak" },
    { platform: "National Cyber League", rank: "Top 50 Individual", percent: "Spring 2025", details: "Password cracking, log analysis, network traffic analysis" },
    { platform: "DefCon CTF Qualifiers", rank: "Team Participant", percent: "2024 & 2025", details: "Binary exploitation, cryptography challenges" }
  ]
};
