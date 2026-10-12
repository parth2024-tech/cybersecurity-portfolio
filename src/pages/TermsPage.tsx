import React from 'react';
import { Shield, ArrowLeft, AlertCircle, FileCheck, Code2 } from 'lucide-react';

interface TermsPageProps {
  onBack: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
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
          <span>TERMS OF ENGAGEMENT</span>
        </div>
        <h1 className="text-3xl font-bold text-cyber-text tracking-tight">
          Terms & Conditions of Service
        </h1>
        <p className="text-xs font-mono text-cyber-muted">
          Last revised: October 2026 • Security Research & Ethical Hacking Disclosure Notice
        </p>
      </div>

      <div className="space-y-6 text-sm text-cyber-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-cyber-text font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-cyber-red" />
            <span>1. Ethical Usage & Educational Purpose</span>
          </h2>
          <p>
            The tools, code samples, CTF walkthroughs, and security scripts documented on this portfolio are published strictly for educational, defensive research, and authorized assessment purposes under ethical guidelines. You may not deploy any tool or exploit technique published here against unauthorized third-party infrastructure without explicit, written mutual consent.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-cyber-text font-mono flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyber-cyan" />
            <span>2. Intellectual Property & Open Source Licensing</span>
          </h2>
          <p>
            Unless explicitly stated otherwise, all open-source security tools (such as SpectreScan, KryptonEDR, ZeroTrust-Gateway, and ShadowVault) are licensed under permissive open-source licenses (MIT License or Apache License 2.0). Attribution is required in accordance with the respective LICENSE file in each public GitHub repository.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-cyber-text font-mono flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-cyber-accent" />
            <span>3. No Warranty & Liability Disclaimer</span>
          </h2>
          <p>
            All security tools and demonstration interfaces are provided on an &quot;AS IS&quot; basis, without warranty of any kind, express or implied. The author shall not be held liable for any damages, downtime, or legal claims arising from improper execution or unauthorized deployment of the provided research.
          </p>
        </section>
      </div>
    </div>
  );
};
