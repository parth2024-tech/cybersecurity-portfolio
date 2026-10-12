import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal, Shield, Network, FolderGit2, KeyRound, Award,
  Volume2, VolumeX, Maximize2, Minimize2, X, Minus, Sparkles,
  Cpu, Activity, Radio, ExternalLink, ArrowRight, Layout
} from 'lucide-react';
import { TerminalConsole } from '../TerminalConsole';
import { Cyber3DScene } from '../canvas/Cyber3DScene';
import { PacketSniffer } from '../tools/PacketSniffer';
import { InteractiveSecurityLab } from '../InteractiveSecurityLab';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { audioFeedback } from '../../utils/audioFeedback';

interface DesktopWindow {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CyberDesktopOSProps {
  onSwitchToBriefing: () => void;
}

export const CyberDesktopOS: React.FC<CyberDesktopOSProps> = ({ onSwitchToBriefing }) => {
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(audioFeedback.isMuted);
  const [topZ, setTopZ] = useState<number>(20);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [activeWindowId, setActiveWindowId] = useState<string>('terminal');

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Windows State
  const [windows, setWindows] = useState<{ [key: string]: DesktopWindow }>({
    terminal: {
      id: 'terminal',
      title: 'secops@sentinel: ~ (Bash 5.2)',
      icon: <Terminal className="w-4 h-4 text-cyber-accent" />,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 12,
      x: 30,
      y: 40,
      width: 720,
      height: 480,
    },
    threat3d: {
      id: 'threat3d',
      title: 'Sentinel Core v3.4 [3D WebGL Telemetry]',
      icon: <Shield className="w-4 h-4 text-cyber-cyan" />,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 11,
      x: 480,
      y: 70,
      width: 680,
      height: 510,
    },
    sniffer: {
      id: 'sniffer',
      title: 'Wireshark-Lite // Packet Sniffer (eth0)',
      icon: <Network className="w-4 h-4 text-cyber-red" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 100,
      y: 90,
      width: 820,
      height: 520,
    },
    projects: {
      id: 'projects',
      title: 'SecProjects / Threat Intelligence Case Files',
      icon: <FolderGit2 className="w-4 h-4 text-cyber-amber" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 140,
      y: 60,
      width: 800,
      height: 530,
    },
    crypto: {
      id: 'crypto',
      title: 'Cryptographic Engine & Shannon Entropy Lab',
      icon: <KeyRound className="w-4 h-4 text-cyber-accent" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 200,
      y: 110,
      width: 740,
      height: 490,
    },
    credentials: {
      id: 'credentials',
      title: 'Verified Credentials & Degrees (CompTIA, eJPT, CEH)',
      icon: <Award className="w-4 h-4 text-cyber-cyan" />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      x: 180,
      y: 130,
      width: 660,
      height: 460,
    },
  });

  // Bring Window To Front
  const focusWindow = (id: string) => {
    audioFeedback.playClick();
    setTopZ(curr => curr + 1);
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        zIndex: topZ + 1,
        isMinimized: false,
      },
    }));
    setActiveWindowId(id);
  };

  const openWindow = (id: string) => {
    audioFeedback.playChime();
    setTopZ(curr => curr + 1);
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: topZ + 1,
      },
    }));
    setActiveWindowId(id);
  };

  const closeWindow = (id: string) => {
    audioFeedback.playClick();
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
  };

  const toggleMinimize = (id: string) => {
    audioFeedback.playClick();
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: !prev[id].isMinimized },
    }));
  };

  const toggleMaximize = (id: string) => {
    audioFeedback.playClick();
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }));
  };

  // Dragging support
  const dragRef = useRef<{ id: string; startX: number; startY: number; initX: number; initY: number } | null>(null);

  const startDrag = (id: string, e: React.MouseEvent) => {
    focusWindow(id);
    dragRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initX: windows[id].x,
      initY: windows[id].y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const { id, startX, startY, initX, initY } = dragRef.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      setWindows(prev => {
        if (!prev[id] || prev[id].isMaximized) return prev;
        return {
          ...prev,
          [id]: {
            ...prev[id],
            x: Math.max(10, Math.min(window.innerWidth - 300, initX + dx)),
            y: Math.max(40, Math.min(window.innerHeight - 150, initY + dy)),
          },
        };
      });
    };

    const handleMouseUp = () => {
      dragRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [windows]);

  const toggleSound = () => {
    const muted = audioFeedback.toggleMute();
    setIsAudioMuted(muted);
  };

  return (
    <div className="relative w-full h-[90vh] min-h-[680px] bg-cyber-bg overflow-hidden select-none border-b border-cyber-border font-mono">
      {/* OS Top Telemetry Bar */}
      <div className="absolute top-0 inset-x-0 h-9 bg-cyber-card/95 backdrop-blur-md border-b border-cyber-border z-40 flex items-center justify-between px-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-cyber-text font-bold">
            <Shield className="w-3.5 h-3.5 text-cyber-accent" />
            <span>SentinelOS v4.2 [DEFENSE RUNTIME]</span>
          </div>
          <span className="text-cyber-border">|</span>
          <span className="text-cyber-muted text-[11px] hidden sm:inline">
            USER: <span className="text-cyber-cyan">alex@sentinel-defense</span>
          </span>
          <span className="text-cyber-border hidden sm:inline">|</span>
          <span className="text-cyber-muted text-[11px] hidden md:inline">
            HOST: <span className="text-cyber-text">arch-linux-hardened</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 text-cyber-muted hover:text-cyber-accent transition-colors"
            title={isAudioMuted ? 'Tactile Sound: MUTED (Click to Enable)' : 'Tactile Sound: ACTIVE'}
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5 text-cyber-red" /> : <Volume2 className="w-3.5 h-3.5 text-cyber-accent" />}
            <span className="hidden sm:inline text-[11px]">{isAudioMuted ? 'Muted' : 'Audio On'}</span>
          </button>

          <span className="text-cyber-border">|</span>

          {/* Quick Switch to Document Briefing */}
          <button
            onClick={() => {
              audioFeedback.playClick();
              onSwitchToBriefing();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-cyber-surface hover:bg-cyber-accent hover:text-cyber-bg text-cyber-text border border-cyber-border rounded text-[11px] font-semibold transition-all shadow-[0_0_10px_rgba(16,185,129,0.15)]"
          >
            <Layout className="w-3 h-3" />
            <span>Switch to Executive Briefing</span>
          </button>

          <span className="text-cyber-border">|</span>

          {/* Clock */}
          <span className="text-cyber-cyan font-bold">{currentTime || '01:00:00'}</span>
        </div>
      </div>

      {/* Desktop Workspace Area (Canvas & Icons) */}
      <div className="absolute inset-0 pt-10 pb-12 overflow-hidden bg-cyber-bg cyber-grid-bg">
        {/* Desktop Application Icons Grid */}
        <div className="absolute top-14 left-6 flex flex-col gap-5 z-0">
          {[
            { id: 'terminal', label: 'Terminal.sh', icon: <Terminal className="w-6 h-6 text-cyber-accent" /> },
            { id: 'threat3d', label: 'ThreatRadar.3d', icon: <Shield className="w-6 h-6 text-cyber-cyan" /> },
            { id: 'sniffer', label: 'WiresharkLite', icon: <Network className="w-6 h-6 text-cyber-red" /> },
            { id: 'projects', label: 'CaseFiles.dir', icon: <FolderGit2 className="w-6 h-6 text-cyber-amber" /> },
            { id: 'crypto', label: 'CipherLab.bin', icon: <KeyRound className="w-6 h-6 text-cyber-accent" /> },
            { id: 'credentials', label: 'Degrees&Certs', icon: <Award className="w-6 h-6 text-cyber-cyan" /> },
          ].map(app => (
            <button
              key={app.id}
              onClick={() => openWindow(app.id)}
              className="group flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-cyber-surface/70 border border-transparent hover:border-cyber-border transition-all w-24 text-center cursor-pointer"
            >
              <div className="p-2.5 bg-cyber-card rounded-lg border border-cyber-border group-hover:border-cyber-accent transition-colors shadow-lg">
                {app.icon}
              </div>
              <span className="text-[11px] text-cyber-muted group-hover:text-cyber-text truncate w-full">
                {app.label}
              </span>
            </button>
          ))}
        </div>

        {/* Center Desktop Watermark */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
          <Shield className="w-48 h-48 text-cyber-accent" />
          <span className="text-2xl font-bold tracking-widest text-cyber-muted mt-4">
            SENTINEL DEFENSE OPERATIONS
          </span>
        </div>

        {/* Desktop Windows */}
        {Object.values(windows).map(win => {
          if (!win.isOpen || win.isMinimized) return null;

          const isFocused = activeWindowId === win.id;

          const windowStyle: React.CSSProperties = win.isMaximized
            ? {
                top: 40,
                left: 0,
                right: 0,
                bottom: 48,
                zIndex: win.zIndex,
                width: '100%',
                height: 'calc(100% - 88px)',
              }
            : {
                top: win.y,
                left: win.x,
                width: Math.min(win.width, window.innerWidth - 40),
                height: Math.min(win.height, window.innerHeight - 120),
                zIndex: win.zIndex,
              };

          return (
            <div
              key={win.id}
              onClick={() => focusWindow(win.id)}
              style={windowStyle}
              className={`absolute rounded-xl overflow-hidden border shadow-2xl flex flex-col transition-shadow ${
                isFocused
                  ? 'border-cyber-accent/80 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-cyber-card'
                  : 'border-cyber-border bg-cyber-card/95'
              }`}
            >
              {/* Window Header */}
              <div
                onMouseDown={e => startDrag(win.id, e)}
                onDoubleClick={() => toggleMaximize(win.id)}
                className={`h-9 px-3 flex items-center justify-between border-b cursor-move ${
                  isFocused
                    ? 'bg-cyber-surface border-cyber-accent/50 text-cyber-text'
                    : 'bg-cyber-card border-cyber-border text-cyber-muted'
                }`}
              >
                <div className="flex items-center gap-2 text-xs truncate">
                  {win.icon}
                  <span className="font-bold truncate">{win.title}</span>
                </div>

                {/* Window Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleMinimize(win.id);
                    }}
                    className="p-1 hover:bg-cyber-border rounded text-cyber-muted hover:text-cyber-text"
                    title="Minimize"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      toggleMaximize(win.id);
                    }}
                    className="p-1 hover:bg-cyber-border rounded text-cyber-muted hover:text-cyber-text"
                    title={win.isMaximized ? "Restore" : "Maximize"}
                  >
                    {win.isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      closeWindow(win.id);
                    }}
                    className="p-1 hover:bg-cyber-red/30 rounded text-cyber-muted hover:text-cyber-red"
                    title="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Window Body */}
              <div className="flex-1 overflow-auto bg-cyber-bg p-2 md:p-3">
                {win.id === 'terminal' && <TerminalConsole />}

                {win.id === 'threat3d' && (
                  <div className="w-full h-full min-h-[420px]">
                    <Cyber3DScene />
                  </div>
                )}

                {win.id === 'sniffer' && <PacketSniffer />}

                {win.id === 'crypto' && <InteractiveSecurityLab />}

                {win.id === 'projects' && (
                  <div className="space-y-4 p-2 text-xs font-mono">
                    <p className="text-cyber-accent font-bold">
                      RESOLVED SECURITY RESEARCH & CASE FILES:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {PORTFOLIO_DATA.projects.map((proj, pIdx) => (
                        <div key={pIdx} className="p-3.5 bg-cyber-card rounded-lg border border-cyber-border space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-cyber-text">{proj.title}</span>
                            <span className="text-[10px] text-cyber-cyan px-2 py-0.5 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded">
                              {proj.category}
                            </span>
                          </div>
                          <p className="text-cyber-muted text-[11px] leading-relaxed">{proj.description}</p>
                          <div className="space-y-1 pt-1 text-[10px] text-cyber-muted border-t border-cyber-border/70">
                            <div>Stack: <span className="text-cyber-text">{proj.techStack.join(', ')}</span></div>
                            <div>Mitigation: <span className="text-cyber-accent">{proj.metrics[0]}</span></div>
                          </div>
                          <div className="pt-2">
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[11px] text-cyber-accent hover:underline font-semibold"
                            >
                              <span>View Git Repository</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {win.id === 'credentials' && (
                  <div className="space-y-4 p-2 text-xs font-mono">
                    <p className="text-cyber-cyan font-bold">INDUSTRY CERTIFICATIONS & ACADEMIC RECORDS:</p>
                    <div className="space-y-3">
                      {PORTFOLIO_DATA.certifications.map((cert, cIdx) => (
                        <div key={cIdx} className="p-3 bg-cyber-card rounded-lg border border-cyber-border flex items-center justify-between">
                          <div>
                            <span className="font-bold text-cyber-text">{cert.name}</span>
                            <p className="text-cyber-muted text-[11px] pt-0.5">{cert.issuer} • {cert.date}</p>
                            <span className="text-[10px] text-cyber-cyan font-semibold">Verification ID: {cert.credentialId}</span>
                          </div>
                          <span className="px-2.5 py-1 text-[10px] bg-cyber-accent/15 border border-cyber-accent text-cyber-accent rounded font-bold">
                            {cert.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* OS Bottom Taskbar */}
      <div className="absolute bottom-0 inset-x-0 h-12 bg-cyber-surface/95 backdrop-blur-md border-t border-cyber-border z-40 flex items-center justify-between px-3">
        {/* Start Menu / App Launcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-cyber-accent text-cyber-bg font-bold rounded-lg text-xs shadow-[0_0_12px_rgba(16,185,129,0.25)]">
            <Radio className="w-3.5 h-3.5" />
            <span>START</span>
          </div>

          <div className="h-5 w-px bg-cyber-border mx-1" />

          {/* Running Windows Taskbar Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-[65vw]">
            {Object.values(windows).map(win => {
              if (!win.isOpen) return null;
              const isFocused = activeWindowId === win.id && !win.isMinimized;

              return (
                <button
                  key={win.id}
                  onClick={() => {
                    if (win.isMinimized) focusWindow(win.id);
                    else if (activeWindowId === win.id) toggleMinimize(win.id);
                    else focusWindow(win.id);
                  }}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-xs transition-all max-w-[200px] truncate ${
                    isFocused
                      ? 'bg-cyber-card border-cyber-accent text-cyber-accent font-semibold shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                      : win.isMinimized
                      ? 'bg-cyber-bg/50 border-cyber-border text-cyber-muted/60'
                      : 'bg-cyber-surface border-cyber-border text-cyber-muted hover:text-cyber-text'
                  }`}
                >
                  {win.icon}
                  <span className="truncate">{win.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* System Tray Status */}
        <div className="flex items-center gap-3 text-xs text-cyber-muted">
          <span className="hidden md:inline text-[11px]">
            LATENCY: <strong className="text-cyber-accent">14ms</strong>
          </span>
          <span className="hidden md:inline text-[11px]">
            RAM: <strong className="text-cyber-cyan">4.2GB / 16GB</strong>
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyber-accent animate-ping" />
            <span className="w-2 h-2 rounded-full bg-cyber-accent" />
            <span className="text-[11px] font-bold text-cyber-text">ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
