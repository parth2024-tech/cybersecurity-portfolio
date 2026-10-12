import React from 'react';
import { Shield, Lock, FileText, ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (view: 'home' | 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-cyber-bg border-t border-cyber-border py-12 text-xs font-mono text-cyber-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyber-accent" />
              <span className="font-bold text-cyber-text text-sm">
                {PORTFOLIO_DATA.profile.name} // CYBERSECURITY PORTFOLIO
              </span>
            </div>
            <p className="text-cyber-muted max-w-md">
              Engineered with Three.js WebGL, React 18, TypeScript, and Tailwind CSS. Zero tracking cookies or third-party behavioral analytics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-cyber-accent transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => onNavigate('terms')}
              className="hover:text-cyber-accent transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Terms of Service</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 bg-cyber-surface hover:bg-cyber-border border border-cyber-border rounded-lg text-cyber-muted hover:text-cyber-text transition-colors"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-cyber-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}. All security research released under MIT / Apache-2.0.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-accent" />
            <span>SHA-256 SIGNED COMMIT HEAD: 0x8E45D80B</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
