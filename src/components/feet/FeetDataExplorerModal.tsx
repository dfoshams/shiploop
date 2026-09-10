import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, ShieldCheck, Target, ExternalLink, X, Info, Layers } from 'lucide-react';
import { FEET_DATA_RECORDS, FeetMetricRecord } from '../../data/feetData';

interface FeetDataExplorerModalProps {
  selectedRecord?: FeetMetricRecord | null;
  onClose?: () => void;
}

export const FeetDataExplorerModal: React.FC<FeetDataExplorerModalProps> = ({
  selectedRecord,
  onClose
}) => {
  const [activeRecordId, setActiveRecordId] = useState<string>('FEET-001');

  // Mini summary cards requested in section 16:
  // [ $35M ] INITIAL CLOSING
  // [ 100% ] UPFRONT FINANCING
  // [ 7.2% ] PILOT POWER SAVING
  // [ $500M ] 2030 TARGET
  // [ ~200 ] TARGET SHIPS
  const quickMetrics = [
    { id: 'FEET-001', value: '$35M', label: 'INITIAL CLOSING', status: 'VERIFIED', badge: '[ VERIFIED ]' },
    { id: 'FEET-002', value: '100%', label: 'UPFRONT FINANCING', status: 'VERIFIED', badge: '[ VERIFIED ]' },
    { id: 'FEET-006', value: '7.2%', label: 'PILOT POWER SAVING', status: 'VERIFIED PILOT DATA', badge: '[ VERIFIED PILOT ]' },
    { id: 'FEET-005', value: '$500M', label: '2030 TARGET', status: 'TARGET', badge: '[ TARGET ]' },
    { id: 'FEET-008', value: '~200', label: 'TARGET SHIPS', status: 'TARGET', badge: '[ TARGET ]' },
  ];

  const currentRecord = FEET_DATA_RECORDS.find(r => r.id === activeRecordId) || FEET_DATA_RECORDS[0];

  return (
    <div className="w-full rounded-xl bg-slate-950/90 border border-white/15 p-4 sm:p-5 backdrop-blur-md">
      {/* Mini Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            FEET DATA EXPLORER
          </span>
          <span className="text-[10px] font-mono text-white/50">
            [ PRESENTER QUICK ACCESS ]
          </span>
        </div>
        <div className="text-[10px] font-mono text-emerald-400 font-bold">
          AUDITABLE CITATION CATALOG
        </div>
      </div>

      {/* Mini Row of Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {quickMetrics.map((qm) => {
          const isSelected = activeRecordId === qm.id;
          const isTarget = qm.status === 'TARGET';

          return (
            <button
              key={qm.id}
              onClick={() => setActiveRecordId(qm.id)}
              className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-950/70 border-emerald-400 ring-1 ring-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-slate-900/60 border-white/10 hover:border-white/25 hover:bg-slate-900/90'
              }`}
            >
              <div className="flex items-center justify-between text-[9px] font-mono mb-1">
                <span className="text-white/40">{qm.id}</span>
                <span className={`font-extrabold ${isTarget ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {qm.badge}
                </span>
              </div>
              <div className="text-lg font-black font-mono text-white">
                {qm.value}
              </div>
              <div className="text-[9px] font-mono text-white/60 truncate uppercase">
                {qm.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Compact Explanation Strip (Responsive & Scannable) */}
      <div className="mt-3 p-3 rounded-lg bg-slate-900/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-white">{currentRecord.id}: {currentRecord.metric}</span>
            <span className={`text-[9px] px-1.5 py-0.2 rounded border font-bold uppercase ${
              currentRecord.status === 'TARGET' 
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/40' 
                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40'
            }`}>
              [ {currentRecord.status} ]
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {currentRecord.description}
          </p>
          {currentRecord.confidenceInterval && (
            <div className="text-[10px] text-emerald-400 font-bold mt-1">
              95% CONFIDENCE INTERVAL: {currentRecord.confidenceInterval}
            </div>
          )}
        </div>

        <div className="sm:border-l sm:border-white/10 sm:pl-4 text-[10px] text-white/50 shrink-0">
          <div className="font-bold text-white/70">SOURCE ATTRIBUTION</div>
          <div className="text-slate-400 max-w-[200px] truncate">{currentRecord.sourceName}</div>
          <div className="text-amber-400 font-semibold">{currentRecord.sourceUrl}</div>
        </div>
      </div>
    </div>
  );
};
