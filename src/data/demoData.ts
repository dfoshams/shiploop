import { VesselPreset, IndianPortCluster, SimulationParams } from '../types';

// Master VLSFO Bunker Fuel Price (Central Financial Configuration)
export const VLSFO_PRICE = 67500; // INR / metric tonne

// Master Panamax Model Specification (Single Source of Truth)
export const PANAMAX_MODEL = {
  vessel: '75,000 DWT Panamax Bulk Carrier',
  technology: 'Flettner Rotor Sails',
  rotorCount: '4 Medium Flettner Rotors',
  retrofitCapexINR: 30.0,
  fuelEfficiencyImprovementPercent: 7.5,
  financingRatePercent: 0.0,
  vlsfoPricePerTonneINR: VLSFO_PRICE,
};

export const DEMO_DATA = {
  version: '1.4.0-PROTOTYPE',
  label: 'SIMULATED / DEMO DATA',
  disclaimer:
    'Demonstration prototype for academic ideation. Financial mechanics, policy linkages, and engineering models use simulated parameters for structural illustration.',
  
  // Single Source of Truth for active Panamax model
  activePanamaxModel: PANAMAX_MODEL,

  // Baseline financial & maritime conversion constants
  constants: {
    co2PerTonneFuelVLSFO: 3.114, // IMO standard carbon conversion factor (tonnes CO2 per tonne VLSFO)
    avgFuelPriceINRPerTonne: VLSFO_PRICE, // ₹67,500 / metric tonne
    inrCroreToUnits: 10000000, // 1 Crore = 10,000,000 INR
    platformVerificationFeeRate: 0.04, // 4% of gross savings allocated to telemetry, class verification & reserve pool
    defaultAnnualInterestRate: 0.0, // % p.a. default
    contingencyReserveFundMonths: 6, // 6 months debt service reserve
  },

  // Default vessel inputs for interactive simulator (Panamax 75k DWT with 4 Flettner Rotors)
  defaultSimulationParams: {
    annualFuelConsumption: 10000, // 10,000 tonnes/year
    fuelPricePerTonneINR: PANAMAX_MODEL.vlsfoPricePerTonneINR, // ₹67,500 / tonne (VLSFO_PRICE)
    operatingDays: 300, // 300 sailing days / year
    retrofitCostINR: PANAMAX_MODEL.retrofitCapexINR, // ₹30.0 Crore ($3.14M USD approx)
    efficiencyImprovementPercent: PANAMAX_MODEL.fuelEfficiencyImprovementPercent, // 7.5% net efficiency gain (4 Medium Flettner Rotors)
    financingPercentage: 100, // 100% financed
    financingDurationYears: 6, // 6-year base repayment term
    interestRateAnnualPercent: 0.0, // Default 0.0% p.a.
    additionalProfitPeriodMonths: 0, // Default 0 months (AFTER 100% principal repayment)
    tenureExtensionMonths: 0, // legacy alias
    bankSavingsSharePercent: 90, // Default 90% Bank / 10% Shipowner (applied ONLY to additional profit period)
    charterType: 'VOYAGE',
    chartererSavingsSharePercent: 50,
    scenario: 'BASE',
  } as SimulationParams,

  // Standard Commercial Vessel Presets
  vesselPresets: [
    {
      id: 'panamax-bulk',
      name: 'Panamax Bulk Carrier',
      type: 'Dry Bulk (75k DWT)',
      dwt: 75000,
      annualFuelTonnes: 10000,
      fuelPricePerTonneINR: PANAMAX_MODEL.vlsfoPricePerTonneINR,
      operatingDaysPerYear: 300,
      typicalRetrofitCostINR: PANAMAX_MODEL.retrofitCapexINR,
      expectedEfficiencyPercent: PANAMAX_MODEL.fuelEfficiencyImprovementPercent,
      description: '75,000 DWT Panamax Bulk Carrier equipped with 4 Medium Flettner Rotors on Indian Ocean and global trade lanes.',
    },
    {
      id: 'aframax-tanker',
      name: 'Aframax Crude Tanker',
      type: 'Liquid Bulk (115k DWT)',
      dwt: 115000,
      annualFuelTonnes: 14500,
      fuelPricePerTonneINR: 52000,
      operatingDaysPerYear: 315,
      typicalRetrofitCostINR: 14.5,
      expectedEfficiencyPercent: 16.5,
      description: 'High thermal and propulsion power demand; ideal for hull air lubrication and wake equalizing ducts.',
    },
    {
      id: 'feeder-container',
      name: 'Sub-Panamax Feeder Container',
      type: 'Container (2,800 TEU)',
      dwt: 35000,
      annualFuelTonnes: 8200,
      fuelPricePerTonneINR: 54000,
      operatingDaysPerYear: 290,
      typicalRetrofitCostINR: 7.5,
      expectedEfficiencyPercent: 13.5,
      description: 'Frequent port turnarounds, coastal loops around Western and Eastern Indian seaboards.',
    },
    {
      id: 'handymax-general',
      name: 'Handymax General Cargo',
      type: 'General Cargo (45k DWT)',
      dwt: 45000,
      annualFuelTonnes: 6500,
      fuelPricePerTonneINR: 50000,
      operatingDaysPerYear: 280,
      typicalRetrofitCostINR: 6.0,
      expectedEfficiencyPercent: 14.0,
      description: 'Versatile regional carrier with high auxiliary load during domestic coastal operations.',
    }
  ] as VesselPreset[],

  // Global FEET Reference & Research Signals
  globalSignal: {
    programName: 'FEET (Fund for Energy Efficiency Technologies)',
    status: 'RESEARCH VALIDATION REFERENCE',
    subtitle: 'Global maritime concessionary & commercial blended finance for energy-efficiency retrofits',
    targetAssetClass: 'Deep-sea commercial merchant fleet',
    keyInsights: [
      'Split incentive between shipowners and charterers is the single largest structural barrier to retrofit adoption.',
      'Pay-as-you-save / savings-linked debt structures eliminate upfront balance-sheet stress for shipowners.',
      'Third-party high-frequency continuous monitoring and sensor verification are required to de-risk bank repayment streams.'
    ],
    placeholders: {
      FEET_FUND_SIZE: '$500M+ Target blended debt pipeline (Illustrative Target)',
      FEET_TARGET: '500+ commercial merchant vessels retrofitted',
      FEET_FINANCING_STRUCTURE: 'SPV-backed savings assignment with mezzanine loss guarantees',
      FEET_PARTNERS: 'Global maritime lenders, classification societies, marine equipment OEMs',
    }
  },

  // Indian Maritime Port Clusters
  indianPorts: [
    {
      id: 'jnpt-mumbai',
      name: 'JNPA / Mumbai Port Cluster',
      region: 'Maharashtra (West Coast)',
      coordinates: { x: 26, y: 52 },
      annualVesselCalls: 3400,
      potentialRetrofitMarketSizeINRCr: 850,
      greenBunkeringReady: true,
      strategicFocus: 'Container trade hub, extensive shipyard repair yards, and commercial ship management center.'
    },
    {
      id: 'mundra-kandla',
      name: 'Mundra & Deendayal (Kandla)',
      region: 'Gujarat (Gulf of Kutch)',
      coordinates: { x: 20, y: 38 },
      annualVesselCalls: 4100,
      potentialRetrofitMarketSizeINRCr: 1100,
      greenBunkeringReady: true,
      strategicFocus: 'Highest tonnage liquid & bulk throughput gateway with direct Middle-East & European routes.'
    },
    {
      id: 'kochi',
      name: 'Cochin Port & CSL Cluster',
      region: 'Kerala (South-West Coast)',
      coordinates: { x: 33, y: 78 },
      annualVesselCalls: 1850,
      potentialRetrofitMarketSizeINRCr: 650,
      greenBunkeringReady: true,
      strategicFocus: 'Cochin Shipyard international ship repair facility and proximity to main East-West international shipping lane.'
    },
    {
      id: 'chennai-kamajar',
      name: 'Chennai & Kamarajar Ports',
      region: 'Tamil Nadu (Coromandel Coast)',
      coordinates: { x: 48, y: 68 },
      annualVesselCalls: 2200,
      potentialRetrofitMarketSizeINRCr: 580,
      greenBunkeringReady: false,
      strategicFocus: 'Automobile export & thermal coal hub with strategic Bay of Bengal connectivity.'
    },
    {
      id: 'visakhapatnam',
      name: 'Visakhapatnam Port',
      region: 'Andhra Pradesh (East Coast)',
      coordinates: { x: 58, y: 55 },
      annualVesselCalls: 2100,
      potentialRetrofitMarketSizeINRCr: 520,
      greenBunkeringReady: false,
      strategicFocus: 'Deep draft iron ore, petroleum & fertilizer transit point with naval and commercial dry-docks.'
    },
    {
      id: 'kolkata-haldia',
      name: 'Syama Prasad Mookerjee (Kolkata & Haldia)',
      region: 'West Bengal (Ganges Delta)',
      coordinates: { x: 68, y: 44 },
      annualVesselCalls: 1600,
      potentialRetrofitMarketSizeINRCr: 420,
      greenBunkeringReady: false,
      strategicFocus: 'Riverine port complex catering to Eastern hinterland, North-East and ASEAN coastal corridors.'
    }
  ] as IndianPortCluster[],

  // Scale Scenario Milestones
  scaleMilestones: [
    { count: 1, label: 'Single Pilot Ship (Demo Concept)' },
    { count: 10, label: 'First Shipping Line Squadron' },
    { count: 50, label: 'Regional Corridor Cohort' },
    { count: 100, label: 'National Green Fleet Pool' },
    { count: 500, label: 'Pan-Indian Ocean Green Network' },
    { count: 1000, label: 'Global Institutional Securitization' },
  ],

  // Verification Baseline Mock Telemetry (7.5% Wind-Assisted Fuel Reduction)
  telemetrySample: [
    { day: 1, baselineTonnes: 33.2, postRetrofitTonnes: 30.7, windKnots: 14, speedKnots: 13.8 },
    { day: 15, baselineTonnes: 34.0, postRetrofitTonnes: 31.4, windKnots: 18, speedKnots: 14.1 },
    { day: 30, baselineTonnes: 32.8, postRetrofitTonnes: 30.3, windKnots: 12, speedKnots: 13.9 },
    { day: 45, baselineTonnes: 35.5, postRetrofitTonnes: 32.8, windKnots: 22, speedKnots: 14.0 },
    { day: 60, baselineTonnes: 33.9, postRetrofitTonnes: 31.4, windKnots: 16, speedKnots: 14.2 },
    { day: 75, baselineTonnes: 33.1, postRetrofitTonnes: 30.6, windKnots: 13, speedKnots: 13.7 },
    { day: 90, baselineTonnes: 34.8, postRetrofitTonnes: 32.2, windKnots: 19, speedKnots: 14.3 },
    { day: 120, baselineTonnes: 33.6, postRetrofitTonnes: 31.1, windKnots: 15, speedKnots: 13.9 },
    { day: 150, baselineTonnes: 36.2, postRetrofitTonnes: 33.5, windKnots: 25, speedKnots: 14.1 },
    { day: 180, baselineTonnes: 33.0, postRetrofitTonnes: 30.5, windKnots: 11, speedKnots: 13.8 },
    { day: 210, baselineTonnes: 34.2, postRetrofitTonnes: 31.6, windKnots: 17, speedKnots: 14.0 },
    { day: 240, baselineTonnes: 33.4, postRetrofitTonnes: 30.9, windKnots: 14, speedKnots: 13.9 },
    { day: 270, baselineTonnes: 35.1, postRetrofitTonnes: 32.5, windKnots: 21, speedKnots: 14.2 },
    { day: 300, baselineTonnes: 33.3, postRetrofitTonnes: 30.8, windKnots: 13, speedKnots: 13.8 },
  ]
};

export const defaultSimulationParams = DEMO_DATA.defaultSimulationParams;

