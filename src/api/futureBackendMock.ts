import { SimulationParams, SimulationResult, RiskStressParams, RiskStressResult } from '../types';
import { calculateSimulation } from '../logic/financialModel';
import { runStressTest } from '../logic/riskModel';
import { DEMO_DATA } from '../data/demoData';

/**
 * FUTURE BACKEND INTEGRATION SERVICE INTERFACE (MOCK / PLACEHOLDER)
 * 
 * In production, these methods will point to the SHIPLOOP cloud microservices:
 * - Vessel Registry & AIS telemetry ingestion
 * - Hydrodynamic CFD Simulation API
 * - Green Bond / SPV Underwriting Engine
 * - DNV / Bureau Veritas / ClassNK digital verification oracle
 */

export interface RetrofitOption {
  id: string;
  name: string;
  category: 'PROPULSION' | 'HULL_COATING' | 'AIR_LUBRICATION' | 'WIND_ASSIST' | 'ENGINE_EFFICIENCY';
  capexINRCr: number;
  expectedEfficiencyPercentRange: [number, number];
  installationTimeDays: number;
  technologyReadinessLevel: number; // TRL 1-9
}

export const futureBackend = {
  // GET /vessel/:id
  async getVesselById(vesselId: string) {
    // Simulated network latency
    await new Promise((r) => setTimeout(r, 120));
    const vessel = DEMO_DATA.vesselPresets.find((v) => v.id === vesselId) || DEMO_DATA.vesselPresets[0];
    return {
      success: true,
      vessel,
      imoNumber: 'IMO-9482910',
      flag: 'Indian Flag (DG Shipping registered)',
      builtYear: 2017,
      classificationSociety: 'Indian Register of Shipping (IRClass) / DNV',
    };
  },

  // POST /simulation
  async runSimulation(params: SimulationParams): Promise<SimulationResult> {
    await new Promise((r) => setTimeout(r, 100));
    return calculateSimulation(params);
  },

  // GET /retrofit-options
  async getRetrofitOptions(): Promise<RetrofitOption[]> {
    return [
      {
        id: 'opt-air-lubrication',
        name: 'Micro-bubble Air Lubrication System (ALS)',
        category: 'AIR_LUBRICATION',
        capexINRCr: 7.2,
        expectedEfficiencyPercentRange: [6.5, 9.5],
        installationTimeDays: 12,
        technologyReadinessLevel: 9,
      },
      {
        id: 'opt-rotor-sails',
        name: 'Mechanical Flettner Rotor Wind Assist',
        category: 'WIND_ASSIST',
        capexINRCr: 11.5,
        expectedEfficiencyPercentRange: [8.0, 16.0],
        installationTimeDays: 18,
        technologyReadinessLevel: 8,
      },
      {
        id: 'opt-duct-boss',
        name: 'Wake Equalizing Duct + Propeller Boss Cap Fins (PBCF)',
        category: 'PROPULSION',
        capexINRCr: 3.5,
        expectedEfficiencyPercentRange: [4.5, 7.5],
        installationTimeDays: 7,
        technologyReadinessLevel: 9,
      },
      {
        id: 'opt-silicone-coating',
        name: 'Ultra-low Friction Fluoropolymer Foul Release Coating',
        category: 'HULL_COATING',
        capexINRCr: 2.8,
        expectedEfficiencyPercentRange: [4.0, 6.0],
        installationTimeDays: 6,
        technologyReadinessLevel: 9,
      },
      {
        id: 'opt-waste-heat',
        name: 'Organic Rankine Cycle (ORC) Waste Heat Recovery',
        category: 'ENGINE_EFFICIENCY',
        capexINRCr: 8.0,
        expectedEfficiencyPercentRange: [5.0, 8.5],
        installationTimeDays: 14,
        technologyReadinessLevel: 8,
      }
    ];
  },

  // POST /verification
  async verifySavingsCertificate(vesselId: string, reportingPeriodDays: number = 300) {
    return {
      certificateId: `SL-VER-${Math.floor(100000 + Math.random() * 900000)}`,
      vesselId,
      status: 'VERIFIED_BY_ORACLE',
      baselineTonnesPerDay: 33.3,
      measuredTonnesPerDay: 28.3,
      actualSavingPercentage: 15.01,
      totalFuelSavedTonnes: 1500,
      monetarySettlementINR: '₹7.50 Cr',
      cryptographicHash: '0x8f7b2c91a4e5d6f3910c281e594d7b1a03f49c81',
      auditor: 'Maritime Data Oracle & DNV Telemetry Integration (Simulated)',
    };
  },

  // GET /financing-offer
  async getFinancingOffer(capexINRCr: number, dscr: number) {
    return {
      eligible: dscr >= 1.15,
      maxLTV: 1.0, // 100% upfront financing
      recommendedTenorYears: 6,
      indicativeInterestRatePercent: 8.5,
      creditEnhancement: 'SPV Fuel Savings Assignment + First Lien on Savings Account',
    };
  },

  // POST /stress-test
  async runStressTestApi(baseParams: SimulationParams, stressParams: RiskStressParams): Promise<RiskStressResult> {
    return runStressTest(baseParams, stressParams);
  }
};
