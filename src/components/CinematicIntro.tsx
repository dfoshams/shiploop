import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft, 
  FastForward, 
  Sliders, 
  ArrowRight,
  Shield,
  Activity,
  Layers,
  Sparkles,
  Zap,
  Wind
} from 'lucide-react';
import { DEMO_DATA } from '../data/demoData';
import { cinematicAudio } from '../utils/cinematicAudio';

interface CinematicIntroProps {
  onExplore?: () => void;
  onGoToSimulator?: () => void;
  onComplete?: () => void;
  onSkip?: () => void;
  onReplay?: () => void;
  isPresentationMode?: boolean;
  replayTrigger?: number;
  isPaused?: boolean;
}

const SCENE_NAMES = [
  'GATE',
  '01 VOYAGE',
  '02 TELEMETRY',
  '03 FUEL BURN',
  '04 COST OF MILES',
  '05 MONETIZE',
  '06 THE QUESTION',
  '07 GREEN TECH',
  '08 RETROFIT CAPEX',
  '09 THE GAP',
  '10 THE REVEAL',
  '11 THE LOOP',
  '12 CONCLUSION',
];

// Timing durations per scene in milliseconds
const SCENE_DURATIONS = [
  0,     // 0: Gate (waits for click)
  4500,  // 1: Enter voyage
  4200,  // 2: Telemetry
  4800,  // 3: Fuel burning
  4500,  // 4: Every mile has a cost
  4800,  // 5: Monetize cost (INR Cr)
  3800,  // 6: The question -> Green Tech
  5200,  // 7: Green technology modules
  4600,  // 8: Retrofit Capex problem
  4800,  // 9: The Financial Gap
  4500,  // 10: The Reveal
  5200,  // 11: The SHIPLOOP Loop
  999999,// 12: Final interactive conclusion
];

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  onExplore = () => {},
  onGoToSimulator = () => {},
  onComplete,
  onSkip,
  onReplay,
  isPresentationMode = false,
  replayTrigger = 0,
  isPaused,
}) => {
  const [scene, setScene] = useState<number>(isPresentationMode ? 1 : 0); // 0 = Gate screen, 1 in presentation
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [fuelBurnTicker, setFuelBurnTicker] = useState<number>(0.0);
  const [speedJitter, setSpeedJitter] = useState<number>(13.8);
  const [engineLoadJitter, setEngineLoadJitter] = useState<number>(78);
  const [fuelFlowJitter, setFuelFlowJitter] = useState<number>(33.3);
  const [subStep, setSubStep] = useState<number>(0);

  // Sync replayTrigger in Presentation Mode
  useEffect(() => {
    if (isPresentationMode) {
      setScene(1);
      setIsPlaying(true);
      setSubStep(0);
      setFuelBurnTicker(0.0);
      cinematicAudio.playTransitionChime(440);
    }
  }, [replayTrigger, isPresentationMode]);

  // Sync isPaused in Presentation Mode
  useEffect(() => {
    if (isPresentationMode && isPaused !== undefined) {
      setIsPlaying(!isPaused);
    }
  }, [isPaused, isPresentationMode]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Demo constants from demoData
  const annualFuel = DEMO_DATA.defaultSimulationParams.annualFuelConsumption; // 10,000 t
  const fuelPrice = DEMO_DATA.defaultSimulationParams.fuelPricePerTonneINR; // ₹50,000
  const annualCostCr = ((annualFuel * fuelPrice) / DEMO_DATA.constants.inrCroreToUnits).toFixed(2); // 50.00 Cr
  const retrofitCostCr = DEMO_DATA.defaultSimulationParams.retrofitCostINR.toFixed(2); // 10.00 Cr

  // Audio toggle
  const toggleAudio = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    cinematicAudio.setMuted(nextMuted);
  };

  // Start voyage from initial Gate
  const startVoyage = () => {
    setScene(1);
    setIsPlaying(true);
    setSubStep(0);
    setFuelBurnTicker(0.0);
    cinematicAudio.playTransitionChime(440);
  };

  // Move to next scene
  const goToNextScene = useCallback(() => {
    setScene((prev) => {
      const next = Math.min(prev + 1, 12);
      cinematicAudio.playTransitionChime(400 + next * 35);
      return next;
    });
    setSubStep(0);
  }, []);

  // Move to previous scene
  const goToPrevScene = useCallback(() => {
    setScene((prev) => Math.max(prev - 1, 1));
    setSubStep(0);
  }, []);

  // Skip entire intro directly to main content
  const handleSkip = () => {
    setScene(12);
    setIsPlaying(false);
    if (onSkip) onSkip();
    onExplore();
  };

  // Replay from Scene 1
  const handleReplay = () => {
    setScene(1);
    setIsPlaying(true);
    setSubStep(0);
    setFuelBurnTicker(0.0);
    cinematicAudio.playTransitionChime(520);
    if (onReplay) onReplay();
  };

  // Finish intro and explore
  const handleComplete = () => {
    if (onComplete) onComplete();
    onExplore();
  };

  // Scene auto-advance timer
  useEffect(() => {
    if (scene === 0 || scene === 12 || !isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const duration = SCENE_DURATIONS[scene] || 4500;
    timerRef.current = setTimeout(() => {
      goToNextScene();
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [scene, isPlaying, goToNextScene]);

  // Sub-step timer for staggered text arrival inside scenes (e.g. 1.5s delay)
  useEffect(() => {
    setSubStep(0);
    const subTimer1 = setTimeout(() => setSubStep(1), 1200);
    const subTimer2 = setTimeout(() => setSubStep(2), 2400);
    const subTimer3 = setTimeout(() => setSubStep(3), 3600);

    return () => {
      clearTimeout(subTimer1);
      clearTimeout(subTimer2);
      clearTimeout(subTimer3);
    };
  }, [scene]);

  // Fuel consumption & telemetry jitter ticker
  useEffect(() => {
    const interval = setInterval(() => {
      // Jitter operational values subtly
      setSpeedJitter(+(13.7 + Math.random() * 0.2).toFixed(1));
      setEngineLoadJitter(Math.floor(77 + Math.random() * 3));
      setFuelFlowJitter(+(33.1 + Math.random() * 0.5).toFixed(1));

      // Fuel burn counter increments when voyage is active
      if (scene >= 3) {
        setFuelBurnTicker((prev) => +(prev + 0.04).toFixed(2));
      }
    }, 180);

    return () => clearInterval(interval);
  }, [scene]);

  // Keyboard navigation for presentation control
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'ArrowRight' || e.key === 'n') {
        goToNextScene();
      } else if (e.key === 'ArrowLeft' || e.key === 'b') {
        goToPrevScene();
      } else if (e.key === 's' || e.key === 'Escape') {
        handleSkip();
      } else if (e.key === 'r') {
        handleReplay();
      } else if (e.key === 'm') {
        toggleAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextScene, goToPrevScene, isAudioMuted]);

  // Canvas renderer for ocean waves, atmospheric particles, water wake, bubbles & energy loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for sea mist, wake bubbles, and loop flow
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      type: 'mist' | 'bubble' | 'energy' | 'loop';
      angle?: number;
      radius?: number;
    }

    const particles: Particle[] = [];
    const numMist = 45;
    for (let i = 0; i < numMist; i++) {
      particles.push({
        x: Math.random() * width,
        y: height * 0.4 + Math.random() * (height * 0.6),
        vx: -(0.3 + Math.random() * 0.8),
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.1,
        type: 'mist',
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Deep ocean dark gradient backdrop
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#020617');
      bgGrad.addColorStop(0.5, '#030d22');
      bgGrad.addColorStop(1, '#01040f');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const waterLevel = height * 0.68;

      // 1. Draw subtle rolling ocean wave layers
      const time = frame * 0.015;
      
      // Wave layer 1 (Deep background)
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 20) {
        const y = waterLevel - 15 + Math.sin(x * 0.006 + time * 0.8) * 6 + Math.cos(x * 0.012 - time * 0.4) * 4;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = 'rgba(6, 30, 58, 0.45)';
      ctx.fill();

      // Wave layer 2 (Mid oceanic swell)
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 15) {
        const y = waterLevel + Math.sin(x * 0.009 + time) * 8 + Math.cos(x * 0.004 + time * 1.2) * 5;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = 'rgba(2, 20, 42, 0.65)';
      ctx.fill();

      // Wave crest subtle highlight line
      ctx.beginPath();
      for (let x = 0; x <= width; x += 15) {
        const y = waterLevel + Math.sin(x * 0.009 + time) * 8 + Math.cos(x * 0.004 + time * 1.2) * 5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(0, 242, 255, 0.18)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 2. Render and update sea mist & wake particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.y > height) p.y = waterLevel;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 255, ${p.alpha})`;
        ctx.fill();
      });

      // 3. Dynamic Green Tech Air Lubrication Bubbles (Scene 7+)
      if (scene >= 7) {
        for (let b = 0; b < 6; b++) {
          const bx = width * 0.35 + Math.random() * (width * 0.3);
          const by = waterLevel + 12 + Math.random() * 18;
          ctx.beginPath();
          ctx.arc(bx, by, Math.random() * 2 + 1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(52, 211, 153, 0.45)';
          ctx.fill();
        }
      }

      // 4. Circular Cybernetic Financing Loop Particles (Scene 11)
      if (scene === 11) {
        const centerX = width * 0.5;
        const centerY = height * 0.52;
        const radiusX = Math.min(width * 0.42, 380);
        const radiusY = Math.min(height * 0.28, 160);

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 242, 255, 0.35)';
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 12]);
        ctx.lineDashOffset = -frame * 1.5;
        ctx.stroke();
        ctx.restore();

        // Orbiting glowing nodes on the loop
        for (let i = 0; i < 6; i++) {
          const angle = (frame * 0.02) + (i * Math.PI / 3);
          const nx = centerX + Math.cos(angle) * radiusX;
          const ny = centerY + Math.sin(angle) * radiusY;

          ctx.beginPath();
          ctx.arc(nx, ny, 4, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? '#00F2FF' : '#34D399';
          ctx.shadowColor = '#00F2FF';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [scene]);

  // If Scene is 0: RENDER MINIMAL GATE SCREEN
  if (scene === 0) {
    return (
      <section 
        id="shiploop-gate-screen"
        className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#010409] text-white select-none overflow-hidden px-4"
      >
        {/* Subtle background radar & deep ocean grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#00F2FF_1px,transparent_1px)] [background-size:40px_40px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-cyan-500/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-cyan-500/20 animate-[spin_60s_linear_infinite]" />
        </div>

        {/* Minimal Gate Content */}
        <div className="relative z-10 max-w-2xl text-center space-y-8 animate-fadeIn">
          
          {/* Technical Brand Diamond Logo */}
          <div className="flex items-center justify-center mb-2">
            <div className="relative flex items-center justify-center w-14 h-14 border border-[#00F2FF] rotate-45 shadow-[0_0_30px_rgba(0,242,255,0.4)]">
              <div className="w-6 h-6 bg-[#00F2FF] -rotate-45 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-black rounded-full" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00F2FF] animate-ping" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight font-mono text-white">
              SHIP<span className="text-[#00F2FF]">LOOP</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#00F2FF]/80">
              MARITIME ENERGY × FINANCE × VERIFIED SAVINGS
            </p>
          </div>

          {/* Subtitle context for presentation */}
          <p className="text-sm sm:text-base text-slate-400 font-sans max-w-lg mx-auto font-light leading-relaxed">
            A savings-linked financial architecture turning future verified maritime fuel reductions into today's retrofit capital.
          </p>

          {/* Primary Action Button */}
          <div className="pt-4 flex flex-col items-center gap-4">
            <button
              id="btn-enter-the-voyage"
              onClick={startVoyage}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#00F2FF] text-black font-mono font-black text-sm tracking-[0.25em] uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_40px_rgba(0,242,255,0.6)] cursor-pointer"
            >
              <span>ENTER THE VOYAGE</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Direct bypass / shortcut for quick navigation */}
            <div className="flex items-center gap-6 pt-3 text-[11px] font-mono text-slate-500">
              <button 
                onClick={handleSkip}
                className="hover:text-cyan-400 transition-colors uppercase tracking-wider"
              >
                [DIRECT TO SYSTEM ↓]
              </button>
              <span>•</span>
              <button 
                onClick={onGoToSimulator}
                className="hover:text-cyan-400 transition-colors uppercase tracking-wider"
              >
                [OPEN SIMULATOR ⚡]
              </button>
            </div>
          </div>

        </div>

        {/* Bottom subtle note */}
        <div 
          id="gate-prototype-badge"
          className="absolute bottom-6 left-0 right-0 text-center text-[10px] font-mono text-slate-600 tracking-widest uppercase"
        >
          HIGH-FIDELITY IDEATION PROTOTYPE
        </div>
      </section>
    );
  }

  // ACTIVE CINEMATIC VOYAGE EXPERIENCE (Scenes 1 to 12)
  return (
    <section 
      id="shiploop-cinematic-intro"
      className={`relative w-full flex flex-col justify-between bg-[#020617] text-white select-none overflow-hidden ${
        isPresentationMode ? 'h-full flex-1 min-h-0' : 'min-h-screen'
      }`}
    >
      {/* Background Ocean Waves & Particle Engine Canvas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Atmospheric Vignette & Contrast Overlay */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 z-0 ${
        scene >= 4 && scene <= 6 ? 'bg-black/60' : scene >= 8 && scene <= 10 ? 'bg-black/70' : 'bg-transparent'
      }`} />

      {/* TOP STATUS BAR: Current Scene Tag & Quick Controls */}
      <div className={`relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between ${
        isPresentationMode ? 'pt-2 sm:pt-4' : 'pt-20 sm:pt-24'
      }`}>
        
        {/* Left Scene Badge */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/80 border border-[#00F2FF]/30 rounded-sm text-[10px] sm:text-xs font-mono text-[#00F2FF] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00F2FF] animate-ping" />
            <span className="font-bold">SCENE {scene < 10 ? `0${scene}` : scene} / 12</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80 uppercase">{SCENE_NAMES[scene]}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-black/40 px-2.5 py-1 border border-white/10">
            <span>VESSEL: PANAMAX BULK (75K DWT)</span>
          </div>
        </div>

        {/* Right audio and skip shortcut */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleAudio}
            id="btn-intro-audio"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/20 text-[10px] font-mono text-slate-300 hover:text-white transition-all"
            title={isAudioMuted ? 'Sound is Muted (Click to Unmute)' : 'Sound is Active (Click to Mute)'}
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#00F2FF]" />}
            <span className="hidden sm:inline">{isAudioMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
          </button>

          <button
            onClick={handleSkip}
            id="btn-intro-skip"
            className="flex items-center gap-1 px-3 py-1 bg-[#00F2FF]/10 hover:bg-[#00F2FF] text-[#00F2FF] hover:text-black border border-[#00F2FF]/40 text-[10px] font-mono font-bold transition-all uppercase tracking-wider"
          >
            <span>SKIP INTRO</span>
            <FastForward className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* CENTER VISUAL STAGE: Realistic Stylized Vessel + Dynamic Overlays per Scene */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 my-auto flex flex-col items-center justify-center">
        
        {/* Dynamic Scene Narrative Statements (Placed above/around vessel) */}
        <div className="w-full text-center min-h-[140px] flex flex-col items-center justify-center mb-4">
          
          {/* SCENE 01: ENTER THE VOYAGE */}
          {scene === 1 && (
            <div className="space-y-2 animate-fadeIn max-w-3xl">
              <div className="text-[11px] font-mono tracking-[0.3em] text-[#00F2FF] uppercase">
                COMMERCIAL MARITIME TRANSIT • HIGH SEAS
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-white">
                EVERY CARGO VOYAGE BEGINS WITH MOVEMENT.
              </h2>
            </div>
          )}

          {/* SCENE 02: MAKE THE SHIP FEEL ALIVE */}
          {scene === 2 && (
            <div className="space-y-2 animate-fadeIn max-w-3xl">
              <div className="text-[11px] font-mono tracking-[0.3em] text-[#00F2FF] uppercase">
                ACTIVE PROPULSION TELEMETRY
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-white">
                A MASSIVE VESSEL OVERCOMING OCEAN RESISTANCE.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-mono">
                Continuous bunker fuel combustion generates thrust to push thousands of tonnes through water.
              </p>
            </div>
          )}

          {/* SCENE 03: FUEL NUMBER BEGINS MOVING */}
          {scene === 3 && (
            <div className="space-y-3 animate-fadeIn max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>FUEL BURN CONTINUOUSLY INCREASING</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-mono text-white tracking-tight">
                THE SHIP MOVES. <span className="text-[#FFB347]">THE FUEL BURNS.</span>
              </h2>
            </div>
          )}

          {/* SCENE 04: FIRST ATTENTION-GRABBING STATEMENT */}
          {scene === 4 && (
            <div className="space-y-4 animate-fadeIn max-w-3xl">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono text-white tracking-tight">
                EVERY MILE HAS A COST.
              </h2>
              {subStep >= 1 && (
                <p className="text-xl sm:text-3xl font-light font-sans text-slate-300 animate-fadeIn">
                  And fuel is the single largest component of it.
                </p>
              )}
            </div>
          )}

          {/* SCENE 05: MAKE THE COST VISIBLE (MONETIZE) */}
          {scene === 5 && (
            <div className="space-y-3 animate-fadeIn max-w-4xl">
              <div className="text-[11px] font-mono tracking-[0.25em] text-[#00F2FF] uppercase">
                [ILLUSTRATIVE COMMERCIAL BULK CARRIER DATA]
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 font-mono text-left max-w-2xl mx-auto">
                <div className="p-3 bg-slate-900/80 border border-white/10">
                  <div className="text-[10px] text-white/40">ANNUAL FUEL CONSUMPTION</div>
                  <div className="text-lg font-bold text-white">10,000 t / yr</div>
                </div>
                <div className="p-3 bg-slate-900/80 border border-white/10">
                  <div className="text-[10px] text-white/40">VLSFO BUNKER PRICE</div>
                  <div className="text-lg font-bold text-[#FFB347]">₹50,000 / t</div>
                </div>
                <div className="p-3 bg-slate-900/90 border border-emerald-500/40 shadow-[0_0_15px_rgba(52,211,153,0.15)]">
                  <div className="text-[10px] text-emerald-400">ANNUAL FUEL EXPENSE</div>
                  <div className="text-lg font-black text-emerald-400">₹{annualCostCr} Cr / yr</div>
                </div>
              </div>

              <p className="text-base sm:text-xl font-medium font-sans text-slate-200">
                Movement costs money. And fuel accounts for <span className="text-[#FFB347] font-bold">50%–60%</span> of voyage operating cost.
              </p>
            </div>
          )}

          {/* SCENE 06: THE QUESTION */}
          {scene === 6 && (
            <div className="space-y-4 animate-fadeIn max-w-3xl">
              <h2 className="text-3xl sm:text-5xl font-black font-mono text-white tracking-tight">
                SO HOW DO WE REDUCE IT?
              </h2>
              {subStep >= 1 && (
                <div className="inline-block px-5 py-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-lg sm:text-2xl font-bold tracking-wider animate-fadeIn shadow-[0_0_25px_rgba(52,211,153,0.25)]">
                  ⚡ GREEN MARITIME TECHNOLOGY.
                </div>
              )}
            </div>
          )}

          {/* SCENE 07: GREEN TECHNOLOGY ENTERS */}
          {scene === 7 && (
            <div className="space-y-2 animate-fadeIn max-w-3xl">
              <div className="text-[11px] font-mono tracking-[0.25em] text-emerald-400 uppercase">
                DE-CARBONIZATION RETROFIT SOLUTIONS
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-mono text-white tracking-tight">
                RETROFITS CAN REDUCE ENERGY DEMAND BY <span className="text-emerald-400">12%–18%</span>.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-sans">
                Air lubrication micro-bubbles, propeller boss cap fins, wind-assist rotor sails, and waste-heat recovery.
              </p>
            </div>
          )}

          {/* SCENE 08: THE SECOND PROBLEM (CAPEX) */}
          {scene === 8 && (
            <div className="space-y-3 animate-fadeIn max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/60 border border-red-500/40 text-red-400 font-mono text-xs">
                <span>STRUCTURAL FINANCIAL HURDLE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight">
                THE SHIP CAN SAVE MONEY.
              </h2>
              {subStep >= 1 && (
                <div className="p-3 bg-red-900/20 border border-red-500/30 max-w-xl mx-auto animate-fadeIn">
                  <div className="text-xs text-red-300 font-mono mb-1">UPFRONT RETROFIT CAPEX REQUIRED:</div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white">₹{retrofitCostCr} Crore (~$1.2M USD)</div>
                  <div className="text-[11px] text-slate-300 mt-1 font-sans">
                    Shipowners must pay upfront capital today, but fuel savings only trickle in over future years.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SCENE 09: THE FINANCIAL GAP (TEMPORAL MISMATCH) */}
          {scene === 9 && (
            <div className="space-y-3 animate-fadeIn max-w-4xl">
              <div className="text-[11px] font-mono tracking-[0.25em] text-[#FFB347] uppercase">
                THE TEMPORAL CASHFLOW MISMATCH
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto my-2 text-left font-mono">
                <div className="p-4 bg-slate-900/90 border-l-4 border-red-500 border-white/10">
                  <div className="text-xs text-red-400 font-bold">TODAY'S PROBLEM</div>
                  <div className="text-sm sm:text-base font-bold text-white mt-1">₹10.0 Cr Capital Needed NOW</div>
                  <div className="text-[11px] text-slate-400 mt-1 font-sans">Balance sheet equity risk, dry-dock capital outlay.</div>
                </div>
                <div className="p-4 bg-slate-900/90 border-l-4 border-emerald-500 border-white/10">
                  <div className="text-xs text-emerald-400 font-bold">TOMORROW'S REWARD</div>
                  <div className="text-sm sm:text-base font-bold text-white mt-1">₹7.5 Cr / yr Fuel Saved LATER</div>
                  <div className="text-[11px] text-slate-400 mt-1 font-sans">Future savings accumulate across 5–10 sailing years.</div>
                </div>
              </div>
              <p className="text-sm sm:text-base font-mono text-slate-200">
                How do we bridge the gap between <span className="text-red-400">capital required today</span> and <span className="text-emerald-400">savings generated tomorrow</span>?
              </p>
            </div>
          )}

          {/* SCENE 10: THE REVEAL */}
          {scene === 10 && (
            <div className="space-y-4 animate-fadeIn max-w-3xl">
              <p className="text-sm sm:text-base font-mono text-[#00F2FF] tracking-wider uppercase">
                THE CORE ARCHITECTURAL BREAKTHROUGH
              </p>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-mono text-white tracking-tight leading-tight">
                WHAT IF TOMORROW'S SAVINGS COULD FINANCE TODAY'S RETROFIT?
              </h2>
              {subStep >= 1 && (
                <div className="flex items-center justify-center gap-3 pt-2 animate-fadeIn">
                  <div className="w-8 h-8 border border-[#00F2FF] rotate-45 flex items-center justify-center">
                    <div className="w-3.5 h-3.5 bg-[#00F2FF] -rotate-45" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                    THAT IS <span className="text-[#00F2FF]">SHIPLOOP</span>.
                  </span>
                </div>
              )}
            </div>
          )}

          {/* SCENE 11: THE SHIPLOOP LOOP */}
          {scene === 11 && (
            <div className="space-y-2 animate-fadeIn max-w-4xl">
              <div className="text-[11px] font-mono tracking-[0.3em] text-[#00F2FF] uppercase">
                THE CONTINUOUS CYBERNETIC FINANCING ARCHITECTURE
              </div>
              <h2 className="text-xl sm:text-3xl font-black font-mono text-white">
                FINANCE → RETROFIT → SAVE → VERIFY → REPAY → RETAIN
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-sans">
                Zero upfront CAPEX for shipowners. Loans are repaid automatically from cryptographic telemetry-verified fuel savings.
              </p>
            </div>
          )}

          {/* SCENE 12: THE FINAL OPENING STATEMENT */}
          {scene === 12 && (
            <div className="space-y-4 animate-fadeIn max-w-3xl">
              <div className="text-xs font-mono tracking-[0.3em] text-[#00F2FF] uppercase">
                SHIPLOOP THESIS
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono text-white tracking-tight leading-tight">
                DON'T FINANCE THE PROMISE.<br />
                <span className="text-[#00F2FF]">FINANCE THE SAVING.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-sans max-w-2xl mx-auto font-light">
                A proposed savings-linked financing architecture for maritime energy-efficiency retrofits in India and global trade lanes.
              </p>
            </div>
          )}

        </div>

        {/* REALISTIC STYLIZED VESSEL SILHOUETTE & VISUAL METRICS */}
        <div className="relative w-full max-w-3xl py-2 flex flex-col items-center">
          
          {/* SVG Stylized Vessel Graphic */}
          <div className="relative w-full max-w-2xl transition-all duration-700">
            <svg 
              viewBox="0 0 820 230" 
              className="w-full h-auto filter drop-shadow-[0_10px_30px_rgba(0,242,255,0.2)]"
            >
              <defs>
                <linearGradient id="vesselHull" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="50%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>

                <linearGradient id="glowStream" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00F2FF" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#00F2FF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
                </linearGradient>

                <linearGradient id="wakeFlow" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#00F2FF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#00F2FF" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Dynamic Propeller Wake Behind Stern */}
              <path 
                d="M 120 160 Q 50 165, 0 170" 
                stroke="url(#wakeFlow)" 
                strokeWidth="3" 
                strokeDasharray="6 4" 
                fill="none" 
              />
              <path 
                d="M 110 170 Q 40 180, 0 190" 
                stroke="url(#wakeFlow)" 
                strokeWidth="2" 
                strokeDasharray="8 6" 
                fill="none" 
              />

              {/* Main Ship Hull (Long Commercial Bulk Carrier) */}
              <path
                d="M 130 155 L 700 155 L 775 105 L 745 80 L 685 80 L 685 115 L 160 115 L 110 130 Z"
                fill="url(#vesselHull)"
                stroke={scene >= 7 ? '#34D399' : '#00F2FF'}
                strokeWidth="1.5"
                className="transition-colors duration-500"
              />

              {/* Cargo Holds / Container Stacks on Deck */}
              <rect x="190" y="90" width="75" height="25" fill="#334155" stroke="#475569" strokeWidth="1" />
              <rect x="280" y="90" width="75" height="25" fill="#334155" stroke="#475569" strokeWidth="1" />
              <rect x="370" y="90" width="75" height="25" fill="#334155" stroke="#475569" strokeWidth="1" />
              <rect x="460" y="90" width="75" height="25" fill="#334155" stroke="#475569" strokeWidth="1" />
              <rect x="550" y="90" width="75" height="25" fill="#334155" stroke="#475569" strokeWidth="1" />

              {/* Bridge Superstructure (Aft) */}
              <path d="M 140 115 L 180 115 L 180 45 L 140 45 Z" fill="#1e293b" stroke="#00F2FF" strokeWidth="1.5" />
              <rect x="145" y="52" width="30" height="12" fill="#0284c7" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="160" y1="45" x2="160" y2="25" stroke="#00F2FF" strokeWidth="1.5" />
              <circle cx="160" cy="22" r="2.5" fill="#00F2FF" className="animate-ping" />

              {/* Nav Lights */}
              <circle cx="770" cy="103" r="2.5" fill="#22c55e" />
              <circle cx="135" cy="113" r="2.5" fill="#ef4444" />

              {/* Bulbous Bow Water Wave Slice */}
              <path d="M 775 105 Q 790 135, 765 155" fill="none" stroke="#00F2FF" strokeWidth="2" />

              {/* SCENE 03: Engine Fuel Combustion & Energy Flow Lines */}
              {scene >= 3 && scene < 7 && (
                <>
                  <path
                    d="M 160 80 Q 140 130, 110 155"
                    fill="none"
                    stroke="#FFB347"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    className="animate-[dash_4s_linear_infinite]"
                  />
                  <circle cx="160" cy="80" r="4" fill="#FFB347" className="animate-ping" />
                </>
              )}

              {/* SCENE 07+: GREEN RETROFIT HIGHLIGHTS */}
              {scene >= 7 && (
                <>
                  {/* Rotor / Wind Assist Sail Mast */}
                  <rect x="360" y="30" width="14" height="60" rx="3" fill="#065f46" stroke="#34D399" strokeWidth="1.5" className="animate-pulse" />
                  <path d="M 374 45 Q 400 40, 390 60" fill="none" stroke="#34D399" strokeWidth="1" strokeDasharray="2 2" />

                  {/* Air Lubrication Micro-Bubble Stream on Keel */}
                  <line x1="200" y1="156" x2="680" y2="156" stroke="#34D399" strokeWidth="3" strokeDasharray="3 3" />

                  {/* Propeller Boss Cap Fin / Vortex Recovery at Stern */}
                  <circle cx="120" cy="158" r="8" fill="none" stroke="#34D399" strokeWidth="2" strokeDasharray="2 2" />

                  {/* Hydrodynamic streamlined hull flow line */}
                  <path
                    d="M 110 145 Q 400 135, 770 135"
                    fill="none"
                    stroke="url(#glowStream)"
                    strokeWidth="2.5"
                    strokeDasharray="6 3"
                  />
                </>
              )}
            </svg>

            {/* FLOATING TELEMETRY CHIPS (SCENE 2 TO 5) */}
            {scene >= 2 && scene <= 6 && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Speed indicator at bow */}
                <div className="absolute top-[18%] right-[5%] bg-black/80 border border-[#00F2FF]/60 px-2 py-1 text-[10px] font-mono text-[#00F2FF] backdrop-blur-md">
                  SPEED: <span className="font-bold text-white">{speedJitter} kn</span>
                </div>

                {/* Fuel Flow indicator at stern/engine */}
                <div className="absolute top-[5%] left-[8%] bg-black/80 border border-[#FFB347]/60 px-2 py-1 text-[10px] font-mono text-[#FFB347] backdrop-blur-md">
                  FUEL FLOW: <span className="font-bold text-white">{fuelFlowJitter} t/day</span>
                </div>

                {/* Engine Load */}
                <div className="absolute bottom-[2%] left-[22%] bg-black/80 border border-white/20 px-2 py-0.5 text-[9px] font-mono text-slate-300 backdrop-blur-md">
                  LOAD: <span className="text-emerald-400 font-bold">{engineLoadJitter}%</span>
                </div>

                {/* Total Burn counter in Scene 3+ */}
                {scene >= 3 && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-[#FFB347] px-4 py-1.5 text-xs font-mono text-white flex items-center gap-2 shadow-[0_0_20px_rgba(255,179,71,0.3)]">
                    <span className="text-[#FFB347] font-bold">FUEL CONSUMED:</span>
                    <span className="text-base font-black text-white">{fuelBurnTicker.toFixed(2)} tonnes</span>
                  </div>
                )}
              </div>
            )}

            {/* GREEN RETROFIT CALLOUTS (SCENE 7) */}
            {scene === 7 && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-[35%] -translate-x-1/2 bg-emerald-950/90 border border-emerald-400 px-2.5 py-1 text-[10px] font-mono text-emerald-300">
                  <Wind className="w-3 h-3 inline mr-1" />
                  WIND-ASSIST ROTOR
                </div>
                <div className="absolute bottom-[10%] left-[55%] -translate-x-1/2 bg-emerald-950/90 border border-emerald-400 px-2.5 py-1 text-[10px] font-mono text-emerald-300">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  AIR LUBRICATION BUBBLES
                </div>
                <div className="absolute bottom-[18%] left-[8%] bg-emerald-950/90 border border-emerald-400 px-2.5 py-1 text-[10px] font-mono text-emerald-300">
                  <Zap className="w-3 h-3 inline mr-1" />
                  PBCF HUB VORTEX FIN
                </div>
              </div>
            )}

          </div>

          {/* SCENE 12 FINAL ACTION CTA BUTTONS */}
          {scene === 12 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fadeIn">
              <button
                id="btn-intro-explore-final"
                onClick={handleComplete}
                className="flex items-center gap-2 px-8 py-4 bg-[#00F2FF] text-black font-mono font-black text-sm tracking-[0.2em] uppercase hover:bg-white transition-all shadow-[0_0_30px_rgba(0,242,255,0.5)] cursor-pointer"
              >
                <span>EXPLORE THE MODEL</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-intro-simulator-final"
                onClick={onGoToSimulator}
                className="flex items-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/15 text-white font-mono font-bold text-xs tracking-wider uppercase border border-white/20 hover:border-[#00F2FF] transition-all cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-[#00F2FF]" />
                <span>RUN SIMULATOR</span>
              </button>

              <button
                onClick={handleReplay}
                className="flex items-center gap-2 px-4 py-4 bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-mono text-xs tracking-wider uppercase transition-all"
                title="Replay Cinematic Intro"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>REPLAY INTRO</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* BOTTOM PRESENTER HUD & NAVIGATION CONTROLS */}
      <div className="relative z-20 w-full bg-[#020617]/95 border-t border-white/10 backdrop-blur-lg py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Live Vessel Telemetry Status Strip */}
          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-bold">VESSEL 01</span>
            </div>
            <span className="text-slate-600">|</span>
            <div>SPEED: <span className="text-[#00F2FF]">{speedJitter} kn</span></div>
            <span className="text-slate-600">|</span>
            <div>DIST: <span className="text-white">2,460 nm</span></div>
            <span className="text-slate-600">|</span>
            <div>ENGINE: <span className="text-emerald-400 font-bold">{engineLoadJitter}% ACTIVE</span></div>
          </div>

          {/* Interactive Scene Scrubber / Step Pills */}
          <div className="hidden lg:flex items-center gap-1">
            {SCENE_NAMES.slice(1).map((name, idx) => {
              const sceneNum = idx + 1;
              const isActive = scene === sceneNum;
              const isPast = scene > sceneNum;
              return (
                <button
                  key={name}
                  onClick={() => {
                    setScene(sceneNum);
                    setSubStep(0);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-8 bg-[#00F2FF] shadow-[0_0_8px_rgba(0,242,255,0.8)]'
                      : isPast
                      ? 'w-3 bg-cyan-700/60 hover:bg-cyan-500'
                      : 'w-2 bg-slate-800 hover:bg-slate-600'
                  }`}
                  title={`Jump to Scene ${sceneNum}: ${name}`}
                />
              );
            })}
          </div>

          {/* Presenter Play / Pause / Step Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevScene}
              disabled={scene <= 1}
              className="p-1.5 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 text-white rounded-sm"
              title="Previous Scene (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold rounded-sm border border-white/20"
              title={isPlaying ? 'Pause Auto-Advance (Space)' : 'Resume Auto-Advance (Space)'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#00F2FF]" /> : <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />}
              <span>{isPlaying ? 'PAUSE' : 'RESUME'}</span>
            </button>

            <button
              onClick={goToNextScene}
              disabled={scene >= 12}
              className="p-1.5 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 text-white rounded-sm"
              title="Next Scene (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleReplay}
              className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-sm ml-1"
              title="Replay from Scene 1 (R)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};
