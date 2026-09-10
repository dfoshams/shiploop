import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Anchor, 
  ShieldCheck, 
  Cpu, 
  Flame, 
  TrendingDown, 
  ArrowDown, 
  Coins, 
  CheckCircle2, 
  Layers, 
  Compass, 
  Sparkles,
  RefreshCw,
  Zap,
  Lock
} from 'lucide-react';
import { EvidenceMarker } from './EvidenceMarker';

interface FinancingFlowVisualProps {
  activeStep?: number; // 0 to 10 for presentation progression
  onSelectNode?: (nodeId: string) => void;
  isInteractive?: boolean;
}

interface FlowNode {
  id: string;
  stepIndex: number;
  label: string;
  sublabel: string;
  status: 'VERIFIED' | 'PROPOSED' | 'SIMULATION' | 'EVIDENCE_REQUIRED';
  channelType?: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  description: string;
}

export const FinancingFlowVisual: React.FC<FinancingFlowVisualProps> = ({
  activeStep = 10,
  onSelectNode,
  isInteractive = true,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('shiploop');
  const [particleOffset, setParticleOffset] = useState<number>(0);

  // Animated continuous particle stream
  useEffect(() => {
    const interval = setInterval(() => {
      setParticleOffset((prev) => (prev + 1) % 100);
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const nodes: FlowNode[] = [
    {
      id: 'decarb',
      stepIndex: 0,
      label: 'INDIAN MARITIME DECARBONISATION',
      sublabel: '7,517 km coastline • Maritime India Vision 2030',
      status: 'VERIFIED',
      icon: Compass,
      accentColor: '#10B981', // Emerald
      description: 'National mandate for 30% maritime emission cuts, green port turnarounds, and domestic fleet efficiency upgrades.',
    },
    {
      id: 'green-window',
      stepIndex: 1,
      label: 'GREEN FINANCE WINDOW',
      sublabel: 'Concessionary capital & Sovereign Green Bonds',
      status: 'VERIFIED',
      channelType: 'POTENTIAL CHANNEL',
      icon: Sparkles,
      accentColor: '#00F2FF', // Cyan
      description: 'Potential allocation through ESG lending mandates and multilateral climate transition facilities.',
    },
    {
      id: 'bank',
      stepIndex: 2,
      label: 'BANK / FUNDING VEHICLE',
      sublabel: 'Senior Secured Loan • Indian Green Finance Window',
      status: 'PROPOSED',
      channelType: 'POTENTIAL CHANNEL / ILLUSTRATIVE',
      icon: Building2,
      accentColor: '#38BDF8', // Sky
      description: 'Provides retrofit project debt; receives structured automated debt service backed by verified bunker savings.',
    },
    {
      id: 'shiploop',
      stepIndex: 3,
      label: 'SHIPLOOP',
      sublabel: 'Structuring Platform • Underwriting • Oracle Escrow',
      status: 'PROPOSED',
      icon: Layers,
      accentColor: '#00F2FF', // Cyan
      description: 'Closed-loop financial orchestration: models baselines, structures SPV escrow, monitors telemetry, and triggers amortization.',
    },
    {
      id: 'shipowner',
      stepIndex: 4,
      label: 'SHIPOWNER',
      sublabel: 'Commercial Asset Operator • Zero Upfront CAPEX',
      status: 'VERIFIED',
      icon: Anchor,
      accentColor: '#A855F7', // Purple
      description: 'Receives zero-equity efficiency upgrade, maintains operational sailing routes, and retains residual fuel cost savings.',
    },
    {
      id: 'verifier',
      stepIndex: 4,
      label: 'INDEPENDENT VERIFIER',
      sublabel: 'IRClass / Indian Register of Shipping & Class IACS',
      status: 'VERIFIED',
      icon: ShieldCheck,
      accentColor: '#34D399', // Emerald
      description: 'Audits pre-retrofit baseline sea-trials and continuously validates IoT fuel telemetry under ISO 19030 standards.',
    },
    {
      id: 'technology',
      stepIndex: 4,
      label: 'TECHNOLOGY PROVIDER',
      sublabel: 'Air Lubrication • Rotor Sails • Hydrodynamic Ducts',
      status: 'VERIFIED',
      icon: Cpu,
      accentColor: '#F59E0B', // Amber
      description: 'Supplies certified marine energy-saving equipment with performance warranties and drydock engineering support.',
    },
    {
      id: 'retrofit',
      stepIndex: 5,
      label: 'RETROFIT INSTALLED',
      sublabel: 'Cochin Shipyard / Indian Drydock Installation',
      status: 'PROPOSED',
      icon: Zap,
      accentColor: '#00F2FF',
      description: 'Hardware integrated during routine special survey drydock without off-hire trade disruption.',
    },
    {
      id: 'fuel-savings',
      stepIndex: 6,
      label: 'FUEL SAVINGS GENERATED',
      sublabel: '12% – 20% Bunker Burn Reduction (VLSFO)',
      status: 'SIMULATION',
      icon: Flame,
      accentColor: '#F97316', // Orange
      description: 'Immediate drop in daily metric tonnes burned at sea, generating substantial operating cashflow delta.',
    },
    {
      id: 'verified-savings',
      stepIndex: 7,
      label: 'VERIFIED SAVINGS (ORACLE)',
      sublabel: 'Continuous High-Frequency Telemetry Audit',
      status: 'PROPOSED',
      icon: CheckCircle2,
      accentColor: '#10B981',
      description: 'Cryptographic proof of actual fuel saved, eliminating guesswork and converting operational efficiency into bankable asset.',
    },
    {
      id: 'repayment',
      stepIndex: 8,
      label: 'STRUCTURED REPAYMENT STREAM',
      sublabel: 'Automated Escrow Waterfall Settlement',
      status: 'PROPOSED',
      icon: Coins,
      accentColor: '#00F2FF',
      description: 'Platform sweeps verified savings directly from fuel account to service debt before distributing owner dividend.',
    },
    {
      id: 'bank-owner',
      stepIndex: 9,
      label: 'REPAYMENT: BANK + OWNER',
      sublabel: 'Senior Debt Amortized + Immediate Owner Share',
      status: 'PROPOSED',
      icon: Building2,
      accentColor: '#38BDF8',
      description: 'Bank receives timely scheduled principal & interest; shipowner captures operational cashflow upside simultaneously.',
    },
    {
      id: 'future-savings',
      stepIndex: 10,
      label: 'FUTURE SAVINGS RETAINED BY OWNER',
      sublabel: '100% Free Cashflow Post-Amortization (Years 7–15)',
      status: 'SIMULATION',
      icon: TrendingDown,
      accentColor: '#10B981',
      description: 'After bank facility is paid off, 100% of verified fuel savings flow directly to shipowner balance sheet for the remaining vessel lifespan.',
    },
  ];

  const handleNodeClick = (node: FlowNode) => {
    if (!isInteractive) return;
    setSelectedNodeId(node.id);
    if (onSelectNode) onSelectNode(node.id);
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[3];

  return (
    <div className="w-full bg-[#020617]/90 border border-white/10 tech-corner-accent p-4 sm:p-6 space-y-6 font-mono relative overflow-hidden">
      
      {/* Background Subtle Waveform Grid */}
      <div className="absolute inset-0 tech-grid-dense opacity-20 pointer-events-none" />

      {/* Top Controls & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F2FF] animate-ping" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#00F2FF]">
              FINANCIAL ARCHITECTURE // CLOSED-LOOP DEPLOYMENT
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight mt-0.5">
            THE INDIAN MARITIME FINANCING CIRCUIT
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[10px]">
          <div className="px-2.5 py-1 bg-white/5 border border-[#00F2FF]/40 text-[#00F2FF] font-bold uppercase">
            [ PROPOSED INDIA MODEL ]
          </div>
          <span className="text-white/40 hidden md:inline">
            Illustrative deployment architecture — not an existing banking product.
          </span>
        </div>
      </div>

      {/* Central Visual Circuit Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
        
        {/* Left / Center: Animated Vertical & Branching Flow System (8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          
          {/* Top Macro Nodes (Decarbonisation -> Green Finance -> Bank) */}
          <div className="space-y-2.5">
            
            {/* 1. Indian Maritime Decarbonisation */}
            {(() => {
              const node = nodes[0];
              const isLit = activeStep >= node.stepIndex;
              const isSelected = selectedNodeId === node.id;
              return (
                <div
                  onClick={() => handleNodeClick(node)}
                  className={`p-3.5 border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'border-[#10B981] bg-[#10B981]/15 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : isLit
                      ? 'border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-400'
                      : 'border-white/10 bg-white/[0.02] opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 rounded-sm">
                        <node.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-white uppercase">{node.label}</span>
                          <EvidenceMarker type={node.status} id="IND-001" inline={true} />
                        </div>
                        <span className="text-[11px] text-white/60 block">{node.sublabel}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#10B981] font-bold tracking-widest uppercase">
                      01 NATIONAL POLICY
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Vertical Flow Vector 1 */}
            <div className="flex justify-center my-0.5">
              <div className="h-6 w-0.5 bg-gradient-to-b from-[#10B981] to-[#00F2FF] relative">
                {activeStep >= 1 && (
                  <span 
                    className="absolute w-2 h-2 rounded-full bg-[#00F2FF] -left-[3px] shadow-[0_0_8px_#00F2FF]"
                    style={{ top: `${particleOffset}%` }}
                  />
                )}
              </div>
            </div>

            {/* 2. Green Finance Window */}
            {(() => {
              const node = nodes[1];
              const isLit = activeStep >= node.stepIndex;
              const isSelected = selectedNodeId === node.id;
              return (
                <div
                  onClick={() => handleNodeClick(node)}
                  className={`p-3.5 border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-[#00F2FF] bg-[#00F2FF]/15 shadow-[0_0_20px_rgba(0,242,255,0.3)]'
                      : isLit
                      ? 'border-[#00F2FF]/40 bg-[#00F2FF]/5 hover:border-[#00F2FF]'
                      : 'border-white/10 bg-white/[0.02] opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-[#00F2FF]/20 text-[#00F2FF] border border-[#00F2FF]/40 rounded-sm">
                        <node.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-white uppercase">{node.label}</span>
                          <EvidenceMarker type={node.status} id="IND-002" inline={true} />
                        </div>
                        <span className="text-[11px] text-white/60 block">{node.sublabel}</span>
                      </div>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 bg-white/5 border border-white/20 text-[#00F2FF] uppercase font-bold">
                      POTENTIAL CHANNEL
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Vertical Flow Vector 2 */}
            <div className="flex justify-center my-0.5">
              <div className="h-6 w-0.5 bg-gradient-to-b from-[#00F2FF] to-[#38BDF8] relative">
                {activeStep >= 2 && (
                  <span 
                    className="absolute w-2 h-2 rounded-full bg-[#38BDF8] -left-[3px] shadow-[0_0_8px_#38BDF8]"
                    style={{ top: `${particleOffset}%` }}
                  />
                )}
              </div>
            </div>

            {/* 3. Bank / Funding Vehicle */}
            {(() => {
              const node = nodes[2];
              const isLit = activeStep >= node.stepIndex;
              const isSelected = selectedNodeId === node.id;
              return (
                <div
                  onClick={() => handleNodeClick(node)}
                  className={`p-3.5 border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-[#38BDF8] bg-[#38BDF8]/15 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                      : isLit
                      ? 'border-[#38BDF8]/40 bg-[#38BDF8]/5 hover:border-[#38BDF8]'
                      : 'border-white/10 bg-white/[0.02] opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 rounded-sm">
                        <node.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-white uppercase">{node.label}</span>
                          <EvidenceMarker type="PROPOSED" id="IND-003" inline={true} />
                        </div>
                        <span className="text-[11px] text-white/60 block">{node.sublabel}</span>
                      </div>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 bg-sky-500/10 border border-sky-500/30 text-sky-400 uppercase font-bold">
                      SENIOR DEBT FACILITY
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Vertical Flow Vector 3 (Capital Influx to SHIPLOOP) */}
            <div className="flex justify-center items-center gap-2 my-0.5 text-[10px] text-[#00F2FF]">
              <span className="tracking-widest">₹ 100% NON-RECOURSE FINANCING</span>
              <div className="h-6 w-0.5 bg-gradient-to-b from-[#38BDF8] to-[#00F2FF] relative">
                {activeStep >= 3 && (
                  <span 
                    className="absolute w-2 h-2 rounded-full bg-[#00F2FF] -left-[3px] shadow-[0_0_8px_#00F2FF]"
                    style={{ top: `${particleOffset}%` }}
                  />
                )}
              </div>
            </div>

            {/* 4. Core Center Node: SHIPLOOP Engine */}
            {(() => {
              const node = nodes[3];
              const isLit = activeStep >= node.stepIndex;
              const isSelected = selectedNodeId === node.id;
              return (
                <div
                  onClick={() => handleNodeClick(node)}
                  className={`p-4 border-2 transition-all cursor-pointer relative tech-corner-accent ${
                    isSelected
                      ? 'border-[#00F2FF] bg-[#00F2FF]/20 shadow-[0_0_30px_rgba(0,242,255,0.45)]'
                      : isLit
                      ? 'border-[#00F2FF]/60 bg-[#00F2FF]/10 hover:border-[#00F2FF]'
                      : 'border-white/15 bg-white/[0.03] opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#00F2FF] text-black rounded-sm shadow-[0_0_15px_rgba(0,242,255,0.7)]">
                        <node.icon className="w-5 h-5 font-black" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm sm:text-base font-black text-white uppercase tracking-wider">
                            {node.label}
                          </span>
                          <span className="text-[9px] px-2 py-0.5 bg-[#00F2FF] text-black font-black uppercase rounded-xs">
                            CORE ORCHESTRATOR
                          </span>
                        </div>
                        <span className="text-xs text-[#00F2FF] block mt-0.5">{node.sublabel}</span>
                      </div>
                    </div>
                    <EvidenceMarker type="PROPOSED" id="IND-CORE" inline={true} />
                  </div>
                </div>
              );
            })()}

            {/* Triad Divergence: SHIPLOOP to Shipowner, Verifier, Tech Provider */}
            <div className="pt-2">
              <div className="text-[10px] text-center text-white/50 uppercase tracking-widest mb-1.5">
                TRIAD EXECUTION LAYER (OPERATIONS • ASSURANCE • HARDWARE)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[nodes[4], nodes[5], nodes[6]].map((node) => {
                  const isLit = activeStep >= node.stepIndex;
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => handleNodeClick(node)}
                      className={`p-3 border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#00F2FF] bg-white/10 shadow-[0_0_15px_rgba(0,242,255,0.25)]'
                          : isLit
                          ? 'border-white/20 bg-white/[0.03] hover:border-white/40'
                          : 'border-white/10 bg-white/[0.01] opacity-40'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <node.icon className="w-3.5 h-3.5 text-[#00F2FF]" />
                        <span className="text-xs font-bold text-white uppercase truncate">{node.label}</span>
                      </div>
                      <span className="text-[10px] text-white/60 block line-clamp-2 leading-tight">
                        {node.sublabel}
                      </span>
                      <div className="mt-2">
                        <EvidenceMarker type={node.status} inline={true} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Convergence to Retrofit -> Fuel Savings -> Verified Savings */}
            <div className="flex justify-center my-0.5">
              <div className="h-6 w-0.5 bg-gradient-to-b from-[#00F2FF] to-[#F59E0B] relative">
                {activeStep >= 5 && (
                  <span 
                    className="absolute w-2 h-2 rounded-full bg-[#F59E0B] -left-[3px] shadow-[0_0_8px_#F59E0B]"
                    style={{ top: `${particleOffset}%` }}
                  />
                )}
              </div>
            </div>

            {/* 7. Retrofit Installed */}
            {(() => {
              const node = nodes[7];
              const isLit = activeStep >= node.stepIndex;
              const isSelected = selectedNodeId === node.id;
              return (
                <div
                  onClick={() => handleNodeClick(node)}
                  className={`p-3 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#F59E0B] bg-[#F59E0B]/15 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                      : isLit
                      ? 'border-[#F59E0B]/40 bg-[#F59E0B]/5 hover:border-[#F59E0B]'
                      : 'border-white/10 bg-white/[0.02] opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <node.icon className="w-4 h-4 text-[#F59E0B]" />
                      <span className="text-xs sm:text-sm font-bold text-white uppercase">{node.label}</span>
                    </div>
                    <span className="text-[10px] text-white/50">{node.sublabel}</span>
                  </div>
                </div>
              );
            })()}

            {/* Down to Fuel Savings & Verification */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[nodes[8], nodes[9]].map((node) => {
                const isLit = activeStep >= node.stepIndex;
                const isSelected = selectedNodeId === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => handleNodeClick(node)}
                    className={`p-3 border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#10B981] bg-[#10B981]/15 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                        : isLit
                        ? 'border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-400'
                        : 'border-white/10 bg-white/[0.02] opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <node.icon className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-xs font-bold text-white uppercase truncate">{node.label}</span>
                      </div>
                      <EvidenceMarker type={node.status} inline={true} />
                    </div>
                    <span className="text-[10px] text-white/60 block">{node.sublabel}</span>
                  </div>
                );
              })}
            </div>

            {/* Repayment & Final Cashflow Flow */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="text-[10px] text-white/40 uppercase tracking-widest text-center">
                AMORTIZATION ESCROW & POST-DEBT VALUE RETENTION
              </div>

              {/* 10. Structured Repayment */}
              {(() => {
                const node = nodes[10];
                const isLit = activeStep >= node.stepIndex;
                const isSelected = selectedNodeId === node.id;
                return (
                  <div
                    onClick={() => handleNodeClick(node)}
                    className={`p-3 border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#00F2FF] bg-[#00F2FF]/15 shadow-[0_0_15px_rgba(0,242,255,0.3)]'
                        : isLit
                        ? 'border-[#00F2FF]/40 bg-[#00F2FF]/5'
                        : 'border-white/10 bg-white/[0.02] opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <node.icon className="w-4 h-4 text-[#00F2FF]" />
                        <span className="text-xs font-bold text-white uppercase">{node.label}</span>
                      </div>
                      <span className="text-[10px] text-[#00F2FF]">{node.sublabel}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Dual Outcome: Bank + Owner, then Future Savings Retained */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[nodes[11], nodes[12]].map((node) => {
                  const isLit = activeStep >= node.stepIndex;
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <div
                      key={node.id}
                      onClick={() => handleNodeClick(node)}
                      className={`p-3.5 border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-500/15 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : isLit
                          ? 'border-emerald-500/40 bg-emerald-500/5'
                          : 'border-white/10 bg-white/[0.02] opacity-40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <node.icon className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-xs font-bold text-white uppercase">{node.label}</span>
                        </div>
                        <EvidenceMarker type={node.status} inline={true} />
                      </div>
                      <span className="text-[10px] text-white/60 block">{node.sublabel}</span>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </div>

        {/* Right: Selected Node Telemetry HUD & Structural Guarantee (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Node Inspector Box */}
          <div className="p-5 bg-white/[0.03] border border-white/15 tech-corner-accent space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                COMPONENT INSPECTOR
              </span>
              <EvidenceMarker type={selectedNode.status} id={selectedNode.id.toUpperCase()} inline={true} />
            </div>

            <div>
              <div className="flex items-center gap-2 text-[#00F2FF] mb-1">
                <selectedNode.icon className="w-4 h-4" />
                <span className="text-sm font-bold text-white uppercase">{selectedNode.label}</span>
              </div>
              <p className="text-xs text-white/50">{selectedNode.sublabel}</p>
            </div>

            <p className="text-xs text-white/80 leading-relaxed pt-2 border-t border-white/10 font-normal">
              {selectedNode.description}
            </p>

            {selectedNode.channelType && (
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-400">
                <span className="font-bold uppercase block">GOVERNANCE SAFEGUARD:</span>
                This entity represents an illustrative channel. SHIPLOOP does not claim any official bilateral partnership or pre-approval.
              </div>
            )}
          </div>

          {/* Quick Flow Summary Card */}
          <div className="p-4 bg-white/[0.02] border border-white/10 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#00F2FF] font-bold uppercase text-[11px]">
              <Lock className="w-3.5 h-3.5" />
              <span>THE SHIPLOOP ADVANTAGE</span>
            </div>
            <p className="text-white/60 leading-relaxed font-normal text-[11px]">
              "SHIPLOOP converts operational savings into a structured repayment stream — enabling commercial banks to underwrite efficiency retrofits without absorbing vessel operational risks."
            </p>
          </div>

          {/* Money Flow Indicator Pill */}
          <div className="p-3 bg-[#020617] border border-[#00F2FF]/30 flex items-center justify-between text-[11px]">
            <span className="text-white/50 uppercase">MONEY FLOW:</span>
            <span className="text-[#00F2FF] font-bold animate-pulse">
              ₹ CAPEX → OPERATING SAVINGS → ESCROW AMORTIZATION
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
