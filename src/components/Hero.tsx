import React from 'react';
import { Shield, Terminal, ArrowDown, ExternalLink, Award, FileCode, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Hero: React.FC = () => {
  return (
    <section id="overview" className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Operational Pill / Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-surface border border-cyber-border rounded-md text-xs font-mono text-cyber-muted mb-6">
          <span className="w-2 h-2 rounded-full bg-cyber-accent animate-pulse" />
          <span className="text-cyber-text font-semibold">SECURITY OPERATIONS PROFILE</span>
          <span className="text-cyber-border">|</span>
          <span className="text-cyber-accent">UNDERGRADUATE CANDIDATE 2026/2027</span>
        </div>

        {/* Hero Title & Direct Description */}
        <div className="max-w-4xl space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-cyber-text font-sans">
            Defending distributed networks, auditing kernel syscalls, and automating threat hunting.
          </h1>

          <p className="text-base sm:text-lg text-cyber-muted font-normal leading-relaxed max-w-3xl">
            I am <strong className="text-cyber-text">{PORTFOLIO_DATA.profile.name}</strong>, a cybersecurity student specializing in binary exploitation, eBPF telemetry, and post-quantum cryptography. I develop open-source security tools and analyze real-world adversary tactics across Linux and cloud environments.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#sentinel-core"
              className="flex items-center gap-2 px-5 py-3 bg-cyber-accent text-cyber-bg font-semibold rounded-lg hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] text-sm"
            >
              <Shield className="w-4 h-4" />
              <span>Explore 3D Defense Core</span>
            </a>

            <a
              href="#terminal"
              className="flex items-center gap-2 px-5 py-3 bg-cyber-surface border border-cyber-border text-cyber-text font-semibold rounded-lg hover:border-cyber-borderHover hover:bg-cyber-card transition-all text-sm font-mono"
            >
              <Terminal className="w-4 h-4 text-cyber-cyan" />
              <span>Launch Terminal CLI</span>
            </a>

            <a
              href="#projects"
              className="flex items-center gap-2 px-4 py-3 text-cyber-muted hover:text-cyber-accent transition-colors text-sm font-mono"
            >
              <span>View Source Code</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-cyber-border/70">
            {PORTFOLIO_DATA.profile.metrics.map((m, idx) => (
              <div key={idx} className="p-3 bg-cyber-card rounded-lg border border-cyber-border font-mono">
                <div className="text-2xl font-bold text-cyber-accent">{m.value}</div>
                <div className="text-xs font-semibold text-cyber-text mt-0.5">{m.label}</div>
                <div className="text-[11px] text-cyber-muted mt-1">{m.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
