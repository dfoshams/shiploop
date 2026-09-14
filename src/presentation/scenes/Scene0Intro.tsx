import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Activity, Fuel, Gauge, Anchor, Compass } from 'lucide-react';
import { usePresentation } from '../PresentationContext';
import { cinematicAudio } from '../../utils/cinematicAudio';

export const Scene0Intro: React.FC = () => {
  const { isPaused, togglePause, sceneTransitionKey, simParams } = usePresentation();
  const [hasVoyageStarted, setHasVoyageStarted] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [fuelBurn, setFuelBurn] = useState<number>(14.2);
  const [speed, setSpeed] = useState<number>(13.8);
  const [engineLoad, setEngineLoad] = useState<number>(78);

  const annualFuelTonnes = simParams.annualFuelConsumption || 10000;
  const fuelPricePerTonne = simParams.fuelPricePerTonneINR;
  const annualFuelSpendCr = (annualFuelTonnes * fuelPricePerTonne) / 10000000;
  const dailyBunkerBurnLakh = (annualFuelSpendCr * 100) / (simParams.operatingDays || 300);

  // Toggle Audio
  const toggleAudio = () => {
    const next = !isAudioMuted;
    setIsAudioMuted(next);
    cinematicAudio.setMuted(next);
  };

  const handleStartVoyage = () => {
    setHasVoyageStarted(true);
    cinematicAudio.playTransitionChime(440);
  };

  // Reset when scene transitions
  useEffect(() => {
    setHasVoyageStarted(false);
    setFuelBurn(14.2);
  }, [sceneTransitionKey]);

  // Telemetry tick
  useEffect(() => {
    if (isPaused || !hasVoyageStarted) return;

    const interval = setInterval(() => {
      setSpeed(+(13.7 + Math.random() * 0.3).toFixed(1));
      setEngineLoad(Math.floor(76 + Math.random() * 5));
      setFuelBurn((prev) => +(prev + 0.05).toFixed(2));
    }, 200);

    return () => clearInterval(interval);
  }, [isPaused, hasVoyageStarted]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto">
      
      {/* Top Scene Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#00F2FF] rotate-45" />
          <div>
            <span className="text-xs font-mono text-[#00F2FF] font-bold tracking-widest uppercase">
              CHAPTER 00 // DEEP SEA COMMERCIAL LOGISTICS
            </span>
            <h1 className="text-2xl sm:text-4xl font-black font-mono text-white tracking-tight uppercase">
              THE STATUS QUO: PANAMAX AT SEA
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            onClick={toggleAudio}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition-colors"
            title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-[#00F2FF]" />}
          </button>
          <div className="px-3 py-1 bg-white/5 border border-white/10 text-[#00F2FF] uppercase tracking-wider font-bold">
            {hasVoyageStarted ? 'VOYAGE_ACTIVE' : 'READY_TO_COMMENCE'}
          </div>
        </div>
      </div>

      {/* Center Cinematic Stage */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 my-6">
        
        {/* Vessel Graphic & Water Animation */}
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
          
          {/* Animated Vessel Outline */}
          <div className="relative w-full max-w-xl h-44 sm:h-56 flex items-center justify-center">
            
            {/* Ambient Water Waves */}
            <div className="absolute inset-x-0 bottom-4 h-12 flex items-center overflow-hidden opacity-40">
              <div className={`w-[200%] h-full flex items-center ${hasVoyageStarted && !isPaused ? 'animate-pulse' : ''}`}>
                <div className="w-full border-b border-dashed border-[#00F2FF]/60" />
                <div className="w-full border-b border-dashed border-[#00F2FF]/60" />
              </div>
            </div>

            {/* Vessel Silhouette SVG */}
            <svg viewBox="0 0 800 240" className="w-full h-full text-white drop-shadow-[0_0_25px_rgba(0,242,255,0.25)]">
              {/* Hull outline */}
              <path
                d="M 60,150 L 140,195 L 680,195 L 750,135 L 710,135 L 660,180 L 150,180 L 95,150 Z"
                fill="none"
                stroke="#00F2FF"
                strokeWidth="2.5"
              />
              {/* Superstructure / Bridge */}
              <rect x="150" y="85" width="110" height="65" fill="#020617" stroke="#00F2FF" strokeWidth="2" />
              <rect x="170" y="55" width="70" height="30" fill="#020617" stroke="#00F2FF" strokeWidth="2" />
              <line x1="205" y1="20" x2="205" y2="55" stroke="#00F2FF" strokeWidth="2" />
              <circle cx="205" cy="20" r="3" fill="#00F2FF" />

              {/* Cargo Holds */}
              <rect x="290" y="125" width="90" height="25" fill="#020617" stroke="#38BDF8" strokeWidth="1.5" />
              <rect x="410" y="125" width="90" height="25" fill="#020617" stroke="#38BDF8" strokeWidth="1.5" />
              <rect x="530" y="125" width="90" height="25" fill="#020617" stroke="#38BDF8" strokeWidth="1.5" />

              {/* Exhaust Plume / Fuel Burn */}
              {hasVoyageStarted && (
                <g className={isPaused ? '' : 'animate-pulse'}>
                  <line x1="240" y1="55" x2="240" y2="30" stroke="#FFB347" strokeWidth="3" />
                  <circle cx="240" cy="20" r="6" fill="#FFB347" opacity="0.7" />
                  <circle cx="250" cy="10" r="9" fill="#FFB347" opacity="0.4" />
                </g>
              )}

              {/* Bow Wave */}
              {hasVoyageStarted && (
                <path d="M 730,150 Q 770,170 790,190" fill="none" stroke="#00F2FF" strokeWidth="2" strokeDasharray="4 4" />
              )}
            </svg>

            {/* Vessel Tag */}
            <div className="absolute top-2 left-4 font-mono text-[11px] text-white/60 bg-[#020617]/90 px-2.5 py-1 border border-white/10">
              PANAMAX 75,000 DWT • INDIAN OCEAN TRANSIT
            </div>
          </div>

          {/* Enter Voyage Trigger */}
          {!hasVoyageStarted && (
            <div className="mt-4">
              <button
                onClick={handleStartVoyage}
                className="px-8 py-3 bg-[#00F2FF] hover:bg-[#00F2FF]/90 text-black font-mono font-black text-sm tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(0,242,255,0.4)] flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>ENTER VOYAGE → COMMENCE TELEMETRY</span>
              </button>
            </div>
          )}

          {hasVoyageStarted && (
            <div className="mt-2 text-center font-mono text-xs text-white/50">
              <span>VOYAGE SIMULATION STREAMING • PRESS </span>
              <span className="text-[#00F2FF] font-bold">SPACE</span>
              <span> TO PAUSE • </span>
              <span className="text-[#00F2FF] font-bold">→</span>
              <span> FOR NEXT SLIDE</span>
            </div>
          )}
        </div>

        {/* Live Gauges Column */}
        <div className="w-full lg:w-2/5 space-y-4">
          
          {/* Main Giant Fuel Burn Card */}
          <div className="p-6 bg-white/[0.03] border border-white/10 tech-corner-accent">
            <div className="flex items-center justify-between text-xs font-mono text-[#FFB347] font-bold mb-2">
              <span className="flex items-center gap-1.5">
                <Fuel className="w-4 h-4" />
                <span>ANNUAL BUNKER DRAINAGE</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#FFB347]/10 border border-[#FFB347]/30">
                CRITICAL OPEX
              </span>
            </div>

            <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight mb-1">
              ₹{annualFuelSpendCr.toFixed(1)} <span className="text-2xl text-[#FFB347]">Cr/yr</span>
            </div>

            <div className="text-xs font-mono text-white/60">
              {annualFuelTonnes.toLocaleString()} MT fuel burned annually @ ₹{fuelPricePerTonne.toLocaleString()}/MT
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-white/40">Daily Bunker Burn:</span>
              <span className="text-[#FFB347] font-bold text-sm">~₹{dailyBunkerBurnLakh.toFixed(1)} Lakh / day</span>
            </div>
          </div>

          {/* Sub Telemetry Grid */}
          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-4 bg-white/[0.02] border border-white/10">
              <div className="text-[10px] text-white/40 uppercase mb-1">CRUISING SPEED</div>
              <div className="text-2xl font-bold text-white tracking-tight">
                {speed} <span className="text-xs text-[#00F2FF] font-normal">knots</span>
              </div>
              <div className="text-[10px] text-white/40 mt-1">Design Speed: 14.0 kn</div>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/10">
              <div className="text-[10px] text-white/40 uppercase mb-1">ENGINE LOAD (MCR)</div>
              <div className="text-2xl font-bold text-white tracking-tight">
                {engineLoad}% <span className="text-xs text-emerald-400 font-normal">STEADY</span>
              </div>
              <div className="text-[10px] text-white/40 mt-1">MAN B&W 6S60ME-C</div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Key Takeaway Callout */}
      <div className="p-4 bg-[#00F2FF]/5 border border-[#00F2FF]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-white/80">
          <span className="font-bold text-[#00F2FF] uppercase">CORE TENSION:</span>
          <span>Bunker fuel represents 40% to 50% of commercial vessel operating costs, fully burned with zero capital recovery.</span>
        </div>
        <div className="text-white/40 text-right shrink-0">
          HOLDING STATE • ADVANCE WITH [→]
        </div>
      </div>

    </div>
  );
};
