import React from 'react';
import { Shield, ArrowLeft, Lock, EyeOff, Server, Database } from 'lucide-react';

interface PrivacyPageProps {
  onBack: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-8 font-sans">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-mono text-cyber-accent hover:underline mb-2"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Portfolio Dashboard</span>
      </button>

      <div className="space-y-3 border-b border-cyber-border pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-cyber-surface border border-cyber-border rounded text-xs font-mono text-cyber-accent">
          <Shield className="w-3.5 h-3.5" />
          <span>DATA INTEGRITY POLICY</span>
        </div>
        <h1 className="text-3xl font-bold text-cyber-text tracking-tight">
          Privacy Policy & Threat Governance
        </h1>
        <p className="text-xs font-mono text-cyber-muted">
          Last revised: October 2026 • Compliant with NIST Privacy Framework & GDPR Principles
        </p>
      </div>

      <div className="space-y-6 text-sm text-cyber-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-cyber-text font-mono flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-cyber-cyan" />
            <span>1. Zero-Tracking Commitment</span>
          </h2>
          <p>
            This cybersecurity portfolio is intentionally engineered with privacy by design. We do not embed third-party surveillance scripts, advertising trackers, tracking pixels, or intrusive behavioral fingerprinting tools (such as Google Analytics or Meta Pixel). Your IP address and browsing telemetry are not harvested or commercialized.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-cyber-text font-mono flex items-center gap-2">
            <Database className="w-4 h-4 text-cyber-accent" />
            <span>2. Data Submitted via Contact Dispatch</span>
          </h2>
          <p>
            When you transmit a message through the on-site communication terminal or contact dispatch form, the data you supply (Name, Email, Message, and optional CTF Flag) is transmitted directly over TLS 1.3 encryption and stored strictly for the purpose of communicating regarding professional opportunities, research collaboration, or responsible vulnerability disclosures.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-cyber-text font-mono flex items-center gap-2">
            <Server className="w-4 h-4 text-cyber-red" />
            <span>3. Client-Side Cryptographic Computations</span>
          </h2>
          <p>
            All interactive demonstrations—including the Three.js WebGL rendering, the SHA-256 Hasher & Entropy Calculator, the Packet Inspector, and the Simulated Nmap Terminal—execute exclusively within your local browser environment. No plaintext passwords, payload strings, or hashes entered into the lab tools are transmitted to any external backend server.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-cyber-text font-mono flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyber-amber" />
            <span>4. Responsible Security Inquiries</span>
          </h2>
          <p>
            If you identify any security anomaly or configuration oversight on this domain, please reach out via encrypted communication using our published PGP fingerprint:
          </p>
          <div className="p-3 bg-cyber-card rounded-lg border border-cyber-border font-mono text-xs text-cyber-accent">
            7F3E 99B2 018C 4D7A 69A1 EE32 F04B C951 88A2 4E01
          </div>
        </section>
      </div>
    </div>
  );
};
