import React, { useState } from 'react';
import { Terminal, ExternalLink, ShieldAlert, Cpu, ArrowUpRight, Layers } from 'lucide-react';
import { GithubIcon } from './icons/BrandIcons';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Defensive Engineering', 'Offensive Security', 'Cryptography', 'Cloud & Systems'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-cyber-surface border border-cyber-border rounded-md text-xs font-mono text-cyber-accent">
              <Layers className="w-3.5 h-3.5" />
              <span>SECURITY RESEARCH ARTIFACTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyber-text tracking-tight">
              Open-Source Defensive & Offensive Engineering
            </h2>
            <p className="text-sm text-cyber-muted max-w-2xl">
              Systems-level security tools developed to solve real problems: raw socket scanning, Linux eBPF telemetry hooks, zero-trust mutual TLS proxies, and post-quantum encryption.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyber-accent/15 border-cyber-accent text-cyber-accent font-semibold'
                    : 'bg-cyber-surface border-cyber-border text-cyber-muted hover:text-cyber-text hover:border-cyber-borderHover'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project: Project) => (
            <div
              key={project.id}
              className="bg-cyber-card border border-cyber-border rounded-xl p-6 space-y-5 hover:border-cyber-borderHover transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header: Category + Action Links */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-1 bg-cyber-surface border border-cyber-border rounded text-cyber-cyan font-medium">
                    {project.category}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-cyber-surface hover:bg-cyber-border text-cyber-muted hover:text-cyber-text rounded border border-cyber-border transition-colors"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="#terminal"
                      className="p-1.5 bg-cyber-surface hover:bg-cyber-accent hover:text-cyber-bg text-cyber-muted rounded border border-cyber-border transition-colors"
                      title="Simulate in Terminal"
                    >
                      <Terminal className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-lg font-bold text-cyber-text tracking-tight flex items-center gap-2">
                    <span>{project.title}</span>
                  </h3>
                  <p className="text-xs font-mono text-cyber-accent mt-1">
                    {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-cyber-muted leading-relaxed">
                  {project.description}
                </p>

                {/* Architecture Highlights */}
                <div className="p-3 bg-cyber-surface/80 rounded-lg border border-cyber-border space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-cyber-muted uppercase tracking-wider block">
                    ARCHITECTURAL DECISIONS & THREAT MITIGATION:
                  </span>
                  <ul className="space-y-1 text-xs text-cyber-muted pl-3 list-disc">
                    {project.architecture.map((arch, aIdx) => (
                      <li key={aIdx} className="leading-normal">
                        {arch}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom: Tech Stack & MITRE tags */}
              <div className="space-y-3 pt-4 border-t border-cyber-border/70">
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                  <span className="text-cyber-muted mr-1">Stack:</span>
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 bg-cyber-surface border border-cyber-border rounded text-cyber-text"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-cyber-red">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>MITRE: {project.mitreCoverage[0]}</span>
                  </div>

                  <span className="text-cyber-accent font-semibold">
                    {project.metrics[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
