import React, { useState } from 'react';
import { Shield, Terminal, Cpu, Lock, Menu, X, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  currentView: 'home' | 'privacy' | 'terms';
  onNavigate: (view: 'home' | 'privacy' | 'terms') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: '3D Defense Core', href: '#sentinel-core' },
    { label: 'Terminal CLI', href: '#terminal' },
    { label: 'Research Projects', href: '#projects' },
    { label: 'Security Lab', href: '#lab' },
    { label: 'Skills Arsenal', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-cyber-bg/90 backdrop-blur-md border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => onNavigate('home')}
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
              DEFENSE TELEMETRY // SOC LEVEL 1
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono text-cyber-muted">
          {currentView === 'home' ? (
            navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-cyber-accent transition-colors"
              >
                {link.label}
              </a>
            ))
          ) : (
            <button
              onClick={() => onNavigate('home')}
              className="text-cyber-accent hover:underline font-semibold"
            >
              ← Back to Main Portfolio
            </button>
          )}
        </nav>

        {/* Right CTA & System Status */}
        <div className="hidden sm:flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-cyber-surface rounded-md border border-cyber-border text-cyber-muted text-[11px]">
            <span className="w-2 h-2 rounded-full bg-cyber-accent" />
            <span>GRID: ACTIVE</span>
          </div>

          <a
            href="#terminal"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyber-accent text-cyber-bg font-semibold rounded-lg hover:bg-emerald-400 transition-all shadow-[0_0_12px_rgba(16,185,129,0.25)]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Console</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-cyber-muted hover:text-cyber-text rounded-md focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cyber-card border-b border-cyber-border px-4 py-4 space-y-3 font-mono text-xs">
          {currentView === 'home' ? (
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
              <span>Launch Terminal</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
