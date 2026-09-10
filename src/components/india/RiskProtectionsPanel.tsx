import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Activity, 
  Sliders, 
  AlertTriangle, 
  FileCheck,
  Scale
} from 'lucide-react';
import { EvidenceMarker } from './EvidenceMarker';

export const RiskProtectionsPanel: React.FC = () => {
  const protections = [
    {
      id: 1,
      title: '1. BASELINE VERIFICATION',
      icon: FileCheck,
      description: 'Pre-retrofit sea trials executed under ISO 19030 / ITTC guidelines to mathematically establish speed-power consumption benchmark.',
      mechanism: 'Eliminates disputed baselines before a single rupee of debt is disbursed.',
    },
    {
      id: 2,
      title: '2. INDEPENDENT SAVINGS VERIFICATION',
      icon: ShieldCheck,
      description: 'IACS classification societies (e.g., IRClass / DNV) continuously certify operational data packets rather than relying on self-reported logs.',
      mechanism: 'Third-party integrity guarantees audited cashflow proof for credit committees.',
    },
    {
      id: 3,
      title: '3. CONSERVATIVE SAVINGS ASSUMPTIONS',
      icon: Sliders,
      description: 'Underwriting models apply a conservative P90 efficiency discount and moderate baseline bunker pricing (e.g. ₹50,000/t VLSFO).',
      mechanism: 'Provides built-in debt service coverage cushion (>2.5x DSCR standard).',
    },
    {
      id: 4,
      title: '4. PERFORMANCE MONITORING',
      icon: Activity,
      description: '1Hz high-frequency sensor fusion streams Coriolis fuel mass flow, shaft torque, GPS speed-over-ground, and weather telemetry.',
      mechanism: 'Early detection of hull fouling or mechanical drift enables rapid remediation.',
    },
    {
      id: 5,
      title: '5. REPAYMENT RESERVE (DSRF)',
      icon: Lock,
      description: '6-month Debt Service Reserve Fund (DSRF) held in automated escrow buffer to absorb port delays, idle waiting, or temporary off-hire.',
      mechanism: 'Bank receives unbroken quarterly debt service even during seasonal trade slowdowns.',
    },
    {
      id: 6,
      title: '6. CONTRACTUAL SAVINGS-SHARING',
      icon: Scale,
      description: 'Standardized BIMCO green charterparty clauses align charterer bunker savings with scheduled loan amortization sweeps.',
      mechanism: 'Legally binds cashflow allocation across owner, charterer, and lender.',
    },
    {
      id: 7,
      title: '7. STRESS TESTING PROTOCOL',
      icon: AlertTriangle,
      description: 'Dynamic portfolio simulations stress-test 30% bunker price crashes, 60-day drydock overruns, and 40% fuel market collapse.',
      mechanism: 'Quantifies loss thresholds and triggers automatic tenor-extension clauses.',
    },
  ];

  return (
    <div className="w-full bg-[#020617]/90 border border-white/10 tech-corner-accent p-5 sm:p-7 space-y-5 font-mono">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>CREDIT RISK GOVERNANCE & UNDERWRITING SHIELD</span>
          </span>
          <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight mt-0.5">
            WHAT PROTECTS THE BANK?
          </h3>
        </div>
        <EvidenceMarker type="PROPOSED" label="PROPOSED RISK CONTROLS" />
      </div>

      <p className="text-xs text-white/60 font-normal leading-relaxed">
        These structural protections ensure that senior debt does not rely on speculative venture risk. Each defense ring addresses an empirical maritime risk vector with verifiable technical and legal controls.
      </p>

      {/* 7 Protections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
        {protections.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.id}
              className="p-3.5 bg-white/[0.02] border border-white/10 space-y-2 hover:border-[#00F2FF]/40 transition-colors"
            >
              <div className="flex items-center gap-2 text-[#00F2FF]">
                <Icon className="w-4 h-4 text-[#00F2FF] flex-shrink-0" />
                <span className="text-xs font-bold text-white uppercase">{p.title}</span>
              </div>
              <p className="text-[11px] text-white/70 font-normal leading-relaxed">
                {p.description}
              </p>
              <div className="pt-2 border-t border-white/10 text-[10px] text-emerald-400 font-medium">
                <span className="text-white/40 block text-[9px] uppercase">LENDER DEFENSE:</span>
                {p.mechanism}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mandatory Regulatory & Partner Disclaimer Notice */}
      <div className="p-3 bg-white/[0.02] border border-white/15 text-[10px] text-white/50 leading-relaxed">
        <span className="text-amber-400 font-bold uppercase block text-[9px] mb-0.5">
          [ PROPOSED RISK CONTROLS // NON-BINDING SPECIFICATION ]
        </span>
        These risk protections represent SHIPLOOP's proposed financial engineering and covenant framework. They are not currently formally adopted or underwritten by any Indian commercial or development bank.
      </div>

    </div>
  );
};
