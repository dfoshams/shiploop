import React, { useState } from 'react';
import { 
  Network, 
  Building2, 
  Ship, 
  Wrench, 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  FileText, 
  DollarSign, 
  CheckCircle2, 
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { SourceButton } from './SourceButton';

interface EcosystemNode {
  id: string;
  label: string;
  role: string;
  valueProp: string;
  incentive: string;
  icon: any;
  color: string;
  evidenceId?: string;
}

export const EcosystemAndBusiness: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('shipowner');

  const nodes: EcosystemNode[] = [
    {
      id: 'shipowner',
      label: 'SHIPOWNER',
      role: 'Asset Owner & Commercial Operator',
      valueProp: 'Zero upfront CAPEX, immediate fuel savings surplus, improved CII carbon rating without balance sheet leverage.',
      incentive: 'Captures 70%+ of net savings post debt service; preserves corporate borrowing limits.',
      icon: Ship,
      color: 'border-cyan-500 text-cyan-400',
    },
    {
      id: 'bank',
      label: 'FINANCING BANK',
      role: 'Green Debt Provider / SPV Investor',
      valueProp: 'Senior secured asset claim backed by continuous cryptographic telemetry verification and 6-month DSRA escrow.',
      incentive: 'Deploys green capital at attractive risk-adjusted yields with strong ESG classification and senior DSCR coverage (2.5x–4.0x).',
      icon: Building2,
      color: 'border-amber-500 text-amber-400',
      evidenceId: 'FIN-003',
    },
    {
      id: 'tech',
      label: 'TECH PROVIDER (OEM)',
      role: 'Hardware Equipment Manufacturer',
      valueProp: 'Removes customer sales friction by offering pay-as-you-save financing directly at the point of sale.',
      incentive: 'Accelerates commercial adoption of Air Lubrication, Rotor Sails, PBCF, and advanced coatings.',
      icon: Wrench,
      color: 'border-blue-500 text-blue-400',
      evidenceId: 'TECH-001',
    },
    {
      id: 'charterer',
      label: 'CHARTERER',
      role: 'Cargo Owner / Commercial Shipper',
      valueProp: 'BIMCO Green Clause gain-sharing gives direct discounts on voyage fuel invoices and lower scope-3 emissions.',
      incentive: 'Access to premium Tier-1 rated green tonnage at competitive charter day-rates.',
      icon: Users,
      color: 'border-emerald-500 text-emerald-400',
      evidenceId: 'CHARTER-001',
    },
    {
      id: 'verifier',
      label: 'VERIFIER / CLASS',
      role: 'Independent Maritime Classifier (IRClass, DNV)',
      valueProp: 'Audits ISO 19030 speed-power normalization and signs digital verification oracle certificates.',
      incentive: 'Expands digital telemetry assurance services across decarbonizing merchant fleets.',
      icon: ShieldCheck,
      color: 'border-teal-500 text-teal-400',
      evidenceId: 'REGULATORY-001',
    },
    {
      id: 'insurer',
      label: 'INSURER / RISK PARTNER',
      role: 'Underwriting & Loss Reserve Partner',
      valueProp: 'Underwrites equipment performance warranties and operational interruption risk.',
      incentive: 'Generates specialty marine underwriting premiums with low loss ratios backed by sensor data.',
      icon: ShieldAlert,
      color: 'border-purple-500 text-purple-400',
    },
  ];

  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const revenueStreams = [
    {
      name: 'Financing Origination Fee',
      rate: '1.0% – 1.5%',
      type: 'Upfront Capital Fee',
      desc: 'Charged on closed debt volume at shipyard retrofit escrow closing.',
      status: 'PROPOSED',
    },
    {
      name: 'Verification & Oracle Fee',
      rate: '2.0% – 4.0%',
      type: 'Recurring Savings Share',
      desc: 'Annual fee deducted from verified gross bunker savings for telemetry management.',
      status: 'PROPOSED',
    },
    {
      name: 'Continuous Performance SaaS',
      rate: '₹1.5L / mo',
      type: 'Telemetry Platform Subscription',
      desc: 'Automated ISO 19030 performance diagnostics and CII compliance reporting.',
      status: 'VALIDATED BENCHMARK',
      evidenceId: 'VERIFICATION-001',
    },
    {
      name: 'Technology Marketplace Fee',
      rate: '2.0% – 3.0%',
      type: 'OEM Integration Commission',
      desc: 'Referral commission paid by certified equipment OEMs for qualified vessel pipelines.',
      status: 'PROPOSED',
    },
  ];

  return (
    <section id="ecosystem" className="py-24 bg-[#020617] border-t border-white/10 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-20">
        
        {/* PART 1: THE ECOSYSTEM NETWORK */}
        <div>
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/20 text-[#00F2FF] text-xs font-mono mb-3 tracking-widest uppercase">
              <Network className="w-3.5 h-3.5 text-[#00F2FF]" />
              <span>09A // MULTI-STAKEHOLDER TOPOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight leading-tight uppercase">
              THE SHIPLOOP ECOSYSTEM MAP
            </h2>
            <p className="text-white/60 font-mono mt-2 text-sm tracking-wide">
              SHIPLOOP acts as the central orchestration and settlement hub aligning incentives across finance, engineering, and operations.
            </p>
          </div>

          {/* Interactive Network Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Clickable Node Cards (7 Cols) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {nodes.map((node) => {
                const Icon = node.icon;
                const isSelected = selectedNodeId === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-4 bg-white/[0.02] border transition-all duration-200 cursor-pointer text-left ${
                      isSelected
                        ? `border-[#00F2FF] bg-[#00F2FF]/10 shadow-[0_0_15px_rgba(0,242,255,0.2)]`
                        : 'border-white/10 hover:border-white/30 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="p-2 w-fit bg-[#020617] border border-white/10 mb-3">
                      <Icon className="w-5 h-5 text-[#00F2FF]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-mono font-bold text-white mb-0.5">{node.label}</div>
                      {node.evidenceId && (
                        <div onClick={(e) => e.stopPropagation()}>
                          <SourceButton evidenceId={node.evidenceId} />
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] text-white/50 font-mono line-clamp-2">{node.role}</div>
                  </div>
                );
              })}

              {/* Central SHIPLOOP Hub Card in the Grid */}
              <div className="col-span-2 sm:col-span-3 p-4 bg-[#00F2FF]/10 border border-[#00F2FF]/40 text-center font-mono">
                <span className="text-xs text-[#00F2FF] font-bold uppercase tracking-widest">
                  ★ CENTRAL ORCHESTRATION LAYER: SHIPLOOP PROTOCOL
                </span>
              </div>
            </div>

            {/* Selected Node Details Panel (5 Cols) */}
            <div className="lg:col-span-5 p-7 bg-white/[0.02] border border-[#00F2FF]/40 shadow-2xl space-y-4 tech-corner-accent">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#00F2FF] uppercase font-bold tracking-wider">STAKEHOLDER DETAIL</span>
                    {activeNode.evidenceId && <SourceButton evidenceId={activeNode.evidenceId} />}
                  </div>
                  <h3 className="text-xl font-mono font-bold text-white mt-0.5 uppercase">{activeNode.label}</h3>
                </div>
                <div className="p-2.5 bg-[#020617] border border-[#00F2FF]/40">
                  <activeNode.icon className="w-5 h-5 text-[#00F2FF]" />
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-white/40 font-bold block mb-1 uppercase text-[10px] tracking-wider">CORE FUNCTION:</span>
                  <p className="text-white/80 bg-[#020617] p-3 border border-white/10">{activeNode.role}</p>
                </div>

                <div>
                  <span className="text-emerald-400 font-bold block mb-1 uppercase text-[10px] tracking-wider">VALUE PROPOSITION:</span>
                  <p className="text-white bg-[#020617] p-3 border border-emerald-500/40">{activeNode.valueProp}</p>
                </div>

                <div>
                  <span className="text-[#FFB347] font-bold block mb-1 uppercase text-[10px] tracking-wider">FINANCIAL INCENTIVE:</span>
                  <p className="text-white/80 bg-[#020617] p-3 border border-[#FFB347]/40">{activeNode.incentive}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* PART 2: BUSINESS MODEL & MONETIZATION */}
        <div>
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/20 text-[#FFB347] text-xs font-mono mb-3 tracking-widest uppercase">
              <DollarSign className="w-3.5 h-3.5 text-[#FFB347]" />
              <span>09B // UNIT ECONOMICS & PROTOCOL REVENUE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight leading-tight uppercase">
              MONETIZATION ARCHITECTURE
            </h2>
            <p className="text-white/60 font-mono mt-2 text-sm tracking-wide">
              A diversified fee structure combining capital origination, continuous verification take-rates, and SaaS telemetry subscriptions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {revenueStreams.map((rev) => (
              <div key={rev.name} className="p-6 bg-white/[0.02] border border-white/10 space-y-3 tech-corner-accent">
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 ${
                    rev.status === 'PROPOSED' ? 'bg-[#00F2FF]/10 text-[#00F2FF] border border-[#00F2FF]/40' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {rev.status}
                  </span>
                  {rev.evidenceId && <SourceButton evidenceId={rev.evidenceId} />}
                </div>

                <div className="text-2xl font-mono font-black text-white mt-1">
                  {rev.rate}
                </div>

                <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  {rev.name}
                </div>

                <p className="text-xs text-white/50 font-mono leading-relaxed">
                  {rev.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
