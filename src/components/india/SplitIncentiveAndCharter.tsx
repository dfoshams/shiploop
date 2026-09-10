import React, { useState } from 'react';
import { 
  GitCompare, 
  Anchor, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  ArrowDown, 
  Coins, 
  Scale, 
  Check,
  FileSignature
} from 'lucide-react';
import { EvidenceMarker } from './EvidenceMarker';

interface SplitIncentiveAndCharterProps {
  onCharterModeChange?: (mode: 'VOYAGE' | 'TIME_CHARTER') => void;
  currentCharterMode?: 'VOYAGE' | 'TIME_CHARTER';
}

export const SplitIncentiveAndCharter: React.FC<SplitIncentiveAndCharterProps> = ({
  onCharterModeChange,
  currentCharterMode = 'VOYAGE',
}) => {
  const [charterMode, setCharterMode] = useState<'VOYAGE' | 'TIME_CHARTER'>(currentCharterMode);

  const handleToggle = (mode: 'VOYAGE' | 'TIME_CHARTER') => {
    setCharterMode(mode);
    if (onCharterModeChange) {
      onCharterModeChange(mode);
    }
  };

  return (
    <div className="w-full bg-[#020617]/90 border border-white/10 tech-corner-accent p-5 sm:p-7 space-y-6 font-mono">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] text-[#00F2FF] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Scale className="w-3 h-3 text-[#00F2FF]" />
            <span>CONTRACTUAL ARCHITECTURE & MARITIME INCENTIVES</span>
          </span>
          <h3 className="text-base sm:text-xl font-black text-white uppercase tracking-tight mt-0.5">
            RESOLVING THE SPLIT-INCENTIVE IN INDIAN SHIPPING
          </h3>
        </div>

        {/* Interactive Charter Toggle */}
        <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/20 rounded-sm self-start sm:self-auto">
          <button
            onClick={() => handleToggle('VOYAGE')}
            className={`px-3 py-1.5 text-xs uppercase font-bold transition-all cursor-pointer ${
              charterMode === 'VOYAGE'
                ? 'bg-[#00F2FF] text-black shadow-[0_0_12px_rgba(0,242,255,0.4)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            VOYAGE CHARTER
          </button>
          <button
            onClick={() => handleToggle('TIME_CHARTER')}
            className={`px-3 py-1.5 text-xs uppercase font-bold transition-all cursor-pointer ${
              charterMode === 'TIME_CHARTER'
                ? 'bg-[#00F2FF] text-black shadow-[0_0_12px_rgba(0,242,255,0.4)]'
                : 'text-white/60 hover:text-white'
            }`}
          >
            TIME CHARTER
          </button>
        </div>
      </div>

      {/* The Split Incentive Diagnostic */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Shipowner */}
        <div className="p-4 bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-400 uppercase flex items-center gap-1.5">
              <Anchor className="w-3.5 h-3.5" /> SHIPOWNER
            </span>
            <span className="text-[9px] text-white/40 uppercase">ASSET OWNER</span>
          </div>
          <div className="text-sm font-bold text-white uppercase">Wants lower CAPEX burden</div>
          <p className="text-[11px] text-white/60 font-normal leading-relaxed">
            Reluctant to add ₹8–15 Cr debt onto balance sheet for retrofits when future fuel savings may be captured by third-party charterers.
          </p>
          <div className="text-[10px] text-purple-300 font-bold">→ Needs 100% Non-Recourse Retrofit</div>
        </div>

        {/* Charterer */}
        <div className="p-4 bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5" /> CHARTERER
            </span>
            <span className="text-[9px] text-white/40 uppercase">BUNKER PAYER</span>
          </div>
          <div className="text-sm font-bold text-white uppercase">May benefit from lower fuel burn</div>
          <p className="text-[11px] text-white/60 font-normal leading-relaxed">
            Under time charters, charterer purchases fuel directly. They welcome efficiency gains but won't co-finance shipowner's permanent hardware.
          </p>
          <div className="text-[10px] text-amber-300 font-bold">→ Fuel Savings Realized at Sea</div>
        </div>

        {/* Bank */}
        <div className="p-4 bg-white/[0.02] border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400 uppercase flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> BANK / LENDER
            </span>
            <span className="text-[9px] text-white/40 uppercase">POTENTIAL CHANNEL</span>
          </div>
          <div className="text-sm font-bold text-white uppercase">Needs predictable debt service</div>
          <p className="text-[11px] text-white/60 font-normal leading-relaxed">
            Must guarantee cashflow recovery independent of volatile shipping spot markets or charter party disputes.
          </p>
          <div className="text-[10px] text-sky-300 font-bold">→ Demands Audited Repayment Security</div>
        </div>

      </div>

      {/* Central Breakthrough Banner */}
      <div className="p-4 bg-[#00F2FF]/10 border border-[#00F2FF]/40 text-center space-y-1">
        <div className="text-xs font-bold text-[#00F2FF] uppercase tracking-widest">
          THE COORDINATION BREAKTHROUGH
        </div>
        <div className="text-base sm:text-lg font-black text-white tracking-wide uppercase">
          "SHIPLOOP CONVERTS OPERATIONAL SAVINGS INTO A STRUCTURED REPAYMENT STREAM."
        </div>
      </div>

      {/* Dynamic Contract Structure Diagram based on Toggle */}
      <div className="p-5 bg-white/[0.02] border border-white/10 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase">
              CONTRACTUAL CASHFLOW: {charterMode === 'VOYAGE' ? 'VOYAGE CHARTER' : 'TIME CHARTER (WITH SAVINGS-SHARING CLAUSE)'}
            </span>
            <EvidenceMarker type="PROPOSED" label="PROPOSED CONTRACT STRUCTURE" />
          </div>
          <span className="text-[10px] text-[#00F2FF] font-bold">
            {charterMode === 'VOYAGE' ? 'DIRECT OWNER FUEL SAVINGS' : 'BIMCO GREEN CLAUSE SHARING'}
          </span>
        </div>

        {charterMode === 'VOYAGE' ? (
          /* VOYAGE CHARTER SCHEMATIC */
          <div className="space-y-4">
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              In a <span className="text-[#00F2FF] font-bold">Voyage Charter</span>, the <span className="text-purple-400 font-bold">Shipowner</span> purchases fuel directly. Fuel savings directly reduce owner operating expenditures, creating an uncomplicated, direct repayment stream.
            </p>

            <div className="p-4 bg-[#020617] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
              <div className="p-3 bg-purple-950/30 border border-purple-500/40 rounded-sm w-full md:w-1/4">
                <span className="text-xs font-bold text-white block uppercase">SHIPOWNER</span>
                <span className="text-[10px] text-purple-300">Bears direct fuel cost</span>
              </div>
              <ArrowRight className="w-5 h-5 text-[#00F2FF] hidden md:block" />
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-sm w-full md:w-1/4">
                <span className="text-xs font-bold text-white block uppercase">FUEL SAVINGS</span>
                <span className="text-[10px] text-emerald-300">Directly benefits owner P&L</span>
              </div>
              <ArrowRight className="w-5 h-5 text-[#00F2FF] hidden md:block" />
              <div className="p-3 bg-[#00F2FF]/15 border border-[#00F2FF]/50 rounded-sm w-full md:w-1/4">
                <span className="text-xs font-bold text-[#00F2FF] block uppercase">ESCROW REPAYMENT</span>
                <span className="text-[10px] text-white/70">Sweeps debt service</span>
              </div>
              <ArrowRight className="w-5 h-5 text-[#00F2FF] hidden md:block" />
              <div className="p-3 bg-sky-950/30 border border-sky-500/40 rounded-sm w-full md:w-1/4">
                <span className="text-xs font-bold text-white block uppercase">BANK AMORTIZED</span>
                <span className="text-[10px] text-sky-300">Scheduled principal + interest</span>
              </div>
            </div>
          </div>
        ) : (
          /* TIME CHARTER SCHEMATIC (Split Incentive Solved) */
          <div className="space-y-4">
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              In a <span className="text-[#00F2FF] font-bold">Time Charter</span>, the <span className="text-amber-400 font-bold">Charterer</span> pays fuel bills. SHIPLOOP introduces a standardized savings-sharing clause: charterer passes through a fraction of fuel savings to service the retrofit debt, keeping the remainder as net operational gain.
            </p>

            <div className="p-4 bg-[#020617] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-3 text-center">
              <div className="p-3 bg-amber-950/30 border border-amber-500/40 rounded-sm w-full md:w-1/5">
                <span className="text-xs font-bold text-white block uppercase">CHARTERER</span>
                <span className="text-[10px] text-amber-300">Purchases bunker fuel</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#00F2FF] hidden md:block" />
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-sm w-full md:w-1/5">
                <span className="text-xs font-bold text-white block uppercase">FUEL SAVINGS</span>
                <span className="text-[10px] text-emerald-300">Lower bunker burn</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#00F2FF] hidden md:block" />
              <div className="p-3 bg-amber-500/15 border-2 border-amber-400 rounded-sm w-full md:w-1/5 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <span className="text-xs font-black text-amber-300 block uppercase">SAVINGS SHARING CLAUSE</span>
                <span className="text-[9px] text-white/80">BIMCO Transition Standard</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#00F2FF] hidden md:block" />
              <div className="p-3 bg-[#00F2FF]/15 border border-[#00F2FF]/50 rounded-sm w-full md:w-1/5">
                <span className="text-xs font-bold text-[#00F2FF] block uppercase">SHIPLOOP REPAYMENT</span>
                <span className="text-[10px] text-white/70">Verified debt share</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#00F2FF] hidden md:block" />
              <div className="p-3 bg-sky-950/30 border border-sky-500/40 rounded-sm w-full md:w-1/5">
                <span className="text-xs font-bold text-white block uppercase">BANK AMORTIZED</span>
                <span className="text-[10px] text-sky-300">Zero default risk</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
              <span>RESULT: Charterer pays less fuel than baseline, Owner gains upgraded vessel with zero equity, Bank receives timely amortisation.</span>
              <span className="font-bold uppercase text-[10px]">WIN • WIN • WIN</span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
