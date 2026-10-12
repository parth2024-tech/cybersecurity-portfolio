import React from 'react';
import { Crosshair, Shield, Lock, Award, Terminal, Cpu, CheckCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const SkillsArsenal: React.FC = () => {
  const getCategoryIcon = (title: string) => {
    if (title.includes('Offensive')) return <Crosshair className="w-5 h-5 text-cyber-red" />;
    if (title.includes('Defensive')) return <Shield className="w-5 h-5 text-cyber-accent" />;
    return <Lock className="w-5 h-5 text-cyber-cyan" />;
  };

  return (
    <section id="skills" className="py-16 md:py-24 border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-cyber-surface border border-cyber-border rounded-md text-xs font-mono text-cyber-cyan">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-cyber-text tracking-tight">
            Security Toolset, Exploitation & Defense Arsenal
          </h2>
          <p className="text-sm text-cyber-muted max-w-2xl">
            Proficiencies across red teaming methodologies, enterprise blue team detection engineering, Linux kernel internals, and applied post-quantum cryptography.
          </p>
        </div>

        {/* 3 Main Skill Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="bg-cyber-card border border-cyber-border rounded-xl p-6 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-cyber-border pb-4">
                  <div className="p-2 bg-cyber-surface rounded-lg border border-cyber-border">
                    {getCategoryIcon(category.title)}
                  </div>
                  <div>
                    <h3 className="font-bold text-cyber-text text-sm">
                      {category.title}
                    </h3>
                    <span className="text-[11px] font-mono text-cyber-muted">
                      {category.skills.length} core domains
                    </span>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-cyber-text font-medium">{skill.name}</span>
                        <span className="text-cyber-accent text-[11px]">{skill.proficiency}%</span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-cyber-surface h-1.5 rounded-full overflow-hidden border border-cyber-border/40">
                        <div
                          className="bg-cyber-accent h-full rounded-full transition-all"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>

                      <p className="text-[11px] text-cyber-muted font-sans leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag */}
              <div className="pt-4 border-t border-cyber-border text-[11px] font-mono text-cyber-muted flex items-center justify-between">
                <span>Domain Verification:</span>
                <span className="text-cyber-accent font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Lab Verified</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTF Ranking & Practical Competitions Strip */}
        <div className="bg-cyber-surface/60 border border-cyber-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-cyber-border pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-cyber-amber" />
              <h3 className="font-bold text-cyber-text text-sm font-mono">
                COMPETITIVE CYBERSECURITY & CTF PERFORMANCE
              </h3>
            </div>
            <span className="text-xs font-mono text-cyber-muted">
              Live Verified Profiles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO_DATA.ctfAchievements.map((ach, idx) => (
              <div key={idx} className="p-3 bg-cyber-card rounded-lg border border-cyber-border space-y-1">
                <span className="text-xs font-mono font-bold text-cyber-cyan block">
                  {ach.platform}
                </span>
                <div className="text-sm font-bold text-cyber-text">{ach.rank}</div>
                <div className="text-xs font-mono text-cyber-accent">{ach.percent}</div>
                <p className="text-[11px] text-cyber-muted pt-1 leading-normal">
                  {ach.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
