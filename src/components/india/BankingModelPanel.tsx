import React, { useState } from 'react';
import { 
  Building2, 
  Layers, 
  Anchor, 
  ShieldCheck, 
  Cpu, 
  Lock, 
  ArrowDown, 
  ShieldAlert,
  Coins,
  FileCheck2,
  Scale,
  Sparkles
} from 'lucide-react';
import { EvidenceMarker } from './EvidenceMarker';

export const BankingModelPanel: React.FC = () => {
  const [includeFirstLossReserve, setIncludeFirstLossReserve] = useState<boolean>(true);

  return (
    <div className="w-full space-y-6 font-mono">
      
      {/* 2-Column Grid: Left is "HOW THE BANK PARTICIPATES" Tree, Right is "PROPOSED FINANCING STACK" */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: HOW THE BANK PARTICIPATES (7 Cols) */}
        <div className="lg:col-span-7 bg-[#020617]/90 border border-white/10 tech-corner-accent p-5 sm:p-6 space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] text-[#00F2FF] font-bold uppercase tracking-widest">
                INSTITUTIONAL INTEGRATION MODEL
              </span>
              <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                HOW THE BANK PARTICIPATES
              </h3>
            </div>
            <EvidenceMarker type="PROPOSED" label="PROPOSED BANKING PROTOCOL" />
          </div>

          <p className="text-xs text-white/60 font-normal leading-relaxed">
            SHIPLOOP does not replace commercial or development banks. Instead, the platform creates an underwritable, sensor-audited conduit enabling banks to deploy capital into maritime retrofits with verified repayment certainty.
          </p>

          {/* Institutional Tree Hierarchy */}
          <div className="space-y-4 pt-1">
            
            {/* 1. BANK Node */}
            <div className="p-4 bg-sky-950/20 border border-sky-500/40 rounded-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <Building2 className="w-4 h-4" />
                  <span>BANK / FINANCING VEHICLE</span>
                </div>
                <span className="text-[9px] px-2 py-0.5 bg-sky-500/10 border border-sky-500/30 text-sky-300 font-bold uppercase">
                  POTENTIAL CHANNEL
                </span>
              </div>
              
              <div className="pl-6 border-l-2 border-sky-500/30 space-y-1.5 text-xs text-white/80 font-normal">
                <div className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">├──</span>
                  <span>Provides 100% retrofit equipment financing facility</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">├──</span>
                  <span>Receives priority structured repayment from dedicated savings escrow</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">├──</span>
                  <span>Uses verified fuel savings as underlying repayment security basis</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">└──</span>
                  <span>Retains credit/security protections defined by the financing structure (DSRF & asset mortgage)</span>
                </div>
              </div>
            </div>

            {/* 2. SHIPLOOP Node */}
            <div className="p-4 bg-[#00F2FF]/5 border border-[#00F2FF]/40 rounded-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#00F2FF] font-bold text-sm">
                  <Layers className="w-4 h-4" />
                  <span>SHIPLOOP (ORCHESTRATION & TELEMETRY LAYER)</span>
                </div>
                <EvidenceMarker type="PROPOSED" inline={true} />
              </div>

              <div className="pl-6 border-l-2 border-[#00F2FF]/30 space-y-1.5 text-xs text-white/80 font-normal">
                <div className="flex items-start gap-2">
                  <span className="text-[#00F2FF] font-bold">├──</span>
                  <span>Structures SPV transaction & bilateral green-charter covenants</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#00F2FF] font-bold">├──</span>
                  <span>Calculates projected baseline savings via hydrodynamic models</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#00F2FF] font-bold">├──</span>
                  <span>Tracks continuous IoT sensor performance (shaft power & fuel mass flow)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#00F2FF] font-bold">├──</span>
                  <span>Coordinates independent Class verification (ISO 19030)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#00F2FF] font-bold">└──</span>
                  <span>Calculates & executes automated escrow debt repayment</span>
                </div>
              </div>
            </div>

            {/* 3. Operational Partners Triad */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              
              {/* Shipowner */}
              <div className="p-3 bg-white/[0.02] border border-white/10 rounded-sm space-y-1.5">
                <div className="flex items-center gap-1.5 text-purple-400 font-bold text-xs">
                  <Anchor className="w-3.5 h-3.5" />
                  <span>SHIPOWNER</span>
                </div>
                <div className="text-[11px] text-white/70 space-y-1">
                  <div>• Receives retrofit</div>
                  <div>• Operates vessel</div>
                  <div>• Generates fuel savings</div>
                  <div>• Retains residual savings after debt repayment</div>
                </div>
              </div>

              {/* Verifier */}
              <div className="p-3 bg-white/[0.02] border border-white/10 rounded-sm space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>INDEPENDENT VERIFIER</span>
                </div>
                <div className="text-[11px] text-white/70 space-y-1">
                  <div>• Establishes baseline</div>
                  <div>• Measures sea performance</div>
                  <div>• Verifies net savings (IRClass / IACS)</div>
                </div>
              </div>

              {/* Technology Provider */}
              <div className="p-3 bg-white/[0.02] border border-white/10 rounded-sm space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>TECH PROVIDER</span>
                </div>
                <div className="text-[11px] text-white/70 space-y-1">
                  <div>• Supplies retrofit tech</div>
                  <div>• Performance guarantees</div>
                  <div>• Ongoing service support</div>
                </div>
              </div>

            </div>

          </div>

          {/* Compliance & Anti-Misrepresentation Safeguard Note */}
          <div className="p-3 bg-white/[0.02] border border-white/15 text-[11px] text-white/50 leading-relaxed">
            <span className="text-white font-bold uppercase block text-[10px] text-amber-400 mb-0.5">
              GOVERNANCE PROTOCOL — EXAMPLE INSTITUTIONS:
            </span>
            Potential Indian debt funding channels could include national green lending institutions (such as IREDA, NaBFID, or dedicated green-finance windows at Indian commercial banks). All references are illustrative models of potential syndication architectures.
          </div>

        </div>

        {/* RIGHT COLUMN: PROPOSED FINANCING STACK (5 Cols) */}
        <div className="lg:col-span-5 bg-[#020617]/90 border border-white/10 tech-corner-accent p-5 sm:p-6 space-y-5 flex flex-col justify-between">
          
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div>
                <span className="text-[10px] text-[#00F2FF] font-bold uppercase tracking-widest">
                  DEBT TRANCHE ARCHITECTURE
                </span>
                <h3 className="text-base font-black text-white uppercase tracking-tight">
                  PROPOSED FINANCING STACK
                </h3>
              </div>
              <EvidenceMarker type="PROPOSED" inline={true} />
            </div>

            {/* Vertical Schematic Stack */}
            <div className="space-y-2 text-center text-xs">
              
              {/* Capital Influx */}
              <div className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest flex items-center justify-center gap-1">
                <span>INSTITUTIONAL / CONCESSIONARY CAPITAL</span>
                <ArrowDown className="w-3 h-3 animate-bounce" />
              </div>

              {/* 1. Green Finance Bank / Fund */}
              <div className="p-3 bg-sky-900/30 border border-sky-400/50 rounded-sm">
                <div className="text-xs font-black text-white uppercase tracking-wider">
                  GREEN FINANCE BANK / FUND
                </div>
                <div className="text-[10px] text-sky-300">
                  Potential Indian Green-Finance Lending Window
                </div>
              </div>

              <div className="flex justify-center text-white/40">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>

              {/* 2. SHIPLOOP Structuring SPV */}
              <div className="p-3 bg-[#00F2FF]/15 border-2 border-[#00F2FF] rounded-sm shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                <div className="text-xs font-black text-[#00F2FF] uppercase tracking-wider">
                  SHIPLOOP SPV / CONDUIT
                </div>
                <div className="text-[10px] text-white/70">
                  Transaction Structuring & Underwriting Oracle
                </div>
              </div>

              <div className="flex justify-center text-white/40">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>

              {/* 3. Retrofit Financing to Vessel */}
              <div className="p-2.5 bg-white/[0.04] border border-white/20 rounded-sm">
                <div className="text-xs font-bold text-white uppercase">
                  RETROFIT FINANCING → VESSEL
                </div>
                <div className="text-[10px] text-white/50">
                  Drydock equipment installation (CSL / Mazagon / L&T)
                </div>
              </div>

              <div className="flex justify-center text-white/40">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>

              {/* 4. Fuel Savings */}
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-sm">
                <div className="text-xs font-bold text-amber-400 uppercase">
                  OPERATIONAL FUEL SAVINGS
                </div>
                <div className="text-[10px] text-white/50">
                  -15% daily bunker burn at sea
                </div>
              </div>

              <div className="flex justify-center text-white/40">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>

              {/* 5. Verified Cash Flow & Repayment */}
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/50 rounded-sm">
                <div className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                  VERIFIED CASH FLOW → REPAYMENT
                </div>
                <div className="text-[10px] text-white/70">
                  Senior debt amortization + Owner surplus
                </div>
              </div>

            </div>

          </div>

          {/* Optional Reserve / First-Loss Layer Toggle */}
          <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#FFB347]" />
                <span className="text-xs font-bold text-white uppercase">
                  RESERVE / FIRST-LOSS PROTECTION
                </span>
              </div>
              <button
                onClick={() => setIncludeFirstLossReserve(!includeFirstLossReserve)}
                className={`px-2 py-0.5 text-[9px] border uppercase font-bold transition-all cursor-pointer ${
                  includeFirstLossReserve
                    ? 'bg-[#FFB347] text-black border-[#FFB347]'
                    : 'bg-transparent text-white/50 border-white/20'
                }`}
              >
                {includeFirstLossReserve ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>

            <div className="p-3 bg-white/[0.02] border border-[#FFB347]/30 text-[11px] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">6-MONTH DSRF ESCROW BUFFER</span>
                <EvidenceMarker type="PROPOSED" label="PROPOSED STRUCTURAL OPTION" />
              </div>
              <p className="text-white/60 font-normal leading-relaxed">
                A 6-month Debt Service Reserve Fund (DSRF) or concessionary first-loss credit enhancement absorbs temporary bunker price drops or off-hire drydocking, shielding senior lenders from payment disruption.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
