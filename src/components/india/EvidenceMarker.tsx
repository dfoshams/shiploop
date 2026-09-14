import React from 'react';
import { ShieldCheck, HelpCircle, FileText, Sparkles, AlertCircle } from 'lucide-react';
import { SourceButton } from '../SourceButton';

export type EvidenceType = 'VERIFIED' | 'PROPOSED' | 'SIMULATION' | 'EVIDENCE_REQUIRED';

interface EvidenceMarkerProps {
  id?: string;
  evidenceId?: string;
  type?: EvidenceType;
  label?: string;
  source?: string;
  className?: string;
  inline?: boolean;
}

export const EvidenceMarker: React.FC<EvidenceMarkerProps> = ({
  id,
  evidenceId,
  type = 'PROPOSED',
  label,
  source,
  className = '',
  inline = true,
}) => {
  const getBadgeConfig = () => {
    switch (type) {
      case 'VERIFIED':
        return {
          icon: ShieldCheck,
          text: label || 'VERIFIED',
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]',
          tooltip: source ? `Verified Source: ${source}` : 'Empirical real-world fact, official policy, or existing institution.',
        };
      case 'SIMULATION':
        return {
          icon: Sparkles,
          text: label || 'ILLUSTRATIVE SIMULATION',
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.2)]',
          tooltip: 'Derived dynamically from SHIPLOOP financial calculation engine.',
        };
      case 'EVIDENCE_REQUIRED':
        return {
          icon: AlertCircle,
          text: label || 'EVIDENCE REQUIRED',
          color: 'text-rose-400 bg-rose-500/10 border-rose-500/30 shadow-[0_0_8px_rgba(244,63,94,0.2)]',
          tooltip: 'Flagged for empirical baseline audit and official institution confirmation.',
        };
      case 'PROPOSED':
      default:
        return {
          icon: FileText,
          text: label || 'PROPOSED',
          color: 'text-[#00F2FF] bg-[#00F2FF]/10 border-[#00F2FF]/40 shadow-[0_0_8px_rgba(0,242,255,0.2)]',
          tooltip: 'SHIPLOOP proposed implementation architecture — not an existing banking product.',
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`${inline ? 'inline-flex' : 'flex'} items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border transition-all cursor-help select-none ${config.color} ${className}`}
        title={`${config.tooltip}${id ? ` [Ref ID: ${id}]` : ''}`}
      >
        <Icon className="w-2.5 h-2.5 flex-shrink-0" />
        <span>{config.text}</span>
        {id && <span className="text-white/40 text-[8px] pl-0.5 border-l border-white/20">#{id}</span>}
      </span>
      {evidenceId && <SourceButton evidenceId={evidenceId} />}
    </span>
  );
};
