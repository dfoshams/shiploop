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
  efficiencyImprovementPercent: number; // e.g. 7.5 for 7.5%
  financingPercentage: number; // e.g. 100%
  financingDurationYears: number; // e.g. 6 (base repayment tenure)
  interestRateAnnualPercent: number; // 0% to 15%, default 0%
  additionalProfitPeriodMonths: number; // 0 to 36 months, default 0 months (AFTER loan fully repaid)
  tenureExtensionMonths?: number; // legacy alias
  bankSavingsSharePercent: number; // 0% to 100%, default 90% (applied ONLY to additional profit period)
  charterType: 'VOYAGE' | 'TIME_CHARTER' | 'BAREBOAT' | 'COA';
  chartererSavingsSharePercent: number; // for time charter and bareboat: 0-100%
  scenario: 'CONSERVATIVE' | 'BASE' | 'OPTIMISTIC';
}

export interface SimulationResult {
  charterType: 'VOYAGE' | 'TIME_CHARTER' | 'BAREBOAT' | 'COA';
  fuelPayer: 'OWNER' | 'CHARTERER';
  contractualMechanism: string;
  incentiveAlignment: string;
  annualFuelSavedTonnes: number;
  postRetrofitFuelConsumptionTonnes: number;
  grossAnnualSavingsINR: number; // ₹ Crores
  financedAmountINR: number; // ₹ Crores

  // Base Loan Term (Principal Repayment Period ONLY)
  baseTenureYears: number;
  baseTenureMonths: number;
  loanPrincipalRepaidPercent: number; // Always 100% upon base term completion

  // Additional Profit Period (AFTER 100% Principal Repayment)
  additionalProfitPeriodMonths: number;
  additionalProfitPeriodYears: number;
  totalTimelineMonths: number; // Base loan term + additional profit period
  totalTimelineYears: number;

  // Base Loan Repayment & Amortization (Calculated ONLY on Base Loan Term)
  monthlyRepaymentINR: number; // ₹ Crores/month
  annualRepaymentINR: number; // ₹ Crores/year
  totalInterestINR: number; // ₹ Crores
  totalLoanRepaidINR: number; // ₹ Crores (100% principal + interest)

  // Cashflow & Charter Economics
  charterDeductionINR: number; // ₹ Crores (charter component deducted)
  availableVerifiedSavingsINR: number; // ₹ Crores/year (post-charter available verified savings)

  // Additional Profit Generation & Distribution (During Additional Profit Period ONLY)
  additionalProfitTotalSavingsINR: number; // ₹ Crores generated during additional profit period
  bankSharePercent: number; // % (default 90%)
  ownerSharePercent: number; // % (default 10%)
  additionalBankProfitINR: number; // ₹ Crores to Bank from additional profit period
  additionalOwnerProfitINR: number; // ₹ Crores to Shipowner from additional profit period

  // Bank Total Return & Metrics
  bankPrincipalRecoveredINR: number; // ₹ Crores (100% of financed principal)
  bankInterestEarnedINR: number; // ₹ Crores (0 when interest = 0%)
  bankTotalReturnINR: number; // ₹ Crores (Principal + Interest + Additional Bank Profit)
  bankNetGainINR: number; // ₹ Crores (Interest + Additional Bank Profit)
  bankAnnualizedYieldPercent: number; // % effective annualized return

  // Shipowner Benefit Breakdown
  ownerBaseTermAnnualSurplusINR: number; // ₹ Crores/yr during base loan term
  ownerRetainedINR: number; // ₹ Crores/yr during base term surplus
  postDebtAnnualOwnerINR: number; // ₹ Crores/yr when shipowner retains 100%
  tenYearCumulativeNetOwnerBenefitINR: number; // ₹ Crores over 10-year horizon

  // Legacy/compatibility fields
  finalTenureMonths: number;
  finalTenureYears: number;
  distributableCashflowINR: number;
  bankAnnualShareINR: number;
  ownerAnnualShareINR: number;
  bankCumulativeDistributionINR: number;
  ownerTenureRetainedINR: number;

  // Platform & Verification
  verificationAndAdminFeeINR: number; // ₹ Crores
  netAnnualSavingsINR: number; // ₹ Crores
  chartererRetainedINR: number; // ₹ Crores

  // Performance & Ratings
  retrofitPaybackYears: number;
  emissionsAvoidedCO2eTonnes: number;
  ciiRatingImprovement: {
    before: 'A' | 'B' | 'C' | 'D' | 'E';
    after: 'A' | 'B' | 'C' | 'D' | 'E';
  };
  debtServiceCoverageRatio: number; // DSCR
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
