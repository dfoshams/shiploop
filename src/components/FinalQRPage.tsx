import React, { useEffect, useState } from 'react';

export const FinalQRPage: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsReady(true);
        }
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById('scan-qr');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isReady) {
      // Timeline for animations
      const t1 = setTimeout(() => setPhase(1), 500);
      const t2 = setTimeout(() => setPhase(2), 1200);
      const t3 = setTimeout(() => setPhase(3), 2000);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [isReady]);

  return (
    <div className="w-full min-h-[100dvh] relative flex flex-col items-center justify-center overflow-hidden bg-[#020617] text-[#E2E8F0] p-4 pt-12 pb-16">
      <style>{`
        @keyframes scanline {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scanline {
          animation: scanline 2.5s ease-in-out infinite;
        }
        .motion-safe-fade-in {
          opacity: 0;
        }
        @media (prefers-reduced-motion: no-preference) {
          .phase-0-scale { transform: scale(0.95); opacity: 0; }
          .phase-1 { opacity: 1; transition: opacity 1s ease; }
          .phase-2 { opacity: 1; transform: scale(1); transition: all 1s ease; }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe-fade-in { opacity: 1 !important; transform: none !important; }
          .animate-scanline { display: none !important; }
          .animate-pulse { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* Background elements */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
      
      {/* Subtle radial glow */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-[#00F2FF]/5 rounded-full blur-[120px]" />
      </div>

      {/* Main content */}
      <div className={`z-10 flex flex-col items-center text-center motion-safe-fade-in w-full max-w-4xl ${phase >= 1 ? 'phase-1' : ''}`}>
        
        <div className="text-[#00F2FF] font-mono tracking-[0.3em] text-sm mb-8 md:mb-12 opacity-80">
          SHIPLOOP
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-2 font-sans">
          THE IDEA IS ON SCREEN.
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-white/70 mb-12 md:mb-16 font-sans">
          THE EXPERIENCE IS IN YOUR HANDS.
        </h2>

        {/* Interactive QR Code Gateway */}
        <div className={`relative flex justify-center items-center p-6 md:p-10 motion-safe-fade-in phase-0-scale group ${phase >= 2 ? 'phase-2' : ''}`}>
          
          {/* Interactive Radar/Scanner rings (Ambient + Hover) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-1000">
            {/* Outer subtle pulse */}
            <div className="absolute w-full h-full rounded-full border border-[#00F2FF]/20 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] group-hover:border-[#00F2FF]/40 transition-colors duration-500" style={{ animationDuration: '4s' }} />
            
            {/* Radar spin */}
            <div className="absolute w-[105%] h-[105%] rounded-full border border-[#00F2FF]/10 animate-[spin_10s_linear_infinite] overflow-hidden group-hover:border-[#00F2FF]/30 transition-all duration-700 group-hover:scale-[1.02]">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-[#00F2FF]/10 origin-right" />
            </div>
            
            {/* Corner signal points */}
            <div className="absolute w-[115%] h-[115%] animate-[spin_15s_linear_infinite_reverse]">
               <div className="absolute top-[10%] left-[20%] w-1.5 h-1.5 bg-[#00F2FF]/60 rounded-full group-hover:bg-[#00F2FF] group-hover:shadow-[0_0_10px_2px_#00F2FF] transition-all duration-500" />
               <div className="absolute bottom-[15%] right-[10%] w-1 h-1 bg-[#00F2FF]/40 rounded-full group-hover:bg-[#00F2FF] group-hover:shadow-[0_0_8px_1px_#00F2FF] transition-all duration-500" />
            </div>
          </div>

          {/* Core QR Frame */}
          <div className="relative p-6 tech-panel-cyan rounded-xl transition-all duration-700 group-hover:shadow-[0_0_60px_rgba(0,242,255,0.25)] group-hover:border-[#00F2FF]/50 z-10 bg-[#020617]">
            <div className="tech-corner-accent absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-60" />
            
            <a 
              href="https://dfoshams.github.io/shiploop/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block relative cursor-pointer" 
              aria-label="QR code to open the SHIPLOOP website."
            >
              <div className="bg-white p-4 rounded-md transition-transform duration-500 w-[280px] h-[280px] md:w-[340px] md:h-[340px] flex items-center justify-center">
                <img 
                 src={`${import.meta.env.BASE_URL}https_dfoshams_github_io_shiploop_.png`} 
                  alt="SHIPLOOP QR Code" 
                  className="w-full h-full object-contain" 
                />
              </div>
              
              {/* Scanning Line overlay */}
              {phase >= 3 && (
                <div className="absolute inset-0 overflow-hidden rounded-md pointer-events-none mix-blend-overlay">
                   <div className="w-full h-2 bg-[#00F2FF] shadow-[0_0_20px_2px_#00F2FF] absolute top-0 left-0 animate-scanline opacity-40 group-hover:opacity-90 group-hover:h-3 transition-all duration-500" />
                </div>
              )}

              {/* Micro-Interaction Label */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 whitespace-nowrap pointer-events-none">
                <div className="flex items-center gap-2 text-[#00F2FF] text-[10px] md:text-xs font-mono tracking-[0.3em] font-bold bg-[#020617]/80 px-4 py-1.5 rounded-full border border-[#00F2FF]/30 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 bg-[#00F2FF] animate-pulse rounded-full" />
                  OPEN SHIPLOOP
                  <span className="w-1.5 h-1.5 bg-[#00F2FF] animate-pulse rounded-full" />
                </div>
              </div>
            </a>
          </div>
        </div>

        <p className="mt-8 md:mt-12 font-mono tracking-[0.2em] text-[#00F2FF] uppercase text-sm animate-pulse">
          SCAN TO EXPLORE SHIPLOOP
        </p>

        {/* Creator Credits */}
        <div className="mt-12 md:mt-16 lg:mt-20 flex flex-col items-center justify-center font-mono tracking-widest text-white/40">
          <div className="mb-2 text-[11px] md:text-xs uppercase tracking-[0.3em]">
            RESEARCH &amp; DEVELOPMENT
          </div>
          <div className="text-white/70 font-bold text-sm md:text-base tracking-[0.2em]">
            PRAKHAR GUPTA · SHAMS AHMAD
          </div>
        </div>

      </div>
    </div>
  );
};
