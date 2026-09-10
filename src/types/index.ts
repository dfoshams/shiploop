export interface VesselPreset {
  id: string;
  name: string;
  type: string;
  dwt: number; // Deadweight tonnage
  annualFuelTonnes: number;
  fuelPricePerTonneINR: number; // in INR
  operatingDaysPerYear: number;
  typicalRetrofitCostINR: number; // in INR Crores
  expectedEfficiencyPercent: number;
  description: string;
}

export interface SimulationParams {
  annualFuelConsumption: number; // tonnes
  fuelPricePerTonneINR: number; // INR
  operatingDays: number;
  retrofitCostINR: number; // Crores (₹ Cr)
  efficiencyImprovementPercent: number; // e.g. 15 for 15%
  financingPercentage: number; // e.g. 100%
  financingDurationYears: number; // e.g. 6
  interestRateAnnualPercent: number; // e.g. 8.5%
  charterType: 'VOYAGE' | 'TIME_CHARTER';
  chartererSavingsSharePercent: number; // for time charter: 0-100%
  scenario: 'CONSERVATIVE' | 'BASE' | 'OPTIMISTIC';
}

export interface SimulationResult {
  annualFuelSavedTonnes: number;
  postRetrofitFuelConsumptionTonnes: number;
  grossAnnualSavingsINR: number; // ₹ Crores
  financedAmountINR: number; // ₹ Crores
  annualRepaymentINR: number; // ₹ Crores
  verificationAndAdminFeeINR: number; // ₹ Crores
  netAnnualSavingsINR: number; // ₹ Crores
  ownerRetainedINR: number; // ₹ Crores
  chartererRetainedINR: number; // ₹ Crores
  retrofitPaybackYears: number;
  emissionsAvoidedCO2eTonnes: number;
  ciiRatingImprovement: {
    before: 'A' | 'B' | 'C' | 'D' | 'E';
    after: 'A' | 'B' | 'C' | 'D' | 'E';
  };
  debtServiceCoverageRatio: number; // DSCR
  tenYearCumulativeNetOwnerBenefitINR: number; // ₹ Crores
}

export interface RiskStressParams {
  technologyPerformanceFactor: number; // 50% to 120% (100% = baseline expected)
  fuelPriceShockPercent: number; // -30% to +40%
  vesselUtilizationPercent: number; // 50% to 115%
  charterRevenueShockPercent: number; // -30% to +30%
}

export interface RiskStressResult {
  stressedAnnualSavingsINR: number; // ₹ Crores
  scheduledAnnualDebtServiceINR: number; // ₹ Crores
  shortfallAmountINR: number; // ₹ Crores (0 if >= 0)
  isShortfall: boolean;
  stressedDSCR: number;
  systemHealthStatus: 'OPTIMAL' | 'MODERATE' | 'VULNERABLE' | 'DEFICIT';
  activeMitigation: 'NONE' | 'DEBT_RESERVE' | 'TERM_ROLLOVER' | 'OWNER_TOPUP' | 'RISK_SHARING';
  stressedPaybackYears: number;
}

export interface ReferenceSource {
  id: string;
  title: string;
  organization: string;
  date: string;
  url?: string;
  claim: string;
  verificationStatus: 'SOURCE VERIFIED' | 'REQUIRES INDEPENDENT AUDIT' | 'INDUSTRY BENCHMARK';
  category: 'FINANCE' | 'MARITIME_ENGINEERING' | 'POLICY_INDIA' | 'GLOBAL_REGULATION';
}

export interface IndianPortCluster {
  id: string;
  name: string;
  region: string;
  coordinates: { x: number; y: number }; // Relative coordinates on stylized map (0-100)
  annualVesselCalls: number;
  potentialRetrofitMarketSizeINRCr: number;
  greenBunkeringReady: boolean;
  strategicFocus: string;
}
