import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Shield, Play, RotateCcw, Copy, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface CommandOutput {
  id: string;
  command: string;
  response: React.ReactNode;
  timestamp: string;
}

export const TerminalConsole: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialOutputs: CommandOutput[] = [
    {
      id: 'boot-1',
      command: 'sysctl --init defense-matrix',
      response: (
        <div className="space-y-1 text-cyber-muted">
          <p className="text-cyber-accent">● [SEC-INIT] Kernel telemetry probes loaded: AF_PACKET & eBPF kprobes active.</p>
          <p>● [AUTH] Authenticated as guest@sentinel-defense. System access: LEVEL-3 (READ/EXECUTE).</p>
          <p>Type <span className="text-cyber-cyan font-bold">help</span> to list commands or click quick actions below.</p>
        </div>
      ),
      timestamp: '01:00:12',
    },
  ];

  const [outputs, setOutputs] = useState<CommandOutput[]>(initialOutputs);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputs, isScanning]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Add to history
    setHistory(prev => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    const ts = new Date().toTimeString().split(' ')[0];

    let responseNode: React.ReactNode = null;

    switch (mainCmd) {
      case 'help':
        responseNode = (
          <div className="space-y-2 text-xs">
            <p className="text-cyber-accent font-semibold">AVAILABLE SEC-COMMANDS:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 pl-2 text-cyber-muted">
              <div><span className="text-cyber-cyan font-bold">whoami</span> - Identity, degree, and mission statement</div>
              <div><span className="text-cyber-cyan font-bold">skills</span> - Categorized cybersecurity skill matrix</div>
              <div><span className="text-cyber-cyan font-bold">projects</span> - Inspect open-source security tools</div>
              <div><span className="text-cyber-cyan font-bold">certs</span> - Active certifications & credentials</div>
              <div><span className="text-cyber-cyan font-bold">scan &lt;ip/host&gt;</span> - Launch simulated SYN reconnaissance</div>
              <div><span className="text-cyber-cyan font-bold">ctf</span> - Play the interactive CTF challenge</div>
              <div><span className="text-cyber-cyan font-bold">decrypt &lt;text&gt;</span> - Run frequency & cipher analysis</div>
              <div><span className="text-cyber-cyan font-bold">pgp</span> - View public PGP encryption key</div>
              <div><span className="text-cyber-cyan font-bold">clear</span> - Clear the terminal screen</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        responseNode = (
          <div className="space-y-2 text-xs bg-cyber-surface/60 p-3 rounded-lg border border-cyber-border">
            <p className="text-cyber-text font-bold text-sm">{PORTFOLIO_DATA.profile.name} — {PORTFOLIO_DATA.profile.role}</p>
            <p className="text-cyber-muted">{PORTFOLIO_DATA.profile.bio}</p>
            <div className="flex flex-wrap gap-4 text-cyber-muted pt-1">
              <span>📍 Location: <strong className="text-cyber-text">{PORTFOLIO_DATA.profile.location}</strong></span>
              <span>🎓 Education: <strong className="text-cyber-text">B.S. Cybersecurity (GPA 3.92)</strong></span>
              <span>⚡ Status: <strong className="text-cyber-accent">{PORTFOLIO_DATA.profile.status}</strong></span>
            </div>
          </div>
        );
        break;

      case 'skills':
        responseNode = (
          <div className="space-y-3 text-xs">
            {PORTFOLIO_DATA.skillCategories.map((cat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-cyber-cyan font-semibold">{cat.title}:</p>
                <div className="flex flex-wrap gap-1.5 pl-2">
                  {cat.skills.map((s, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 bg-cyber-surface border border-cyber-border rounded text-cyber-muted">
                      {s.name} <span className="text-cyber-accent">({s.proficiency}%)</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        responseNode = (
          <div className="space-y-2.5 text-xs">
            <p className="text-cyber-accent font-semibold">SELECTED SECURITY RESEARCH PROJECTS:</p>
            {PORTFOLIO_DATA.projects.map((proj, idx) => (
              <div key={idx} className="p-2.5 bg-cyber-surface/80 rounded border border-cyber-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyber-text">{proj.title}</span>
                  <span className="text-[10px] text-cyber-cyan uppercase px-2 py-0.5 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded">
                    {proj.category}
                  </span>
                </div>
                <p className="text-cyber-muted">{proj.tagline}</p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-cyber-muted">
                  <span>Stack: <span className="text-cyber-text">{proj.techStack.join(', ')}</span></span>
                  <span>•</span>
                  <span>Impact: <span className="text-cyber-accent">{proj.metrics[0]}</span></span>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
        responseNode = (
          <div className="space-y-2 text-xs">
            <p className="text-cyber-accent font-semibold">VALIDATED CREDENTIALS & CERTIFICATIONS:</p>
            {PORTFOLIO_DATA.certifications.map((c, idx) => (
              <div key={idx} className="p-2 bg-cyber-surface/60 rounded border border-cyber-border flex items-center justify-between">
                <div>
                  <p className="font-bold text-cyber-text">{c.name}</p>
                  <p className="text-cyber-muted text-[11px]">{c.issuer} • {c.date} (ID: {c.credentialId})</p>
                </div>
                <span className="px-2 py-0.5 text-[10px] bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent rounded">
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case 'scan':
        const target = args[0] || '192.168.1.104';
        setIsScanning(true);
        setTimeout(() => {
          setIsScanning(false);
          setOutputs(curr => [
            ...curr,
            {
              id: `scan-result-${Date.now()}`,
              command: `[ASYNC-OUTPUT] nmap-vulnerability-probe -sS -p- ${target}`,
              response: (
                <div className="space-y-1.5 text-xs font-mono bg-cyber-surface/90 p-3 rounded border border-cyber-border">
                  <p className="text-cyber-accent">Starting Nmap 7.94 probe at {new Date().toLocaleTimeString()}...</p>
                  <p className="text-cyber-muted">Nmap scan report for {target} (latency 0.84ms)</p>
                  <div className="pt-1 border-t border-cyber-border space-y-1 text-cyber-muted">
                    <p className="text-cyber-cyan">PORT     STATE SERVICE       VERSION</p>
                    <p><span className="text-cyber-accent font-bold">22/tcp</span>   open  ssh           OpenSSH 9.6p1 (Debian 8)</p>
                    <p><span className="text-cyber-accent font-bold">80/tcp</span>   open  http          nginx/1.24.0 (Reverse Proxy)</p>
                    <p><span className="text-cyber-accent font-bold">443/tcp</span>  open  ssl/https     mTLS ZeroTrust Gateway</p>
                    <p><span className="text-cyber-amber font-bold">8080/tcp</span> open  http-proxy    Vulnerable API Test Endpoint (CVE-2024-MITIGATED)</p>
                  </div>
                  <p className="text-[11px] text-cyber-accent pt-1">● 4 open ports identified. Zero unhandled memory leaks. MITRE T1046 logged.</p>
                </div>
              ),
              timestamp: new Date().toTimeString().split(' ')[0],
            }
          ]);
        }, 1200);

        responseNode = (
          <div className="flex items-center gap-2 text-xs text-cyber-cyan animate-pulse">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
            <span>Transmitting SYN probes to {target}... Gathering banner fingerprints...</span>
          </div>
        );
        break;

      case 'ctf':
        responseNode = (
          <div className="space-y-2 text-xs bg-cyber-surface/70 p-3 rounded border border-cyber-border">
            <p className="text-cyber-accent font-bold">🏆 MICRO CTF CHALLENGE #1: Cryptographic Cipher</p>
            <p className="text-cyber-muted">
              A rogue agent dropped this XOR hex string: <code className="text-cyber-cyan bg-cyber-card px-1.5 py-0.5 rounded">130b0e071b1e0a0b0b001007010a010007</code>
            </p>
            <p className="text-cyber-muted">
              Hint: XOR single-byte key is <code className="text-cyber-amber">0x42</code>.
            </p>
            <div className="p-2 bg-cyber-card rounded border border-cyber-border text-cyber-text">
              Flag preview: <span className="text-cyber-accent font-mono font-bold">FLAG&#123;sentinel_ebpf_defense_2026&#125;</span>
            </div>
            <p className="text-[11px] text-cyber-muted">Submit this flag in the contact form or mention it in the interview for instant bonus points!</p>
          </div>
        );
        break;

      case 'decrypt':
        const cipherInput = args.join(' ') || 'U0VDVVJJVFlfQ09SRV8yMDI2';
        let decoded = '';
        try {
          decoded = atob(cipherInput);
        } catch {
          decoded = cipherInput.split('').reverse().join('');
        }
        responseNode = (
          <div className="space-y-1 text-xs">
            <p className="text-cyber-cyan font-bold">Cipher Engine Output:</p>
            <p className="text-cyber-muted">Raw Ciphertext: <span className="text-cyber-text">{cipherInput}</span></p>
            <p className="text-cyber-muted">Decrypted Plaintext: <span className="text-cyber-accent font-bold">{decoded}</span></p>
            <p className="text-[11px] text-cyber-muted">Entropy score: 4.82 bits/byte (Structured text detected)</p>
          </div>
        );
        break;

      case 'pgp':
        responseNode = (
          <div className="space-y-1.5 text-xs bg-cyber-card p-3 rounded border border-cyber-border font-mono">
            <div className="flex items-center justify-between text-cyber-accent">
              <span>-----BEGIN PGP PUBLIC KEY BLOCK-----</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(PORTFOLIO_DATA.profile.pgpFingerprint);
                  setCopiedKey(true);
                  setTimeout(() => setCopiedKey(false), 2000);
                }}
                className="flex items-center gap-1 text-[11px] text-cyber-muted hover:text-cyber-text"
              >
                {copiedKey ? <Check className="w-3 h-3 text-cyber-accent" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey ? 'Copied' : 'Copy Fingerprint'}</span>
              </button>
            </div>
            <p className="text-cyber-muted break-all">
              mQGNBF8j...KeyID: 0x4E01...Fingerprint: {PORTFOLIO_DATA.profile.pgpFingerprint}
            </p>
            <p className="text-cyber-accent">-----END PGP PUBLIC KEY BLOCK-----</p>
          </div>
        );
        break;

      case 'clear':
        setOutputs([]);
        setInput('');
        return;

      default:
        responseNode = (
          <p className="text-xs text-cyber-red">
            Command not recognized: &quot;{trimmed}&quot;. Type <span className="text-cyber-text underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> for available commands.
          </p>
        );
        break;
    }

    setOutputs(prev => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        response: responseNode,
        timestamp: ts,
      },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const prevIdx = historyIndex - 1;
        setHistoryIndex(prevIdx);
        setInput(history[prevIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div id="terminal" className="w-full bg-cyber-card border border-cyber-border rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-cyber-surface border-b border-cyber-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cyber-red/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-cyber-amber/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-cyber-accent/80 inline-block" />
          </div>
          <span className="text-cyber-muted font-bold pl-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyber-accent" />
            secops@sentinel-defense: ~ (bash 5.2)
          </span>
        </div>

        <div className="flex items-center gap-2 text-cyber-muted text-[11px]">
          <span className="hidden sm:inline">TTY: pts/0</span>
          <button
            onClick={() => setOutputs(initialOutputs)}
            className="p-1 hover:text-cyber-text transition-colors rounded"
            title="Reset Terminal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="p-4 md:p-6 space-y-4 max-h-[460px] overflow-y-auto bg-cyber-bg/95 crt-overlay">
        {outputs.map(out => (
          <div key={out.id} className="space-y-1.5">
            <div className="flex items-center gap-2 text-cyber-muted">
              <span className="text-cyber-accent font-bold">alex@sentinel:~$</span>
              <span className="text-cyber-text font-semibold">{out.command}</span>
              <span className="text-[10px] text-cyber-border ml-auto">{out.timestamp}</span>
            </div>
            <div className="pl-4 border-l border-cyber-border/70 py-1">
              {out.response}
            </div>
          </div>
        ))}

        {isScanning && (
          <div className="flex items-center gap-2 text-cyber-cyan animate-pulse pl-4">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
            <span>[PROBE ACTIVE] Enumerating targets...</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick Action Chips */}
      <div className="px-4 py-2 bg-cyber-surface/60 border-t border-cyber-border flex flex-wrap items-center gap-2 text-[11px]">
        <span className="text-cyber-muted">Quick queries:</span>
        {['whoami', 'skills', 'projects', 'scan 10.0.4.1', 'ctf', 'certs', 'pgp'].map(cmd => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-2 py-0.5 bg-cyber-card hover:bg-cyber-border border border-cyber-border rounded text-cyber-cyan hover:text-cyber-accent transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Input Line */}
      <div className="flex items-center gap-2 p-3 bg-cyber-card border-t border-cyber-border">
        <span className="text-cyber-accent font-bold pl-1">alex@sentinel:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help' or any command and press Enter..."
          className="flex-1 bg-transparent text-cyber-text focus:outline-none font-mono text-xs placeholder:text-cyber-muted/60"
        />
        <button
          onClick={() => executeCommand(input)}
          className="px-3 py-1 bg-cyber-surface hover:bg-cyber-accent hover:text-cyber-bg border border-cyber-border text-cyber-text rounded transition-all text-xs flex items-center gap-1 font-semibold"
        >
          <span>Run</span>
          <Play className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
