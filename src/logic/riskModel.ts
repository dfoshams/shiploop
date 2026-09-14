import { RiskStressParams, RiskStressResult, SimulationParams } from '../types';
import { calculateSimulation } from './financialModel';

/**
 * SHIPLOOP STRESS-TESTING & RISK LABORATORY ENGINE
 */

export function runStressTest(
  baseParams: SimulationParams,
  stressParams: RiskStressParams
): RiskStressResult {
  const baseResult = calculateSimulation(baseParams);
  const scheduledAnnualDebtServiceINR = baseResult.annualRepaymentINR;

  // Stressed parameters calculation
  const effectiveTechEfficiency = (baseParams.efficiencyImprovementPercent * (stressParams.technologyPerformanceFactor / 100)) / 100;
  const stressedFuelPrice = baseParams.fuelPricePerTonneINR * (1 + (stressParams.fuelPriceShockPercent / 100));
  const stressedOperatingDays = baseParams.operatingDays * (stressParams.vesselUtilizationPercent / 100);

  // Stressed physical and monetary fuel savings
  const stressedFuelConsumption = (baseParams.annualFuelConsumption * (stressedOperatingDays / baseParams.operatingDays));
  const stressedFuelSavedTonnes = stressedFuelConsumption * effectiveTechEfficiency;
  
  // Gross stressed savings (₹ Crores)
  const grossStressedAnnualSavingsINR = Number(
    ((stressedFuelSavedTonnes * stressedFuelPrice) / 10000000).toFixed(2)
  );

  // Contractual charter component deducted (Time Charter / Bareboat)
  let stressedCharterDeductionINR = 0;
  if (baseParams.charterType === 'TIME_CHARTER' || baseParams.charterType === 'BAREBOAT') {
    const chartererShare = (baseParams.chartererSavingsSharePercent ?? 50) / 100;
    stressedCharterDeductionINR = grossStressedAnnualSavingsINR * chartererShare;
  }

  // Available verified stressed savings supporting debt service
  const stressedAnnualSavingsINR = Number(
    Math.max(0, grossStressedAnnualSavingsINR - stressedCharterDeductionINR).toFixed(2)
  );

  // DSCR calculation
  const stressedDSCR = scheduledAnnualDebtServiceINR > 0
    ? Number((stressedAnnualSavingsINR / scheduledAnnualDebtServiceINR).toFixed(2))
    : 99;

  // Shortfall detection
  const shortfallAmountINR = Number(Math.max(0, scheduledAnnualDebtServiceINR - stressedAnnualSavingsINR).toFixed(2));
  const isShortfall = shortfallAmountINR > 0;

  // Health Status
  let systemHealthStatus: 'OPTIMAL' | 'MODERATE' | 'VULNERABLE' | 'DEFICIT' = 'OPTIMAL';
  if (stressedDSCR >= 1.35) {
    systemHealthStatus = 'OPTIMAL';
  } else if (stressedDSCR >= 1.05) {
    systemHealthStatus = 'MODERATE';
  } else if (stressedDSCR >= 0.85) {
    systemHealthStatus = 'VULNERABLE';
  } else {
    systemHealthStatus = 'DEFICIT';
  }

  // Determine automated SHIPLOOP contractual mitigation
  let activeMitigation: 'NONE' | 'DEBT_RESERVE' | 'TERM_ROLLOVER' | 'OWNER_TOPUP' | 'RISK_SHARING' = 'NONE';
  if (isShortfall) {
    if (shortfallAmountINR < (scheduledAnnualDebtServiceINR * 0.25)) {
      activeMitigation = 'DEBT_RESERVE';
    } else if (stressParams.vesselUtilizationPercent < 80) {
      activeMitigation = 'TERM_ROLLOVER';
    } else if (stressParams.technologyPerformanceFactor < 75) {
      activeMitigation = 'RISK_SHARING';
    } else {
      activeMitigation = 'OWNER_TOPUP';
    }
  }

  const stressedPaybackYears = stressedAnnualSavingsINR > 0
    ? Number((baseParams.retrofitCostINR / stressedAnnualSavingsINR).toFixed(1))
    : 99.9;

  return {
    stressedAnnualSavingsINR,
    scheduledAnnualDebtServiceINR,
    shortfallAmountINR,
    isShortfall,
    stressedDSCR,
    systemHealthStatus,
    activeMitigation,
    stressedPaybackYears,
  };
}
