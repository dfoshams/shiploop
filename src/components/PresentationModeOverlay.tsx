import React from 'react';
import { 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Sliders, 
  ShieldAlert, 
  Globe2, 
  TrendingUp, 
  Activity,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface PresentationModeOverlayProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onExit: () => void;
}

export const PresentationModeOverlay: React.FC<PresentationModeOverlayProps> = ({
  activeSection,
  onNavigate,
  onExit,
}) => {
  const sections = [
    { id: 'intro', num: '00', name: 'Intro' },
    { id: 'problem', num: '01', name: 'Problem' },
    { id: 'engine', num: '02', name: 'Engine' },
    { id: 'simulator', num: '03', name: 'Simulator' },
    { id: 'waterfall', num: '04', name: 'Waterfall' },
    { id: 'charter', num: '05', name: 'Charter' },
    { id: 'verification', num: '06', name: 'Verification' },
    { id: 'risk', num: '07', name: 'Risk Lab' },
    { id: 'india', num: '08', name: 'India' },
    { id: 'scale', num: '09', name: 'Scale' },
  ];

  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-2 bg-[#020617] border border-[#00F2FF]/40 backdrop-blur-xl shadow-[0_0_40px_rgba(0,242,255,0.3)] animate-fadeIn tech-corner-accent">
      
      {/* HUD Label */}
      <div className="hidden sm:flex items-center gap-2 pl-3 pr-2 font-mono text-xs text-[#00F2FF] font-black border-r border-white/10 uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-[#00F2FF]" />
        <span>STAGE_CONTROLLER</span>
      </div>

      {/* Prev Section Button */}
      <button
        disabled={!prevSection}
        onClick={() => prevSection && onNavigate(prevSection.id)}
        className="p-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-white border border-white/10 transition-colors"
        title="Previous Section (Left Arrow)"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Quick Section Jump Pills */}
      <div className="flex items-center gap-1">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onNavigate(sec.id)}
              className={`px-2.5 py-1.5 text-xs font-mono font-bold transition-all uppercase ${
                isActive
                  ? 'bg-[#00F2FF] text-[#020617] font-black shadow-[0_0_12px_rgba(0,242,255,0.4)]'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {sec.num}
            </button>
          );
        })}
      </div>

      {/* Next Section Button */}
      <button
        disabled={!nextSection}
        onClick={() => nextSection && onNavigate(nextSection.id)}
        className="p-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-white border border-white/10 transition-colors"
        title="Next Section (Right Arrow / Space)"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Exit HUD button */}
      <button
        onClick={onExit}
        className="ml-2 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold transition-colors uppercase tracking-wider"
      >
        Exit (Esc)
      </button>

    </div>
  );
};
