import React from 'react';
import { Award, CheckCircle2, ShieldCheck, GraduationCap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-16 md:py-24 border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-cyber-surface border border-cyber-border rounded-md text-xs font-mono text-cyber-accent">
            <Award className="w-3.5 h-3.5" />
            <span>INDUSTRY CREDENTIALS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-cyber-text tracking-tight">
            Certifications & Academic Foundation
          </h2>
          <p className="text-sm text-cyber-muted max-w-2xl">
            Formal validation of hands-on security skills, ethical hacking methodologies, and rigorous computer science principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-cyber-card border border-cyber-border rounded-xl p-6 space-y-4 hover:border-cyber-borderHover transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {cert.name.includes('B.S.') ? (
                      <GraduationCap className="w-5 h-5 text-cyber-cyan" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-cyber-accent" />
                    )}
                    <span className="font-mono text-xs text-cyber-muted">{cert.issuer}</span>
                  </div>

                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                      cert.status === 'Active'
                        ? 'bg-cyber-accent/10 border-cyber-accent/30 text-cyber-accent'
                        : 'bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan'
                    }`}
                  >
                    {cert.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-cyber-text tracking-tight">
                  {cert.name}
                </h3>

                <p className="text-xs text-cyber-muted leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="pt-3 border-t border-cyber-border/70 flex items-center justify-between text-xs font-mono text-cyber-muted">
                <span>{cert.date}</span>
                <span className="text-cyber-text font-semibold">{cert.credentialId}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
