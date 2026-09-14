import React from 'react';
import { 
  Building2, 
  Coins, 
  Compass, 
  Globe2, 
  Anchor, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  ArrowDown, 
  CheckCircle2, 
  Layers,
  Scale,
  Sparkles
} from 'lucide-react';
import { SourceButton } from '../SourceButton';
import { EvidenceMarker } from './EvidenceMarker';

export const IndiaFinancingEnablers: React.FC = () => {
  return (
    <div className="w-full bg-[#020617]/90 border border-white/10 tech-corner-accent p-5 sm:p-7 space-y-6 font-mono">
      
      {/* 1. Header Section: Visually secondary to the main India Chapter title */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-[#00F2FF] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#00F2FF]" />
              <span>ECOSYSTEM ENABLERS // WHY THIS CAN BECOME BANKABLE</span>
            </span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight">
            WHY THIS CAN BECOME BANKABLE IN INDIA
          </h3>
          <p className="text-xs sm:text-sm text-cyan-300/80 font-normal mt-1">
            An emerging policy + capital ecosystem around maritime decarbonisation
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
          <div className="flex items-center gap-2">
            <EvidenceMarker type="VERIFIED" label="POLICY / FINANCE ECOSYSTEM" inline={true} />
          </div>
          <span className="text-[10px] text-white/40 italic">
            Illustrative institutional integration context
          </span>
        </div>
      </div>

      {/* Narrative Context Note */}
      <p className="text-xs text-white/70 font-normal leading-relaxed max-w-4xl">
        Why could a financing institution participate in SHIPLOOP? Not because government directly funds SHIPLOOP, but because India is systematically developing a comprehensive maritime-finance and green-shipping ecosystem into which SHIPLOOP’s sensor-verified repayment mechanics naturally fit.
      </p>

      {/* 2. Compact Visual Flow Ribbon: INDIA POLICY -> MARITIME CAPITAL -> FINANCING CHANNEL -> SHIPLOOP -> VERIFIED SAVINGS -> REPAYMENT */}
      <div className="p-3 bg-white/[0.02] border border-white/10 rounded-sm">
        <div className="text-[9px] text-[#00F2FF] font-bold uppercase tracking-widest mb-2 flex items-center justify-between">
          <span>ECOSYSTEM CAPITAL CONDUIT</span>
          <span className="text-white/40 text-[9px]">END-TO-END DEPLOYMENT ARCHITECTURE</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-[10px]">
          {/* Step 1: Policy */}
          <div className="p-2 bg-emerald-950/20 border border-emerald-500/30 rounded-sm flex flex-col justify-between">
            <span className="text-[9px] text-emerald-400 font-bold block">01 // POLICY</span>
            <span className="text-white font-bold text-[11px] leading-tight mt-0.5">INDIA POLICY</span>
            <span className="text-[9px] text-emerald-300/70 mt-1">NGSP & MIV 2030</span>
          </div>

          {/* Step 2: Capital */}
          <div className="p-2 bg-sky-950/20 border border-sky-500/30 rounded-sm flex flex-col justify-between">
            <span className="text-[9px] text-sky-400 font-bold block">02 // CAPITAL</span>
            <span className="text-white font-bold text-[11px] leading-tight mt-0.5">MARITIME CAPITAL</span>
            <span className="text-[9px] text-sky-300/70 mt-1">MDF / MIF Pools</span>
          </div>

          {/* Step 3: Channel */}
          <div className="p-2 bg-blue-950/20 border border-blue-500/30 rounded-sm flex flex-col justify-between">
            <span className="text-[9px] text-blue-400 font-bold block">03 // CHANNEL</span>
            <span className="text-white font-bold text-[11px] leading-tight mt-0.5">FINANCING CHANNEL</span>
            <span className="text-[9px] text-blue-300/70 mt-1">SMFCL & Banks</span>
          </div>

          {/* Step 4: SHIPLOOP */}
          <div className="p-2 bg-[#00F2FF]/15 border-2 border-[#00F2FF] rounded-sm shadow-[0_0_12px_rgba(0,242,255,0.2)] flex flex-col justify-between">
            <span className="text-[9px] text-[#00F2FF] font-black block">04 // VEHICLE</span>
            <span className="text-[#00F2FF] font-black text-[11px] leading-tight mt-0.5">SHIPLOOP RETROFIT</span>
            <span className="text-[9px] text-white/80 mt-1">Drydock SPV</span>
          </div>

          {/* Step 5: Savings */}
          <div className="p-2 bg-amber-950/20 border border-amber-500/30 rounded-sm flex flex-col justify-between">
            <span className="text-[9px] text-amber-400 font-bold block">05 // TELEMETRY</span>
            <span className="text-white font-bold text-[11px] leading-tight mt-0.5">VERIFIED SAVINGS</span>
            <span className="text-[9px] text-amber-300/70 mt-1">Class ISO 19030</span>
          </div>

          {/* Step 6: Repayment */}
          <div className="p-2 bg-emerald-950/30 border border-emerald-500/40 rounded-sm flex flex-col justify-between">
            <span className="text-[9px] text-emerald-400 font-bold block">06 // DEBT AMORT</span>
            <span className="text-emerald-400 font-bold text-[11px] leading-tight mt-0.5">REPAYMENT</span>
            <span className="text-[9px] text-emerald-300/70 mt-1">Escrow Priority</span>
          </div>
        </div>
      </div>

      {/* 3. Primary Enabler Grid: 3 Core Pillars (Green Finance/NGSP, MDF/MIF, SMFCL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* PILLAR 1: GREEN FINANCE / NATIONAL GREEN SHIPPING POLICY (4 Cols) */}
        <div className="lg:col-span-4 p-4 sm:p-5 bg-white/[0.02] border border-emerald-500/30 rounded-sm flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wider">
                POLICY ENVIRONMENT
              </span>
              <div className="flex items-center gap-1">
                <EvidenceMarker type="VERIFIED" inline={true} />
                <SourceButton evidenceId="INDIA-NGSP" title="View National Green Shipping Policy reference" />
              </div>
            </div>

            <div>
              <span className="text-[10px] text-emerald-400 font-bold tracking-wider block">
                STATUTORY PILLAR
              </span>
              <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-tight leading-snug">
                GREEN FINANCE
              </h4>
              <div className="text-[11px] text-white/50 uppercase font-medium">
                NATIONAL GREEN SHIPPING POLICY
              </div>
            </div>

            <p className="text-xs text-white/80 font-normal leading-relaxed pt-1">
              Green Finance is established as one of India's National Green Shipping Policy core pillars. This provides the overarching statutory justification for why a green maritime financing product can fit within India's broader decarbonisation direction.
            </p>
          </div>

          <div className="pt-2.5 border-t border-white/10 space-y-1 text-[10px]">
            <div className="flex items-center justify-between text-emerald-300/90 font-medium">
              <span>Policy Scope</span>
              <span>Maritime Decarbonisation</span>
            </div>
            <div className="text-white/40 text-[9px]">
              * Contextual policy environment; does not imply specific approval of individual private schemes.
            </div>
          </div>
        </div>

        {/* PILLAR 2: MARITIME DEVELOPMENT FUND (MDF / MIF) — PROMINENT CARD (5 Cols) */}
        <div className="lg:col-span-5 p-4 sm:p-5 bg-[#00F2FF]/[0.03] border-2 border-[#00F2FF]/40 rounded-sm flex flex-col justify-between space-y-3 shadow-[0_0_20px_rgba(0,242,255,0.08)]">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] px-2 py-0.5 bg-[#00F2FF]/10 border border-[#00F2FF]/50 text-[#00F2FF] font-bold uppercase tracking-wider">
                POTENTIAL CAPITAL ECOSYSTEM
              </span>
              <div className="flex items-center gap-1">
                <EvidenceMarker type="VERIFIED" inline={true} />
                <SourceButton evidenceId="INDIA-MDF" title="View Maritime Development Fund & MIF reference" />
              </div>
            </div>

            <div>
              <div className="text-[10px] text-[#00F2FF] font-bold tracking-wider uppercase">
                LONG-TERM MARITIME CAPITAL
              </div>
              <div className="flex items-baseline justify-between gap-2 flex-wrap mt-0.5">
                <h4 className="text-base sm:text-xl font-black text-white uppercase tracking-tight">
                  MARITIME DEVELOPMENT FUND
                </h4>
                <span className="text-base sm:text-xl font-black text-[#00F2FF] tracking-tight">
                  ₹25,000 Cr
                </span>
              </div>
            </div>

            {/* Nested Sub-Fund Box: Maritime Investment Fund (MIF) */}
            <div className="p-3 bg-white/[0.03] border border-[#00F2FF]/30 rounded-sm space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-white uppercase tracking-wide">
                  MARITIME INVESTMENT FUND (MIF)
                </span>
                <span className="text-xs font-black text-emerald-400">
                  ₹20,000 Cr
                </span>
              </div>
              <p className="text-[11px] text-white/70 font-normal leading-relaxed">
                Long-term maritime capital and blended-finance ecosystem designed to crowd-in commercial debt and equity for green vessel fleet modernization.
              </p>
            </div>

            <p className="text-xs text-white/80 font-normal leading-relaxed">
              Provides an institutional precedent and potential source of maritime investment capital that commercial syndicates can leverage for high-impact vessel retrofits.
            </p>
          </div>

          <div className="pt-2.5 border-t border-white/10 space-y-1 text-[10px]">
            <div className="flex items-center justify-between text-cyan-300 font-medium">
              <span>Ecosystem Role</span>
              <span>Potential Maritime Capital Catalyst</span>
            </div>
            <div className="text-white/40 text-[9px]">
              * Potential capital ecosystem. SHIPLOOP does not claim automatic or guaranteed MDF/MIF allocation.
            </div>
          </div>
        </div>

        {/* PILLAR 3: MARITIME FINANCE CHANNEL (SMFCL) (3 Cols) */}
        <div className="lg:col-span-3 p-4 sm:p-5 bg-white/[0.02] border border-blue-500/30 rounded-sm flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] px-2 py-0.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold uppercase tracking-wider">
                POTENTIAL FINANCING CHANNEL
              </span>
              <div className="flex items-center gap-1">
                <EvidenceMarker type="VERIFIED" inline={true} />
                <SourceButton evidenceId="INDIA-SMFCL" title="View Sagarmala Finance Corporation Limited reference" />
              </div>
            </div>

            <div>
              <span className="text-[10px] text-blue-400 font-bold tracking-wider block">
                DEDICATED CONDUIT
              </span>
              <h4 className="text-sm sm:text-base font-black text-white uppercase tracking-tight leading-snug">
                MARITIME FINANCE CHANNEL
              </h4>
              <div className="text-[10px] text-white/50 uppercase font-medium mt-0.5">
                SAGARMALA FINANCE CORPORATION LIMITED (SMFCL)
              </div>
            </div>

            <p className="text-xs text-white/80 font-normal leading-relaxed pt-1">
              India's dedicated maritime-focused financing institution under MoPSW, establishing a domestic institutional conduit capable of originating and managing specialized maritime loans.
            </p>
          </div>

          <div className="pt-2.5 border-t border-white/10 space-y-1 text-[10px]">
            <div className="flex items-center justify-between text-blue-300 font-medium">
              <span>Channel Nature</span>
              <span>Maritime NBFC Conduit</span>
            </div>
            <div className="text-white/40 text-[9px]">
              * Potential financing channel; does not imply partnership, commitment, or direct funding of SHIPLOOP.
            </div>
          </div>
        </div>

      </div>

      {/* 4. Secondary Row: Supporting Cards (Poseidon Principles, Harit Sagar, IIF Context) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        
        {/* CARD A: POSEIDON PRINCIPLES (International Finance Framework) */}
        <div className="p-4 bg-indigo-950/20 border border-indigo-500/30 rounded-sm flex flex-col justify-between space-y-2.5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold uppercase tracking-wider">
                INTERNATIONAL FINANCE FRAMEWORK
              </span>
              <div className="flex items-center gap-1">
                <EvidenceMarker type="VERIFIED" inline={true} />
                <SourceButton evidenceId="FIN-POSEIDON" title="View Poseidon Principles reference" />
              </div>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-tight">
                POSEIDON PRINCIPLES
              </h4>
              <div className="text-[10px] text-indigo-300 uppercase font-medium">
                CLIMATE-ALIGNED SHIPPING FINANCE
              </div>
            </div>

            <p className="text-xs text-white/70 font-normal leading-relaxed">
              A framework used by participating global financial institutions to assess and track climate alignment of shipping portfolios. Answers why commercial banks care about measurable vessel efficiency: banks need verified carbon trajectory data to meet green lending standards.
            </p>
          </div>

          <div className="pt-2 border-t border-white/10 text-[9px] text-indigo-300/80">
            * Global bank framework — not an Indian government subsidy or funding scheme.
          </div>
        </div>

        {/* CARD B: HARIT SAGAR (Green Port Policy Environment) */}
        <div className="p-4 bg-teal-950/20 border border-teal-500/30 rounded-sm flex flex-col justify-between space-y-2.5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] px-2 py-0.5 bg-teal-500/10 border border-teal-500/30 text-teal-300 font-bold uppercase tracking-wider">
                POLICY TAILWIND
              </span>
              <div className="flex items-center gap-1">
                <EvidenceMarker type="VERIFIED" inline={true} />
                <SourceButton evidenceId="INDIA-HARIT" title="View Harit Sagar Green Port Guidelines reference" />
              </div>
            </div>

            <div>
              <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-tight">
                HARIT SAGAR
              </h4>
              <div className="text-[10px] text-teal-300 uppercase font-medium">
                GREEN PORT POLICY ENVIRONMENT
              </div>
            </div>

            <p className="text-xs text-white/70 font-normal leading-relaxed">
              India's Green Port Guidelines support a broader maritime environmental and emissions-reduction policy direction, providing preferential berth turnaround and green corridor status to cleaner, lower-carbon tonnage.
            </p>
          </div>

          <div className="pt-2 border-t border-white/10 text-[9px] text-teal-300/80">
            * Broad port environmental framework — does not directly finance retrofits or SHIPLOOP.
          </div>
        </div>

        {/* CARD C: IIF — HANDLE CAREFULLY (Contextual Shipyard Support) */}
        <div className="p-4 bg-slate-900/50 border border-white/15 rounded-sm flex flex-col justify-between space-y-2.5">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] px-2 py-0.5 bg-white/5 border border-white/20 text-white/70 font-bold uppercase tracking-wider">
                SUPPORTING CONTEXT // IIF
              </span>
              <div className="flex items-center gap-1">
                <EvidenceMarker type="VERIFIED" inline={true} />
                <SourceButton evidenceId="INDIA-IIF" title="View Interest Incentivization Fund reference" />
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-1">
                <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-tight">
                  INTEREST INCENTIVIZATION FUND
                </h4>
                <span className="text-xs font-bold text-white/90">
                  ₹5,000 Cr
                </span>
              </div>
              <div className="text-[10px] text-white/50 uppercase font-medium">
                MDF SUBSIDIARY MECHANISM
              </div>
            </div>

            <p className="text-xs text-white/70 font-normal leading-relaxed">
              Interest support mechanism within MDF; current official applicability includes loans to Indian shipyards. Illustrates emerging government interest concessions for domestic maritime infrastructure.
            </p>
          </div>

          <div className="pt-2 border-t border-white/10 text-[9px] text-white/50">
            * Contextual reference only. Does not provide a 3% subsidy to SHIPLOOP or change model interest rates.
          </div>
        </div>

      </div>

      {/* 5. Convergence into SHIPLOOP: Visualizing the Transaction Architecture */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-cyan-950/20 via-[#00F2FF]/[0.05] to-emerald-950/20 border border-[#00F2FF]/30 rounded-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
          <span className="text-[10px] font-black text-[#00F2FF] uppercase tracking-widest flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>TRANSACTION LAYER CONVERGENCE</span>
          </span>
          <span className="text-[10px] text-white/50 font-bold">
            POLICY + CAPITAL + FINANCING CHANNEL + MEASURABLE GREEN PERFORMANCE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-[#020617] border border-white/10 rounded-sm space-y-1">
            <span className="text-[9px] text-white/50 font-bold uppercase block">INPUT LAYER</span>
            <div className="text-white font-bold text-xs uppercase">ECOSYSTEM ENABLERS</div>
            <p className="text-[11px] text-white/60 font-normal">
              Policy direction (NGSP), catalytic pools (MDF/MIF), and dedicated conduits (SMFCL) establish capital readiness.
            </p>
          </div>

          <div className="p-3 bg-[#00F2FF]/10 border border-[#00F2FF]/50 rounded-sm space-y-1 shadow-[0_0_10px_rgba(0,242,255,0.15)]">
            <span className="text-[9px] text-[#00F2FF] font-black uppercase block">DEPLOYMENT CONDUIT</span>
            <div className="text-[#00F2FF] font-black text-xs uppercase">SHIPLOOP RETROFIT</div>
            <p className="text-[11px] text-white/80 font-normal">
              Structures bilateral SPV, coordinates Indian shipyard drydock (CSL/Mazagon), and funds equipment upfront.
            </p>
          </div>

          <div className="p-3 bg-[#020617] border border-amber-500/30 rounded-sm space-y-1">
            <span className="text-[9px] text-amber-400 font-bold uppercase block">ASSURANCE LAYER</span>
            <div className="text-white font-bold text-xs uppercase">VERIFIED SAVINGS</div>
            <p className="text-[11px] text-white/60 font-normal">
              Continuous IoT shaft sensors & independent Class certification (ISO 19030 / IRClass) quantify daily bunker cuts.
            </p>
          </div>

          <div className="p-3 bg-[#020617] border border-emerald-500/40 rounded-sm space-y-1">
            <span className="text-[9px] text-emerald-400 font-bold uppercase block">CLOSING CIRCUIT</span>
            <div className="text-emerald-400 font-bold text-xs uppercase">SECURE REPAYMENT</div>
            <p className="text-[11px] text-white/60 font-normal">
              Automated escrow waterfalls service senior debt first; vessel owner retains long-term operational fuel surplus.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Bankability Takeaway Message */}
      <div className="p-4 sm:p-5 bg-white/[0.02] border border-[#00F2FF]/40 rounded-sm relative overflow-hidden">
        <div className="relative z-10 space-y-2 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-[10px] text-[#00F2FF] font-black uppercase tracking-widest">
              THE CORE BANKABILITY TAKEAWAY
            </span>
            <div className="text-[10px] font-bold text-cyan-300 tracking-wider">
              POLICY → CAPITAL → MEASUREMENT → REPAYMENT
            </div>
          </div>

          <p className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
            "SHIPLOOP does not rely on a single subsidy. It connects an emerging maritime-finance ecosystem with measurable retrofit savings."
          </p>

          <p className="text-xs text-white/60 font-normal leading-relaxed">
            Rather than asking whether a bank will arbitrarily risk capital on unproven retrofits, SHIPLOOP builds the underwritable bridge: institutional maritime capital backed by sensor-audited fuel reductions, legal escrow priority, and global green-banking compliance.
          </p>
        </div>
      </div>

    </div>
  );
};
