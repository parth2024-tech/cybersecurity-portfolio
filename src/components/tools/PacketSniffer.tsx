import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Filter, ShieldAlert, CheckCircle2, ChevronRight, Binary } from 'lucide-react';
import { audioFeedback } from '../../utils/audioFeedback';

export interface CapturedPacket {
  id: number;
  time: string;
  source: string;
  destination: string;
  protocol: 'TCP' | 'UDP' | 'DNS' | 'TLS 1.3' | 'ARP' | 'ICMP';
  length: number;
  info: string;
  isAlert?: boolean;
  alertMsg?: string;
  hexDump: string[];
  asciiDump: string[];
  layers: { [key: string]: string[] };
}

const SAMPLE_PACKETS: Omit<CapturedPacket, 'id' | 'time'>[] = [
  {
    source: '192.168.1.104',
    destination: '1.1.1.1',
    protocol: 'DNS',
    length: 74,
    info: 'Standard query 0x3f1a A api.sentinel-defense.org',
    hexDump: ['00 1a 2b 3c 4d 5e', '08 00 45 00 00 4a', '3f 1a 01 00 00 01', '03 61 70 69 08 73'],
    asciiDump: ['..+<M^', '..E..J', '?.....', '.api.s'],
    layers: {
      'Frame 1': ['74 bytes on wire (592 bits)', 'Interface: eth0'],
      'Ethernet II': ['Src: 02:42:ac:11:00:02', 'Dst: 02:42:ac:11:00:01'],
      'Internet Protocol Version 4': ['Src: 192.168.1.104', 'Dst: 1.1.1.1', 'TTL: 64'],
      'User Datagram Protocol': ['Src Port: 53120', 'Dst Port: 53', 'Length: 40'],
      'Domain Name System (query)': ['Transaction ID: 0x3f1a', 'Questions: 1', 'Query: api.sentinel-defense.org']
    }
  },
  {
    source: '10.0.4.15',
    destination: '192.168.1.104',
    protocol: 'TCP',
    length: 66,
    info: '49152 → 443 [SYN] Seq=0 Win=64240 Len=0 MSS=1460',
    hexDump: ['c0 a8 01 68 00 00', '01 bb c0 00 00 00', '02 04 05 b4 01 03', '03 08 01 01 04 02'],
    asciiDump: ['...h..', '......', '......', '......'],
    layers: {
      'Frame 2': ['66 bytes on wire (528 bits)'],
      'Ethernet II': ['Src: 52:54:00:12:34:56', 'Dst: 02:42:ac:11:00:02'],
      'Internet Protocol Version 4': ['Src: 10.0.4.15', 'Dst: 192.168.1.104', 'Flags: Don\'t fragment'],
      'Transmission Control Protocol': ['Src Port: 49152', 'Dst Port: 443', 'Flags: 0x002 (SYN)', 'Window: 64240']
    }
  },
  {
    source: '185.220.101.5',
    destination: '192.168.1.104',
    protocol: 'TCP',
    length: 54,
    info: '[SUSPICIOUS PROBE] 60234 → 22 [SYN] (Known Tor Exit Node probe)',
    isAlert: true,
    alertMsg: 'Suricata Rule 2024019: Inbound SSH SYN from anonymized IP range',
    hexDump: ['b9 dc 65 05 c0 a8', 'eb 4a 00 16 00 00', '00 00 00 00 50 02', '04 00 b8 1a 00 00'],
    asciiDump: ['..e...', '.J....', '....P.', '......'],
    layers: {
      'Frame 3': ['54 bytes on wire (432 bits)', 'ALERT TRIGGERED: Port 22 Stealth Probe'],
      'Internet Protocol Version 4': ['Src: 185.220.101.5', 'Dst: 192.168.1.104', 'Threat Rating: HIGH'],
      'Transmission Control Protocol': ['Src Port: 60234', 'Dst Port: 22 (SSH)', 'Flags: 0x002 (SYN)', 'Action: DROP & LOG']
    }
  },
  {
    source: '192.168.1.104',
    destination: '104.18.22.41',
    protocol: 'TLS 1.3',
    length: 517,
    info: 'Client Hello, Session ID: c2a8... Cipher: TLS_AES_256_GCM_SHA384',
    hexDump: ['16 03 01 02 01 01', '00 01 fd 03 03 4a', '8f 9b 21 c0 e4 69', '13 02 13 01 13 03'],
    asciiDump: ['......', '.....J', '..!..i', '......'],
    layers: {
      'Frame 4': ['517 bytes on wire (4136 bits)'],
      'Transport Layer Security': ['TLSv1.3 Record Layer: Handshake Protocol: Client Hello', 'Handshake Type: Client Hello (1)', 'Supported Version: TLS 1.3']
    }
  },
  {
    source: '192.168.1.1',
    destination: '192.168.1.104',
    protocol: 'ARP',
    length: 42,
    info: 'Who has 192.168.1.104? Tell 192.168.1.1',
    hexDump: ['00 01 08 00 06 04', '00 01 02 42 ac 11', 'c0 a8 01 01 00 00', 'c0 a8 01 68 00 00'],
    asciiDump: ['......', '...B..', '......', '...h..'],
    layers: {
      'Address Resolution Protocol (request)': ['Hardware type: Ethernet (1)', 'Protocol type: IPv4 (0x0800)', 'Sender IP: 192.168.1.1', 'Target IP: 192.168.1.104']
    }
  }
];

export const PacketSniffer: React.FC = () => {
  const [packets, setPackets] = useState<CapturedPacket[]>([]);
  const [isCapturing, setIsCapturing] = useState<boolean>(true);
  const [filterProto, setFilterProto] = useState<string>('ALL');
  const [selectedPacket, setSelectedPacket] = useState<CapturedPacket | null>(null);

  // Initialize initial batch
  useEffect(() => {
    const initial: CapturedPacket[] = SAMPLE_PACKETS.map((p, idx) => ({
      ...p,
      id: idx + 1,
      time: `00:0${idx + 1}.${Math.floor(Math.random() * 900 + 100)}`,
    }));
    setPackets(initial);
    setSelectedPacket(initial[2]); // select the alert packet by default for high visual engagement
  }, []);

  // Periodic simulated packet arrival
  useEffect(() => {
    if (!isCapturing) return;

    const interval = setInterval(() => {
      setPackets(prev => {
        if (prev.length > 50) return prev.slice(1);
        const template = SAMPLE_PACKETS[Math.floor(Math.random() * SAMPLE_PACKETS.length)];
        const nextId = (prev[prev.length - 1]?.id || 0) + 1;
        const nowSec = nextId < 10 ? `0${nextId}` : `${nextId}`;
        const newPacket: CapturedPacket = {
          ...template,
          id: nextId,
          time: `00:${nowSec}.${Math.floor(Math.random() * 900 + 100)}`,
        };
        return [...prev, newPacket];
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isCapturing]);

  const filtered = filterProto === 'ALL'
    ? packets
    : filterProto === 'ALERT'
    ? packets.filter(p => p.isAlert)
    : packets.filter(p => p.protocol === filterProto);

  return (
    <div className="w-full bg-cyber-card border border-cyber-border rounded-xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-cyber-surface border-b border-cyber-border">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audioFeedback.playClick();
              setIsCapturing(!isCapturing);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold border transition-all ${
              isCapturing
                ? 'bg-cyber-red/15 border-cyber-red text-cyber-red'
                : 'bg-cyber-accent/15 border-cyber-accent text-cyber-accent'
            }`}
          >
            {isCapturing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isCapturing ? 'Stop Sniffing' : 'Start Capture'}</span>
          </button>

          <button
            onClick={() => {
              audioFeedback.playClick();
              setPackets([]);
              setSelectedPacket(null);
            }}
            className="p-1.5 bg-cyber-card hover:bg-cyber-border text-cyber-muted hover:text-cyber-text rounded border border-cyber-border transition-colors"
            title="Clear buffer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <span className="text-[11px] text-cyber-muted pl-2 hidden sm:inline">
            Buffer: <strong className="text-cyber-text">{packets.length}</strong> packets
          </span>
        </div>

        {/* Protocol Filter */}
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="text-cyber-muted hidden md:inline">Filter:</span>
          {['ALL', 'TCP', 'DNS', 'TLS 1.3', 'ALERT'].map(proto => (
            <button
              key={proto}
              onClick={() => {
                audioFeedback.playClick();
                setFilterProto(proto);
              }}
              className={`px-2 py-0.5 rounded border transition-colors ${
                filterProto === proto
                  ? proto === 'ALERT'
                    ? 'bg-cyber-red border-cyber-red text-cyber-bg font-bold'
                    : 'bg-cyber-accent border-cyber-accent text-cyber-bg font-bold'
                  : 'bg-cyber-card border-cyber-border text-cyber-muted hover:text-cyber-text'
              }`}
            >
              {proto}
            </button>
          ))}
        </div>
      </div>

      {/* Packet Table List */}
      <div className="h-48 overflow-y-auto border-b border-cyber-border bg-cyber-bg/95">
        <table className="w-full text-left border-collapse text-[11px]">
          <thead className="sticky top-0 bg-cyber-surface text-cyber-muted border-b border-cyber-border font-bold">
            <tr>
              <th className="py-1.5 px-3 w-12">No.</th>
              <th className="py-1.5 px-3 w-20">Time</th>
              <th className="py-1.5 px-3 w-32">Source</th>
              <th className="py-1.5 px-3 w-32">Destination</th>
              <th className="py-1.5 px-3 w-20">Protocol</th>
              <th className="py-1.5 px-3 w-16">Len</th>
              <th className="py-1.5 px-3">Information</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyber-border/40 font-mono">
            {filtered.map(pkt => {
              const isSelected = selectedPacket?.id === pkt.id;
              return (
                <tr
                  key={pkt.id}
                  onClick={() => {
                    audioFeedback.playClick();
                    setSelectedPacket(pkt);
                  }}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-cyber-accent/20 text-cyber-text'
                      : pkt.isAlert
                      ? 'bg-cyber-red/10 text-cyber-red hover:bg-cyber-red/20'
                      : 'hover:bg-cyber-surface/60 text-cyber-muted'
                  }`}
                >
                  <td className="py-1 px-3 text-cyber-border">{pkt.id}</td>
                  <td className="py-1 px-3">{pkt.time}</td>
                  <td className="py-1 px-3 font-semibold">{pkt.source}</td>
                  <td className="py-1 px-3 font-semibold">{pkt.destination}</td>
                  <td className="py-1 px-3">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        pkt.protocol === 'TCP'
                          ? 'text-cyber-cyan'
                          : pkt.protocol === 'DNS'
                          ? 'text-cyber-amber'
                          : pkt.protocol === 'TLS 1.3'
                          ? 'text-cyber-accent'
                          : 'text-cyber-text'
                      }`}
                    >
                      {pkt.protocol}
                    </span>
                  </td>
                  <td className="py-1 px-3">{pkt.length}</td>
                  <td className="py-1 px-3 truncate max-w-xs">{pkt.info}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Packet Inspection Bottom Pane */}
      {selectedPacket && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-cyber-card/90">
          {/* Decoded Layer Breakdown */}
          <div className="space-y-3 bg-cyber-surface/70 p-3 rounded-lg border border-cyber-border">
            <div className="flex items-center justify-between border-b border-cyber-border pb-1.5">
              <span className="font-bold text-cyber-text flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-cyber-accent" />
                Packet #{selectedPacket.id} Layers
              </span>
              {selectedPacket.isAlert && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-cyber-red border border-cyber-red text-cyber-bg rounded flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  IDS THREAT MATCH
                </span>
              )}
            </div>

            <div className="space-y-2 text-[11px] overflow-y-auto max-h-36 pr-1">
              {Object.entries(selectedPacket.layers).map(([layer, items]) => (
                <div key={layer} className="space-y-0.5">
                  <div className="text-cyber-cyan font-bold">[{layer}]</div>
                  {items.map((it, idx) => (
                    <div key={idx} className="pl-3 text-cyber-muted border-l border-cyber-border/80">
                      {it}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Hex & ASCII Dump View */}
          <div className="space-y-2 bg-cyber-bg p-3 rounded-lg border border-cyber-border font-mono text-[11px]">
            <div className="flex items-center justify-between text-cyber-muted border-b border-cyber-border pb-1">
              <span className="flex items-center gap-1">
                <Binary className="w-3.5 h-3.5 text-cyber-cyan" />
                Raw Payload Hex & ASCII Dump
              </span>
              <span>Offset: 0x0000</span>
            </div>

            <div className="space-y-1 pt-1 overflow-x-auto text-[10px] text-cyber-muted">
              {selectedPacket.hexDump.map((hex, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="text-cyber-border font-semibold">00{idx * 16 < 16 ? `0${idx * 16}` : idx * 16}0</span>
                  <span className="text-cyber-accent tracking-wider font-semibold">{hex}</span>
                  <span className="text-cyber-text ml-auto border-l border-cyber-border/70 pl-2">
                    {selectedPacket.asciiDump[idx] || '......'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
