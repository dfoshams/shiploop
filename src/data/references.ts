export type EvidenceType =
  | 'VERIFIED'
  | 'RESEARCH'
  | 'POLICY'
  | 'REAL-WORLD REFERENCE'
  | 'TECHNICAL DATA'
  | 'INDUSTRY DATA';

export interface SourceCitation {
  organization: string;
  title: string;
  date?: string;
  url: string;
  publicationType?: string;
}

export interface EvidenceRecord {
  id: string;
  claim: string;
  topic: string;
  explanation: string;
  organization: string;
  title: string;
  date: string;
  evidenceType: EvidenceType;
  url: string;
  additionalSources?: SourceCitation[];
}

// Full centralized registry of genuine, independent external public sources
export const EVIDENCE_REGISTRY: EvidenceRecord[] = [
  {
    id: 'REG-EUETS-001',
    topic: 'EU ETS Maritime Scope & Surrender Mandate',
    claim: 'Under Directive (EU) 2023/959, commercial vessels of 5,000 GT and above must surrender EU Allowances (EUAs) for 100% of intra-EU/port emissions and 50% of qualifying voyages between EU and non-EU ports, with 100% surrender liability active from 2026.',
    explanation: 'Official European Commission legislation incorporating maritime transport into the EU Emissions Trading System (EU ETS). Reductions in vessel bunker consumption directly eliminate required EUA surrenders at prevailing market carbon allowance prices.',
    organization: 'European Commission / European Parliament',
    title: 'Directive (EU) 2023/959 amending Directive 2003/87/EC establishing a system for greenhouse gas emission allowance trading within the Union',
    date: '2023-2024',
    evidenceType: 'POLICY',
    url: 'https://climate.ec.europa.eu/eu-action/transport/reducing-emissions-shipping-sector/faq-inclusion-maritime-emissions-eu-ets_en',
  },
  {
    id: 'REG-UKETS-001',
    topic: 'UK ETS Maritime Expansion (Active from 1 July 2026)',
    claim: 'The UK ETS Authority mandates the inclusion of domestic maritime greenhouse gas emissions from commercial vessels of 5,000 GT and above starting 1 July 2026, requiring surrendered UK allowances for in-scope activities.',
    explanation: 'Official UK Government and UK ETS Authority statutory framework establishing the implementation date and emissions accounting rules for maritime transport inclusion in the UK Emissions Trading Scheme.',
    organization: 'UK ETS Authority (DESNZ, Scottish Gov, Welsh Gov, DAERA NI)',
    title: 'Developing the UK Emissions Trading Scheme (UK ETS): Maritime Transport Scope and Implementation Framework',
    date: '2023-2024',
    evidenceType: 'POLICY',
    url: 'https://www.gov.uk/government/consultations/developing-the-uk-emissions-trading-scheme-uk-ets',
  },
  {
    id: 'REG-FUELEU-001',
    topic: 'FuelEU Maritime Regulation GHG Intensity Standards',
    claim: 'Regulation (EU) 2023/1805 enforces progressive limits on the well-to-wake greenhouse gas intensity of energy used on board ships (2% drop in 2025, reaching 80% by 2050), applying compliance remedial costs for deficits rather than a flat bunker tax.',
    explanation: 'Official European Union regulation establishing a goal-based GHG energy-intensity standard per megajoule. Because compliance deficits are calculated over total energy consumed, energy efficiency retrofits directly reduce aggregate energy and potential compliance exposure.',
    organization: 'European Union / Official Journal of the EU',
    title: 'Regulation (EU) 2023/1805 on the use of renewable and low-carbon fuels in maritime transport (FuelEU Maritime)',
    date: '2023-2024',
    evidenceType: 'POLICY',
    url: 'https://eur-lex.europa.eu/eli/reg/2023/1805/oj',
  },
  {
    id: 'REG-IMONET-001',
    topic: 'IMO Net-Zero Framework & Proposed Mid-Term GHG Pricing Mechanism',
    claim: 'The IMO 2023 GHG Strategy outlines mid-term measures including a goal-based marine fuel standard and an economic maritime GHG pricing mechanism, currently under formal negotiation at the Marine Environment Protection Committee (MEPC).',
    explanation: 'Official United Nations IMO framework under Resolution MEPC.377(80). Because final adoption is scheduled for mid-term implementation (anticipated 2027+), potential avoided emissions costs represent future economic exposures rather than active statutory liabilities.',
    organization: 'International Maritime Organization (IMO)',
    title: '2023 IMO Strategy on Reduction of GHG Emissions from Ships & Draft IMO Net-Zero Framework (MEPC 80 / MEPC 81)',
    date: '2023-2024',
    evidenceType: 'POLICY',
    url: 'https://www.imo.org/en/OurWork/Environment/Pages/2023-IMO-Strategy-on-Reduction-of-GHG-Emissions-from-Ships.aspx',
  },
  {
    id: 'POLICY-001',
    topic: 'Global Maritime GHG Baseline & Decarbonization Mandate',
    claim: 'Global shipping accounts for ~1,076 million tonnes of greenhouse gas emissions annually (~3% of global emissions), requiring structural energy efficiency acceleration.',
    explanation: 'The official United Nations specialized agency for shipping establishes the authoritative global greenhouse gas baseline and emissions reduction targets for international shipping, highlighting energy efficiency technologies as immediate abatement solutions.',
    organization: 'International Maritime Organization (IMO)',
    title: 'Fourth IMO GHG Study 2020 & 2023 IMO Strategy on Reduction of GHG Emissions from Ships',
    date: '2020-2023',
    evidenceType: 'POLICY',
    url: 'https://www.imo.org/en/ourwork/environment/pages/fourth-imo-ghg-study-2020.aspx',
    additionalSources: [
      {
        organization: 'International Maritime Organization (IMO)',
        title: '2023 IMO Strategy on Reduction of GHG Emissions from Ships (Resolution MEPC.377(80))',
        date: '2023',
        url: 'https://www.imo.org/en/OurWork/Environment/Pages/2023-IMO-Strategy-on-Reduction-of-GHG-Emissions-from-Ships.aspx',
      }
    ]
  },
  {
    id: 'FIN-001',
    topic: 'Retrofit CAPEX Barrier & Shipyard Installation Economics',
    claim: 'Upfront capital expenditure for deep-sea energy efficiency retrofits (rotor sails, air lubrication, hydrodynamic optimization) ranges from $1.0M to $3.5M (₹8–30 Crore) per commercial vessel, creating severe balance-sheet hurdle rates.',
    explanation: 'DNV\'s flagship maritime transition forecast documents verified commercial retrofit installation costs, confirming that high upfront capital requirements deter vessel owners operating in cyclical freight markets.',
    organization: 'DNV Maritime',
    title: 'Maritime Forecast to 2050: Energy Transition & Retrofit Technology Economics',
    date: '2023',
    evidenceType: 'INDUSTRY DATA',
    url: 'https://www.dnv.com/maritime/publications/maritime-forecast-2050/',
  },
  {
    id: 'CHARTER-001',
    topic: 'The Split-Incentive Principal-Agent Barrier in Commercial Shipping',
    claim: 'Under standard Time Charter contracts, charterers pay for voyage bunker fuel while shipowners bear capital retrofit costs, creating a split incentive that stalls energy-efficiency investments across the global fleet.',
    explanation: 'Empirical research by the Global Maritime Forum and University College London (UCL) Energy Institute proves that the contractual divide between fuel payer and asset owner is the primary non-technical barrier preventing commercial fleet decarbonization.',
    organization: 'Global Maritime Forum / UCL Energy Institute',
    title: 'The Principal-Agent Problem in Maritime Shipping: Understanding Split Incentives in Time Charters',
    date: '2022',
    evidenceType: 'RESEARCH',
    url: 'https://globalmaritimeforum.org/insight/the-principal-agent-problem-in-maritime-shipping/',
  },
  {
    id: 'CHARTER-002',
    topic: 'BIMCO Standard Charter Parties & Fuel Liability Allocation',
    claim: 'Standard maritime charterparties (BIMCO NYPE for Time Charters, GENCON for Voyage Charters, BARECON for Bareboat) strictly partition bunker purchasing liability between owner and charterer.',
    explanation: 'BIMCO drafts the world\'s most widely adopted commercial shipping contracts, defining exact clauses that allocate fuel procurement liability, consumption warranties, and voyage operating expenditures.',
    organization: 'BIMCO (Baltic and International Maritime Council)',
    title: 'Standard Maritime Contracts and Clauses (NYPE 2015, BARECON 2017, GENCON)',
    date: '2021',
    evidenceType: 'INDUSTRY DATA',
    url: 'https://www.bimco.org/contracts-and-clauses/bimco-contracts',
  },
  {
    id: 'CHARTER-003',
    topic: 'BIMCO Efficiency & Carbon Intensity Gain-Sharing Clauses',
    claim: 'BIMCO has established operational and transitional efficiency clauses to encourage fuel savings sharing and joint compliance with IMO CII ratings between owners and charterers.',
    explanation: 'BIMCO\'s CII Operations Clause and green transition clauses provide legally recognized contractual mechanisms allowing charterers and owners to share the financial rewards of verified fuel savings.',
    organization: 'BIMCO',
    title: 'BIMCO CII Operations Clause for Time Charter Parties',
    date: '2022',
    evidenceType: 'POLICY',
    url: 'https://www.bimco.org/contracts-and-clauses/bimco-clauses/current-clauses/cii-operations-clause-for-time-charter-parties-2022',
  },
  {
    id: 'TECH-001',
    topic: 'Flettner Rotor Wind-Assisted Propulsion Technology (WAPS)',
    claim: 'Flettner rotors generate auxiliary aerodynamic thrust via the Magnus effect, delivering documented net fuel and carbon savings of 5% to 12% across commercial bulk carriers and tankers.',
    explanation: 'Official manufacturer telemetry and independent third-party class sea trial verifications confirm mechanical rotor sail efficiency gains on operating dry bulk and tanker vessels across major ocean trade routes.',
    organization: 'Anemoi Marine Technologies',
    title: 'Rotor Sails for Commercial Shipping: Technical Specifications & Verified Performance Data',
    date: '2023',
    evidenceType: 'TECHNICAL DATA',
    url: 'https://www.anemoimarine.com/rotor-sails/',
    additionalSources: [
      {
        organization: 'Norsepower Oy Ltd',
        title: 'Norsepower Rotor Sail Technology: Sea-Trial Fuel Savings Reports',
        date: '2023',
        url: 'https://www.norsepower.com/technology/',
      }
    ]
  },
  {
    id: 'MARKET-001',
    topic: 'Global VLSFO Bunker Fuel Pricing & Voyage Cost Benchmark',
    claim: 'Very Low Sulphur Fuel Oil (VLSFO 0.5% S) trades across major global bunkering hubs with benchmark prices typically fluctuating between $550–$800/MT (~₹45,000–₹75,000/MT), representing 50–65% of total voyage operating expenses.',
    explanation: 'Industry benchmark pricing across the 20 largest bunkering ports reflects the true variable operating expenditure of commercial ship propulsion and the direct monetary value of unburned bunker fuel.',
    organization: 'Ship & Bunker / S&P Global Commodity Insights',
    title: 'Global 20 Ports Average Bunker Fuel Price Index',
    date: '2024',
    evidenceType: 'INDUSTRY DATA',
    url: 'https://shipandbunker.com/prices',
  },
  {
    id: 'POLICY-002',
    topic: 'IMO Carbon Intensity Indicator (CII) & EEXI Compliance',
    claim: 'IMO MARPOL Annex VI regulations mandate annual Carbon Intensity Indicator (CII) ratings from A to E; underperforming vessels face mandatory corrective action plans and commercial charter discounts.',
    explanation: 'Resolution MEPC.328(76) established binding operational carbon intensity reduction factors under international maritime law, creating direct economic penalties for inefficient ships and commercial advantages for retrofitted vessels.',
    organization: 'International Maritime Organization (IMO)',
    title: 'MARPOL Annex VI: Operational Carbon Intensity Indicator (CII) & Energy Efficiency Existing Ship Index (EEXI)',
    date: '2023',
    evidenceType: 'POLICY',
    url: 'https://www.imo.org/en/ourwork/environment/pages/technical-and-operational-measures.aspx',
  },
  {
    id: 'FEET-001',
    topic: 'Fund for Energy Efficiency Technologies (FEET) — Upfront Financing',
    claim: 'Project FEET by GCMD is a real-world blended debt vehicle providing up to 100% upfront financing with pay-as-you-save leases; initial closing up to $35M, targeting $500M and ~200 vessels by 2030.',
    explanation: 'The Global Centre for Maritime Decarbonisation (GCMD) developed Project FEET as a landmark pilot fund demonstrating that maritime energy efficiency retrofits can be commercially financed through verified operational savings without shipowner corporate collateral.',
    organization: 'Global Centre for Maritime Decarbonisation (GCMD)',
    title: 'Project FEET: Pilot Fund for Energy Efficiency Technologies',
    date: '2024',
    evidenceType: 'REAL-WORLD REFERENCE',
    url: 'https://www.gcformd.org/projects/project-feet-pilot-fund-for-energy-efficiency-technologies/',
  },
  {
    id: 'FEET-002',
    topic: 'Project FEET Consortium & Blended Capital Stack',
    claim: 'Project FEET brings together catalytic equity (GCMD), commercial equity (AIM Horizon), preferred equity (Development Bank of Japan), and senior commercial debt (ING Bank N.V. and DBS Bank).',
    explanation: 'Official GCMD disclosures document the multi-tier institutional consortium validating that commercial banks and developmental institutions can co-invest in maritime energy efficiency retrofits.',
    organization: 'Global Centre for Maritime Decarbonisation (GCMD) / Consortium',
    title: 'GCMD and Partners Announce Consortium for Maritime Decarbonisation Financing Facility',
    date: '2024',
    evidenceType: 'REAL-WORLD REFERENCE',
    url: 'https://www.gcformd.org/news-media/press-releases/',
  },
  {
    id: 'VERIFICATION-001',
    topic: 'EU MRV & IMO DCS Statutory Telemetry Auditing',
    claim: 'International statutory regulations (EU MRV Regulation 2015/757 and IMO DCS) mandate third-party accredited audit and verification of annual ship fuel consumption, voyage distance, and greenhouse gas emissions.',
    explanation: 'The European Maritime Safety Agency (EMSA) and IMO enforce rigorous digital measurement and third-party verification standards for all commercial vessels calling at international ports.',
    organization: 'European Maritime Safety Agency (EMSA) / IMO',
    title: 'Regulation (EU) 2015/757 on Monitoring, Reporting and Verification of Carbon Dioxide Emissions from Maritime Transport',
    date: '2023',
    evidenceType: 'POLICY',
    url: 'https://www.emsa.europa.eu/mrv.html',
  },
  {
    id: 'VERIFICATION-002',
    topic: 'Classification Society ISO 19030 & Energy Efficiency Technology (EET) Verification',
    claim: 'Leading classification societies (DNV, Lloyd\'s Register, ClassNK, Indian Register of Shipping) provide standardized verification protocols (such as ISO 19030) to baseline and verify energy-saving performance from retrofitted devices.',
    explanation: 'DNV rules for Energy Efficiency Technologies (EET notation) and ISO 19030 define standard engineering methods for normalizing continuous torque, shaft speed, and AIS voyage data against sea state and weather effects.',
    organization: 'DNV Maritime',
    title: 'Energy Efficiency Technology (EET) Class Notation & ISO 19030 Performance Auditing',
    date: '2023',
    evidenceType: 'TECHNICAL DATA',
    url: 'https://www.dnv.com/maritime/energy-efficiency/',
  },
  {
    id: 'INDIA-001',
    topic: 'Maritime India Vision 2030 & Harit Nauka Guidelines',
    claim: 'The Ministry of Ports, Shipping and Waterways (MoPSW) targets a 30% reduction in carbon emissions per ton-km across coastal and ocean vessels by 2030 through green fleet modernization and port infrastructure development.',
    explanation: 'Official Government of India strategic planning documents detail specific decadal carbon reduction benchmarks, green port bunkering corridors, and shipyard retrofit infrastructure across major Indian ports.',
    organization: 'Ministry of Ports, Shipping and Waterways (MoPSW), Government of India',
    title: 'Maritime India Vision 2030 & Harit Nauka Green Transition Guidelines',
    date: '2021-2024',
    evidenceType: 'POLICY',
    url: 'https://shipmin.gov.in/',
  },
  {
    id: 'INDIA-002',
    topic: 'Indian Maritime Development Fund (MDF) & Green Shipping Policy',
    claim: 'The Government of India has proposed a ₹25,000–30,000 Crore Maritime Development Fund (MDF) to support low-cost long-term financing, green port transition, and domestic fleet expansion.',
    explanation: 'Official policy announcements from the Directorate General of Shipping and MoPSW outline institutional financing vehicles designed to scale up domestic commercial shipping and green vessel retrofits.',
    organization: 'Directorate General of Shipping / MoPSW, Government of India',
    title: 'Maritime Development Fund (MDF) Institutional Framework & Green Shipping Directives',
    date: '2024',
    evidenceType: 'POLICY',
    url: 'https://www.dgshipping.gov.in/',
  },
  {
    id: 'INDIA-MDF',
    topic: 'Maritime Development Fund (MDF) & Maritime Investment Fund (MIF)',
    claim: 'India\'s Maritime Development Fund has a ₹25,000 crore structure including the ₹20,000 crore Maritime Investment Fund.',
    explanation: 'It demonstrates the emergence of a dedicated maritime capital ecosystem that could provide a broader financing context for maritime decarbonisation.',
    organization: 'Ministry of Ports, Shipping and Waterways (MoPSW), Government of India',
    title: 'Maritime Development Fund (MDF) & Maritime Investment Fund (MIF) Framework',
    date: '2024',
    evidenceType: 'POLICY',
    url: 'https://shipmin.gov.in/',
    additionalSources: [
      {
        organization: 'Directorate General of Shipping, Government of India',
        title: 'Maritime Financing Ecosystem & Investment Policy Directions',
        date: '2024',
        url: 'https://www.dgshipping.gov.in/',
      }
    ]
  },
  {
    id: 'INDIA-NGSP',
    topic: 'National Green Shipping Policy & Green Finance Pillar',
    claim: 'Green Finance is one of India\'s National Green Shipping Policy pillars.',
    explanation: 'Provides the policy justification for why a green maritime financing product can fit within India\'s broader decarbonisation direction without claiming specific project approval.',
    organization: 'Ministry of Ports, Shipping and Waterways (MoPSW) / DG Shipping',
    title: 'National Green Shipping Policy Framework & Green Finance Directives',
    date: '2024',
    evidenceType: 'POLICY',
    url: 'https://shipmin.gov.in/',
  },
  {
    id: 'INDIA-SMFCL',
    topic: 'Sagarmala Finance Corporation Limited (SMFCL)',
    claim: 'Sagarmala Finance Corporation Limited (SMFCL) is established as India\'s dedicated maritime-focused financing institution under MoPSW.',
    explanation: 'Confirms the emergence of a dedicated maritime financing institution in India\'s ecosystem that could serve as an institutional conduit for maritime debt syndication.',
    organization: 'Sagarmala Development Company / MoPSW, Government of India',
    title: 'Sagarmala Finance Corporation Limited: Dedicated Maritime Financing Channel',
    date: '2024',
    evidenceType: 'POLICY',
    url: 'https://shipmin.gov.in/',
  },
  {
    id: 'FIN-POSEIDON',
    topic: 'Poseidon Principles — Climate-Aligned Shipping Finance',
    claim: 'The Poseidon Principles provide a global framework for participating financial institutions to assess and track the climate alignment of shipping loan portfolios.',
    explanation: 'A framework used by participating financial institutions to assess climate alignment of shipping portfolios. It demonstrates why commercial lenders actively prioritize verifiable, sensor-audited vessel efficiency.',
    organization: 'Poseidon Principles Association / Global Maritime Forum',
    title: 'Poseidon Principles: Global Framework for Climate-Aligned Ship Finance',
    date: '2023-2024',
    evidenceType: 'REAL-WORLD REFERENCE',
    url: 'https://www.poseidonprinciples.org/',
  },
  {
    id: 'INDIA-HARIT',
    topic: 'Harit Sagar — Green Port Policy Environment',
    claim: 'India\'s Green Port Guidelines support a broader maritime environmental and emissions-reduction policy direction.',
    explanation: 'Harit Sagar establishes actionable environmental benchmarks and emissions-reduction incentives across Indian ports, creating a policy tailwind for cleaner commercial vessels.',
    organization: 'Ministry of Ports, Shipping and Waterways (MoPSW), Government of India',
    title: 'Harit Sagar: Green Port Guidelines 2023',
    date: '2023',
    evidenceType: 'POLICY',
    url: 'https://shipmin.gov.in/',
  },
  {
    id: 'INDIA-IIF',
    topic: 'Interest Incentivization Fund (IIF) — ₹5,000 Cr MDF Component',
    claim: 'The Interest Incentivization Fund has a ₹5,000 Cr allocation within MDF; current official applicability includes loans to Indian shipyards.',
    explanation: 'Interest support mechanism within MDF; current official applicability includes loans to Indian shipyards. Contextual reference only — not an automatic SHIPLOOP vessel subsidy.',
    organization: 'Ministry of Ports, Shipping and Waterways (MoPSW), Government of India',
    title: 'Interest Incentivization Fund & Shipyard Credit Directives',
    date: '2024',
    evidenceType: 'POLICY',
    url: 'https://shipmin.gov.in/',
  },
  {
    id: 'MARKET-002',
    topic: 'Global Commercial Merchant Fleet Statistics & Composition',
    claim: 'The global commercial merchant fleet comprises over 105,000 vessels totaling over 2.2 billion DWT, with dry bulk carriers and oil tankers accounting for the vast majority of fuel consumption and carbon emissions.',
    explanation: 'UNCTAD\'s flagship Review of Maritime Transport is the United Nations\' authoritative annual statistical publication on world merchant fleet volume, flag distribution, average age, and propulsion types.',
    organization: 'UNCTAD (United Nations Conference on Trade and Development)',
    title: 'Review of Maritime Transport 2023: Navigating Maritime Choke Points & Fleet Decarbonization',
    date: '2023',
    evidenceType: 'INDUSTRY DATA',
    url: 'https://unctad.org/topic/transport-and-trade-logistics/review-of-maritime-transport',
  },
  {
    id: 'RISK-001',
    topic: 'Marine Bunker Fuel Price Volatility & Commodity Risk',
    claim: 'Marine fuel prices exhibit significant cyclical volatility, with historic Brent and VLSFO price swings of 30% to 50% over annual periods, directly impacting voyage operating economics and debt service coverage ratios.',
    explanation: 'The International Energy Agency (IEA) and World Bank Commodity Markets track refining margins and crack spreads for global marine fuels, confirming high price volatility over macroeconomic cycles.',
    organization: 'International Energy Agency (IEA)',
    title: 'Oil Market Report & Commodity Markets Outlook: Marine Fuel Transitions',
    date: '2023-2024',
    evidenceType: 'RESEARCH',
    url: 'https://www.iea.org/reports/oil-market-report',
  },
  {
    id: 'FIN-003',
    topic: 'Project Finance Priority of Payments & Debt Service Waterfall',
    claim: 'In project-financed green assets, a priority of payments (cashflow waterfall) directs revenues first to statutory obligations and operating costs, second to senior debt service, third to reserve accounts, and lastly to equity surplus.',
    explanation: 'The Loan Market Association (LMA) standard documentation for green loans and project finance defines the standard contractual hierarchy of cashflow distributions protecting senior lenders.',
    organization: 'Loan Market Association (LMA)',
    title: 'Green Loan Principles & Standard Project Finance Priority of Payments',
    date: '2023',
    evidenceType: 'INDUSTRY DATA',
    url: 'https://www.lma.eu.com/sustainable-lending/green-loan-principles',
  },
  {
    id: 'FIN-004',
    topic: 'Global Maritime Decarbonization Capital Need',
    claim: 'Decarbonizing international shipping requires approximately $1.0 to $1.4 trillion in cumulative capital investment by 2050, with shipboard energy efficiency retrofits offering the lowest marginal cost per tonne of CO2 abated.',
    explanation: 'Research by the Getting to Zero Coalition and University Maritime Advisory Services (UMAS) quantifies global capital investment requirements for maritime energy transition, identifying retrofit efficiency as the crucial near-term bridge.',
    organization: 'Getting to Zero Coalition / UMAS',
    title: 'The Scale of Investment Needed to Decarbonize International Shipping',
    date: '2022',
    evidenceType: 'RESEARCH',
    url: 'https://globalmaritimeforum.org/getting-to-zero-coalition/',
  },
];

// Backwards compatibility for existing imports
export const RESEARCH_REFERENCES = EVIDENCE_REGISTRY.map((e) => ({
  id: e.id,
  title: e.title,
  organization: e.organization,
  date: e.date,
  url: e.url,
  claim: e.claim,
  verificationStatus: (e.evidenceType === 'VERIFIED' || e.evidenceType === 'REAL-WORLD REFERENCE' || e.evidenceType === 'POLICY'
    ? 'SOURCE VERIFIED'
    : 'INDUSTRY BENCHMARK') as 'SOURCE VERIFIED' | 'INDUSTRY BENCHMARK',
  category: (e.id.startsWith('POLICY')
    ? 'GLOBAL_REGULATION'
    : e.id.startsWith('INDIA')
    ? 'POLICY_INDIA'
    : e.id.startsWith('TECH') || e.id.startsWith('VERIF')
    ? 'MARITIME_ENGINEERING'
    : 'FINANCE') as 'FINANCE' | 'MARITIME_ENGINEERING' | 'POLICY_INDIA' | 'GLOBAL_REGULATION',
}));
