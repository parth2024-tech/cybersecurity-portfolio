import React, { useState } from 'react';
import { Shield, Terminal, Cpu, Lock, Menu, X, FileText, Monitor, FileSpreadsheet } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { audioFeedback } from '../utils/audioFeedback';

interface NavbarProps {
  currentView: 'home' | 'privacy' | 'terms';
  experienceMode: 'briefing' | 'os';
  onNavigate: (view: 'home' | 'privacy' | 'terms') => void;
  onToggleExperienceMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  experienceMode,
  onNavigate,
  onToggleExperienceMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: '3D Defense Core', href: '#sentinel-core' },
    { label: 'Terminal CLI', href: '#terminal' },
    { label: 'Research Projects', href: '#projects' },
    { label: 'Security Lab', href: '#lab' },
    { label: 'Packet Sniffer', href: '#sniffer' },
    { label: 'Skills Arsenal', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-cyber-bg/95 backdrop-blur-md border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => {
            audioFeedback.playClick();
            onNavigate('home');
          }}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-9 h-9 rounded-lg bg-cyber-surface border border-cyber-border group-hover:border-cyber-accent flex items-center justify-center transition-colors">
            <Shield className="w-5 h-5 text-cyber-accent" />
          </div>
          <div>
            <div className="font-mono text-sm font-bold text-cyber-text tracking-wide flex items-center gap-1.5">
              <span>{PORTFOLIO_DATA.profile.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent animate-pulse" />
            </div>
            <span className="font-mono text-[10px] text-cyber-muted block">
              CYBER DEFENSE // SOC CANDIDATE
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links (when in Briefing mode) */}
        {experienceMode === 'briefing' && currentView === 'home' && (
          <nav className="hidden xl:flex items-center gap-5 text-xs font-mono text-cyber-muted">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-cyber-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* Right CTA & System Experience Mode Switcher */}
        <div className="hidden sm:flex items-center gap-3 font-mono text-xs">
          {/* Dual Experience Switcher */}
          <button
            onClick={() => {
              audioFeedback.playChime();
              onToggleExperienceMode();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              experienceMode === 'os'
                ? 'bg-cyber-cyan/15 border-cyber-cyan text-cyber-cyan shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                : 'bg-cyber-surface border-cyber-border hover:border-cyber-accent text-cyber-text'
            }`}
          >
            {experienceMode === 'os' ? (
              <>
                <FileSpreadsheet className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>Executive Briefing Mode</span>
              </>
            ) : (
              <>
                <Monitor className="w-3.5 h-3.5 text-cyber-accent" />
                <span>CyberOS Desktop Mode</span>
              </>
            )}
          </button>

          <a
            href="#terminal"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyber-accent text-cyber-bg font-semibold rounded-lg hover:bg-emerald-400 transition-all shadow-[0_0_12px_rgba(16,185,129,0.25)]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-cyber-muted hover:text-cyber-text rounded-md focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-cyber-card border-b border-cyber-border px-4 py-4 space-y-3 font-mono text-xs">
          <div className="pb-2 border-b border-cyber-border">
            <button
              onClick={() => {
                audioFeedback.playChime();
                onToggleExperienceMode();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-cyber-surface border border-cyber-accent text-cyber-accent rounded-lg font-bold"
            >
              {experienceMode === 'os' ? (
                <>
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Switch to Executive Briefing</span>
                </>
              ) : (
                <>
                  <Monitor className="w-4 h-4" />
                  <span>Launch CyberOS Desktop</span>
                </>
              )}
            </button>
          </div>

          {currentView === 'home' && experienceMode === 'briefing' ? (
            navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-cyber-muted hover:text-cyber-accent border-b border-cyber-border/40"
              >
                {link.label}
              </a>
            ))
          ) : (
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-cyber-accent"
            >
              ← Back to Main Portfolio
            </button>
          )}

          <div className="pt-2 flex items-center justify-between">
            <a
              href="#terminal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 px-4 py-2 bg-cyber-accent text-cyber-bg font-semibold rounded-lg text-xs"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Terminal CLI</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
