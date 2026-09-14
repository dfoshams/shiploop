import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  MapPin, 
  Building2, 
  Anchor, 
  FileText, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles,
  Compass,
  Play,
  Pause,
  RotateCcw,
  Layers,
  Coins,
  ChevronRight,
  Scale
} from 'lucide-react';
import { DEMO_DATA } from '../data/demoData';
import { IndianPortCluster, SimulationParams, SimulationResult } from '../types';
import { EvidenceMarker } from './india/EvidenceMarker';
import { FinancingFlowVisual } from './india/FinancingFlowVisual';
import { IndianPolicyLayer } from './india/IndianPolicyLayer';
import { BankingModelPanel } from './india/BankingModelPanel';
import { SplitIncentiveAndCharter } from './india/SplitIncentiveAndCharter';
import { CinematicMoneyFlow } from './india/CinematicMoneyFlow';
import { IndiaDeploymentScenario } from './india/IndiaDeploymentScenario';
import { InstitutionalResponsibilityMap } from './india/InstitutionalResponsibilityMap';
import { RiskProtectionsPanel } from './india/RiskProtectionsPanel';
import { IndiaDeploymentPhases } from './india/IndiaDeploymentPhases';
import { IndiaFinancingEnablers } from './india/IndiaFinancingEnablers';

interface GlobalAndIndiaProps {
  isPresentationMode?: boolean;
  replayTrigger?: number;
  isPaused?: boolean;
  params?: SimulationParams;
  result?: SimulationResult;
}

export const GlobalAndIndia: React.FC<GlobalAndIndiaProps> = ({
  isPresentationMode = false,
  replayTrigger = 0,
  isPaused = false,
  params,
  result,
}) => {
  // Selected port for the domestic maritime coastline cluster
  const [selectedPort, setSelectedPort] = useState<IndianPortCluster>(DEMO_DATA.indianPorts[0]);
  const ports = DEMO_DATA.indianPorts;
  const globalSignal = DEMO_DATA.globalSignal;

  // Presentation Mode Stepper (0 to 10 = 11 steps)
  // Step 0: India maritime visual
  // Step 1: Policy layer
  // Step 2: Green finance layer
  // Step 3: Bank layer
  // Step 4: SHIPLOOP appears
  // Step 5: Shipowner / verifier / tech ecosystem
  // Step 6: Retrofit occurs
  // Step 7: Fuel savings appear
  // Step 8: Verified savings flow back
  // Step 9: Repayment reaches bank
  // Step 10: Owner retains future savings -> HOLD
  const [presentationStep, setPresentationStep] = useState<number>(0);
  const [localPaused, setLocalPaused] = useState<boolean>(false);

  const presentationStepLabels = [
    '01 MARITIME MAP',
    '02 POLICY LAYER',
    '03 GREEN FINANCE',
    '04 BANK LAYER',
    '05 SHIPLOOP ORCHESTRATION',
    '06 TRIAD ECOSYSTEM',
    '07 RETROFIT DRYDOCK',
    '08 FUEL SAVINGS',
    '09 VERIFIED TELEMETRY',
    '10 BANK REPAYMENT',
    '11 OWNER VALUE [HOLD]',
  ];

  // Replay trigger resets presentation step
  useEffect(() => {
    setPresentationStep(0);
  }, [replayTrigger]);

  // Presentation Mode step progression
  useEffect(() => {
    if (!isPresentationMode || isPaused || localPaused) return;

    // Advance step every 2.8s until step 10, then HOLD!
    if (presentationStep < 10) {
      const timer = setTimeout(() => {
        setPresentationStep((prev) => Math.min(prev + 1, 10));
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [isPresentationMode, isPaused, localPaused, presentationStep]);

  return (
    <section 
      id="india" 
      className={`${
        isPresentationMode 
          ? 'w-full h-full flex flex-col justify-between py-4 sm:py-6 px-4 sm:px-8 max-w-7xl mx-auto overflow-y-auto select-text font-mono' 
          : 'py-20 sm:py-28 bg-[#020617] border-t border-white/10 relative font-mono'
      }`}
    >
      
      <div className={`${isPresentationMode ? 'w-full space-y-8' : 'max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16'}`}>
        
        {/* ==================================================================== */}
        {/* 1. CHAPTER 09 HEADER & MANDATORY CLASSIFICATION BANNER               */}
        {/* ==================================================================== */}
        <div>
          {/* Top Classification Tag Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 bg-[#00F2FF]/10 border border-[#00F2FF]/50 text-[#00F2FF] font-black uppercase tracking-wider">
                CHAPTER 09 // INDIA DEPLOYMENT
              </span>
              <div className="px-3 py-1 bg-white/5 border border-white/20 text-[#00F2FF] font-bold uppercase text-[11px]">
                [ PROPOSED INDIA MODEL ]
              </div>
            </div>

            <div className="text-[11px] text-white/50 italic">
              "Illustrative deployment architecture — not an existing banking product."
            </div>
          </div>

          {/* Headline & Subheadline */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none">
              FROM GLOBAL PROOF TO INDIAN DEPLOYMENT
            </h2>
            <p className="text-sm sm:text-lg text-white/70 font-normal max-w-4xl leading-relaxed">
              SHIPLOOP adapts the pay-as-you-save retrofit model to India's maritime, banking and green-finance ecosystem.
            </p>
          </div>

          {/* Classification Taxonomy Legend */}
          <div className="flex flex-wrap items-center gap-3 pt-5">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
              VERIFICATION TAXONOMY:
            </span>
            <EvidenceMarker type="VERIFIED" label="VERIFIED" inline={true} />
            <EvidenceMarker type="PROPOSED" label="PROPOSED" inline={true} />
            <EvidenceMarker type="SIMULATION" label="ILLUSTRATIVE SIMULATION" inline={true} />
            <EvidenceMarker type="EVIDENCE_REQUIRED" label="EVIDENCE REQUIRED" inline={true} />
          </div>
        </div>

        {/* ==================================================================== */}
        {/* PRESENTATION MODE STEPPER CONTROLS (Active in Presentation Mode)    */}
        {/* ==================================================================== */}
        {isPresentationMode && (
          <div className="p-4 bg-[#020617] border border-[#00F2FF]/40 space-y-3 tech-corner-accent">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00F2FF] animate-ping" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  PRESENTATION SEQUENCE // STEP {presentationStep + 1} OF 11: {presentationStepLabels[presentationStep]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLocalPaused(!localPaused)}
                  className="px-2 py-1 bg-white/5 border border-white/20 text-xs text-white hover:text-[#00F2FF] transition-colors cursor-pointer"
                >
                  {localPaused ? 'RESUME' : 'PAUSE'}
                </button>
                <button
                  onClick={() => setPresentationStep(0)}
                  className="px-2 py-1 bg-white/5 border border-white/20 text-xs text-white hover:text-[#00F2FF] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> REPLAY (R)
                </button>
                {presentationStep === 10 && (
                  <span className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-bold">
                    HELD — PRESS → TO ADVANCE
                  </span>
                )}
              </div>
            </div>

            {/* Stepper Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-1.5 text-[10px]">
              {presentationStepLabels.map((lbl, idx) => (
                <button
                  key={idx}
                  onClick={() => setPresentationStep(idx)}
                  className={`p-1.5 border text-center transition-all cursor-pointer truncate ${
                    presentationStep === idx
                      ? 'bg-[#00F2FF] text-black font-black border-[#00F2FF]'
                      : presentationStep > idx
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-white/5 text-white/50 border-white/10'
                  }`}
                >
                  {lbl.split(' ')[0]} {lbl.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* 2. MAIN VISUAL: FINANCING FLOW (11-Node Animated Vector Circuit)    */}
        {/* ==================================================================== */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#00F2FF] uppercase tracking-widest">
              01 // CORE ARCHITECTURE
            </span>
          </div>
          <FinancingFlowVisual activeStep={isPresentationMode ? presentationStep : 10} />
        </div>

        {/* ==================================================================== */}
        {/* 3. POLICY LAYER (Maritime India Vision 2030, Green Finance, MoPSW)  */}
        {/* ==================================================================== */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#00F2FF] uppercase tracking-widest">
              02 // STATUTORY & POLICY CONTEXT
            </span>
          </div>
          <IndianPolicyLayer />
        </div>

        {/* ==================================================================== */}
        {/* 3.5 WHY THIS CAN BECOME BANKABLE IN INDIA (Financing Enablers)      */}
        {/* ==================================================================== */}
        <div className="space-y-3">
          <IndiaFinancingEnablers />
        </div>

        {/* ==================================================================== */}
        {/* 4. BANKING MODEL: "HOW THE BANK PARTICIPATES" & FINANCING STACK      */}
        {/* ==================================================================== */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#00F2FF] uppercase tracking-widest">
              03 // BANKING INTEGRATION
            </span>
          </div>
          <BankingModelPanel />
        </div>

        {/* ==================================================================== */}
        {/* 5. THE SPLIT-INCENTIVE PROBLEM & CHARTER LOGIC (VOYAGE vs TIME)      */}
        {/* ==================================================================== */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#00F2FF] uppercase tracking-widest">
              04 // CONTRACTUAL ALIGNMENT
            </span>
          </div>
          <SplitIncentiveAndCharter />
        </div>

        {/* ==================================================================== */}
        {/* 6. CINEMATIC MONEY FLOW ANIMATION                                    */}
        {/* ==================================================================== */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#00F2FF] uppercase tracking-widest">
              05 // CASHFLOW TRAJECTORY
            </span>
          </div>
          <CinematicMoneyFlow 
            isPresentationMode={isPresentationMode} 
            isPaused={isPaused || localPaused} 
            replayTrigger={replayTrigger} 
          />
        </div>

        {/* ==================================================================== */}
        {/* 7. FINANCIAL WATERFALL & INDIA DEPLOYMENT SCENARIOS                  */}
        {/* ==================================================================== */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#00F2FF] uppercase tracking-widest">
              06 // UNDERWRITING SIMULATION
            </span>
          </div>
          <IndiaDeploymentScenario initialParams={params} />
        </div>

        {/* ==================================================================== */}
        {/* 8. WHO DOES WHAT? & "SHIPLOOP DOES NOT NEED TO REPLACE THE BANK"     */}
        {/* ==================================================================== */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#00F2FF] uppercase tracking-widest">
              07 // INSTITUTIONAL RESPONSIBILITY
            </span>
          </div>
          <InstitutionalResponsibilityMap />
        </div>

        {/* ==================================================================== */}
        {/* 9. RISK CONTROLS: "WHAT PROTECTS THE BANK?"                          */}
        {/* ==================================================================== */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#00F2FF] uppercase tracking-widest">
              08 // RISK GOVERNANCE
            </span>
          </div>
          <RiskProtectionsPanel />
        </div>

        {/* ==================================================================== */}
        {/* 10. INDIA DEPLOYMENT PHASES (4-Stage Expansion Roadmap)              */}
        {/* ==================================================================== */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#00F2FF] uppercase tracking-widest">
              09 // EXPANSION PHASES
            </span>
          </div>
          <IndiaDeploymentPhases />
        </div>

        {/* ==================================================================== */}
        {/* 11. DOMESTIC MARITIME GEOGRAPHY & STRATEGIC PORT CLUSTERS            */}
        {/* ==================================================================== */}
        <div className="space-y-6 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                10 // MARITIME GEOGRAPHY
              </span>
              <h3 className="text-base sm:text-xl font-black text-white uppercase tracking-tight mt-0.5">
                DOMESTIC PORT CORRIDORS & CLUSTER DENSITY
              </h3>
            </div>
            <EvidenceMarker type="VERIFIED" label="VERIFIED MARITIME DATA" source="Sagarmala Portal (2024)" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Coastline Interactive Map (6 Cols) */}
            <div className="lg:col-span-6 p-6 bg-white/[0.02] border border-white/10 tech-corner-accent space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 text-xs">
                <span className="font-bold text-emerald-400 uppercase">PENINSULAR STRATEGIC CLUSTERS</span>
                <span className="text-[10px] text-white/40">7,517 KM COASTLINE</span>
              </div>

              {/* Stylized Coastline Map */}
              <div className="relative h-72 w-full bg-[#020617] border border-white/10 flex items-center justify-center overflow-hidden p-4">
                <svg viewBox="0 0 400 400" className="w-full h-full opacity-60">
                  <path
                    d="M 80 80 Q 140 100, 180 80 Q 240 70, 320 120 L 300 200 L 250 280 L 190 360 L 130 280 L 90 180 Z"
                    fill="#0f172a"
                    stroke="#334155"
                    strokeWidth="1.5"
                  />
                  <circle cx="190" cy="360" r="120" fill="none" stroke="#00F2FF" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.3" />
                </svg>

                {ports.map((port) => {
                  const isSelected = selectedPort.id === port.id;
                  return (
                    <div
                      key={port.id}
                      onClick={() => setSelectedPort(port)}
                      style={{
                        left: `${port.coordinates.x}%`,
                        top: `${port.coordinates.y}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                    >
                      <div className="relative flex items-center justify-center">
                        <span className={`w-4 h-4 rounded-full transition-all ${
                          isSelected ? 'bg-emerald-400 animate-ping opacity-75' : 'group-hover:scale-125'
                        }`} />
                        <span className={`absolute w-3.5 h-3.5 border transition-all ${
                          isSelected ? 'bg-emerald-400 border-white shadow-[0_0_15px_rgba(16,185,129,0.8)] scale-125' : 'bg-[#00F2FF] border-slate-950'
                        }`} />
                      </div>
                      
                      <span className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] px-2 py-0.5 shadow-lg transition-all ${
                        isSelected 
                          ? 'bg-emerald-400 text-slate-950 font-bold' 
                          : 'bg-[#020617] text-white/80 border border-white/20 group-hover:border-[#00F2FF]'
                      }`}>
                        {port.name.split('/')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Selected Port Profile Card */}
              <div className="p-4 bg-[#020617] border border-emerald-500/40 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">{selectedPort.name}</span>
                  <span className="text-emerald-400 font-bold">₹{selectedPort.potentialRetrofitMarketSizeINRCr} Cr Pool</span>
                </div>
                <div className="text-white/50 text-[11px]">
                  Region: <span className="text-white">{selectedPort.region}</span> • Annual Calls: <span className="text-[#00F2FF] font-bold">{selectedPort.annualVesselCalls.toLocaleString()}</span>
                </div>
                <p className="text-white/70 text-xs font-normal">
                  {selectedPort.strategicFocus}
                </p>
              </div>
            </div>

            {/* Global Signal Benchmark Reference (FEET) (6 Cols) */}
            <div className="lg:col-span-6 p-6 bg-white/[0.02] border border-white/10 tech-corner-accent space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 text-xs">
                <span className="font-bold text-[#00F2FF] uppercase">GLOBAL SIGNAL: {globalSignal.programName}</span>
                <span className="text-[10px] px-2 py-0.5 bg-white/5 border border-amber-400/40 text-amber-400 font-bold uppercase">
                  RESEARCH REFERENCE
                </span>
              </div>

              <p className="text-xs text-white/70 font-normal leading-relaxed">
                Global maritime decarbonization initiatives demonstrate that pay-as-you-save retrofit structures unlock private capital at scale when backed by high-precision telemetry and third-party verification.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#020617] border border-white/10 space-y-1">
                  <span className="text-[10px] text-white/40 block uppercase">TARGET PIPELINE</span>
                  <span className="text-white font-bold">{globalSignal.placeholders.FEET_FUND_SIZE}</span>
                </div>
                <div className="p-3 bg-[#020617] border border-white/10 space-y-1">
                  <span className="text-[10px] text-white/40 block uppercase">TARGET FLEET</span>
                  <span className="text-white font-bold">{globalSignal.placeholders.FEET_TARGET}</span>
                </div>
                <div className="p-3 bg-[#020617] border border-white/10 space-y-1 sm:col-span-2">
                  <span className="text-[10px] text-white/40 block uppercase">FINANCING VEHICLE</span>
                  <span className="text-emerald-400 font-bold">{globalSignal.placeholders.FEET_FINANCING_STRUCTURE}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
