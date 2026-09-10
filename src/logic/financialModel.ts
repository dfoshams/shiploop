import { SimulationParams, SimulationResult } from '../types';
import { DEMO_DATA } from '../data/demoData';

/**
 * SHIPLOOP DEMO CALCULATION ENGINE
 * 
 * NOTE FOR PRODUCTION ROADMAP:
 * This simulated calculation engine provides real-time client-side interactive formulas
 * for demonstration. In production, this module is replaced by the secure SHIPLOOP
 * credit underwriting & hydrodynamics API (`POST /api/v1/simulation/underwrite`).
 */

export function calculateSimulation(params: SimulationParams): SimulationResult {
  // 1. Scenario adjustments (for sensitivity testing)
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

  // 3. Gross Monetary Savings (in ₹ Crores)
  // fuelSaved (tonnes) * price (INR/tonne) / 10,000,000 (INR to Crores)
  const grossAnnualSavingsINR = (annualFuelSavedTonnes * effectiveFuelPriceINR) / DEMO_DATA.constants.inrCroreToUnits;

  // 4. Financing & Capital Amortization
  const financedAmountINR = params.retrofitCostINR * (params.financingPercentage / 100);
  
  // Standard Amortization Debt Service Formula: A = P * [ r(1+r)^n ] / [ (1+r)^n - 1 ]
  const r = (params.interestRateAnnualPercent || 8.5) / 100;
  const n = Math.max(1, params.financingDurationYears);
  
  let annualRepaymentINR = 0;
  if (financedAmountINR > 0) {
    if (r > 0) {
      annualRepaymentINR = financedAmountINR * ( (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) );
    } else {
      annualRepaymentINR = financedAmountINR / n;
    }
  }

  // 5. Verification, Class Audit & Telemetry Fee (4% of gross savings)
  const verificationAndAdminFeeINR = grossAnnualSavingsINR * DEMO_DATA.constants.platformVerificationFeeRate;

  // 6. Net Annual Surplus after Debt & Platform Fees
  const netAnnualSavingsINR = Math.max(0, grossAnnualSavingsINR - annualRepaymentINR - verificationAndAdminFeeINR);

  // 7. Allocation based on Charter Structure (Voyage vs Time Charter)
  let ownerRetainedINR = 0;
  let chartererRetainedINR = 0;

  if (params.charterType === 'VOYAGE') {
    // In Voyage charter, shipowner buys fuel and captures all remaining net savings
    ownerRetainedINR = netAnnualSavingsINR;
    chartererRetainedINR = 0;
  } else {
    // In Time charter, fuel savings are shared with the charterer who pays fuel bills
    // Example: If share is 50%, charterer retains 50% of the gross savings,
    // and the remaining 50% is used for debt service & owner retained upside.
    const chartererShareDecimal = params.chartererSavingsSharePercent / 100;
    const chartererGrossPortion = grossAnnualSavingsINR * chartererShareDecimal;
    const ownerGrossPortion = grossAnnualSavingsINR * (1 - chartererShareDecimal);

    chartererRetainedINR = Math.max(0, chartererGrossPortion);
    ownerRetainedINR = Math.max(0, ownerGrossPortion - annualRepaymentINR - verificationAndAdminFeeINR);
  }

  // 8. Financial Return Metrics
  const retrofitPaybackYears = grossAnnualSavingsINR > 0 ? (params.retrofitCostINR / grossAnnualSavingsINR) : 0;
  const debtServiceCoverageRatio = annualRepaymentINR > 0 ? (grossAnnualSavingsINR / annualRepaymentINR) : 99;

  // 9. Environmental Impact (IMO standard VLSFO conversion)
  const emissionsAvoidedCO2eTonnes = annualFuelSavedTonnes * DEMO_DATA.constants.co2PerTonneFuelVLSFO;

  // 10. Carbon Intensity Indicator (CII) Rating shift
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

  // 11. 10-Year Cumulative Owner Economic Value (assuming 6 yr debt, 4 yr 100% free cashflow)
  // During debt term (n years): ownerRetainedINR * n
  // Post debt term (10 - n years): (grossAnnualSavingsINR - verificationAndAdminFeeINR) * (10 - n)
  const postDebtYears = Math.max(0, 10 - n);
  const postDebtAnnualOwner = params.charterType === 'VOYAGE'
    ? (grossAnnualSavingsINR - verificationAndAdminFeeINR)
    : (grossAnnualSavingsINR * (1 - (params.chartererSavingsSharePercent / 100)) - verificationAndAdminFeeINR);
  
  const tenYearCumulativeNetOwnerBenefitINR = (ownerRetainedINR * n) + (postDebtAnnualOwner * postDebtYears);

  return {
    annualFuelSavedTonnes: Math.round(annualFuelSavedTonnes),
    postRetrofitFuelConsumptionTonnes: Math.round(postRetrofitFuelConsumptionTonnes),
    grossAnnualSavingsINR: Number(grossAnnualSavingsINR.toFixed(2)),
    financedAmountINR: Number(financedAmountINR.toFixed(2)),
    annualRepaymentINR: Number(annualRepaymentINR.toFixed(2)),
    verificationAndAdminFeeINR: Number(verificationAndAdminFeeINR.toFixed(2)),
    netAnnualSavingsINR: Number(netAnnualSavingsINR.toFixed(2)),
    ownerRetainedINR: Number(ownerRetainedINR.toFixed(2)),
    chartererRetainedINR: Number(chartererRetainedINR.toFixed(2)),
    retrofitPaybackYears: Number(retrofitPaybackYears.toFixed(1)),
    emissionsAvoidedCO2eTonnes: Math.round(emissionsAvoidedCO2eTonnes),
    ciiRatingImprovement: {
      before: beforeRating,
      after: afterRating,
    },
    debtServiceCoverageRatio: Number(debtServiceCoverageRatio.toFixed(2)),
    tenYearCumulativeNetOwnerBenefitINR: Number(tenYearCumulativeNetOwnerBenefitINR.toFixed(2)),
  };
}
