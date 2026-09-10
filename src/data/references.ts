import { ReferenceSource } from '../types';

export const RESEARCH_REFERENCES: ReferenceSource[] = [
  {
    id: 'ref-imo-ghg4',
    title: 'Fourth IMO Greenhouse Gas Study 2020 & 2023 Strategy',
    organization: 'International Maritime Organization (IMO)',
    date: '2023',
    url: 'https://www.imo.org',
    claim: 'Maritime transport emits ~1,076 million tonnes of GHG annually (approx 3% of global emissions). Energy efficiency retrofits can reduce fuel burn by 10–25% immediately without awaiting alternative fuel infrastructure.',
    verificationStatus: 'SOURCE VERIFIED',
    category: 'GLOBAL_REGULATION'
  },
  {
    id: 'ref-split-incentive',
    title: 'The Principal-Agent Problem in Commercial Shipping (Split Incentive)',
    organization: 'Global Maritime Forum / UCL Energy Institute',
    date: '2022',
    url: 'https://www.globalmaritimeforum.org',
    claim: 'Over 60% of deep-sea dry bulk and tanker capacity operates under Time Charter contracts where charterers pay for fuel while shipowners bear capital retrofit costs, stall green capex without contract innovation.',
    verificationStatus: 'INDUSTRY BENCHMARK',
    category: 'MARITIME_ENGINEERING'
  },
  {
    id: 'ref-india-miv2030',
    title: 'Maritime India Vision 2030 & Harit Nauka Guidelines',
    organization: 'Ministry of Ports, Shipping and Waterways (MoPSW), Govt of India',
    date: '2021-2024',
    claim: 'India targets 30% reduction in carbon emissions per ton-km across coastal and ocean vessels by 2030 through green maritime finance, fleet modernization, and shipyard retrofit infrastructure.',
    verificationStatus: 'SOURCE VERIFIED',
    category: 'POLICY_INDIA'
  },
  {
    id: 'ref-feet-initiative',
    title: 'Fund for Energy Efficiency Technologies (FEET) — Blended Maritime Debt Facility',
    organization: 'Global Centre for Maritime Decarbonisation (GCMD) & Consortium Partners',
    date: '2023-2025',
    claim: 'Real-world benchmark proving pay-as-you-save maritime retrofit financing. Initial closing up to $35M with up to 100% upfront financing via unsecured lease structure; monitored oil-tanker retrofit pilot demonstrated 7.2% mean power savings (95% CI: 6.2%–8.2%). Target: $500M across ~200 vessels by 2030.',
    verificationStatus: 'SOURCE VERIFIED',
    category: 'FINANCE'
  },
  {
    id: 'ref-cii-rating',
    title: 'Carbon Intensity Indicator (CII) & EEXI Operational Compliance Guidelines',
    organization: 'DNV / Lloyd’s Register / ClassNK Joint Guidance',
    date: '2024',
    claim: 'A 15% reduction in annual fuel consumption typically elevates a D or E rated commercial vessel to an A or B compliant rating, safeguarding charter value and avoiding commercial trading penalties.',
    verificationStatus: 'SOURCE VERIFIED',
    category: 'MARITIME_ENGINEERING'
  }
];
