import React from 'react';
import { Ship, Users, User, ArrowRight, ShieldCheck, Check, AlertCircle, Percent } from 'lucide-react';
import { SimulationParams, SimulationResult } from '../types';

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
  const isVoyage = params.charterType === 'VOYAGE';

  // Reset to default on replay
  React.useEffect(() => {
    onParamsChange({
      ...params,
      charterType: 'TIME_CHARTER',
      chartererSavingsSharePercent: 50,
    });
  }, [replayTrigger]);

  const handleCharterTypeSelect = (type: 'VOYAGE' | 'TIME_CHARTER') => {
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

  return (
    <section 
      id="charter" 
      className={`${
        isPresentationMode 
          ? 'w-full h-full flex flex-col justify-between py-4 sm:py-6 px-4 sm:px-8 max-w-7xl mx-auto overflow-y-auto lg:overflow-hidden select-text' 
          : 'py-24 bg-[#020617] border-t border-white/10 relative'
      }`}
    >
      
      <div className={`${isPresentationMode ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 relative z-10'}`}>
        
        {/* Section Header */}
        <div className={`max-w-3xl ${isPresentationMode ? 'mb-4' : 'mb-12'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/20 text-[#00F2FF] text-xs font-mono mb-2 tracking-widest uppercase">
            <Users className="w-3.5 h-3.5" />
            <span>05 // CONTRACTUAL ARCHITECTURE</span>
          </div>
          <h2 className={`${isPresentationMode ? 'text-2xl sm:text-4xl' : 'text-3xl sm:text-5xl'} font-black text-white font-mono tracking-tight leading-tight uppercase`}>
            WHO CAPTURES THE SAVING?
          </h2>
          <p className="text-white/60 font-mono mt-1 text-xs sm:text-sm tracking-wide">
            Maritime shipping operates under two distinct commercial charter contracts. SHIPLOOP resolves the split-incentive dilemma that stalls retrofits.
          </p>
        </div>

        {/* 2 Big Charter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* Card 1: Voyage Charter */}
          <div
            id="btn-charter-voyage"
            onClick={() => handleCharterTypeSelect('VOYAGE')}
            className={`p-7 bg-white/[0.02] border transition-all duration-300 cursor-pointer relative overflow-hidden tech-corner-accent ${
              isVoyage 
                ? 'border-[#00F2FF] shadow-[0_0_25px_rgba(0,242,255,0.15)] bg-white/5' 
                : 'border-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-black border border-[#00F2FF]/40">
                  <User className="w-5 h-5 text-[#00F2FF]" />
                </div>
                <div>
                  <h3 className="text-lg font-mono font-bold text-white tracking-wider">VOYAGE CHARTER (SPOT)</h3>
                  <span className="text-xs font-mono text-[#00F2FF]">Owner Purchases Bunker Fuel</span>
                </div>
              </div>
              {isVoyage && (
                <div className="w-6 h-6 bg-[#00F2FF] text-black flex items-center justify-center font-black text-xs font-mono">
                  ✓
                </div>
              )}
            </div>

            <p className="text-xs text-white/70 font-mono leading-relaxed mb-4">
              The shipowner pays the fuel supplier directly. 100% of physical bunker savings stay on the shipowner's ledger, funding debt service and surplus effortlessly.
            </p>

            <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-white/50 space-y-1">
              <div className="flex justify-between">
                <span>INCENTIVE ALIGNMENT:</span>
                <span className="text-emerald-400 font-bold">100% Natural Alignment</span>
              </div>
              <div className="flex justify-between">
                <span>CONTRACT MODIFICATION:</span>
                <span className="text-white">Standard BIMCO Terms</span>
              </div>
            </div>
          </div>

          {/* Card 2: Time Charter */}
          <div
            id="btn-charter-time"
            onClick={() => handleCharterTypeSelect('TIME_CHARTER')}
            className={`p-7 bg-white/[0.02] border transition-all duration-300 cursor-pointer relative overflow-hidden tech-corner-accent ${
              !isVoyage 
                ? 'border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.15)] bg-white/5' 
                : 'border-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-black border border-emerald-500/40">
                  <Users className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-mono font-bold text-white tracking-wider">TIME CHARTER</h3>
                  <span className="text-xs font-mono text-emerald-400">Charterer Buys Fuel • Owner Provides Ship</span>
                </div>
              </div>
              {!isVoyage && (
                <div className="w-6 h-6 bg-emerald-400 text-black flex items-center justify-center font-black text-xs font-mono">
                  ✓
                </div>
              )}
            </div>

            <p className="text-xs text-white/70 font-mono leading-relaxed mb-4">
              The charterer captures the lower fuel bill. SHIPLOOP provides a <strong className="text-white">BIMCO Green Clause savings-sharing mechanism</strong> that splits the upside fairly.
            </p>

            <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-white/50 space-y-1">
              <div className="flex justify-between">
                <span>INCENTIVE ALIGNMENT:</span>
                <span className="text-[#FFB347] font-bold">Solved via Protocol</span>
              </div>
              <div className="flex justify-between">
                <span>CONTRACT MODIFICATION:</span>
                <span className="text-emerald-400 font-bold">Gain-Share Rider Clause</span>
              </div>
            </div>
          </div>

        </div>

        {/* Interactive Split Mechanism Panel (Active for Time Charter) */}
        {!isVoyage && (
          <div className="p-8 bg-white/[0.02] border border-emerald-500/40 shadow-2xl backdrop-blur-md space-y-6 tech-corner-accent">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  TIME CHARTER GAIN-SHARE ALLOCATION
                </span>
                <p className="text-xs text-white/50 font-mono mt-0.5">
                  Adjust the contractual split percentage between the shipowner (for debt service) and the charterer.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-white/80 bg-black/60 px-3 py-1.5 border border-white/10">
                <span>Total Gross Pool:</span>
                <span className="text-emerald-400 font-bold">₹{result.grossAnnualSavingsINR.toFixed(2)} Cr</span>
              </div>
            </div>

            {/* Split Slider */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#00F2FF] font-bold">
                  Shipowner & Debt Pool: {100 - params.chartererSavingsSharePercent}%
                </span>
                <span className="text-emerald-300 font-bold">
                  Charterer Retained: {params.chartererSavingsSharePercent}%
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
              <div className="p-4 bg-[#020617] border border-[#00F2FF]/30 space-y-1">
                <div className="text-[10px] font-mono text-[#00F2FF] uppercase tracking-wider">SHIPOWNER ALLOCATION</div>
                <div className="text-xl font-mono font-bold text-white">
                  ₹{(result.grossAnnualSavingsINR * (1 - params.chartererSavingsSharePercent / 100)).toFixed(2)} Cr
                </div>
                <div className="text-[11px] font-mono text-white/50">
                  Covers ₹{result.annualRepaymentINR.toFixed(2)} Cr loan + leaves{' '}
                  <span className="text-emerald-400 font-bold">+₹{result.ownerRetainedINR.toFixed(2)} Cr net profit</span>
                </div>
              </div>

              <div className="p-4 bg-[#020617] border border-emerald-500/30 space-y-1">
                <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">CHARTERER DIRECT SAVINGS</div>
                <div className="text-xl font-mono font-bold text-emerald-300">
                  +₹{result.chartererRetainedINR.toFixed(2)} Cr / yr
                </div>
                <div className="text-[11px] font-mono text-white/50">
                  Direct voyage fuel invoice discount on this chartered route
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
