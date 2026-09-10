import React from 'react';
import { ShieldCheck, Activity, Radio, Cpu, FileCheck2, Database, Lock } from 'lucide-react';

export const Scene6Verification: React.FC = () => {
  const sensorNodes = [
    {
      name: 'CORIOLIS MASS FLOW METERS',
      spec: '±0.1% Mass Accuracy',
      type: 'Physical Bunker Flow',
      icon: Activity,
      desc: 'Direct continuous measurement of fuel density and mass burn rate, immune to temperature or aeration tampering.',
    },
    {
      name: 'SHAFT POWER & TORQUE',
      spec: 'High-Frequency RPM',
      type: 'Propulsion Work Output',
      icon: Cpu,
      desc: 'Optical and strain-gauge telemetry validating actual mechanical energy transferred to the propeller.',
    },
    {
      name: 'SATELLITE AIS DIGITAL TWIN',
      spec: '15-min Positional Sync',
      type: 'Hydrodynamic Normalization',
      icon: Radio,
      desc: 'Normalizing sea conditions, wave resistance, currents, and wind velocity against baseline speed-power curves.',
    },
    {
      name: 'CLASS SOCIETY ORACLE',
      spec: 'DNV / Bureau Veritas',
      type: 'Cryptographic Audit',
      icon: ShieldCheck,
      desc: 'Independent smart contract certification validating that verified savings meet senior debt covenants.',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto font-mono">
      
      {/* Top Scene Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#00F2FF] rotate-45" />
          <div>
            <span className="text-xs text-[#00F2FF] font-bold tracking-widest uppercase">
              CHAPTER 06 // THE TRUST ENGINE
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              SENSOR FUSION & THE CLASS ORACLE
            </h1>
          </div>
        </div>

        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5" />
          <span>TAMPER-PROOF AUDIT</span>
        </div>
      </div>

      {/* Center 4 Sensor Fusion Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-auto">
        {sensorNodes.map((node, idx) => {
          const Icon = node.icon;
          return (
            <div
              key={node.name}
              className="p-6 bg-white/[0.02] border border-white/10 tech-corner-accent shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-[#00F2FF] font-bold">
                    NODE 0{idx + 1}
                  </span>
                  <div className="p-2 bg-[#020617] border border-white/10">
                    <Icon className="w-4 h-4 text-[#00F2FF]" />
                  </div>
                </div>

                <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                  {node.type}
                </div>

                <div className="text-base font-black text-white tracking-tight uppercase mb-2">
                  {node.name}
                </div>

                <div className="text-xs font-bold text-emerald-400 mb-3">
                  {node.spec}
                </div>

                <p className="text-xs text-white/60 leading-relaxed font-normal">
                  {node.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 text-[10px] text-white/40 uppercase flex items-center gap-1">
                <FileCheck2 className="w-3 h-3 text-emerald-400" />
                <span>Audited for Senior Debt</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Callout */}
      <div className="p-4 bg-[#00F2FF]/5 border border-[#00F2FF]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-white/90">
          <span className="text-[#00F2FF] font-bold uppercase">BANK UNDERWRITING KEY:</span>
          <span>By removing human reporting bias with automated sensor fusion, commercial banks treat verified fuel savings as bankable cashflow.</span>
        </div>
        <div className="text-white/40 text-right text-[11px]">
          HOLDING STATE • ADVANCE WITH [→]
        </div>
      </div>

    </div>
  );
};
