import React from 'react';
import { Compass, ShieldCheck, ArrowDown, FileText, Globe2, AlertCircle } from 'lucide-react';
import { EvidenceMarker } from './EvidenceMarker';

export const IndianPolicyLayer: React.FC = () => {
  return (
    <div className="w-full bg-[#020617]/90 border border-white/10 tech-corner-accent p-5 sm:p-7 space-y-6 font-mono">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-[10px] text-[#00F2FF] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#00F2FF]" />
            <span>POLICY ANCHORAGE & STATUTORY ALIGNMENT</span>
          </span>
          <h3 className="text-base sm:text-xl font-black text-white uppercase tracking-tight mt-0.5">
            INDIAN POLICY LAYER & STATUTORY CONTEXT
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <EvidenceMarker type="VERIFIED" label="VERIFIED POLICY FRAMEWORK" source="MoPSW Maritime India Vision 2030" />
        </div>
      </div>

      <p className="text-xs text-white/70 font-normal leading-relaxed">
        SHIPLOOP does not invent new government mandates. The platform is purpose-engineered to operationalize India's active national green shipping targets, converting high-level policy intent into bankable asset-level cashflow structures.
      </p>

      {/* 4-Tier Policy to SHIPLOOP Cascade Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        
        {/* Tier 1: India's Green Shipping Policy */}
        <div className="p-4 bg-emerald-950/20 border border-emerald-500/40 rounded-sm space-y-2 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-emerald-400 font-bold">LEVEL 01</span>
              <EvidenceMarker type="VERIFIED" inline={true} />
            </div>
            <h4 className="text-xs font-bold text-white uppercase">
              INDIA'S GREEN SHIPPING POLICY
            </h4>
            <p className="text-[11px] text-white/60 font-normal leading-relaxed">
              Maritime India Vision 2030 and Harit Nauka guidelines mandate 30% carbon cuts, zero-emission harbor crafts, and CII rating compliance across Indian-flagged fleets.
            </p>
          </div>
          <div className="pt-2 border-t border-white/10 text-[10px] text-emerald-400">
            Source: MoPSW (2024)
          </div>
        </div>

        {/* Tier 2: Green Finance Directives */}
        <div className="p-4 bg-sky-950/20 border border-sky-500/40 rounded-sm space-y-2 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-sky-400 font-bold">LEVEL 02</span>
              <EvidenceMarker type="VERIFIED" inline={true} />
            </div>
            <h4 className="text-xs font-bold text-white uppercase">
              GREEN FINANCE WINDOWS
            </h4>
            <p className="text-[11px] text-white/60 font-normal leading-relaxed">
              Sovereign Green Bonds framework and RBI climate risk guidelines encourage domestic development lenders (IREDA, NaBFID) to mobilize capital into green infrastructure.
            </p>
          </div>
          <div className="pt-2 border-t border-white/10 text-[10px] text-sky-400">
            Priority ESG Lending
          </div>
        </div>

        {/* Tier 3: Financing Framework */}
        <div className="p-4 bg-amber-950/20 border border-amber-500/40 rounded-sm space-y-2 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-amber-400 font-bold">LEVEL 03</span>
              <EvidenceMarker type="PROPOSED" inline={true} />
            </div>
            <h4 className="text-xs font-bold text-white uppercase">
              MARITIME FINANCING FRAMEWORK
            </h4>
            <p className="text-[11px] text-white/60 font-normal leading-relaxed">
              Proposed pay-as-you-save maritime conduit translating vessel fuel savings into senior debt amortization without balance-sheet encumbrance for shipowners.
            </p>
          </div>
          <div className="pt-2 border-t border-white/10 text-[10px] text-amber-300">
            <EvidenceMarker type="EVIDENCE_REQUIRED" label="EVIDENCE REQUIRED" inline={true} />
          </div>
        </div>

        {/* Tier 4: SHIPLOOP Execution */}
        <div className="p-4 bg-[#00F2FF]/10 border-2 border-[#00F2FF] rounded-sm space-y-2 flex flex-col justify-between shadow-[0_0_15px_rgba(0,242,255,0.2)]">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#00F2FF] font-black">LEVEL 04</span>
              <EvidenceMarker type="PROPOSED" inline={true} />
            </div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              SHIPLOOP ORCHESTRATION
            </h4>
            <p className="text-[11px] text-white/70 font-normal leading-relaxed">
              Provides the technological oracle, continuous fuel telemetry, SPV escrow mechanics, and independent Class verification to make the savings bankable.
            </p>
          </div>
          <div className="pt-2 border-t border-white/10 text-[10px] text-[#00F2FF] font-bold">
            Execution Platform
          </div>
        </div>

      </div>

    </div>
  );
};
