import { DEMO_DATA } from '../data/demoData';

export interface EmissionsEstimate {
  annualCO2eAvoidedTonnes: number;
  equivalentCarsRemovedYearly: number;
  euEtsCarbonCostSavedUSD: number; // Approximate avoided carbon compliance liability
  fuelEuMaritimePenaltySavedUSD: number;
}

export function calculateEmissionsProfile(fuelSavedTonnes: number): EmissionsEstimate {
  const annualCO2eAvoidedTonnes = fuelSavedTonnes * DEMO_DATA.constants.co2PerTonneFuelVLSFO;
  
  // 1 typical passenger vehicle emits ~4.6 tonnes CO2/year (EPA benchmark)
  const equivalentCarsRemovedYearly = Math.round(annualCO2eAvoidedTonnes / 4.6);

  // EU ETS estimated carbon price (~$75/tonne CO2)
  const euEtsCarbonCostSavedUSD = Math.round(annualCO2eAvoidedTonnes * 75);

  // FuelEU Maritime compliance multiplier factor
  const fuelEuMaritimePenaltySavedUSD = Math.round(annualCO2eAvoidedTonnes * 32);

  return {
    annualCO2eAvoidedTonnes: Math.round(annualCO2eAvoidedTonnes),
    equivalentCarsRemovedYearly,
    euEtsCarbonCostSavedUSD,
    fuelEuMaritimePenaltySavedUSD,
  };
}
