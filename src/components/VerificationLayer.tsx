import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  FileCheck, 
  Hash, 
  CheckCircle2, 
  Radio, 
  Info, 
  ExternalLink,
  Lock
} from 'lucide-react';
import { DEMO_DATA } from '../data/demoData';
import { SimulationParams, SimulationResult } from '../types';

interface VerificationLayerProps {
  params: SimulationParams;
  result: SimulationResult;
  isPresentationMode?: boolean;
  replayTrigger?: number;
  isPaused?: boolean;
}

export const VerificationLayer: React.FC<VerificationLayerProps> = ({
  params,
  result,
  isPresentationMode = false,
  replayTrigger = 0,
  isPaused = false,
}) => {
  const [activeTelemetryIndex, setActiveTelemetryIndex] = useState<number>(6);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  const telemetryData = DEMO_DATA.telemetrySample;
  const currentHoveredPoint = telemetryData[activeTelemetryIndex] || telemetryData[0];

  // Reset telemetry index on replay
  React.useEffect(() => {
    setActiveTelemetryIndex(0);
  }, [replayTrigger]);

  // Auto-cycle telemetry index in presentation mode
  React.useEffect(() => {
    if (!isPresentationMode || isPaused) return;
    const interval = setInterval(() => {
      setActiveTelemetryIndex((prev) => (prev + 1) % telemetryData.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isPresentationMode, isPaused, telemetryData.length]);

  return (
    <section 
      id="verification" 
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
            <ShieldCheck className="w-3.5 h-3.5 text-[#00F2FF]" />
            <span>06 // TRUST & ORACLE LAYER</span>
          </div>
          <h2 className={`${isPresentationMode ? 'text-2xl sm:text-4xl' : 'text-3xl sm:text-5xl'} font-black text-white font-mono tracking-tight leading-tight uppercase`}>
            DON'T FINANCE THE PROMISE.{' '}
            <span className="text-[#00F2FF] underline decoration-[#00F2FF]/40">
              FINANCE THE VERIFIED SAVING.
            </span>
          </h2>
          <p className="text-white/60 font-mono mt-1 text-xs sm:text-sm tracking-wide">
            Lenders cannot underwrite unverified marketing claims. SHIPLOOP deploys a continuous IoT measurement baseline audited by international classification societies to verify actual kilowatt-hour savings.
          </p>
        </div>

        {/* 6-Stage Ingestion Pipeline */}
        <div className="mb-12 p-6 bg-white/[0.02] border border-white/10 backdrop-blur-md tech-corner-accent">
          <div className="text-[11px] font-mono text-white/50 mb-4 uppercase tracking-widest flex items-center justify-between">
            <span>DATA TELEMETRY & SETTLEMENT PIPELINE</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              LIVE_ORACLE_INGESTION
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { step: '01', name: 'VESSEL DATA', desc: 'Torque & flow sensors', icon: Cpu },
              { step: '02', name: 'MEASUREMENT', desc: 'Normalized for weather', icon: Activity },
              { step: '03', name: 'BASELINE', desc: 'Pre-retrofit CFD curve', icon: Hash },
              { step: '04', name: 'ACTUALS', desc: 'Real voyage fuel burn', icon: Activity },
              { step: '05', name: 'CLASS AUDIT', desc: 'IRS / DNV / BV verify', icon: ShieldCheck },
              { step: '06', name: 'SETTLEMENT', desc: 'Escrow release to bank', icon: FileCheck },
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={p.name} className="p-3 bg-[#020617] border border-white/10 space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                    <span>{p.step}</span>
                    <Icon className="w-3.5 h-3.5 text-[#00F2FF]" />
                  </div>
                  <div className="text-xs font-mono font-bold text-white">{p.name}</div>
                  <div className="text-[10px] text-white/50 font-mono leading-tight">{p.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column: Interactive Scientific Graph on Left, Certificate on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Scientific Telemetry Baseline Graph (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-white/[0.02] border border-white/10 shadow-2xl space-y-6 tech-corner-accent">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white uppercase tracking-wider">ISO 19030 NORMALIZED SPEED-POWER PROFILE</span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1 text-rose-400">
                  <span className="w-2.5 h-2.5 bg-rose-500 inline-block" /> Baseline
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2.5 h-2.5 bg-emerald-400 inline-block" /> Verified Post-Retrofit
                </span>
              </div>
            </div>

            {/* SVG Interactive Chart */}
            <div className="relative h-64 w-full bg-[#020617] p-4 border border-white/10 flex items-end">
              
              {/* Background Grid Lines */}
              <div className="absolute inset-4 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-white/30 w-full" />
                <div className="border-b border-white/30 w-full" />
                <div className="border-b border-white/30 w-full" />
                <div className="border-b border-white/30 w-full" />
              </div>

              {/* Data points and curves */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="savingZoneGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#00F2FF" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Shaded Verified Savings Polygon */}
                <polygon
                  points="20,40 60,35 120,42 180,28 240,36 300,43 360,38 420,24 480,41 480,95 420,80 360,93 300,97 240,92 180,82 120,95 60,91 20,94"
                  fill="url(#savingZoneGrad)"
                />

                {/* Baseline Line (Red) */}
                <polyline
                  points="20,40 60,35 120,42 180,28 240,36 300,43 360,38 420,24 480,41"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />

                {/* Post-Retrofit Line (Green) */}
                <polyline
                  points="20,94 60,91 120,95 180,82 240,92 300,97 360,93 420,80 480,95"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />

                {/* Interactive Points */}
                {telemetryData.map((d, i) => {
                  const x = 20 + (i / (telemetryData.length - 1)) * 460;
                  const baselineY = 40 + (35 - d.baselineTonnes) * 8;
                  const postY = 90 + (30 - d.postRetrofitTonnes) * 8;
                  const isHovered = activeTelemetryIndex === i;

                  return (
                    <g key={d.day} onMouseEnter={() => setActiveTelemetryIndex(i)} className="cursor-pointer">
                      <circle cx={x} cy={baselineY} r={isHovered ? 5 : 3} fill="#f43f5e" />
                      <circle cx={x} cy={postY} r={isHovered ? 6 : 4} fill="#10b981" />
                      {isHovered && (
                        <line x1={x} y1="10" x2={x} y2="190" stroke="#00F2FF" strokeWidth="1.5" strokeDasharray="3 3" />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Axis labels */}
              <div className="absolute -bottom-5 left-4 right-4 flex justify-between text-[10px] font-mono text-white/40">
                <span>Day 1 (Drydock Exit)</span>
                <span>Day 150 (Mid-Year)</span>
                <span>Day 300 (Annual Audit)</span>
              </div>
            </div>

            {/* Live Hover Telemetry Inspection Box */}
            <div className="p-4 bg-[#020617] border border-[#00F2FF]/30 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div>
                <span className="text-white/40">INSPECTED POINT:</span>{' '}
                <span className="text-white font-bold">Voyage Day {currentHoveredPoint.day}</span>
              </div>
              <div>
                <span className="text-rose-400 font-bold">Base: {currentHoveredPoint.baselineTonnes} t/day</span>
                <span className="text-white/20 mx-2">|</span>
                <span className="text-emerald-400 font-bold">Actual: {currentHoveredPoint.postRetrofitTonnes} t/day</span>
              </div>
              <div className="text-[#00F2FF] font-bold">
                Delta: -{(currentHoveredPoint.baselineTonnes - currentHoveredPoint.postRetrofitTonnes).toFixed(1)} t/day (-15.2%)
              </div>
            </div>

          </div>

          {/* RIGHT: Institutional Digital Verification Record (5 Cols) */}
          <div className="lg:col-span-5 p-7 bg-white/[0.02] border border-emerald-500/40 shadow-2xl space-y-6 tech-corner-accent">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>CRYPTOGRAPHIC VERIFICATION RECORD</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800">
                AUDITED
              </span>
            </div>

            {/* Institutional Certificate Card */}
            <div className="p-5 bg-[#020617] border border-white/10 font-mono space-y-3.5 text-xs">
              <div className="flex justify-between items-center text-white/50 border-b border-white/10 pb-2">
                <span>CERTIFICATE ID:</span>
                <span className="text-[#00F2FF] font-bold">SL-VER-849201</span>
              </div>

              <div className="flex justify-between items-center text-white/50">
                <span>TARGET ASSET:</span>
                <span className="text-white font-bold">DEMO-001 (Panamax Bulk)</span>
              </div>

              <div className="flex justify-between items-center text-white/50">
                <span>BASELINE CONSUMPTION:</span>
                <span className="text-rose-400">{params.annualFuelConsumption.toLocaleString()} tonnes/yr</span>
              </div>

              <div className="flex justify-between items-center text-white/50">
                <span>POST-RETROFIT AUDIT:</span>
                <span className="text-emerald-300">{result.postRetrofitFuelConsumptionTonnes.toLocaleString()} tonnes/yr</span>
              </div>

              <div className="flex justify-between items-center text-white/50">
                <span>MEASURED EFFICIENCY:</span>
                <span className="text-emerald-400 font-bold">+{params.efficiencyImprovementPercent.toFixed(1)}% Verified</span>
              </div>

              <div className="flex justify-between items-center text-white/50">
                <span>MONETARY SETTLEMENT:</span>
                <span className="text-white font-bold">₹{result.grossAnnualSavingsINR.toFixed(2)} Cr Released</span>
              </div>

              <div className="pt-2 border-t border-white/10 text-[10px] text-white/40 break-all">
                <span>ORACLE PROOF HASH:</span>
                <p className="text-white/60 font-mono mt-0.5">0x8f7b2c91a4e5d6f3910c281e594d7b1a03f49c81</p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[10px] text-white/50 border-t border-white/10">
                <span>AUDITING CLASSIFIER:</span>
                <span className="text-[#00F2FF]">IRClass / DNV Maritime (Demo)</span>
              </div>
            </div>

            <div className="text-xs text-white/50 font-mono leading-relaxed">
              * Smart contract or escrow trustee automatically triggers loan installment transfer to the financing bank once verification certificate is validated by Class authority.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
