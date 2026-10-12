import React, { useState, useEffect } from 'react';
import { KeyRound, Network, ShieldAlert, Cpu, Check, RefreshCw } from 'lucide-react';

export const InteractiveSecurityLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hasher' | 'packet' | 'mitre'>('hasher');

  // --- 1. Hasher State ---
  const [inputText, setInputText] = useState<string>('SentinelDefense2026!#');
  const [sha256Hash, setSha256Hash] = useState<string>('');
  const [entropy, setEntropy] = useState<number>(0);

  // Compute SHA-256 and Shannon Entropy
  useEffect(() => {
    const compute = async () => {
      if (!inputText) {
        setSha256Hash('');
        setEntropy(0);
        return;
      }

      // SHA-256 via Web Crypto
      const msgUint8 = new TextEncoder().encode(inputText);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setSha256Hash(hashHex);

      // Shannon Entropy calculation
      const len = inputText.length;
      const freq: { [key: string]: number } = {};
      for (const char of inputText) {
        freq[char] = (freq[char] || 0) + 1;
      }
      let ent = 0;
      for (const char in freq) {
        const p = freq[char] / len;
        ent -= p * Math.log2(p);
      }
      setEntropy(parseFloat(ent.toFixed(3)));
    };

    compute();
  }, [inputText]);

  // --- 2. Packet Inspector State ---
  const [tcpFlags, setTcpFlags] = useState<{ [key: string]: boolean }>({
    SYN: true,
    ACK: false,
    FIN: false,
    RST: false,
    PSH: false,
    URG: false,
  });

  const toggleFlag = (flag: string) => {
    setTcpFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
  };

  const isXmasScan = tcpFlags.FIN && tcpFlags.PSH && tcpFlags.URG;
  const isSynFlood = tcpFlags.SYN && !tcpFlags.ACK;
  const isNullScan = Object.values(tcpFlags).every(v => !v);

  // --- 3. MITRE ATT&CK State ---
  const [selectedTactic, setSelectedTactic] = useState<string>('TA0005');
  const mitreTactics = [
    {
      id: 'TA0001',
      name: 'Initial Access',
      technique: 'T1190 - Exploit Public-Facing Application',
      description: 'Adversaries attempting to take advantage of a software vulnerability in Internet-accessible services.',
      detection: 'Analyze web application reverse proxy logs for atypical URI payloads, SQL patterns, and 5xx responses.',
      mitigationProject: 'ZeroTrust-Gateway (mTLS client verification & OPA path policies)',
    },
    {
      id: 'TA0002',
      name: 'Execution',
      technique: 'T1059 - Command and Scripting Interpreter',
      description: 'Adversaries abusing Unix shells (/bin/sh, /bin/bash) to execute arbitrary commands on victim host.',
      detection: 'Hook sys_enter_execve syscall via eBPF kprobe; track parent PID hierarchy.',
      mitigationProject: 'KryptonEDR (Sub-50µs eBPF hook killing anomalous process forks)',
    },
    {
      id: 'TA0004',
      name: 'Privilege Escalation',
      technique: 'T1068 - Exploitation for Privilege Escalation',
      description: 'Adversaries taking advantage of system weaknesses or misconfigured sudoers to attain root credentials.',
      detection: 'Monitor setuid bit invocations and audit /etc/sudoers write operations.',
      mitigationProject: 'Linux Hardening Arsenal & Automated CIS Benchmark Checker',
    },
    {
      id: 'TA0005',
      name: 'Defense Evasion',
      technique: 'T1070 - Indicator Removal on Host',
      description: 'Adversaries deleting command histories (.bash_history) or clearing systemd journal logs to hide activity.',
      detection: 'Real-time out-of-band streaming of auditd logs to tamper-proof remote SIEM storage.',
      mitigationProject: 'KryptonEDR + Remote DeceiveNet Logging Mesh',
    },
    {
      id: 'TA0007',
      name: 'Discovery',
      technique: 'T1046 - Network Service Discovery',
      description: 'Adversaries enumerating listening ports and services across subnet prior to lateral movement.',
      detection: 'Detect rapid TCP SYN sequences with missing subsequent ACK handshakes in firewall ring buffer.',
      mitigationProject: 'SpectreScan (Tested against Suricata IDS rule sets)',
    },
  ];

  const activeTacticObj = mitreTactics.find(t => t.id === selectedTactic) || mitreTactics[0];

  return (
    <div className="w-full bg-cyber-card border border-cyber-border rounded-xl overflow-hidden shadow-xl">
      {/* Tab Navigation */}
      <div className="flex border-b border-cyber-border bg-cyber-surface/90">
        <button
          onClick={() => setActiveTab('hasher')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-mono font-medium border-b-2 transition-all ${
            activeTab === 'hasher'
              ? 'border-cyber-accent text-cyber-accent bg-cyber-card'
              : 'border-transparent text-cyber-muted hover:text-cyber-text'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Crypto Hasher & Entropy</span>
        </button>

        <button
          onClick={() => setActiveTab('packet')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-mono font-medium border-b-2 transition-all ${
            activeTab === 'packet'
              ? 'border-cyber-cyan text-cyber-cyan bg-cyber-card'
              : 'border-transparent text-cyber-muted hover:text-cyber-text'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          <span>Packet Header Inspector</span>
        </button>

        <button
          onClick={() => setActiveTab('mitre')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-mono font-medium border-b-2 transition-all ${
            activeTab === 'mitre'
              ? 'border-cyber-red text-cyber-red bg-cyber-card'
              : 'border-transparent text-cyber-muted hover:text-cyber-text'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>MITRE ATT&CK Matrix</span>
        </button>
      </div>

      {/* Tab 1: Hasher & Entropy */}
      {activeTab === 'hasher' && (
        <div className="p-5 md:p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-mono text-cyber-muted flex items-center justify-between">
              <span>INPUT STRING / SECRET PAYLOAD:</span>
              <span className="text-[11px] text-cyber-accent">Web Crypto API (SubtleCrypto)</span>
            </label>
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Enter plaintext to hash..."
              className="w-full bg-cyber-surface border border-cyber-border rounded-lg px-4 py-2.5 font-mono text-sm text-cyber-text focus:outline-none focus:border-cyber-accent transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-cyber-surface rounded-lg border border-cyber-border">
              <span className="text-[11px] font-mono text-cyber-muted">SHANNON ENTROPY</span>
              <p className="text-lg font-mono font-bold text-cyber-cyan pt-1">
                {entropy} <span className="text-xs text-cyber-muted font-normal">bits/byte</span>
              </p>
              <div className="w-full bg-cyber-border h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-cyber-cyan h-full rounded-full transition-all"
                  style={{ width: `${Math.min((entropy / 8) * 100, 100)}%` }}
                />
              </div>
              <p className="text-[10px] text-cyber-muted pt-1">
                {entropy > 3.8 ? 'High complexity (Good key material)' : 'Low complexity (Predictable)'}
              </p>
            </div>

            <div className="p-3 bg-cyber-surface rounded-lg border border-cyber-border">
              <span className="text-[11px] font-mono text-cyber-muted">ALGORITHM SPEC</span>
              <p className="text-lg font-mono font-bold text-cyber-accent pt-1">SHA-256</p>
              <p className="text-[11px] text-cyber-muted pt-2">256-bit cryptographic digest (FIPS PUB 180-4)</p>
            </div>

            <div className="p-3 bg-cyber-surface rounded-lg border border-cyber-border">
              <span className="text-[11px] font-mono text-cyber-muted">PRESETS</span>
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {['Krypton_eBPF_2026', 'Admin!9921', 'NIST_ML_KEM_Kyber'].map(p => (
                  <button
                    key={p}
                    onClick={() => setInputText(p)}
                    className="text-[10px] font-mono px-2 py-0.5 bg-cyber-card hover:bg-cyber-border rounded border border-cyber-border text-cyber-muted hover:text-cyber-text"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-cyber-bg rounded-lg border border-cyber-border font-mono text-xs space-y-1">
            <div className="flex items-center justify-between text-cyber-muted text-[11px]">
              <span>SHA-256 HEX DIGEST:</span>
              <button
                onClick={() => navigator.clipboard.writeText(sha256Hash)}
                className="hover:text-cyber-accent transition-colors flex items-center gap-1"
              >
                <span>Copy</span>
              </button>
            </div>
            <p className="text-cyber-accent break-all font-semibold">{sha256Hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}</p>
          </div>
        </div>
      )}

      {/* Tab 2: Packet Inspector */}
      {activeTab === 'packet' && (
        <div className="p-5 md:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono text-cyber-muted uppercase">TCP Packet Header Builder</span>
            {isXmasScan && (
              <span className="text-xs font-mono px-2 py-0.5 bg-cyber-red/15 border border-cyber-red text-cyber-red rounded font-bold">
                ALERT: TCP Xmas Scan Detected (FIN+PSH+URG)
              </span>
            )}
            {isSynFlood && (
              <span className="text-xs font-mono px-2 py-0.5 bg-cyber-amber/15 border border-cyber-amber text-cyber-amber rounded font-bold">
                STATUS: Standard TCP SYN Probe (Initial Handshake)
              </span>
            )}
            {isNullScan && (
              <span className="text-xs font-mono px-2 py-0.5 bg-cyber-red/15 border border-cyber-red text-cyber-red rounded font-bold">
                ALERT: TCP Null Scan (No Flags Set)
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {Object.keys(tcpFlags).map(flag => (
              <button
                key={flag}
                onClick={() => toggleFlag(flag)}
                className={`p-3 rounded-lg border font-mono text-xs text-center transition-all ${
                  tcpFlags[flag]
                    ? 'bg-cyber-accent/15 border-cyber-accent text-cyber-accent font-bold'
                    : 'bg-cyber-surface border-cyber-border text-cyber-muted hover:border-cyber-borderHover'
                }`}
              >
                <div className="text-sm font-bold">{flag}</div>
                <div className="text-[10px] mt-1">{tcpFlags[flag] ? '1 (SET)' : '0 (UNSET)'}</div>
              </button>
            ))}
          </div>

          <div className="p-4 bg-cyber-bg rounded-lg border border-cyber-border font-mono text-xs space-y-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-cyber-muted border-b border-cyber-border pb-3">
              <div>Source IP: <span className="text-cyber-text">10.0.8.42</span></div>
              <div>Dest IP: <span className="text-cyber-text">198.51.100.2</span></div>
              <div>Source Port: <span className="text-cyber-cyan font-bold">49152 (Ephemeral)</span></div>
              <div>Dest Port: <span className="text-cyber-accent font-bold">443 (HTTPS/TLS)</span></div>
            </div>
            <div className="pt-1 text-cyber-muted text-[11px] flex flex-wrap gap-4">
              <span>Sequence #: <strong className="text-cyber-text">0x7F2A091B</strong></span>
              <span>Window Size: <strong className="text-cyber-text">64240 bytes</strong></span>
              <span>TTL: <strong className="text-cyber-text">64 (Linux Kernel)</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: MITRE ATT&CK */}
      {activeTab === 'mitre' && (
        <div className="p-5 md:p-6 space-y-4">
          <div className="flex flex-wrap gap-2 pb-2">
            {mitreTactics.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTactic(t.id)}
                className={`px-3 py-1.5 rounded-lg border font-mono text-xs transition-all ${
                  selectedTactic === t.id
                    ? 'bg-cyber-red/15 border-cyber-red text-cyber-red font-semibold'
                    : 'bg-cyber-surface border-cyber-border text-cyber-muted hover:text-cyber-text'
                }`}
              >
                {t.id}: {t.name}
              </button>
            ))}
          </div>

          <div className="p-4 bg-cyber-surface rounded-lg border border-cyber-border space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-cyber-border pb-2">
              <span className="text-cyber-text font-bold text-sm">{activeTacticObj.technique}</span>
              <span className="text-cyber-red font-bold text-[11px] px-2 py-0.5 bg-cyber-red/10 border border-cyber-red/30 rounded">
                ATT&CK v14
              </span>
            </div>
            <div>
              <span className="text-cyber-muted">Adversary TTP:</span>
              <p className="text-cyber-text pt-0.5 font-sans text-xs">{activeTacticObj.description}</p>
            </div>
            <div>
              <span className="text-cyber-cyan font-semibold">Detection Methodology:</span>
              <p className="text-cyber-muted pt-0.5">{activeTacticObj.detection}</p>
            </div>
            <div className="pt-2 border-t border-cyber-border flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyber-accent" />
              <span className="text-cyber-accent font-bold">Verified Portfolio Defense:</span>
              <span className="text-cyber-text">{activeTacticObj.mitigationProject}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
