import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Sliders, 
  Activity, 
  Globe2, 
  TrendingUp, 
  Maximize2, 
  Minimize2, 
  BookOpen, 
  GitBranch,
  Terminal,
  Award
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isPresentationMode: boolean;
  onTogglePresentationMode: () => void;
  onOpenSources: () => void;
  onOpenQuickTour?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  isPresentationMode,
  onTogglePresentationMode,
  onOpenSources
}) => {
  const navItems = [
    { id: 'intro', label: 'OVERVIEW', icon: Terminal },
    { id: 'problem', label: '01 PROBLEM', icon: Activity },
    { id: 'engine', label: '02 ENGINE', icon: Layers },
    { id: 'simulator', label: '03 SIMULATOR', icon: Sliders },
    { id: 'waterfall', label: '04 WATERFALL', icon: GitBranch },
    { id: 'charter', label: '05 CHARTER', icon: TrendingUp },
    { id: 'verification', label: '06 ORACLE', icon: ShieldCheck },
    { id: 'feet', label: '07 FEET', icon: Award },
    { id: 'risk', label: '08 RISK', icon: Activity },
    { id: 'india', label: '09 INDIA', icon: Globe2 },
    { id: 'scale', label: '10 SCALE', icon: TrendingUp },
  ];

  return (
    <header 
      id="shiploop-navbar" 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isPresentationMode 
          ? 'py-2 bg-[#020617]/95 backdrop-blur-md border-b border-[#00F2FF]/30' 
          : 'py-3 bg-[#020617]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Identity: Technical Diamond Logo */}
        <div 
          onClick={() => onNavigate('intro')} 
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-brand-logo"
        >
          <div className="relative flex items-center justify-center w-8 h-8 border border-[#00F2FF] rotate-45 group-hover:shadow-[0_0_15px_rgba(0,242,255,0.6)] transition-all">
            <div className="w-3.5 h-3.5 bg-[#00F2FF] group-hover:scale-110 transition-transform flex items-center justify-center -rotate-45">
              <span className="w-1 h-1 bg-black rounded-full" />
            </div>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00F2FF] animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00F2FF]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-wider text-white font-mono">
                SHIP<span className="text-[#00F2FF]">LOOP</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#00F2FF]/10 text-[#00F2FF] font-mono border border-[#00F2FF]/40 uppercase tracking-widest font-bold">
                PROTOTYPE
              </span>
            </div>
            <p className="text-[9px] text-white/50 font-mono tracking-widest hidden sm:block uppercase">
              MARITIME FINTECH • SIMULATED TERMINAL
            </p>
          </div>
        </div>

        {/* Minimal Floating Navigation Links */}
        {!isPresentationMode && (
          <nav className="hidden xl:flex items-center gap-1 p-1 bg-white/[0.03] border border-white/10 rounded-md backdrop-blur-md">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#00F2FF]/15 text-[#00F2FF] border border-[#00F2FF]/50 shadow-[0_0_12px_rgba(0,242,255,0.25)] font-bold rounded-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5 rounded-sm'
                  }`}
                >
                  <Icon className={`w-3 h-3 ${isActive ? 'text-[#00F2FF]' : 'text-white/40'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Right utility triggers: Demo mode, Presentation Mode, Sources */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Simulated Data / Status Chip */}
          <div 
            id="demo-mode-badge"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 text-white/80 text-[10px] font-mono bg-white/5 tracking-wider"
            title="All models utilize simulated parameters for academic demonstration."
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FF] animate-pulse" />
            <span className="hidden sm:inline font-bold text-[#00F2FF]">SIMULATION_ACTIVE</span>
            <span className="text-[9px] text-[#FFB347] font-semibold border-l border-white/20 pl-1.5 hidden md:inline">DEMO_v1.0</span>
          </div>

          {/* Research Sources Drawer Button */}
          <button
            id="btn-open-sources"
            onClick={onOpenSources}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/5 hover:bg-white/10 text-white/80 hover:text-[#00F2FF] border border-white/20 text-[11px] font-mono tracking-wider transition-all uppercase"
            title="View Research Verification & Academic References"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#00F2FF]" />
            <span className="hidden md:inline">SOURCES</span>
          </button>

          {/* Presentation Mode Toggle */}
          <button
            id="btn-toggle-presentation-mode"
            onClick={onTogglePresentationMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
              isPresentationMode
                ? 'bg-[#00F2FF] text-black font-black shadow-[0_0_15px_rgba(0,242,255,0.6)]'
                : 'bg-[#00F2FF]/15 hover:bg-[#00F2FF]/25 text-[#00F2FF] border border-[#00F2FF]/40 font-bold shadow-[0_0_10px_rgba(0,242,255,0.2)]'
            }`}
            title={isPresentationMode ? 'Exit Presentation Mode (Esc)' : 'Enter Presenter-Controlled Presentation Mode (P)'}
          >
            {isPresentationMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="font-bold">{isPresentationMode ? 'EXIT PRESENTATION' : 'PRESENTATION MODE'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
