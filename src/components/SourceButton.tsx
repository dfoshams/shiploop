import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { useEvidence } from '../context/EvidenceContext';

interface SourceButtonProps {
  evidenceId: string;
  variant?: 'default' | 'compact' | 'pill' | 'icon';
  className?: string;
  label?: string;
  title?: string;
}

export const SourceButton: React.FC<SourceButtonProps> = ({
  evidenceId,
  className = '',
  title,
}) => {
  const { openSource } = useEvidence();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    openSource(evidenceId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation();
      e.preventDefault();
      openSource(evidenceId);
    }
  };

  return (
    <span className="relative inline-flex items-center align-middle mx-0.5 select-none">
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label="View source"
        title={title || "View source"}
        className={`group relative inline-flex items-center justify-center w-7 h-7 -my-1 rounded-full text-[#00F2FF]/60 hover:text-[#00F2FF] bg-transparent hover:bg-[#00F2FF]/10 active:bg-[#00F2FF]/20 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00F2FF] cursor-pointer shrink-0 ${className}`}
      >
        <Eye 
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.75] transition-all duration-200 group-hover:drop-shadow-[0_0_6px_rgba(0,242,255,0.7)] group-active:drop-shadow-[0_0_10px_rgba(0,242,255,0.9)]" 
        />
      </button>

      {/* Unobtrusive hover / focus tooltip */}
      {showTooltip && (
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 px-1.5 py-0.5 text-[9px] font-mono font-medium tracking-wide text-cyan-200 bg-[#020b14]/95 border border-cyan-500/40 rounded shadow-[0_2px_8px_rgba(0,0,0,0.6)] whitespace-nowrap animate-in fade-in zoom-in-95 duration-150"
        >
          View source
        </span>
      )}
    </span>
  );
};

