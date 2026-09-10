import React, { useState } from 'react';
import { 
  Milestone, 
  CheckCircle2, 
  ArrowRight, 
  Anchor, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { EvidenceMarker } from './EvidenceMarker';

export const IndiaDeploymentPhases: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);

  const phases = [
    {
      phase: 'PHASE 01',
      title: 'PILOT PROOF OF VALUE',
      timeline: 'MONTHS 01 – 12',
      vessels: '2 – 3 Vessels',
      capital: '₹20 – 30 Cr',
      focus: 'Small cohort of commercial vessels + high-confidence retrofit technologies (e.g. ALS & Propeller Boss Cap Fins) drydocked at Cochin Shipyard (CSL).',
      deliverables: [
        'Baseline sea trials certified by IRClass',
        'Coriolis mass flow & torque telemetry integration',
        'Automated escrow account operationalization',
      ],
      color: '#00F2FF',
    },
    {
      phase: 'PHASE 02',
      title: 'BANKING VALIDATION',
      timeline: 'MONTHS 12 – 24',
      vessels: '10 – 15 Vessels',
      capital: '₹120 – 150 Cr',
      focus: 'Demonstrate real-world verified fuel savings and flawless scheduled debt service recovery across full monsoon & seasonal sailing cycles.',
      deliverables: [
        '12 months uninterrupted quarterly debt servicing',
        'Verification of P90 savings capture >15%',
        'Publication of audited Class verification whitepaper',
      ],
      color: '#38BDF8',
    },
    {
      phase: 'PHASE 03',
      title: 'GREEN FINANCE SCALE',
      timeline: 'MONTHS 24 – 42',
      vessels: '40 – 60 Vessels',
      capital: '₹400 – 600 Cr',
      focus: 'Expand financing syndication through participating Indian financial institutions, multilateral climate funds, and green bond tranches.',
      deliverables: [
        'Syndicated lending facility with participating green lenders',
        'Multi-technology qualification (Rotor sails, ALS, hull coatings)',
        'Standardized BIMCO green charter covenants adopted',
      ],
      color: '#10B981',
    },
    {
      phase: 'PHASE 04',
      title: 'NATIONAL RETROFIT PLATFORM',
      timeline: 'MONTHS 42+',
      vessels: '200+ Vessels',
      capital: '₹2,000+ Cr',
      focus: 'Standardized national financing, verification, technology, and data infrastructure transforming India into the Indian Ocean green retrofit capital.',
      deliverables: [
        'Institutional green maritime securitization (ABS)',
        'Direct integration with Sagarmala and Harit Nauka portals',
        'Nationwide drydock retrofit slots across all major ports',
      ],
      color: '#A855F7',
    },
  ];

  return (
    <div className="w-full bg-[#020617]/90 border border-white/10 tech-corner-accent p-5 sm:p-7 space-y-6 font-mono">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] text-[#00F2FF] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Milestone className="w-3.5 h-3.5 text-[#00F2FF]" />
            <span>COMMERCIAL EXPANSION ROADMAP</span>
          </span>
          <h3 className="text-base sm:text-xl font-black text-white uppercase tracking-tight mt-0.5">
            INDIA DEPLOYMENT PHASES
          </h3>
        </div>

        <EvidenceMarker type="PROPOSED" label="PROPOSED DEPLOYMENT ROADMAP" />
      </div>

      {/* 4 Phase Horizontal Timeline Progression */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {phases.map((ph, idx) => {
          const isSelected = activePhaseIndex === idx;
          return (
            <div
              key={ph.phase}
              onClick={() => setActivePhaseIndex(idx)}
              className={`p-4 border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-[#00F2FF] bg-[#00F2FF]/15 shadow-[0_0_20px_rgba(0,242,255,0.3)]'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-[#00F2FF] uppercase">{ph.phase}</span>
                  <span className="text-[9px] text-white/40 font-bold">{ph.timeline}</span>
                </div>
                <h4 className="text-sm font-black text-white uppercase tracking-tight leading-tight">
                  {ph.title}
                </h4>
                <div className="mt-2 text-[11px] font-bold text-emerald-400">
                  {ph.vessels} • {ph.capital}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-white/50 truncate">
                {ph.focus}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Phase Deep Dive */}
      <div className="p-5 bg-white/[0.02] border border-white/10 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white uppercase">
              {phases[activePhaseIndex].phase}: {phases[activePhaseIndex].title}
            </span>
            <span className="text-[10px] text-white/50">({phases[activePhaseIndex].timeline})</span>
          </div>
          <span className="text-xs font-bold text-[#00F2FF]">
            TARGET: {phases[activePhaseIndex].vessels} ({phases[activePhaseIndex].capital})
          </span>
        </div>

        <p className="text-xs text-white/80 font-normal leading-relaxed">
          {phases[activePhaseIndex].focus}
        </p>

        <div className="pt-2">
          <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider block mb-2">
            KEY MILESTONES & DELIVERABLES:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-white/70">
            {phases[activePhaseIndex].deliverables.map((item, i) => (
              <div key={i} className="p-2.5 bg-[#020617] border border-white/10 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
