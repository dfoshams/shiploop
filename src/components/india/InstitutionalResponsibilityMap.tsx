import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  Anchor, 
  ShieldCheck, 
  Cpu, 
  Compass, 
  Coins, 
  Sparkles,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { EvidenceMarker } from './EvidenceMarker';

export const InstitutionalResponsibilityMap: React.FC = () => {
  const [activeRoleIndex, setActiveRoleIndex] = useState<number>(2); // Default to SHIPLOOP

  const roles = [
    {
      id: 'policy',
      title: 'POLICY / GOVERNMENT',
      status: 'VERIFIED' as const,
      evidenceId: 'IND-POL-01',
      icon: Compass,
      coreRole: 'Enabling Policy Environment',
      description: 'Ministry of Ports, Shipping and Waterways (MoPSW) sets green shipping directives, port turnaround decarbonization mandates, and green taxonomy alignment.',
      keyDeliverables: [
        'Harit Nauka green vessel guidelines',
        'Maritime India Vision 2030 targets (30% emission cut)',
        'Sovereign Green Bond priority taxonomy',
      ],
      notResponsibleFor: 'Does not provide direct balance-sheet guarantees or commercial vessel subsidies.',
    },
    {
      id: 'bank',
      title: 'BANK / FUND',
      status: 'PROPOSED' as const,
      evidenceId: 'IND-BNK-01',
      channelType: 'POTENTIAL CHANNEL',
      icon: Building2,
      coreRole: 'Senior Capital Provision',
      description: 'Deploy 100% equipment financing facilities via special purpose conduits, receiving predictable quarterly debt service.',
      keyDeliverables: [
        'Senior secured term loan facility',
        'Competitive green lending interest margin',
        'Credit risk governance & statutory monitoring',
      ],
      notResponsibleFor: 'Does not manage IoT telemetry, verify engineering baselines, or bear vessel operational risk.',
    },
    {
      id: 'shiploop',
      title: 'SHIPLOOP',
      status: 'PROPOSED' as const,
      evidenceId: 'IND-SLP-01',
      icon: Layers,
      coreRole: 'Structuring + Data + Monitoring Orchestrator',
      description: 'The critical missing bridge between high finance and maritime physics. Translates fuel savings into non-recourse debt amortization.',
      keyDeliverables: [
        'Hydrodynamic baseline underwriting model',
        'Closed-loop SPV escrow contract structuring',
        'Continuous 1Hz high-frequency sensor fusion',
        'Automated debt service calculation & sweep',
      ],
      notResponsibleFor: 'Does not act as a deposit-taking bank or provide balance-sheet equity.',
    },
    {
      id: 'shipowner',
      title: 'SHIPOWNER',
      status: 'VERIFIED' as const,
      evidenceId: 'IND-OWN-01',
      icon: Anchor,
      coreRole: 'Vessel Asset & Operations',
      description: 'Provides candidate merchant vessels, operates vessels on commercial trade routes, and maintains technical seaworthiness.',
      keyDeliverables: [
        'Vessel access for drydock installation',
        'Standard vessel crew execution & bunkering',
        'Retains 100% long-term asset value and residual fuel savings',
      ],
      notResponsibleFor: 'Does not provide upfront cash CAPEX or pledge vessel hull as junior collateral.',
    },
    {
      id: 'tech-provider',
      title: 'TECH PROVIDER',
      status: 'VERIFIED' as const,
      evidenceId: 'IND-OEM-01',
      icon: Cpu,
      coreRole: 'Retrofit Engineering & Hardware',
      description: 'Supplies certified marine energy efficiency systems (air lubrication, wind propulsion, hydrodynamic boss cap fins).',
      keyDeliverables: [
        'Hardware manufacturing & delivery to drydock',
        'Engineering supervision & drydock commissioning',
        'Equipment performance guarantees & spare parts',
      ],
      notResponsibleFor: 'Does not finance vessel owners or underwrite credit risks.',
    },
    {
      id: 'verifier',
      title: 'INDEPENDENT VERIFIER',
      status: 'VERIFIED' as const,
      evidenceId: 'IND-CLS-01',
      icon: ShieldCheck,
      coreRole: 'Savings Verification & Class Audit',
      description: 'IACS classification societies (such as Indian Register of Shipping - IRClass) provide neutral baseline testing and algorithmic telemetry audit.',
      keyDeliverables: [
        'Pre/post retrofit sea-trial certification',
        'ISO 19030 speed-power index normalization',
        'Cryptographic audit reports for lending institutions',
      ],
      notResponsibleFor: 'Does not participate in financial distributions or debt servicing.',
    },
    {
      id: 'charterer',
      title: 'CHARTERER',
      status: 'PROPOSED' as const,
      evidenceId: 'IND-CHT-01',
      icon: Coins,
      coreRole: 'Fuel Economics & Savings Sharing',
      description: 'Under time charters, charterer purchases fuel and shares a pre-agreed portion of fuel savings through standardized BIMCO transition clauses.',
      keyDeliverables: [
        'Fuel bunker procurement & voyage execution',
        'Contractual savings-sharing compliance',
        'Lower net operational voyage expense',
      ],
      notResponsibleFor: 'Does not finance vessel capital improvements.',
    },
  ];

  const activeRole = roles[activeRoleIndex];

  return (
    <div className="w-full bg-[#020617]/90 border border-white/10 tech-corner-accent p-5 sm:p-7 space-y-6 font-mono">
      
      {/* Central Hero Statement (Requirement 14) */}
      <div className="p-6 bg-gradient-to-r from-sky-950/30 via-[#00F2FF]/10 to-emerald-950/30 border-2 border-[#00F2FF]/50 rounded-sm text-center space-y-3">
        <span className="text-xs font-bold text-[#00F2FF] uppercase tracking-widest block">
          SHIPLOOP’S UNIQUE ECOSYSTEM POSITION
        </span>
        <h2 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
          "SHIPLOOP DOES NOT NEED TO REPLACE THE BANK."
        </h2>
        <p className="text-xs sm:text-sm text-white/70 max-w-3xl mx-auto font-normal leading-relaxed">
          Traditional banks have massive low-cost capital, but lack maritime sensor telemetry to underwrite fuel savings. SHIPLOOP orchestrates the missing data and contractual trust.
        </p>

        {/* 5-Pillar Synchronized Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-3">
          <div className="p-2.5 bg-white/5 border border-white/15 rounded-sm">
            <span className="text-[10px] text-sky-400 font-bold block uppercase">BANK</span>
            <span className="text-xs font-black text-white">PROVIDES CAPITAL</span>
          </div>
          <div className="p-2.5 bg-[#00F2FF]/20 border border-[#00F2FF] rounded-sm shadow-[0_0_12px_rgba(0,242,255,0.3)]">
            <span className="text-[10px] text-[#00F2FF] font-black block uppercase">SHIPLOOP</span>
            <span className="text-xs font-black text-white">MAKES SAVINGS BANKABLE</span>
          </div>
          <div className="p-2.5 bg-white/5 border border-white/15 rounded-sm">
            <span className="text-[10px] text-emerald-400 font-bold block uppercase">VERIFIER</span>
            <span className="text-xs font-black text-white">MAKES SAVINGS CREDIBLE</span>
          </div>
          <div className="p-2.5 bg-white/5 border border-white/15 rounded-sm">
            <span className="text-[10px] text-purple-400 font-bold block uppercase">SHIPOWNER</span>
            <span className="text-xs font-black text-white">CREATES ASSET OPPORTUNITY</span>
          </div>
          <div className="p-2.5 bg-white/5 border border-white/15 rounded-sm col-span-2 sm:col-span-1">
            <span className="text-[10px] text-amber-400 font-bold block uppercase">TECHNOLOGY</span>
            <span className="text-xs font-black text-white">CREATES EFFICIENCY GAIN</span>
          </div>
        </div>
      </div>

      {/* Institutional Responsibility Map Header (Requirement 13) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div>
          <span className="text-[10px] text-[#00F2FF] font-bold uppercase tracking-widest">
            STAKEHOLDER GOVERNANCE MATRIX
          </span>
          <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
            WHO DOES WHAT? — RESPONSIBILITY ARCHITECTURE
          </h3>
        </div>
        <span className="text-[10px] text-white/50">
          Click any stakeholder below to inspect role definitions
        </span>
      </div>

      {/* Stakeholder Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {roles.map((r, idx) => {
          const isSelected = activeRoleIndex === idx;
          const Icon = r.icon;
          return (
            <button
              key={r.id}
              onClick={() => setActiveRoleIndex(idx)}
              className={`p-2.5 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#00F2FF] bg-[#00F2FF]/15 shadow-[0_0_12px_rgba(0,242,255,0.3)]'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#00F2FF]' : 'text-white/40'}`} />
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#00F2FF]' : 'bg-white/20'}`} />
              </div>
              <div className="text-[11px] font-bold text-white uppercase truncate">{r.title.split('/')[0]}</div>
              <div className="text-[9px] text-white/50 truncate mt-0.5">{r.coreRole.split(' ')[0]}</div>
            </button>
          );
        })}
      </div>

      {/* Selected Stakeholder Detail Card */}
      <div className="p-5 bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00F2FF]/10 text-[#00F2FF] border border-[#00F2FF]/30 rounded-sm">
              <activeRole.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white uppercase">{activeRole.title}</span>
                <EvidenceMarker type={activeRole.status} id={activeRole.evidenceId} inline={true} />
              </div>
              <span className="text-xs text-[#00F2FF] font-bold block">{activeRole.coreRole}</span>
            </div>
          </div>

          {activeRole.channelType && (
            <span className="text-[9px] px-2 py-0.5 bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold uppercase self-start sm:self-auto">
              POTENTIAL CHANNEL / ILLUSTRATIVE
            </span>
          )}
        </div>

        <p className="text-xs text-white/80 font-normal leading-relaxed">
          {activeRole.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Key Deliverables */}
          <div className="space-y-2">
            <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider block">
              PRIMARY RESPONSIBILITIES & DELIVERABLES:
            </span>
            <div className="space-y-1.5 text-xs text-white/70">
              {activeRole.keyDeliverables.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scope Boundaries */}
          <div className="p-3 bg-white/[0.02] border border-white/10 space-y-1.5 self-start text-xs">
            <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider block">
              ORGANIZATIONAL BOUNDARY:
            </span>
            <p className="text-white/60 font-normal leading-relaxed text-[11px]">
              {activeRole.notResponsibleFor}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
