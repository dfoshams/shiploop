import { SimulationParams, SimulationResult } from '../types';
import { DEMO_DATA } from '../data/demoData';

/**
 * SHIPLOOP FINANCIAL CALCULATION ENGINE
 * 
 * Centralized Single SHIPLOOP Financing Model.
 * 
 * CRITICAL ARCHITECTURAL DISTINCTION:
 * BASE LOAN TERM ≠ EXTRA PROFIT PERIOD
 * 
 * 1. BASE LOAN TERM:
 *    - Period during which 100% of the loan principal is repaid.
 *    - Calculated strictly on the base loan duration (e.g. 6 years = 72 months).
 *    - The new slider does NOT change the base loan term or extend principal repayment.
 * 
 * 2. ADDITIONAL PROFIT PERIOD:
 *    - Additional period AFTER the loan has been 100% repaid (0 to 36 months).
 *    - During this period, available post-charter verified savings are distributed
 *      between Bank and Shipowner according to the selected ratio.
 *    - If 0 months: Additional Bank Profit = ₹0, Additional Shipowner Profit = ₹0.
 * 
 * 3. SEQUENTIAL TIMELINE:
 *    FINANCING START
 *           ↓
 *    BASE LOAN TERM (100% Principal Repaid → LOAN COMPLETED)
 *           ↓
 *    ADDITIONAL PROFIT PERIOD (Post-repayment profit distribution)
 *           ↓
 *    FINAL OWNER RETENTION (100% verified savings retained by Shipowner)
 */

export function calculateSimulation(params: SimulationParams): SimulationResult {
  // 1. Scenario adjustments (for sensitivity analysis)
  let efficiencyMultiplier = 1.0;
  let fuelPriceMultiplier = 1.0;

  if (params.scenario === 'CONSERVATIVE') {
    efficiencyMultiplier = 0.85; // 15% lower operational efficiency capture
    fuelPriceMultiplier = 0.90;  // 10% lower fuel price
  } else if (params.scenario === 'OPTIMISTIC') {
    efficiencyMultiplier = 1.12; // 12% higher operational efficiency capture
    fuelPriceMultiplier = 1.08;  // 8% higher fuel price
  }

  const effectiveEfficiencyPercent = params.efficiencyImprovementPercent * efficiencyMultiplier;
  const effectiveFuelPriceINR = params.fuelPricePerTonneINR * fuelPriceMultiplier;

  // 2. Physical Fuel Saved
  const annualFuelSavedTonnes = params.annualFuelConsumption * (effectiveEfficiencyPercent / 100);
  const postRetrofitFuelConsumptionTonnes = Math.max(0, params.annualFuelConsumption - annualFuelSavedTonnes);

  // 3. STEP 1: Total Charter / Voyage Economics (Gross Monetary Savings in ₹ Crores)
  // fuelSaved (tonnes) * price (INR/tonne) / 10,000,000 (INR to Crores)
  const grossAnnualSavingsINR = (annualFuelSavedTonnes * effectiveFuelPriceINR) / DEMO_DATA.constants.inrCroreToUnits;

  // 4. STEP 2: Charter Component Deducted (if Time Charter or Bareboat, charterer savings share deducted)
  let chartererRetainedINR = 0;
  let charterDeductionINR = 0;
  let fuelPayer: 'OWNER' | 'CHARTERER' = 'OWNER';
  let contractualMechanism = 'Standard BIMCO Terms';
  let incentiveAlignment = '100% Natural Alignment';

  if (params.charterType === 'TIME_CHARTER') {
    fuelPayer = 'CHARTERER';
    contractualMechanism = 'Gain-Share Rider Clause';
    incentiveAlignment = 'Solved via Protocol';
    const chartererShareDecimal = (params.chartererSavingsSharePercent ?? 50) / 100;
    chartererRetainedINR = grossAnnualSavingsINR * chartererShareDecimal;
    charterDeductionINR = chartererRetainedINR;
  } else if (params.charterType === 'BAREBOAT') {
    fuelPayer = 'CHARTERER';
    contractualMechanism = 'Bareboat Green Retrofit Savings Rider';
    incentiveAlignment = 'Contractual Savings Share';
    const chartererShareDecimal = (params.chartererSavingsSharePercent ?? 50) / 100;
    chartererRetainedINR = grossAnnualSavingsINR * chartererShareDecimal;
    charterDeductionINR = chartererRetainedINR;
  } else if (params.charterType === 'COA') {
    fuelPayer = 'OWNER';
    contractualMechanism = 'COA Green Efficiency / Freight Adjustment Clause';
    incentiveAlignment = 'Owner Retains Verified Savings';
    chartererRetainedINR = 0;
    charterDeductionINR = 0;
  } else {
    // VOYAGE CHARTER
    fuelPayer = 'OWNER';
    contractualMechanism = 'Standard BIMCO Terms';
    incentiveAlignment = '100% Natural Alignment';
    chartererRetainedINR = 0;
    charterDeductionINR = 0;
  }

  // 5. STEP 3: Available Verified Savings (Net escrow cashflow pool entering financing mechanism)
  const availableVerifiedSavingsINR = Math.max(0, grossAnnualSavingsINR - charterDeductionINR);

  // 6. BASE LOAN TERM (Principal Repayment Period)
  // Base loan term is strictly fixed by the financing agreement (e.g. 6 years = 72 months)
  const baseTenureYears = params.financingDurationYears || 6;
  const baseTenureMonths = baseTenureYears * 12;

  // 7. BASE LOAN REPAYMENT & AMORTIZATION
  // Complete financed principal MUST be repaid during the BASE LOAN TERM
  const financedAmountINR = params.retrofitCostINR * (params.financingPercentage / 100);
  const annualInterestRate = Math.max(0, params.interestRateAnnualPercent ?? 0) / 100;

  let monthlyRepaymentINR = 0;
  let annualRepaymentINR = 0;
  let totalLoanRepaidINR = 0;
  let totalInterestINR = 0;

  if (financedAmountINR > 0) {
    if (annualInterestRate > 0) {
      const i_monthly = annualInterestRate / 12;
      monthlyRepaymentINR = financedAmountINR * ((i_monthly * Math.pow(1 + i_monthly, baseTenureMonths)) / (Math.pow(1 + i_monthly, baseTenureMonths) - 1));
      annualRepaymentINR = monthlyRepaymentINR * 12;
      totalLoanRepaidINR = monthlyRepaymentINR * baseTenureMonths;
      totalInterestINR = Math.max(0, totalLoanRepaidINR - financedAmountINR);
    } else {
      // Zero-Interest scenario: 100% of principal amortized evenly across BASE LOAN TERM
      monthlyRepaymentINR = financedAmountINR / baseTenureMonths;
      annualRepaymentINR = monthlyRepaymentINR * 12;
      totalLoanRepaidINR = financedAmountINR;
      totalInterestINR = 0;
    }
  }

  // During the BASE LOAN TERM:
  // Scheduled debt service is paid to the Bank. Any surplus savings above annual repayment belongs to the owner.
  const ownerBaseTermAnnualSurplusINR = Math.max(0, availableVerifiedSavingsINR - annualRepaymentINR);
  const ownerBaseTermTotalSurplusINR = ownerBaseTermAnnualSurplusINR * baseTenureYears;

  // 8. ADDITIONAL PROFIT PERIOD (AFTER 100% LOAN REPAYMENT)
  // Range: 0 to 36 months (step: 1 month, default: 0 months)
  // This period begins ONLY AFTER the principal has reached 100% repayment.
  const rawProfitPeriodMonths = params.additionalProfitPeriodMonths ?? params.tenureExtensionMonths ?? 0;
  const additionalProfitPeriodMonths = Math.max(0, Math.min(36, rawProfitPeriodMonths));
  const additionalProfitPeriodYears = additionalProfitPeriodMonths / 12;

  // Total timeline of engagement = Base loan term + Additional profit period
  const totalTimelineMonths = baseTenureMonths + additionalProfitPeriodMonths;
  const totalTimelineYears = baseTenureYears + additionalProfitPeriodYears;

  // 9. ADDITIONAL PROFIT DISTRIBUTION CALCULATION
  // Generated ONLY during the additional profit period.
  // If additionalProfitPeriodMonths == 0, additional profit is ₹0.
  const additionalProfitTotalSavingsINR = availableVerifiedSavingsINR * additionalProfitPeriodYears;

  // Bank & Shipowner Distribution Ratio (Applies ONLY to the Additional Profit Period)
  const bankSharePercent = Math.max(0, Math.min(100, params.bankSavingsSharePercent ?? 90));
  const ownerSharePercent = 100 - bankSharePercent;

  const additionalBankProfitINR = additionalProfitTotalSavingsINR * (bankSharePercent / 100);
  const additionalOwnerProfitINR = additionalProfitTotalSavingsINR * (ownerSharePercent / 100);

  // 10. TOTAL BANK RETURN & DECOMPOSITION
  // Bank returns comprise:
  // A. 100% Principal Repaid during BASE LOAN TERM
  const bankPrincipalRecoveredINR = financedAmountINR;
  // B. Interest Earned during BASE LOAN TERM (if interest > 0%)
  const bankInterestEarnedINR = totalInterestINR;
  // C. Additional Bank Profit (from ADDITIONAL PROFIT PERIOD ONLY)
  // Total Bank Return = Principal + Interest + Additional Bank Profit
  const bankTotalReturnINR = bankPrincipalRecoveredINR + bankInterestEarnedINR + additionalBankProfitINR;
  const bankNetGainINR = bankInterestEarnedINR + additionalBankProfitINR;
  const bankAnnualizedYieldPercent = financedAmountINR > 0 && totalTimelineYears > 0 
    ? ((bankNetGainINR / financedAmountINR) / totalTimelineYears) * 100 
    : 0;

  // 11. SHIPOWNER 10-YEAR CUMULATIVE BENEFIT
  // Phase 1 (Years 1 to Base Loan Term): Annual operational surplus above debt service
  // Phase 2 (Additional Profit Period): Owner's share of additional profit
  // Phase 3 (Remaining years up to 10): 100% of available verified savings retained
  const remainingPostPeriodYears = Math.max(0, 10 - totalTimelineYears);
  const postDebtAnnualOwnerINR = availableVerifiedSavingsINR;
  const finalOwnerRetentionTotalINR = postDebtAnnualOwnerINR * remainingPostPeriodYears;
  const tenYearCumulativeNetOwnerBenefitINR = ownerBaseTermTotalSurplusINR + additionalOwnerProfitINR + finalOwnerRetentionTotalINR;

  // 12. Verification & Admin Telemetry Allocation (for IoT monitoring context)
  const verificationAndAdminFeeINR = grossAnnualSavingsINR * DEMO_DATA.constants.platformVerificationFeeRate;
  const netAnnualSavingsINR = availableVerifiedSavingsINR;

  // 13. Financial Return Metrics
  const retrofitPaybackYears = grossAnnualSavingsINR > 0 ? (params.retrofitCostINR / grossAnnualSavingsINR) : 0;
  const debtServiceCoverageRatio = annualRepaymentINR > 0 ? (availableVerifiedSavingsINR / annualRepaymentINR) : 99;

  // 14. Environmental Impact (IMO standard VLSFO conversion)
  const emissionsAvoidedCO2eTonnes = annualFuelSavedTonnes * DEMO_DATA.constants.co2PerTonneFuelVLSFO;

  // 15. Carbon Intensity Indicator (CII) Rating shift
  let beforeRating: 'A' | 'B' | 'C' | 'D' | 'E' = 'D';
  let afterRating: 'A' | 'B' | 'C' | 'D' | 'E' = 'B';

  if (effectiveEfficiencyPercent >= 18) {
    beforeRating = 'E';
    afterRating = 'A';
  } else if (effectiveEfficiencyPercent >= 12) {
    beforeRating = 'D';
    afterRating = 'B';
  } else {
    beforeRating = 'D';
    afterRating = 'C';
  }

  // Compatibility helpers for legacy views
  const distributableCashflowINR = additionalProfitPeriodYears > 0 
    ? (additionalProfitTotalSavingsINR / additionalProfitPeriodYears) 
    : availableVerifiedSavingsINR;
  const bankAnnualShareINR = additionalProfitPeriodYears > 0 
    ? (additionalBankProfitINR / additionalProfitPeriodYears) 
    : 0;
  const ownerAnnualShareINR = additionalProfitPeriodYears > 0 
    ? (additionalOwnerProfitINR / additionalProfitPeriodYears) 
    : 0;

  return {
    charterType: params.charterType,
    fuelPayer,
    contractualMechanism,
    incentiveAlignment,
    annualFuelSavedTonnes: Math.round(annualFuelSavedTonnes),
    postRetrofitFuelConsumptionTonnes: Math.round(postRetrofitFuelConsumptionTonnes),
    grossAnnualSavingsINR: Number(grossAnnualSavingsINR.toFixed(2)),
    financedAmountINR: Number(financedAmountINR.toFixed(2)),

    // Base Loan Term (Principal Repayment Period ONLY)
    baseTenureYears,
    baseTenureMonths,
    loanPrincipalRepaidPercent: 100,

    // Additional Profit Period (AFTER 100% Principal Repayment)
    additionalProfitPeriodMonths,
    additionalProfitPeriodYears: Number(additionalProfitPeriodYears.toFixed(2)),
    totalTimelineMonths,
    totalTimelineYears: Number(totalTimelineYears.toFixed(2)),

    // Base Loan Repayment & Amortization
    monthlyRepaymentINR: Number(monthlyRepaymentINR.toFixed(4)),
    annualRepaymentINR: Number(annualRepaymentINR.toFixed(2)),
    totalInterestINR: Number(totalInterestINR.toFixed(2)),
    totalLoanRepaidINR: Number(totalLoanRepaidINR.toFixed(2)),

    // Cashflow & Charter Economics
    charterDeductionINR: Number(charterDeductionINR.toFixed(2)),
    availableVerifiedSavingsINR: Number(availableVerifiedSavingsINR.toFixed(2)),

    // Additional Profit Generation & Distribution
    additionalProfitTotalSavingsINR: Number(additionalProfitTotalSavingsINR.toFixed(2)),
    bankSharePercent,
    ownerSharePercent,
    additionalBankProfitINR: Number(additionalBankProfitINR.toFixed(2)),
    additionalOwnerProfitINR: Number(additionalOwnerProfitINR.toFixed(2)),

    // Bank Total Return & Metrics
    bankPrincipalRecoveredINR: Number(bankPrincipalRecoveredINR.toFixed(2)),
    bankInterestEarnedINR: Number(bankInterestEarnedINR.toFixed(2)),
    bankTotalReturnINR: Number(bankTotalReturnINR.toFixed(2)),
    bankNetGainINR: Number(bankNetGainINR.toFixed(2)),
    bankAnnualizedYieldPercent: Number(bankAnnualizedYieldPercent.toFixed(2)),

    // Shipowner Benefit Breakdown
    ownerBaseTermAnnualSurplusINR: Number(ownerBaseTermAnnualSurplusINR.toFixed(2)),
    ownerRetainedINR: Number(ownerBaseTermAnnualSurplusINR.toFixed(2)),
    postDebtAnnualOwnerINR: Number(postDebtAnnualOwnerINR.toFixed(2)),
    tenYearCumulativeNetOwnerBenefitINR: Number(tenYearCumulativeNetOwnerBenefitINR.toFixed(2)),

    // Compatibility properties
    finalTenureMonths: baseTenureMonths,
    finalTenureYears: baseTenureYears,
    distributableCashflowINR: Number(distributableCashflowINR.toFixed(2)),
    bankAnnualShareINR: Number(bankAnnualShareINR.toFixed(2)),
    ownerAnnualShareINR: Number(ownerAnnualShareINR.toFixed(2)),
    bankCumulativeDistributionINR: Number(additionalBankProfitINR.toFixed(2)),
    ownerTenureRetainedINR: Number((ownerBaseTermTotalSurplusINR + additionalOwnerProfitINR).toFixed(2)),

    // Platform & Verification
    verificationAndAdminFeeINR: Number(verificationAndAdminFeeINR.toFixed(2)),
    netAnnualSavingsINR: Number(netAnnualSavingsINR.toFixed(2)),
    chartererRetainedINR: Number(chartererRetainedINR.toFixed(2)),

    // Performance & Ratings
    retrofitPaybackYears: Number(retrofitPaybackYears.toFixed(1)),
    emissionsAvoidedCO2eTonnes: Math.round(emissionsAvoidedCO2eTonnes),
    ciiRatingImprovement: {
      before: beforeRating,
      after: afterRating,
    },
    debtServiceCoverageRatio: Number(debtServiceCoverageRatio.toFixed(2)),
  };
}
