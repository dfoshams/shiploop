import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, RefreshCw, Layers, ShieldCheck, Banknote } from 'lucide-react';
import { DEMO_DATA } from '../data/demoData';
import { calculateSimulation } from '../logic/financialModel';
import { SourceButton } from './SourceButton';

const insightSim = calculateSimulation(DEMO_DATA.defaultSimulationParams);
const defaultParams = DEMO_DATA.defaultSimulationParams;

interface TheInsightProps {
  isPresentationMode?: boolean;
  replayTrigger?: number;
  isPaused?: boolean;
}

export const TheInsight: React.FC<TheInsightProps> = ({
  isPresentationMode = false,
  replayTrigger = 0,
  isPaused = false,
}) => {
  const [pulseStep, setPulseStep] = useState(0);

  // Replay trigger resets pulse step
  useEffect(() => {
    setPulseStep(0);
  }, [replayTrigger]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setPulseStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      id="insight" 
      className={`${
        isPresentationMode 
          ? 'w-full h-full flex flex-col justify-between py-4 sm:py-8 px-4 sm:px-8 max-w-6xl mx-auto overflow-y-auto lg:overflow-hidden text-center select-text' 
          : 'py-28 bg-[#020617] border-t border-white/10 relative overflow-hidden text-center'
      }`}
    >
      
      <div className={`${isPresentationMode ? 'w-full' : 'max-w-5xl mx-auto px-4 sm:px-6 relative z-10'}`}>
        
        {/* Core Question Highlight */}
        <div className="mb-3 sm:mb-6 inline-flex items-center gap-2 px-4 py-1 bg-white/5 border border-white/20 text-[#00F2FF] text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#00F2FF]" />
          <span>THE FINANCIAL REVOLUTION</span>
        </div>

        <h2 className={`${isPresentationMode ? 'text-2xl sm:text-5xl mb-4' : 'text-3xl sm:text-6xl mb-8'} font-black text-white font-mono tracking-tight leading-tight uppercase`}>
          WHAT IF THE SAVINGS WERE THE{' '}
          <span className="text-[#00F2FF] underline decoration-[#00F2FF]/40">
            AMORTIZATION?
          </span>
        </h2>

        <p className={`${isPresentationMode ? 'text-xs sm:text-sm mb-6 max-w-2xl' : 'text-base sm:text-lg mb-16 max-w-3xl'} text-white/60 font-mono mx-auto font-normal leading-relaxed`}>
          Instead of locking shipowner corporate equity, the retrofit is funded through a dedicated SPV and serviced solely by <strong className="text-white">cryptographically verified bunker fuel savings</strong>.
        </p>

        {/* Animated Molecular Fuel-to-Money Flow Diagram */}
        <div className={`${isPresentationMode ? 'p-4 sm:p-8' : 'p-8 sm:p-12'} bg-white/[0.02] border border-white/10 shadow-2xl tech-corner-accent relative`}>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative">
            
            {/* Step 1: Fuel Saved */}
            <div className={`p-6 bg-[#020617] border transition-all duration-300 tech-corner-accent ${
              pulseStep === 0 || pulseStep === 1 ? 'border-[#00F2FF] shadow-[0_0_20px_rgba(0,242,255,0.25)]' : 'border-white/10'
            }`}>
              <div className="w-12 h-12 bg-white/5 border border-[#00F2FF]/40 flex items-center justify-center mx-auto mb-4 text-[#00F2FF]">
                <span className="font-mono font-bold text-xs">FUEL</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-[#00F2FF] font-bold uppercase tracking-wider">01 UNBURNED FUEL</span>
                <SourceButton evidenceId="TECH-001" />
              </div>
              <div className="text-xl font-mono font-black text-white mb-2">{insightSim.annualFuelSavedTonnes.toLocaleString()} Tonnes</div>
              <p className="text-xs text-white/50 font-mono">
                Flettner rotor wind assistance avoids {defaultParams.efficiencyImprovementPercent.toFixed(1)}% of annual bunker consumption at sea.
              </p>
            </div>

            {/* Step 2: Digital Transformation to Rupee / Currency */}
            <div className={`p-6 bg-[#020617] border transition-all duration-300 tech-corner-accent ${
              pulseStep === 1 || pulseStep === 2 ? 'border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)]' : 'border-white/10'
            }`}>
              <div className="w-12 h-12 bg-white/5 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                <Banknote className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">02 CASH VALUE</div>
              <div className="text-xl font-mono font-black text-white mb-2">₹{insightSim.grossAnnualSavingsINR.toFixed(2)} Cr / yr</div>
              <p className="text-xs text-white/50 font-mono">
                Avoided bunker invoices convert into real-time operational liquidity.
              </p>
            </div>

            {/* Step 3: Debt Settlement & Loop Back */}
            <div className={`p-6 bg-[#020617] border transition-all duration-300 tech-corner-accent ${
              pulseStep === 2 || pulseStep === 3 ? 'border-[#FFB347] shadow-[0_0_20px_rgba(255,179,71,0.25)]' : 'border-white/10'
            }`}>
              <div className="w-12 h-12 bg-white/5 border border-[#FFB347]/40 flex items-center justify-center mx-auto mb-4 text-[#FFB347]">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-[#FFB347] font-bold uppercase tracking-wider mb-1">03 REPAYMENT LOOP</div>
              <div className="text-xl font-mono font-black text-white mb-2">₹{insightSim.annualRepaymentINR.toFixed(2)} Cr Debt Service</div>
              <p className="text-xs text-white/50 font-mono">
                Verified savings service senior debt with remaining value retained by the shipowner.
              </p>
            </div>

          </div>

          {/* Bottom Brand Architecture Callout */}
          <div className="mt-10 pt-8 border-t border-white/10 text-center">
            <div className="inline-block">
              <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-widest uppercase">
                SHIP<span className="text-[#00F2FF]">LOOP</span>
              </div>
              <div className="text-xs font-mono text-white/50 mt-1 uppercase tracking-widest">
                A SAVINGS-LINKED FINANCING ARCHITECTURE FOR MARITIME DECARBONIZATION
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
