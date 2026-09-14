import React from 'react';
import { Ship, Users, User, ArrowRight, ShieldCheck, Check, AlertCircle, Percent, Anchor, FileText, ArrowDown, Scale } from 'lucide-react';
import { SimulationParams, SimulationResult } from '../types';
import { SourceButton } from './SourceButton';

interface CharterSimulatorProps {
  params: SimulationParams;
  onParamsChange: (newParams: SimulationParams) => void;
  result: SimulationResult;
  isPresentationMode?: boolean;
  replayTrigger?: number;
  isPaused?: boolean;
}

export const CharterSimulator: React.FC<CharterSimulatorProps> = ({
  params,
  onParamsChange,
  result,
  isPresentationMode = false,
  replayTrigger = 0,
}) => {
  // Replay trigger resets to default Time Charter in presentation mode only if replayed
  React.useEffect(() => {
    if (replayTrigger > 0) {
      onParamsChange({
        ...params,
        charterType: 'TIME_CHARTER',
        chartererSavingsSharePercent: 50,
      });
    }
  }, [replayTrigger]);

  const handleCharterTypeSelect = (type: 'VOYAGE' | 'TIME_CHARTER' | 'BAREBOAT' | 'COA') => {
    onParamsChange({
      ...params,
      charterType: type,
    });
  };

  const handleShareChange = (share: number) => {
    onParamsChange({
      ...params,
      chartererSavingsSharePercent: share,
    });
  };

  const currentType = params.charterType;
  const isVoyage = currentType === 'VOYAGE';
  const isTime = currentType === 'TIME_CHARTER';
  const isBareboat = currentType === 'BAREBOAT';
  const isCOA = currentType === 'COA';

  // Baseline fuel spend for comparison (Gross without retrofit)
  const baselineFuelCostINR = (params.annualFuelConsumption * params.fuelPricePerTonneINR) / 10000000;

  return (
    <section 
      id="charter" 
      className={`${
        isPresentationMode 
          ? 'w-full h-full flex flex-col justify-between py-3 sm:py-5 px-3 sm:px-8 max-w-7xl mx-auto overflow-y-auto lg:overflow-hidden select-text' 
          : 'py-20 sm:py-24 bg-[#020617] border-t border-white/10 relative'
      }`}
    >
      <div className={`${isPresentationMode ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 relative z-10'}`}>
        
        {/* Section Header */}
        <div className={`max-w-3xl ${isPresentationMode ? 'mb-3' : 'mb-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/20 text-[#00F2FF] text-xs font-mono mb-2 tracking-widest uppercase">
            <Users className="w-3.5 h-3.5" />
            <span>05 // CONTRACTUAL ARCHITECTURE</span>
          </div>
          <h2 className={`${isPresentationMode ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-5xl'} font-black text-white font-mono tracking-tight leading-tight uppercase`}>
            FOUR CHARTER STRUCTURES & SAVINGS FLOW
          </h2>
          <p className="text-white/60 font-mono mt-1 text-xs sm:text-sm tracking-wide">
            Maritime shipping operates under four primary commercial structures. SHIPLOOP aligns fuel responsibilities, verified savings ownership, and debt service across Voyage, Time, Bareboat, and COA contracts.
          </p>
        </div>

        {/* 4 Commercial Charter Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          
          {/* Card 1: Voyage Charter */}
          <div
            id="btn-charter-voyage"
            onClick={() => handleCharterTypeSelect('VOYAGE')}
            className={`p-5 sm:p-6 bg-white/[0.02] border transition-all duration-300 cursor-pointer relative overflow-hidden tech-corner-accent ${
              isVoyage 
                ? 'border-[#00F2FF] shadow-[0_0_25px_rgba(0,242,255,0.18)] bg-white/5' 
                : 'border-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 bg-black border ${isVoyage ? 'border-[#00F2FF]' : 'border-white/20'}`}>
                  <User className="w-4 h-4 text-[#00F2FF]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm sm:text-base font-mono font-bold text-white tracking-wider">VOYAGE CHARTER</h3>
                    <SourceButton evidenceId="CHARTER-001" />
                  </div>
                  <span className="text-[10px] font-mono text-[#00F2FF]">Owner Purchases Fuel</span>
                </div>
              </div>
              {isVoyage && (
                <div className="w-5 h-5 bg-[#00F2FF] text-black flex items-center justify-center font-black text-xs font-mono">
                  ✓
                </div>
              )}
            </div>

            <p className="text-xs text-white/70 font-mono leading-relaxed mb-4 min-h-[48px]">
              Owner pays the fuel supplier directly. 100% of verified bunker savings stay on the owner's ledger, funding debt service and surplus effortlessly.
            </p>

            <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-white/50 space-y-1">
              <div className="flex justify-between">
                <span>INCENTIVE ALIGNMENT:</span>
                <span className="text-emerald-400 font-bold">100% Natural</span>
              </div>
              <div className="flex justify-between">
                <span>CONTRACT MOD:</span>
                <span className="text-white">Standard BIMCO Terms</span>
              </div>
            </div>
          </div>

          {/* Card 2: Time Charter */}
          <div
            id="btn-charter-time"
            onClick={() => handleCharterTypeSelect('TIME_CHARTER')}
            className={`p-5 sm:p-6 bg-white/[0.02] border transition-all duration-300 cursor-pointer relative overflow-hidden tech-corner-accent ${
              isTime 
                ? 'border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.18)] bg-white/5' 
                : 'border-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 bg-black border ${isTime ? 'border-emerald-400' : 'border-white/20'}`}>
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm sm:text-base font-mono font-bold text-white tracking-wider">TIME CHARTER</h3>
                    <SourceButton evidenceId="CHARTER-003" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Charterer Buys Bunker</span>
                </div>
              </div>
              {isTime && (
                <div className="w-5 h-5 bg-emerald-400 text-black flex items-center justify-center font-black text-xs font-mono">
                  ✓
                </div>
              )}
            </div>

            <p className="text-xs text-white/70 font-mono leading-relaxed mb-4 min-h-[48px]">
              Charterer captures the lower fuel bill. SHIPLOOP BIMCO Green Clause gain-share rider splits savings between charterer discount and debt service.
            </p>

            <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-white/50 space-y-1">
              <div className="flex justify-between">
                <span>INCENTIVE ALIGNMENT:</span>
                <span className="text-[#FFB347] font-bold">Solved via Protocol</span>
              </div>
              <div className="flex justify-between">
                <span>CONTRACT MOD:</span>
                <span className="text-emerald-400 font-bold">Gain-Share Rider</span>
              </div>
            </div>
          </div>

          {/* Card 3: Bareboat Charter */}
          <div
            id="btn-charter-bareboat"
            onClick={() => handleCharterTypeSelect('BAREBOAT')}
            className={`p-5 sm:p-6 bg-white/[0.02] border transition-all duration-300 cursor-pointer relative overflow-hidden tech-corner-accent ${
              isBareboat 
                ? 'border-[#FFB347] shadow-[0_0_25px_rgba(255,179,71,0.22)] bg-white/5' 
                : 'border-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 bg-black border ${isBareboat ? 'border-[#FFB347]' : 'border-white/20'}`}>
                  <Anchor className="w-4 h-4 text-[#FFB347]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm sm:text-base font-mono font-bold text-white tracking-wider">BAREBOAT CHARTER</h3>
                    <SourceButton evidenceId="CHARTER-002" />
                  </div>
                  <span className="text-[10px] font-mono text-[#FFB347]">Charterer Operates & Pays OPEX</span>
                </div>
              </div>
              {isBareboat && (
                <div className="w-5 h-5 bg-[#FFB347] text-black flex items-center justify-center font-black text-xs font-mono">
                  ✓
                </div>
              )}
            </div>

            <p className="text-xs text-white/70 font-mono leading-relaxed mb-4 min-h-[48px]">
              Charterer has full operational control and pays fuel. Verified savings belong to charterer; SHIPLOOP rider allocates agreed share to debt service.
            </p>

            <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-white/50 space-y-1">
              <div className="flex justify-between">
                <span>INCENTIVE ALIGNMENT:</span>
                <span className="text-[#FFB347] font-bold">Contractual Savings Share</span>
              </div>
              <div className="flex justify-between">
                <span>CONTRACT MOD:</span>
                <span className="text-[#FFB347] font-bold">Green Retrofit Rider</span>
              </div>
            </div>
          </div>

          {/* Card 4: Contract of Affreightment (COA) */}
          <div
            id="btn-charter-coa"
            onClick={() => handleCharterTypeSelect('COA')}
            className={`p-5 sm:p-6 bg-white/[0.02] border transition-all duration-300 cursor-pointer relative overflow-hidden tech-corner-accent ${
              isCOA 
                ? 'border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.22)] bg-white/5' 
                : 'border-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 bg-black border ${isCOA ? 'border-sky-400' : 'border-white/20'}`}>
                  <FileText className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm sm:text-base font-mono font-bold text-white tracking-wider">CONTRACT OF AFFREIGHTMENT</h3>
                    <SourceButton evidenceId="CHARTER-001" />
                  </div>
                  <span className="text-[10px] font-mono text-sky-400">Owner Operates • Cargo Volume</span>
                </div>
              </div>
              {isCOA && (
                <div className="w-5 h-5 bg-sky-400 text-black flex items-center justify-center font-black text-xs font-mono">
                  ✓
                </div>
              )}
            </div>

            <p className="text-xs text-white/70 font-mono leading-relaxed mb-4 min-h-[48px]">
              Owner commits to carry cargo volume and bears voyage fuel. 100% of verified fuel savings accrue to owner to service retrofit debt and retain surplus.
            </p>

            <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-white/50 space-y-1">
              <div className="flex justify-between">
                <span>INCENTIVE ALIGNMENT:</span>
                <span className="text-emerald-400 font-bold">Owner Retains Savings</span>
              </div>
              <div className="flex justify-between">
                <span>CONTRACT MOD:</span>
                <span className="text-sky-400 font-bold">COA Freight Adjustment</span>
              </div>
            </div>
          </div>

        </div>

        {/* Selected Charter Deep-Dive & Contractual Alignment Architecture */}
        <div className="mb-8">
          
          {/* BAREBOAT CHARTER PANEL */}
          {isBareboat && (
            <div className="p-6 sm:p-8 bg-white/[0.02] border border-[#FFB347]/50 shadow-2xl backdrop-blur-md space-y-6 tech-corner-accent">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#FFB347] uppercase tracking-wider">
                      BAREBOAT CHARTER // INCENTIVE ALIGNMENT & DUAL-LEDGER
                    </span>
                    <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-[#FFB347]/20 text-[#FFB347] border border-[#FFB347]/40">
                      OPERATIONAL CONTROL WITH CHARTERER
                    </span>
                  </div>
                  <p className="text-xs text-white/60 font-mono mt-1">
                    The charterer bears all vessel operating expenses, including bunker fuel. Default savings belong to charterer; SHIPLOOP Bareboat Green Retrofit Savings Rider allocates an agreed portion to debt service while preserving bareboat economics.
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-white/80 bg-black/60 px-3 py-1.5 border border-white/10 self-start sm:self-auto shrink-0">
                  <span>Gross Verified Savings:</span>
                  <span className="text-[#FFB347] font-bold">₹{result.grossAnnualSavingsINR.toFixed(2)} Cr/yr</span>
                </div>
              </div>

              {/* Conceptual Flow Diagram for Bareboat */}
              <div className="p-4 bg-black/50 border border-white/10 space-y-2">
                <div className="text-[10px] font-mono text-[#FFB347] uppercase font-bold tracking-wider">
                  CONCEPTUAL SAVINGS FLOW // BAREBOAT CHARTER
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs font-mono">
                  <div className="p-2.5 bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/50 block">STEP 1</span>
                    <span className="text-[#FFB347] font-bold block">Charterer Pays Fuel</span>
                    <span className="text-[9px] text-white/40">Bears OPEX & Bunker</span>
                  </div>
                  <div className="p-2.5 bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/50 block">STEP 2</span>
                    <span className="text-emerald-400 font-bold block">Retrofit Generates Savings</span>
                    <span className="text-[9px] text-white/40">7.5% Flettner Reduction</span>
                  </div>
                  <div className="p-2.5 bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/50 block">STEP 3</span>
                    <span className="text-sky-300 font-bold block">Savings Benefit Charterer</span>
                    <span className="text-[9px] text-white/40">Default Operational Gain</span>
                  </div>
                  <div className="p-2.5 bg-[#FFB347]/10 border border-[#FFB347]/40">
                    <span className="text-[10px] text-[#FFB347] block">STEP 4</span>
                    <span className="text-white font-bold block">Retrofit Savings Rider</span>
                    <span className="text-[9px] text-[#FFB347]">Contractual Clause</span>
                  </div>
                  <div className="p-2.5 bg-cyan-950/40 border border-[#00F2FF]/40">
                    <span className="text-[10px] text-[#00F2FF] block">STEP 5</span>
                    <span className="text-[#00F2FF] font-bold block">Debt Service Swept</span>
                    <span className="text-[9px] text-white/40">₹{result.annualRepaymentINR.toFixed(2)} Cr Amortized</span>
                  </div>
                  <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/40">
                    <span className="text-[10px] text-emerald-300 block">STEP 6</span>
                    <span className="text-emerald-300 font-bold block">Charterer Surplus Retained</span>
                    <span className="text-[9px] text-white/40">+₹{result.chartererRetainedINR.toFixed(2)} Cr Net</span>
                  </div>
                </div>
              </div>

              {/* Section 5: Clear Financial Distinction (Charterer Fuel vs Owner Financing) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Ledger 1: Charterer Side */}
                <div className="p-5 bg-[#020617] border border-[#FFB347]/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-mono font-bold text-[#FFB347] uppercase">
                      CHARTERER'S FUEL COST & SAVING LEDGER
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">OPERATIONAL ACCOUNTING</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/60">Charterer Baseline Fuel Spend:</span>
                      <span className="text-white font-bold">₹{baselineFuelCostINR.toFixed(2)} Cr/yr</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-emerald-400">Verified Fuel Avoided (-7.5%):</span>
                      <span className="text-emerald-400 font-bold">-₹{result.grossAnnualSavingsINR.toFixed(2)} Cr/yr</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-[#FFB347]">Contractual Savings Share to Financing:</span>
                      <span className="text-[#FFB347] font-bold">-₹{result.availableVerifiedSavingsINR.toFixed(2)} Cr/yr ({100 - params.chartererSavingsSharePercent}%)</span>
                    </div>
                    <div className="flex justify-between py-1.5 bg-[#FFB347]/10 px-2 border border-[#FFB347]/30">
                      <span className="text-white font-bold">Charterer Retained Fuel Benefit:</span>
                      <span className="text-emerald-300 font-black">+₹{result.chartererRetainedINR.toFixed(2)} Cr/yr ({params.chartererSavingsSharePercent}%)</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-white/50 font-mono">
                    Under the Bareboat Green Retrofit Savings Rider, charterer retains operational fuel discount while providing bank repayment security.
                  </div>
                </div>

                {/* Ledger 2: Shipowner & Bank Side */}
                <div className="p-5 bg-[#020617] border border-[#00F2FF]/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-mono font-bold text-[#00F2FF] uppercase">
                      SHIPOWNER'S FINANCING & BANK REPAYMENT
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">FINANCING POOL</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/60">Shipowner Capex Contribution:</span>
                      <span className="text-emerald-400 font-bold">₹0.00 (100% Non-Recourse)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-[#00F2FF]">Contractual Escrow Inflow:</span>
                      <span className="text-[#00F2FF] font-bold">+₹{result.availableVerifiedSavingsINR.toFixed(2)} Cr/yr</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-[#FFB347]">Senior Bank Debt Service:</span>
                      <span className="text-[#FFB347] font-bold">-₹{result.annualRepaymentINR.toFixed(2)} Cr/yr</span>
                    </div>
                    <div className="flex justify-between py-1.5 bg-[#00F2FF]/10 px-2 border border-[#00F2FF]/30">
                      <span className="text-white font-bold">Shipowner Annual Operational Surplus:</span>
                      <span className="text-emerald-300 font-black">+₹{result.ownerBaseTermAnnualSurplusINR.toFixed(2)} Cr/yr</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-white/50 font-mono">
                    Senior bank principal of ₹{result.bankPrincipalRecoveredINR.toFixed(2)} Cr is fully repaid over {result.baseTenureYears} yrs with DSCR of <span className="text-emerald-400 font-bold">{result.debtServiceCoverageRatio.toFixed(2)}x</span>.
                  </div>
                </div>

              </div>

              {/* Slider for Bareboat Contractual Split */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#00F2FF] font-bold">
                    Financing & Debt Support Share: {100 - params.chartererSavingsSharePercent}%
                  </span>
                  <span className="text-[#FFB347] font-bold">
                    Charterer Retained Share: {params.chartererSavingsSharePercent}%
                  </span>
                </div>

                <input
                  id="slider-bareboat-share"
                  type="range"
                  min="10"
                  max="80"
                  step="5"
                  value={params.chartererSavingsSharePercent}
                  onChange={(e) => handleShareChange(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 appearance-none cursor-pointer accent-[#FFB347]"
                />

                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>90% Debt Pool / 10% Charterer</span>
                  <span>50% / 50% Balanced Bareboat Covenant</span>
                  <span>20% Debt Pool / 80% Charterer</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-white/60">
                <span>INCENTIVE ALIGNMENT: <strong className="text-[#FFB347]">Contractual Savings Share</strong></span>
                <span>CONTRACT MODIFICATION: <strong className="text-white">Bareboat Green Retrofit Savings Rider</strong></span>
              </div>

            </div>
          )}

          {/* TIME CHARTER PANEL */}
          {isTime && (
            <div className="p-6 sm:p-8 bg-white/[0.02] border border-emerald-500/40 shadow-2xl backdrop-blur-md space-y-6 tech-corner-accent">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      TIME CHARTER // GAIN-SHARE ALLOCATION
                    </span>
                    <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      BIMCO GREEN CLAUSE COVENANT
                    </span>
                  </div>
                  <p className="text-xs text-white/50 font-mono mt-0.5">
                    Under Time Charters, charterers pay the bunker bill while owners supply the ship. SHIPLOOP standardizes a gain-sharing clause allocating verified fuel savings between charterer invoice discount and retrofit debt service.
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-white/80 bg-black/60 px-3 py-1.5 border border-white/10 self-start sm:self-auto shrink-0">
                  <span>Total Gross Pool:</span>
                  <span className="text-emerald-400 font-bold">₹{result.grossAnnualSavingsINR.toFixed(2)} Cr/yr</span>
                </div>
              </div>

              {/* Conceptual Flow Diagram for Time Charter */}
              <div className="p-4 bg-black/50 border border-white/10 space-y-2">
                <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                  CONCEPTUAL SAVINGS FLOW // TIME CHARTER
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                  <div className="p-2.5 bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/50 block">PHASE 1</span>
                    <span className="text-emerald-400 font-bold block">Charterer Pays Fuel</span>
                    <span className="text-[9px] text-white/40">Buys Bunker at Market</span>
                  </div>
                  <div className="p-2.5 bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/50 block">PHASE 2</span>
                    <span className="text-sky-300 font-bold block">Charterer Receives Benefit</span>
                    <span className="text-[9px] text-white/40">Lower Consumption Bill</span>
                  </div>
                  <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/40">
                    <span className="text-[10px] text-emerald-300 block">PHASE 3</span>
                    <span className="text-white font-bold block">Savings-Sharing Mechanism</span>
                    <span className="text-[9px] text-emerald-400">BIMCO Green Rider</span>
                  </div>
                  <div className="p-2.5 bg-cyan-950/40 border border-[#00F2FF]/40">
                    <span className="text-[10px] text-[#00F2FF] block">PHASE 4</span>
                    <span className="text-[#00F2FF] font-bold block">Portion Supports Financing</span>
                    <span className="text-[9px] text-white/40">Swept into Senior Escrow</span>
                  </div>
                </div>
              </div>

              {/* Split Slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#00F2FF] font-bold">
                    Shipowner & Debt Pool: {100 - params.chartererSavingsSharePercent}%
                  </span>
                  <span className="text-emerald-300 font-bold">
                    Charterer Retained Discount: {params.chartererSavingsSharePercent}%
                  </span>
                </div>

                <input
                  id="slider-charter-share"
                  type="range"
                  min="10"
                  max="80"
                  step="5"
                  value={params.chartererSavingsSharePercent}
                  onChange={(e) => handleShareChange(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 appearance-none cursor-pointer accent-emerald-400"
                />

                <div className="flex justify-between text-[10px] font-mono text-white/40">
                  <span>90% Owner / 10% Charterer</span>
                  <span>50% / 50% Standard Benchmark</span>
                  <span>20% Owner / 80% Charterer</span>
                </div>
              </div>

              {/* Split Breakdown Result Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#020617] border border-[#00F2FF]/30 space-y-1.5">
                  <div className="text-[10px] font-mono text-[#00F2FF] uppercase tracking-wider">SHIPOWNER & FINANCING POOL</div>
                  <div className="text-xl font-mono font-bold text-white">
                    ₹{result.availableVerifiedSavingsINR.toFixed(2)} Cr / yr
                  </div>
                  <div className="text-[11px] font-mono text-white/60 space-y-0.5">
                    <div>• Senior Loan Debt Service: ₹{result.annualRepaymentINR.toFixed(2)} Cr/yr</div>
                    <div>• Bank Yield Share ({result.bankSharePercent}% during extra term): ₹{result.bankAnnualShareINR.toFixed(2)} Cr/yr</div>
                    <div>• Owner Net Base Surplus: <span className="text-emerald-400 font-bold">+₹{result.ownerBaseTermAnnualSurplusINR.toFixed(2)} Cr/yr</span></div>
                  </div>
                </div>

                <div className="p-4 bg-[#020617] border border-emerald-500/30 space-y-1.5">
                  <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">TIME CHARTERER DIRECT DISCOUNT</div>
                  <div className="text-xl font-mono font-bold text-emerald-300">
                    +₹{result.chartererRetainedINR.toFixed(2)} Cr / yr
                  </div>
                  <div className="text-[11px] font-mono text-white/60">
                    Direct voyage bunker invoice discount passed to the charterer under BIMCO green rider terms.
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-white/60">
                <span>INCENTIVE ALIGNMENT: <strong className="text-[#FFB347]">Solved via Protocol</strong></span>
                <span>CONTRACT MODIFICATION: <strong className="text-emerald-400">Gain-Share Rider Clause</strong></span>
              </div>

            </div>
          )}

          {/* VOYAGE CHARTER PANEL */}
          {isVoyage && (
            <div className="p-6 sm:p-8 bg-white/[0.02] border border-[#00F2FF]/50 shadow-2xl backdrop-blur-md space-y-6 tech-corner-accent">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#00F2FF] uppercase tracking-wider">
                      VOYAGE CHARTER // DIRECT REPAYMENT SWEEP
                    </span>
                    <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-[#00F2FF]/20 text-[#00F2FF] border border-[#00F2FF]/40">
                      NATURAL INCENTIVE ALIGNMENT
                    </span>
                  </div>
                  <p className="text-xs text-white/50 font-mono mt-0.5">
                    Under Voyage Charters, the shipowner pays for bunker fuel directly. 100% of physical fuel savings stay on the owner's ledger with zero charterer deduction.
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-white/80 bg-black/60 px-3 py-1.5 border border-white/10 self-start sm:self-auto shrink-0">
                  <span>Gross & Escrow Pool:</span>
                  <span className="text-[#00F2FF] font-bold">₹{result.grossAnnualSavingsINR.toFixed(2)} Cr/yr</span>
                </div>
              </div>

              {/* Conceptual Flow Diagram for Voyage Charter */}
              <div className="p-4 bg-black/50 border border-white/10 space-y-2">
                <div className="text-[10px] font-mono text-[#00F2FF] uppercase font-bold tracking-wider">
                  CONCEPTUAL SAVINGS FLOW // VOYAGE CHARTER
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                  <div className="p-2.5 bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/50 block">PHASE 1</span>
                    <span className="text-[#00F2FF] font-bold block">Owner Pays Fuel</span>
                    <span className="text-[9px] text-white/40">Buys Bunker Directly</span>
                  </div>
                  <div className="p-2.5 bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/50 block">PHASE 2</span>
                    <span className="text-emerald-400 font-bold block">Owner Receives Savings</span>
                    <span className="text-[9px] text-white/40">100% Retained on Ledger</span>
                  </div>
                  <div className="p-2.5 bg-cyan-950/40 border border-[#00F2FF]/40">
                    <span className="text-[10px] text-[#00F2FF] block">PHASE 3</span>
                    <span className="text-white font-bold block">Debt Service Sweep</span>
                    <span className="text-[9px] text-cyan-300">₹{result.annualRepaymentINR.toFixed(2)} Cr/yr</span>
                  </div>
                  <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/40">
                    <span className="text-[10px] text-emerald-300 block">PHASE 4</span>
                    <span className="text-emerald-300 font-bold block">Owner Retains Surplus</span>
                    <span className="text-[9px] text-white/40">+₹{result.ownerBaseTermAnnualSurplusINR.toFixed(2)} Cr/yr</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#020617] border border-white/10 space-y-1">
                  <span className="text-[10px] text-white/50 uppercase">CHARTERER DEDUCTION</span>
                  <div className="text-xl font-mono font-bold text-white">₹0.00 Cr/yr</div>
                  <p className="text-[11px] text-white/50">Charterer buys cargo transport, not fuel.</p>
                </div>

                <div className="p-4 bg-[#020617] border border-[#FFB347]/40 space-y-1">
                  <span className="text-[10px] text-[#FFB347] uppercase">SCHEDULED DEBT SERVICE</span>
                  <div className="text-xl font-mono font-bold text-[#FFB347]">₹{result.annualRepaymentINR.toFixed(2)} Cr/yr</div>
                  <p className="text-[11px] text-white/50">Amortizes ₹{result.financedAmountINR.toFixed(2)} Cr principal over {result.baseTenureYears} yrs.</p>
                </div>

                <div className="p-4 bg-[#020617] border border-emerald-500/40 space-y-1">
                  <span className="text-[10px] text-emerald-400 uppercase">OWNER BASE SURPLUS</span>
                  <div className="text-xl font-mono font-bold text-emerald-300">+₹{result.ownerBaseTermAnnualSurplusINR.toFixed(2)} Cr/yr</div>
                  <p className="text-[11px] text-white/50">Free operational cashflow above debt coverage (DSCR {result.debtServiceCoverageRatio.toFixed(2)}x).</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-white/60">
                <span>INCENTIVE ALIGNMENT: <strong className="text-emerald-400">100% Natural Alignment</strong></span>
                <span>CONTRACT MODIFICATION: <strong className="text-white">Standard BIMCO Terms</strong></span>
              </div>

            </div>
          )}

          {/* CONTRACT OF AFFREIGHTMENT (COA) PANEL */}
          {isCOA && (
            <div className="p-6 sm:p-8 bg-white/[0.02] border border-sky-400/50 shadow-2xl backdrop-blur-md space-y-6 tech-corner-accent">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                      CONTRACT OF AFFREIGHTMENT (COA) // EFFICIENCY & FREIGHT CLAUSE
                    </span>
                    <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-sky-500/20 text-sky-300 border border-sky-500/40">
                      LONG-TERM CARGO VOLUME CONTRACT
                    </span>
                  </div>
                  <p className="text-xs text-white/60 font-mono mt-1">
                    The owner agrees to transport a fixed volume of cargo over multiple voyages over a defined multi-year horizon. The owner operates the ship and bears voyage fuel costs. The retrofit reduces fuel burn across all voyages, and verified savings accrue directly to the owner.
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-white/80 bg-black/60 px-3 py-1.5 border border-white/10 self-start sm:self-auto shrink-0">
                  <span>Gross COA Savings:</span>
                  <span className="text-sky-400 font-bold">₹{result.grossAnnualSavingsINR.toFixed(2)} Cr/yr</span>
                </div>
              </div>

              {/* Conceptual Flow Diagram for COA */}
              <div className="p-4 bg-black/50 border border-white/10 space-y-2">
                <div className="text-[10px] font-mono text-sky-400 uppercase font-bold tracking-wider">
                  CONCEPTUAL SAVINGS FLOW // CONTRACT OF AFFREIGHTMENT (COA)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
                  <div className="p-2.5 bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/50 block">STEP 1</span>
                    <span className="text-sky-300 font-bold block">Owner Pays Fuel</span>
                    <span className="text-[9px] text-white/40">Operates Volume Voyages</span>
                  </div>
                  <div className="p-2.5 bg-white/5 border border-white/10">
                    <span className="text-[10px] text-white/50 block">STEP 2</span>
                    <span className="text-emerald-400 font-bold block">Retrofit Reduces Fuel</span>
                    <span className="text-[9px] text-white/40">7.5% Efficiency Gain</span>
                  </div>
                  <div className="p-2.5 bg-sky-950/40 border border-sky-400/40">
                    <span className="text-[10px] text-sky-300 block">STEP 3</span>
                    <span className="text-white font-bold block">Savings Accrue to Owner</span>
                    <span className="text-[9px] text-sky-300">Under COA Freight Terms</span>
                  </div>
                  <div className="p-2.5 bg-cyan-950/40 border border-[#00F2FF]/40">
                    <span className="text-[10px] text-[#00F2FF] block">STEP 4</span>
                    <span className="text-[#00F2FF] font-bold block">Debt Service Swept</span>
                    <span className="text-[9px] text-white/40">₹{result.annualRepaymentINR.toFixed(2)} Cr/yr</span>
                  </div>
                  <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/40">
                    <span className="text-[10px] text-emerald-300 block">STEP 5</span>
                    <span className="text-emerald-300 font-bold block">Owner Retains Surplus</span>
                    <span className="text-[9px] text-white/40">+₹{result.ownerBaseTermAnnualSurplusINR.toFixed(2)} Cr/yr</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#020617] border border-sky-400/30 space-y-1">
                  <span className="text-[10px] text-sky-300 uppercase">CARGO COMMITMENT EFFICIENCY</span>
                  <div className="text-xl font-mono font-bold text-white">7.5% Fuel Saved</div>
                  <p className="text-[11px] text-white/60">Delivers {result.annualFuelSavedTonnes.toLocaleString()} MT bunker reduction across fleet voyages.</p>
                </div>

                <div className="p-4 bg-[#020617] border border-[#FFB347]/40 space-y-1">
                  <span className="text-[10px] text-[#FFB347] uppercase">ANNUAL DEBT SERVICE</span>
                  <div className="text-xl font-mono font-bold text-[#FFB347]">₹{result.annualRepaymentINR.toFixed(2)} Cr/yr</div>
                  <p className="text-[11px] text-white/60">Fully serviced from verified fuel reductions without impacting charterer freight rates.</p>
                </div>

                <div className="p-4 bg-[#020617] border border-emerald-500/40 space-y-1">
                  <span className="text-[10px] text-emerald-400 uppercase">OWNER FREE SURPLUS</span>
                  <div className="text-xl font-mono font-bold text-emerald-300">+₹{result.ownerBaseTermAnnualSurplusINR.toFixed(2)} Cr/yr</div>
                  <p className="text-[11px] text-white/60">Retained entirely by owner. 10-Year cumulative net benefit: ₹{result.tenYearCumulativeNetOwnerBenefitINR.toFixed(2)} Cr.</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-white/60">
                <span>INCENTIVE ALIGNMENT: <strong className="text-emerald-400">Owner Retains Verified Savings</strong></span>
                <span>CONTRACT MODIFICATION: <strong className="text-sky-400">COA Green Efficiency / Freight Adjustment Clause</strong></span>
              </div>

            </div>
          )}

        </div>

        {/* Section 9: FOUR-CHARTER SIDE-BY-SIDE COMPARISON ARCHITECTURE */}
        <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/10 shadow-2xl backdrop-blur-md space-y-6 tech-corner-accent">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono font-bold text-[#00F2FF] uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#00F2FF]" />
                <span>CROSS-CHARTER COMPARISON // HOW SAVINGS MOVE</span>
              </span>
              <h3 className="text-lg font-mono font-black text-white uppercase mt-0.5">
                COMPARING ALL FOUR MARITIME CHARTER STRUCTURES
              </h3>
            </div>
            <div className="text-[10px] font-mono text-white/40 uppercase">
              CENTRALIZED FINANCIAL ENGINE INTEGRATION
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            
            {/* Column 1: VOYAGE CHARTER */}
            <div className={`p-4 bg-[#020617] border ${isVoyage ? 'border-[#00F2FF] bg-[#00F2FF]/5' : 'border-white/10'} space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white uppercase">VOYAGE CHARTER</span>
                <span className="text-[9px] font-mono text-[#00F2FF] border border-[#00F2FF]/40 px-1.5 py-0.5">SPOT TRADE</span>
              </div>

              {/* Sequential Path */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2 bg-white/5 border border-white/10 text-white/80">
                  <span className="text-[9px] text-white/40 block">1. FUEL RESPONSIBILITY</span>
                  Owner pays fuel
                </div>
                <div className="text-center text-white/30 text-[10px]">↓</div>
                <div className="p-2 bg-emerald-950/20 border border-emerald-500/30 text-emerald-300">
                  <span className="text-[9px] text-white/40 block">2. SAVINGS OWNERSHIP</span>
                  Owner receives fuel savings
                </div>
                <div className="text-center text-white/30 text-[10px]">↓</div>
                <div className="p-2 bg-cyan-950/20 border border-[#00F2FF]/30 text-[#00F2FF]">
                  <span className="text-[9px] text-white/40 block">3. DEBT SERVICE</span>
                  Senior debt service swept
                </div>
                <div className="text-center text-white/30 text-[10px]">↓</div>
                <div className="p-2 bg-white/5 border border-white/10 text-emerald-400 font-bold">
                  <span className="text-[9px] text-white/40 block">4. RETENTION</span>
                  Owner retains surplus
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-white/50 space-y-1">
                <div>• Charterer Deduction: <strong className="text-white">0%</strong></div>
                <div>• Clause: <strong className="text-white">Standard BIMCO</strong></div>
              </div>
            </div>

            {/* Column 2: TIME CHARTER */}
            <div className={`p-4 bg-[#020617] border ${isTime ? 'border-emerald-400 bg-emerald-950/10' : 'border-white/10'} space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white uppercase">TIME CHARTER</span>
                <span className="text-[9px] font-mono text-emerald-400 border border-emerald-500/40 px-1.5 py-0.5">BIMCO GREEN</span>
              </div>

              {/* Sequential Path */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2 bg-white/5 border border-white/10 text-white/80">
                  <span className="text-[9px] text-white/40 block">1. FUEL RESPONSIBILITY</span>
                  Charterer pays fuel
                </div>
                <div className="text-center text-white/30 text-[10px]">↓</div>
                <div className="p-2 bg-emerald-950/20 border border-emerald-500/30 text-emerald-300">
                  <span className="text-[9px] text-white/40 block">2. SAVINGS OWNERSHIP</span>
                  Charterer receives fuel benefit
                </div>
                <div className="text-center text-white/30 text-[10px]">↓</div>
                <div className="p-2 bg-amber-950/20 border border-[#FFB347]/30 text-[#FFB347]">
                  <span className="text-[9px] text-white/40 block">3. CONTRACT CLAUSE</span>
                  Savings-sharing mechanism
                </div>
                <div className="text-center text-white/30 text-[10px]">↓</div>
                <div className="p-2 bg-cyan-950/20 border border-[#00F2FF]/30 text-[#00F2FF] font-bold">
                  <span className="text-[9px] text-white/40 block">4. FINANCING ALLOCATION</span>
                  Agreed portion supports financing
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-white/50 space-y-1">
                <div>• Charterer Deduction: <strong className="text-emerald-400">{params.chartererSavingsSharePercent}%</strong></div>
                <div>• Clause: <strong className="text-white">Gain-Share Rider</strong></div>
              </div>
            </div>

            {/* Column 3: BAREBOAT CHARTER */}
            <div className={`p-4 bg-[#020617] border ${isBareboat ? 'border-[#FFB347] bg-[#FFB347]/10' : 'border-white/10'} space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white uppercase">BAREBOAT CHARTER</span>
                <span className="text-[9px] font-mono text-[#FFB347] border border-[#FFB347]/40 px-1.5 py-0.5">FULL OPEX</span>
              </div>

              {/* Sequential Path */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2 bg-white/5 border border-white/10 text-white/80">
                  <span className="text-[9px] text-white/40 block">1. OPERATIONAL CONTROL</span>
                  Charterer operates & pays fuel
                </div>
                <div className="text-center text-white/30 text-[10px]">↓</div>
                <div className="p-2 bg-emerald-950/20 border border-emerald-500/30 text-emerald-300">
                  <span className="text-[9px] text-white/40 block">2. SAVINGS BENEFIT</span>
                  Charterer receives fuel benefit
                </div>
                <div className="text-center text-white/30 text-[10px]">↓</div>
                <div className="p-2 bg-[#FFB347]/20 border border-[#FFB347]/40 text-[#FFB347]">
                  <span className="text-[9px] text-[#FFB347] block">3. CONTRACT MODIFICATION</span>
                  Retrofit savings rider
                </div>
                <div className="text-center text-white/30 text-[10px]">↓</div>
                <div className="p-2 bg-cyan-950/20 border border-[#00F2FF]/30 text-[#00F2FF] font-bold">
                  <span className="text-[9px] text-white/40 block">4. FINANCING SUPPORT</span>
                  Agreed portion supports financing
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-white/50 space-y-1">
                <div>• Charterer Deduction: <strong className="text-[#FFB347]">{params.chartererSavingsSharePercent}%</strong></div>
                <div>• Clause: <strong className="text-white">Bareboat Green Rider</strong></div>
              </div>
            </div>

            {/* Column 4: CONTRACT OF AFFREIGHTMENT */}
            <div className={`p-4 bg-[#020617] border ${isCOA ? 'border-sky-400 bg-sky-950/10' : 'border-white/10'} space-y-3`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white uppercase">COA</span>
                <span className="text-[9px] font-mono text-sky-400 border border-sky-500/40 px-1.5 py-0.5">VOLUME BASIS</span>
              </div>

              {/* Sequential Path */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2 bg-white/5 border border-white/10 text-white/80">
                  <span className="text-[9px] text-white/40 block">1. FLEET OPERATION</span>
                  Owner operates & pays fuel
                </div>
                <div className="text-center text-white/30 text-[10px]">↓</div>
                <div className="p-2 bg-emerald-950/20 border border-emerald-500/30 text-emerald-300">
                  <span className="text-[9px] text-white/40 block">2. SAVINGS CAPTURE</span>
                  Owner receives verified fuel savings
                </div>
                <div className="text-center text-white/30 text-[10px]">↓</div>
                <div className="p-2 bg-cyan-950/20 border border-[#00F2FF]/30 text-[#00F2FF]">
                  <span className="text-[9px] text-white/40 block">3. DEBT SERVICE</span>
                  Debt service swept from savings
                </div>
                <div className="text-center text-white/30 text-[10px]">↓</div>
                <div className="p-2 bg-white/5 border border-white/10 text-emerald-400 font-bold">
                  <span className="text-[9px] text-white/40 block">4. SURPLUS VALUE</span>
                  Owner retains surplus
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-white/50 space-y-1">
                <div>• Charterer Deduction: <strong className="text-white">0%</strong></div>
                <div>• Clause: <strong className="text-white">COA Freight Adjustment</strong></div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
