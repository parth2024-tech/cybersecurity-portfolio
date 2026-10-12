import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Cyber3DScene, SceneMode } from './components/canvas/Cyber3DScene';
import { TerminalConsole } from './components/TerminalConsole';
import { ProjectsSection } from './components/ProjectsSection';
import { InteractiveSecurityLab } from './components/InteractiveSecurityLab';
import { SkillsArsenal } from './components/SkillsArsenal';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { Shield, Sparkles, Terminal, Cpu } from 'lucide-react';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'privacy' | 'terms'>('home');
  const [sceneMode, setSceneMode] = useState<SceneMode>('sentinel');

  // Sync with URL hash / path
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/privacy' || hash === '#privacy') {
        setCurrentView('privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#/terms' || hash === '#terms') {
        setCurrentView('terms');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        if (currentView !== 'home') setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: 'home' | 'privacy' | 'terms') => {
    setCurrentView(view);
    if (view === 'privacy') window.location.hash = '#/privacy';
    else if (view === 'terms') window.location.hash = '#/terms';
    else window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text cyber-grid-bg flex flex-col selection:bg-cyber-accent selection:text-cyber-bg">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentView === 'privacy' && (
          <PrivacyPage onBack={() => handleNavigate('home')} />
        )}

        {currentView === 'terms' && (
          <TermsPage onBack={() => handleNavigate('home')} />
        )}

        {currentView === 'home' && (
          <>
            {/* 1. Direct, High-Craft Hero Section */}
            <Hero />

            {/* 2. 3D WebGL Sentinel Core & Defense Mesh */}
            <section id="sentinel-core" className="py-16 md:py-20 border-b border-cyber-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-cyber-surface border border-cyber-border rounded-md text-xs font-mono text-cyber-accent">
                      <Shield className="w-3.5 h-3.5" />
                      <span>3D WEBGL TELEMETRY VISUALIZATION</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-cyber-text tracking-tight">
                      Interactive Cyber Defense Core & Threat Topology
                    </h2>
                    <p className="text-sm text-cyber-muted max-w-2xl">
                      Real-time Three.js WebGL simulation modeling cryptographic shield geometry, distributed network node discovery, and packet firewall interception.
                    </p>
                  </div>

                  <div className="text-xs font-mono text-cyber-muted hidden md:block text-right">
                    <span>WebGL 2.0 Shader Pipeline</span>
                    <span className="block text-cyber-accent">Zero Scroll-Jacking • 60 FPS Native</span>
                  </div>
                </div>

                <Cyber3DScene mode={sceneMode} onModeChange={setSceneMode} />
              </div>
            </section>

            {/* 3. Live Interactive Terminal Console */}
            <section className="py-16 md:py-20 border-b border-cyber-border bg-cyber-surface/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-cyber-surface border border-cyber-border rounded-md text-xs font-mono text-cyber-cyan">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>EMBEDDED CLI ENVIRONMENT</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-cyber-text tracking-tight">
                    Interactive Security Operations Terminal
                  </h2>
                  <p className="text-sm text-cyber-muted max-w-2xl">
                    Execute simulated network scans, decrypt ciphers, view project specs, and solve the embedded micro-CTF challenge.
                  </p>
                </div>

                <TerminalConsole />
              </div>
            </section>

            {/* 4. Research Projects Section */}
            <ProjectsSection />

            {/* 5. Interactive Security Lab Tools */}
            <section id="lab" className="py-16 md:py-20 border-b border-cyber-border bg-cyber-surface/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-cyber-surface border border-cyber-border rounded-md text-xs font-mono text-cyber-accent">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>BROWSER-SIDE SECURITY LAB</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-cyber-text tracking-tight">
                    Cryptographic Analyzer, Packet Builder & MITRE Explorer
                  </h2>
                  <p className="text-sm text-cyber-muted max-w-2xl">
                    Live client-side cybersecurity inspection tools: compute real Shannon entropy, construct raw TCP flag headers, and explore adversary TTP mappings.
                  </p>
                </div>

                <InteractiveSecurityLab />
              </div>
            </section>

            {/* 6. Skills Arsenal & CTF Performance */}
            <SkillsArsenal />

            {/* 7. Industry Certifications & Degree */}
            <CertificationsSection />

            {/* 8. Contact & PGP Transmission Dispatch */}
            <ContactSection />
          </>
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};
