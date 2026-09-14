import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Topic {
  id: string;
  label: string;
  subtopics?: { id: string; label: string }[];
}

const TOPICS: Topic[] = [
  { id: 'intro', label: 'OVERVIEW' },
  { id: 'problem', label: 'THE PROBLEM' },
  { id: 'insight', label: 'THE INSIGHT' },
  { id: 'engine', label: 'SHIPLOOP ENGINE' },
  { id: 'simulator', label: 'LIVE SIMULATOR' },
  { id: 'waterfall', label: 'WATERFALL' },
  { id: 'charter', label: 'CHARTER MODE' },
  { id: 'verification', label: 'VERIFICATION LAYER' },
  { id: 'feet', label: 'FEET BENCHMARK' },
  { id: 'risk', label: 'RISK LAB' },
  { id: 'india', label: 'INDIA OPPORTUNITY' },
  { id: 'ecosystem', label: 'ECOSYSTEM' },
  { id: 'scale', label: 'SCALE SIMULATOR' },
  { id: 'aha-cta', label: 'THE PITCH' },
  { id: 'scan-qr', label: 'EXPLORE' },
];

interface VerticalScrubberProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isPresentationMode?: boolean;
  onExitPresentationMode?: () => void;
}

export const VerticalScrubber: React.FC<VerticalScrubberProps> = ({
  activeSection,
  onNavigate,
  isPresentationMode,
  onExitPresentationMode
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const [handleTop, setHandleTop] = useState(0);
  const isDragging = useRef(false);

  // Flatten topics to get a linear index for calculating handle position
  const flatSections = TOPICS.flatMap(t => [t, ...(t.subtopics || [])]);
  const activeIndex = flatSections.findIndex(s => s.id === activeSection);
  const progressPercent = activeIndex >= 0 ? activeIndex / Math.max(1, flatSections.length - 1) : 0;

  useEffect(() => {
    const updateHandleTop = () => {
      if (!isDragging.current && trackRef.current) {
        const trackHeight = trackRef.current.clientHeight;
        setHandleTop(progressPercent * trackHeight);
      }
    };
    
    updateHandleTop();
    
    // Add window resize listener to adjust handle position
    window.addEventListener('resize', updateHandleTop);
    return () => window.removeEventListener('resize', updateHandleTop);
  }, [progressPercent, isExpanded]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handlePointerMove(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    
    const trackRect = trackRef.current.getBoundingClientRect();
    let newY = e.clientY - trackRect.top;
    newY = Math.max(0, Math.min(newY, trackRect.height));
    
    setHandleTop(newY);

    const ratio = newY / trackRect.height;
    const targetIndex = Math.round(ratio * (flatSections.length - 1));
    const targetId = flatSections[targetIndex]?.id;
    
    if (targetId && targetId !== activeSection) {
      onNavigate(targetId);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 flex ${isExpanded ? 'w-48' : 'w-12'} h-[70vh] min-h-[400px] bg-[#020617]/80 backdrop-blur-md border-r border-[#00F2FF]/20`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div 
        ref={trackRef}
        className="relative w-full h-full flex flex-col justify-between py-6"
      >
        {/* Track Line */}
        <div className="absolute left-6 top-6 bottom-6 w-px bg-white/10" />
        
        {/* Active Progress Line */}
        <div 
          className="absolute left-6 top-6 w-px bg-[#00F2FF] transition-all duration-100 ease-linear"
          style={{ height: `${handleTop}px` }}
        />

        {/* Draggable Handle */}
        <div 
          className="absolute left-[22px] w-3 h-3 rounded-full bg-[#00F2FF] shadow-[0_0_10px_#00F2FF] cursor-grab active:cursor-grabbing -translate-y-1/2 transition-transform hover:scale-125 z-10"
          style={{ top: `calc(1.5rem + ${handleTop}px)` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />

        {/* Nodes */}
        {TOPICS.map((topic, i) => {
          const isActive = topic.id === activeSection || topic.subtopics?.some(s => s.id === activeSection);
          
          return (
            <div key={topic.id} className="relative flex items-center group cursor-pointer" onClick={() => onNavigate(topic.id)}>
              <div className="w-12 flex justify-center z-0">
                <div className={`w-2 h-2 rounded-full border transition-all ${isActive ? 'bg-[#00F2FF] border-[#00F2FF] shadow-[0_0_8px_#00F2FF]' : 'bg-[#020617] border-white/30 group-hover:border-[#00F2FF]/50'}`} />
              </div>
              
              {/* Label */}
              <div className={`absolute left-10 whitespace-nowrap px-2 py-1 transition-all duration-300 font-mono text-[10px] tracking-widest uppercase ${
                isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
              } ${isActive ? 'text-[#00F2FF] font-bold' : 'text-white/50 group-hover:text-white/90'}`}>
                {topic.label}
              </div>
              
              {/* Tooltip when collapsed */}
              {!isExpanded && (
                <div className="absolute left-14 hidden group-hover:block bg-[#020617] border border-[#00F2FF]/30 text-[#00F2FF] text-[10px] font-mono px-2 py-1 rounded-sm whitespace-nowrap z-50 shadow-[0_0_10px_rgba(0,242,255,0.2)]">
                  {topic.label}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Exit Presentation Mode Button */}
      {isPresentationMode && onExitPresentationMode && (
        <div className={`absolute bottom-0 left-0 w-full p-2 border-t border-[#00F2FF]/20 flex justify-center transition-all ${isExpanded ? 'bg-[#020617]' : ''}`}>
          <button
            onClick={onExitPresentationMode}
            className={`flex items-center justify-center bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-sm transition-all ${isExpanded ? 'w-full px-2 py-1.5 text-[10px] font-mono tracking-wider' : 'w-8 h-8 rounded-full'}`}
            title="Exit Presentation Mode (Esc)"
          >
            {isExpanded ? 'EXIT (ESC)' : '×'}
          </button>
        </div>
      )}
    </div>
  );
};
