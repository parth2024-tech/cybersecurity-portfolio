import React, { useState } from 'react';
import { Mail, Shield, Copy, Check, Send, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons/BrandIcons';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedPgp, setCopiedPgp] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Security Engineering Opportunity / Collaboration',
    message: '',
    flag: '',
  });

  const handleCopyPgp = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.pgpFingerprint);
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-cyber-surface border border-cyber-border rounded-md text-xs font-mono text-cyber-accent">
            <Mail className="w-3.5 h-3.5" />
            <span>COMMUNICATION CHANNELS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-cyber-text tracking-tight">
            Connect & Initiate Secure Transmission
          </h2>
          <p className="text-sm text-cyber-muted max-w-2xl">
            Currently interviewing for Security Engineering, Incident Response, and SOC Analyst internships & junior roles. Encrypted inquiries welcome.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Contact Info & PGP Key */}
          <div className="space-y-6">
            <div className="p-6 bg-cyber-card border border-cyber-border rounded-xl space-y-4">
              <h3 className="font-bold text-cyber-text text-base flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyber-accent" />
                <span>Primary Encrypted Endpoint</span>
              </h3>
              
              <div className="space-y-2 text-xs font-mono">
                <div className="text-cyber-muted">Direct Email:</div>
                <a
                  href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                  className="text-cyber-accent hover:underline text-sm font-semibold block"
                >
                  {PORTFOLIO_DATA.profile.email}
                </a>
                <span className="text-[11px] text-cyber-muted block">
                  Hosted on ProtonMail with end-to-end PGP support.
                </span>
              </div>

              {/* PGP Fingerprint Box */}
              <div className="p-3 bg-cyber-surface rounded-lg border border-cyber-border space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-cyber-muted text-[11px]">
                  <span>PGP FINGERPRINT:</span>
                  <button
                    onClick={handleCopyPgp}
                    className="flex items-center gap-1 text-cyber-cyan hover:text-cyber-text transition-colors"
                  >
                    {copiedPgp ? <Check className="w-3 h-3 text-cyber-accent" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedPgp ? 'Fingerprint Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-cyber-text break-all font-semibold">
                  {PORTFOLIO_DATA.profile.pgpFingerprint}
                </p>
              </div>
            </div>

            {/* External Profiles */}
            <div className="p-6 bg-cyber-card border border-cyber-border rounded-xl space-y-4">
              <h3 className="font-bold text-cyber-text text-sm font-mono">
                EXTERNAL PROFILES & VERIFIED REPOSITORIES
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <a
                  href={PORTFOLIO_DATA.profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-cyber-surface rounded-lg border border-cyber-border hover:border-cyber-accent transition-colors text-cyber-muted hover:text-cyber-text"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4 text-cyber-accent" />
                    <span>GitHub</span>
                  </div>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={PORTFOLIO_DATA.profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-cyber-surface rounded-lg border border-cyber-border hover:border-cyber-cyan transition-colors text-cyber-muted hover:text-cyber-text"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4 text-cyber-cyan" />
                    <span>LinkedIn</span>
                  </div>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={PORTFOLIO_DATA.profile.tryHackMe}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-cyber-surface rounded-lg border border-cyber-border hover:border-cyber-red transition-colors text-cyber-muted hover:text-cyber-text"
                >
                  <span className="text-cyber-red font-bold">TryHackMe</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={PORTFOLIO_DATA.profile.hackTheBox}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-cyber-surface rounded-lg border border-cyber-border hover:border-cyber-accent transition-colors text-cyber-muted hover:text-cyber-text"
                >
                  <span className="text-cyber-accent font-bold">HackTheBox</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Direct Dispatch Message Form */}
          <div className="bg-cyber-card border border-cyber-border rounded-xl p-6 md:p-8 space-y-6">
            <h3 className="font-bold text-cyber-text text-base font-mono">
              TRANSMIT SECURE MESSAGE
            </h3>

            {formSubmitted ? (
              <div className="p-6 bg-cyber-surface rounded-lg border border-cyber-accent text-center space-y-3 font-mono">
                <div className="w-10 h-10 rounded-full bg-cyber-accent/20 border border-cyber-accent text-cyber-accent flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-cyber-accent font-bold text-sm">TRANSMISSION DISPATCHED</h4>
                <p className="text-xs text-cyber-muted max-w-md mx-auto">
                  Your message has been queued. I will review and reply within 24 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs text-cyber-cyan hover:underline pt-2 inline-block"
                >
                  Send another transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-cyber-muted">YOUR NAME / ENTITY *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maya Lin (Recruiting / Security Lead)"
                      className="w-full bg-cyber-surface border border-cyber-border rounded-lg px-3.5 py-2.5 text-cyber-text focus:outline-none focus:border-cyber-accent transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-cyber-muted">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-cyber-surface border border-cyber-border rounded-lg px-3.5 py-2.5 text-cyber-text focus:outline-none focus:border-cyber-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-cyber-muted">SUBJECT</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-cyber-surface border border-cyber-border rounded-lg px-3.5 py-2.5 text-cyber-text focus:outline-none focus:border-cyber-accent transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-cyber-muted">MESSAGE / INQUIRY DETAILS *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe role, project requirements, or security inquiries..."
                    className="w-full bg-cyber-surface border border-cyber-border rounded-lg px-3.5 py-2.5 text-cyber-text focus:outline-none focus:border-cyber-accent transition-colors resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-cyber-muted flex items-center justify-between">
                    <span>SOLVED CTF FLAG (OPTIONAL)</span>
                    <span className="text-[10px] text-cyber-cyan">Found in Terminal?</span>
                  </label>
                  <input
                    type="text"
                    value={formData.flag}
                    onChange={e => setFormData({ ...formData, flag: e.target.value })}
                    placeholder="FLAG{...}"
                    className="w-full bg-cyber-surface border border-cyber-border rounded-lg px-3.5 py-2 text-cyber-text focus:outline-none focus:border-cyber-accent transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-cyber-accent text-cyber-bg font-bold rounded-lg hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Transmission</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
