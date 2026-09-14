import { DEMO_DATA } from '../data/demoData';

export type EuEtsScope = 'INTRA_EU_100' | 'EXTRA_EU_50' | 'OUT_OF_SCOPE_0';
export type UkEtsScope = 'IN_SCOPE' | 'OUT_OF_SCOPE';
export type FuelEuPathway = 'DATA_REQUIRED' | 'CONVENTIONAL_VLSFO_DEFICIT' | 'COMPLIANT_BIOFUEL';

export interface CarbonComplianceParams {
  // EU ETS Inputs
  euEtsPriceEUR: number; // €/tCO2e (default €75)
  euEtsScope: EuEtsScope; // 100% intra-EU, 50% extra-EU, 0% not in scope
  euEtsSurrenderYear: '2024' | '2025' | '2026_ONWARDS'; // 40%, 70%, 100%

  // UK ETS Inputs
  ukEtsPriceGBP: number; // £/tCO2e (default £45)
  ukEtsScope: UkEtsScope; // IN_SCOPE vs OUT_OF_SCOPE

  // FuelEU Maritime Inputs
  fuelEuPathway: FuelEuPathway;
  fuelEuCustomPenaltyEUR?: number;

  // IMO Net-Zero Framework (Future)
  enableImoScenario: boolean;
  imoGhgPriceUSD: number; // $/tCO2e (default $100)

  // Currency Exchange Rates (transparent conversion baseline)
  exchangeRates: {
    eurToInr: number; // ₹90
    gbpToInr: number; // ₹107
    usdToInr: number; // ₹84
  };
}

export interface CarbonComplianceResult {
  // Baseline Emissions from existing model
  annualFuelSavedTonnes: number;
  avoidedCO2eTonnesPerYear: number;
  grossAnnualFuelSavingsINR: number; // ₹ Crores

  // EU ETS Results
  euEtsScopeCoveragePercent: number;
  euEtsSurrenderRatePercent: number;
  euEtsEligibleAvoidedCO2eTonnes: number;
  euEtsAvoidedCostEUR: number;
  euEtsAvoidedCostINRCrore: number;
  isEuEtsApplicable: boolean;

  // UK ETS Results
  isUkEtsApplicable: boolean;
  ukEtsEligibleAvoidedCO2eTonnes: number;
  ukEtsAvoidedCostGBP: number;
  ukEtsAvoidedCostINRCrore: number;

  // FuelEU Maritime Results
  fuelEuStatusText: string;
  isFuelEuDefensible: boolean;
  fuelEuAvoidedCostEUR: number;
  fuelEuAvoidedCostINRCrore: number;

  // Current Combined Carbon & Compliance Savings (Statutory / Applicable Now)
  currentCarbonComplianceSavingsINRCrore: number; // ₹ Cr / year
  totalEconomicBenefitINRCrore: number; // Fuel Savings + Current Carbon/Compliance Savings
  economicBoostPercentage: number; // % increase over fuel savings alone

  // IMO Net-Zero Framework (Future / Proposed - Visually Separated & EXCLUDED from current total)
  isImoSimulated: boolean;
  imoFutureAvoidedUSD: number;
  imoFutureAvoidedINRCrore: number; // ₹ Cr / year
}

export const DEFAULT_CARBON_PARAMS: CarbonComplianceParams = {
  euEtsPriceEUR: 75,
  euEtsScope: 'EXTRA_EU_50', // Realistic default: 50% qualifying international voyage
  euEtsSurrenderYear: '2026_ONWARDS', // 100% surrender rate (active rule for 2026)

  ukEtsPriceGBP: 45,
  ukEtsScope: 'OUT_OF_SCOPE', // Default conservative: out of scope unless toggled

  fuelEuPathway: 'DATA_REQUIRED', // Defensible default: requires pathway data

  enableImoScenario: false,
  imoGhgPriceUSD: 100,

  exchangeRates: {
    eurToInr: 90.0,
    gbpToInr: 107.0,
    usdToInr: 84.0,
  },
};

/**
 * Calculates carbon and compliance cost savings using the existing SHIPLOOP fuel savings
 * and standard IMO emissions baseline as the single source of truth.
 */
export function calculateCarbonCompliance(
  annualFuelSavedTonnes: number,
  grossAnnualFuelSavingsINR: number, // in ₹ Crores from simulationResult.grossAnnualSavingsINR
  params: CarbonComplianceParams = DEFAULT_CARBON_PARAMS
): CarbonComplianceResult {
  // 1. Unified IMO Carbon baseline: 3.114 tonnes CO2 per tonne VLSFO
  const co2Factor = DEMO_DATA.constants.co2PerTonneFuelVLSFO;
  const avoidedCO2eTonnesPerYear = annualFuelSavedTonnes * co2Factor;

  // 2. EU ETS Calculation
  let euScopeMultiplier = 0;
  if (params.euEtsScope === 'INTRA_EU_100') {
    euScopeMultiplier = 1.0;
  } else if (params.euEtsScope === 'EXTRA_EU_50') {
    euScopeMultiplier = 0.5;
  } else {
    euScopeMultiplier = 0;
  }

  let surrenderRate = 1.0;
  if (params.euEtsSurrenderYear === '2024') {
    surrenderRate = 0.4;
  } else if (params.euEtsSurrenderYear === '2025') {
    surrenderRate = 0.7;
  } else {
    surrenderRate = 1.0;
  }

  const euEtsEligibleAvoidedCO2eTonnes = avoidedCO2eTonnesPerYear * euScopeMultiplier;
  const euEtsAvoidedCostEUR = euEtsEligibleAvoidedCO2eTonnes * params.euEtsPriceEUR * surrenderRate;
  const euEtsAvoidedCostINRCrore = (euEtsAvoidedCostEUR * params.exchangeRates.eurToInr) / 10000000;
  const isEuEtsApplicable = euScopeMultiplier > 0 && euEtsAvoidedCostEUR > 0;

  // 3. UK ETS Calculation (Active from 1 July 2026)
  const isUkEtsApplicable = params.ukEtsScope === 'IN_SCOPE';
  const ukEtsEligibleAvoidedCO2eTonnes = isUkEtsApplicable ? avoidedCO2eTonnesPerYear : 0;
  const ukEtsAvoidedCostGBP = isUkEtsApplicable ? ukEtsEligibleAvoidedCO2eTonnes * params.ukEtsPriceGBP : 0;
  const ukEtsAvoidedCostINRCrore = (ukEtsAvoidedCostGBP * params.exchangeRates.gbpToInr) / 10000000;

  // 4. FuelEU Maritime Calculation (GHG intensity compliance exposure, not a tax)
  let fuelEuStatusText = 'Compliance-cost estimate requires fuel pathway / energy mix data.';
  let isFuelEuDefensible = false;
  let fuelEuAvoidedCostEUR = 0;

  if (params.fuelEuPathway === 'CONVENTIONAL_VLSFO_DEFICIT') {
    // Standard VLSFO deficit modeling:
    // Required 2% reduction (2025-2029) on 91.16 gCO2e/MJ. Energy per tonne VLSFO ~41,000 MJ.
    // Saving 1 tonne VLSFO avoids consuming 41,000 MJ that carries a compliance deficit
    // Deficit avoided = 41,000 MJ * 1.8232 gCO2e/MJ = ~74.75 kg CO2eq deficit.
    // Penalty rate: €2,400 per 41,000 MJ * 91.16 gCO2eq = €2,400 / 3,737.56 kg = €0.6421 / kg deficit.
    // Deficit avoided per tonne fuel saved: ~€48 / tonne saved (or conservative ~€35/t).
    const avoidedPenaltyRatePerTonneSavedEUR = 35;
    fuelEuAvoidedCostEUR = annualFuelSavedTonnes * avoidedPenaltyRatePerTonneSavedEUR;
    fuelEuStatusText = 'Modeled FuelEU compliance deficit avoided under standard VLSFO baseline.';
    isFuelEuDefensible = true;
  } else if (params.fuelEuPathway === 'COMPLIANT_BIOFUEL') {
    fuelEuStatusText = 'Alternative/biofuel pathway compliant with FuelEU GHG targets (€0 penalty exposure).';
    isFuelEuDefensible = true;
    fuelEuAvoidedCostEUR = 0;
  } else {
    // DATA_REQUIRED
    fuelEuStatusText = 'Compliance-cost estimate requires fuel pathway / energy mix data.';
    isFuelEuDefensible = false;
    fuelEuAvoidedCostEUR = 0;
  }

  const fuelEuAvoidedCostINRCrore = (fuelEuAvoidedCostEUR * params.exchangeRates.eurToInr) / 10000000;

  // 5. CURRENT Carbon & Compliance Savings (EU ETS + UK ETS + FuelEU where applicable)
  // NEVER includes IMO Net-Zero Framework!
  const currentCarbonComplianceSavingsINRCrore =
    euEtsAvoidedCostINRCrore + ukEtsAvoidedCostINRCrore + (isFuelEuDefensible ? fuelEuAvoidedCostINRCrore : 0);

  const totalEconomicBenefitINRCrore = grossAnnualFuelSavingsINR + currentCarbonComplianceSavingsINRCrore;

  const economicBoostPercentage =
    grossAnnualFuelSavingsINR > 0
      ? (currentCarbonComplianceSavingsINRCrore / grossAnnualFuelSavingsINR) * 100
      : 0;

  // 6. IMO Net-Zero Framework (Future / Proposed - Visually Separated & EXCLUDED from current total)
  let imoFutureAvoidedUSD = 0;
  if (params.enableImoScenario) {
    imoFutureAvoidedUSD = avoidedCO2eTonnesPerYear * params.imoGhgPriceUSD;
  }
  const imoFutureAvoidedINRCrore = (imoFutureAvoidedUSD * params.exchangeRates.usdToInr) / 10000000;

  return {
    annualFuelSavedTonnes,
    avoidedCO2eTonnesPerYear,
    grossAnnualFuelSavingsINR,

    euEtsScopeCoveragePercent: Math.round(euScopeMultiplier * 100),
    euEtsSurrenderRatePercent: Math.round(surrenderRate * 100),
    euEtsEligibleAvoidedCO2eTonnes,
    euEtsAvoidedCostEUR,
    euEtsAvoidedCostINRCrore,
    isEuEtsApplicable,

    isUkEtsApplicable,
    ukEtsEligibleAvoidedCO2eTonnes,
    ukEtsAvoidedCostGBP,
    ukEtsAvoidedCostINRCrore,

    fuelEuStatusText,
    isFuelEuDefensible,
    fuelEuAvoidedCostEUR,
    fuelEuAvoidedCostINRCrore,

    currentCarbonComplianceSavingsINRCrore,
    totalEconomicBenefitINRCrore,
    economicBoostPercentage,

    isImoSimulated: params.enableImoScenario,
    imoFutureAvoidedUSD,
    imoFutureAvoidedINRCrore,
  };
}
