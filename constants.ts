import { Party, Politician, KeyIssue } from './types';

export const KEY_ISSUES: KeyIssue[] = [
  {
    id: 1,
    title: 'Carbon Pricing & Climate Policy',
    description: 'Following the transition in government, debate continues over how Canada will meet its climate targets, reform carbon pricing, and align resource development with climate action.'
  },
  {
    id: 2,
    title: 'Health Care & Pharmacare Expansion',
    description: 'Efforts remain to expand public health programs (e.g., dental care, pharmacare) and renew federal-provincial funding agreements amid cost-of-living pressures.'
  },
  {
    id: 3,
    title: 'Housing Affordability & Supply',
    description: 'The housing crisis is a major focus: addressing high costs, accelerating supply, reforming zoning and municipal red tape, and supporting first-time buyers and renters.'
  },
  {
    id: 4,
    title: 'International Relations & Sovereignty',
    description: 'Canada’s role on the global stage remains central — trade, diplomacy (especially vis-à-vis the U.S.), defence alliances, and national sovereignty in shifting world order.'
  },
  {
    id: 5,
    title: 'Quebec Autonomy & Language Rights',
    description: 'The question of Quebec’s cultural, linguistic and provincial autonomy remains politically salient, including federal-provincial tensions over jurisdiction.'
  },
  {
    id: 6,
    title: 'Environmental & Resource Policy',
    description: 'Balancing resource development (oil, gas, minerals) with environmental protection, Indigenous reconciliation, and meeting climate commitments.'
  },
  {
    id=7,
    title: 'Fiscal & Budgetary Policy',
    description: 'Managing government spending, revenue, debt and deficits is a core issue — especially given economic headwinds, new defence and housing commitments, and public-service demands.'
  },
  {
    id: 8,
    title: 'Indigenous Reconciliation & Rights',
    description: 'Advancing reconciliation, implementing commitments to Indigenous peoples, addressing legacy issues and ensuring rights, land and self-governance frameworks.'
  },
  {
    id: 9,
    title: 'National Defence & Security',
    description: 'With rising global tensions and new alliance commitments, defence spending, Arctic sovereignty, procurement and Canada’s role in NATO are key issues.'
  },
  {
    id: 10,
    title: 'Energy & Natural Resources',
    description: 'Policy concerning Canada’s natural-resource sectors (oil, gas, critical minerals, renewables), exports, regulatory regimes, and transition strategies.'
  },
  {
    id: 11,
    title: 'Budget Deficit & Debt Control',
    description: 'The new government signals the need for deficit reduction, fiscal discipline and controlling national debt, while balancing investments in housing, defence and climate.'
  },
  {
    id: 12,
    title: 'Digital Economy & Tech Sovereignty',
    description: 'Data privacy, competition in the tech sector, regulation of online platforms and Canada’s position in digital supply-chains and innovation ecosystems.'
  },
  {
    id: 13,
    title: 'Supply-Chain Resilience & Economic Diversification',
    description: 'Strengthening domestic manufacturing, diversifying trade partners, building resilient supply-chains and reducing economic dependence on single trading partners.'
  },
];

export const POLITICIANS: Politician[] = [
  {
    id: 1,
    name: 'Mark Carney',
    party: Party.Liberal,
    position: 'Prime Minister of Canada',
    termInfo: 'In office since March 14, 2025',
    photoUrl: 'https://picsum.photos/id/1004/200/200',
    bio: 'Mark Carney became the leader of the Liberal Party in March 2025 and was sworn in as Canada’s 24th Prime Minister. His administration leads a Liberal minority government focused on affordability, fiscal discipline, defence investment and redefining Canada’s place globally.',
    policies: [
      'Announced that Budget 2025 will combine **investment in key priorities** with **spending restraint** and operational cuts. :contentReference[oaicite:0]{index=0}',
      'Committed Canada to meet NATO defence-spending targets ahead of schedule. :contentReference[oaicite:1]{index=1}',
      'Launched a new federal housing agency (Build Canada Homes) to accelerate affordable housing construction. :contentReference[oaicite:2]{index=2}',
      'Revamped inter-provincial trade regime (the “One Canadian Economy Act”) removing barriers to internal trade. :contentReference[oaicite:3]{index=3}',
    ],
    socials: {
      website: 'https://www.markcarney.ca/',
      twitter: 'MarkJCarney'
    },
    keyIssues: [7,3,9,4,13],
    relatedPoliticianIds: [6,2,12],
    career: [
      { year: 2025, role: 'Prime Minister of Canada', description: 'Leads a Liberal minority government.' },
      { year: 2025, role: 'Leader of the Liberal Party of Canada', description: 'Elected March 9, 2025 with ~86% of the vote. :contentReference[oaicite:4]{index=4}' },
      { year: 2023, role: 'Governor of the Bank of England', description: 'Pre-political career as a central banker.' }
    ],
    committeeMemberships: [],
    notableQuotes: [
      { text: '"We will spend less so we can invest more in Canada’s long-term growth."', source: 'October 10 2025 Budget announcement' }
    ]
  },
  {
    id: 2,
    name: 'Pierre Poilievre',
    party: Party.Conservative,
    position: 'Leader of the Official Opposition (Conservative Party)',
    termInfo: 'Leader since September 10, 2022',
    photoUrl: 'https://picsum.photos/id/1074/200/200',
    bio: 'Pierre Poilievre has served as leader of the Conservative Party and, following the April 2025 election loss and his own riding defeat, returned via a by-election to the House of Commons in August 2025. He remains the Opposition leader and is focused on cost-of-living, saving, and tax relief policies.',
    policies: [
      'Champions lower taxes and smaller government, emphasising fiscal restraint and affordability. :contentReference[oaicite:5]{index=5}',
      'Critiques the government’s spending plans and aims to position the Conservatives as the party of “common-sense” governance. :contentReference[oaicite:6]{index=6}'
    ],
    socials: {
      website: 'https://www.conservative.ca/',
      twitter: 'PierrePoilievre'
    },
    keyIssues: [7,3,10,1],
    relatedPoliticianIds: [1,6],
    career: [
      { year: 2022, role: 'Leader of the Conservative Party of Canada', description: 'Elected as party leader.' },
      { year: 2004, role: 'Member of Parliament for Carleton (later Battle River–Crowfoot)', description: 'Long-time MP.' }
    ],
    committeeMemberships: [],
    notableQuotes: [
      { text: '"Canada is broken, but together we can fix it."', source: 'Campaign remark' }
    ]
  },
  {
    id: 3,
    name: 'Don Davies',
    party: Party.NDP,
    position: 'Interim Leader of the New Democratic Party',
    termInfo: 'In office since May 5, 2025',
    photoUrl: 'https://picsum.photos/id/373/200/200',
    bio: 'Don Davies serves as interim leader of the NDP after the party’s historic defeat in the 2025 election and the resignation of former leader Jagmeet Singh. He leads a reduced caucus and is spearheading internal party renewal ahead of a leadership race in 2026. :contentReference[oaicite:7]{index=7}',
    policies: [
      'Advocates for workers’ rights, social justice and strengthening public services while rebuilding the party’s base.',
    ],
    socials: {
      website: 'https://www.ndp.ca/',
      twitter: 'DonDavies'
    },
    keyIssues: [2,8,6],
    relatedPoliticianIds: [1,2],
    career: [
      { year: 2025, role: 'Interim Leader of the NDP', description: 'Appointed after 2025 federal election.' },
      { year: 2008, role: 'Member of Parliament for Vancouver Kingsway', description: 'Long-time MP.' }
    ],
    committeeMemberships: [],
    notableQuotes: []
  },
  {
    id: 4,
    name: 'Yves-François Blanchet',
    party: Party.BlocQuébécois,
    position: 'Leader of the Bloc Québécois',
    termInfo: 'Leader since 2019',
    photoUrl: 'https://picsum.photos/id/431/200/200',
    bio: 'Yves-François Blanchet leads the Bloc Québécois, advocating for Quebec’s interests, language rights and provincial autonomy in the federal context.',
    policies: [
      'Defends Quebec’s jurisdiction and French-language protections at the federal level.',
      'Pushes for infrastructure and energy-transition funding for Quebec’s regions.'
    ],
    socials: {
      twitter: 'yfblanchet'
    },
    keyIssues: [5,4,7],
    relatedPoliticianIds: [1,2],
    career: [
      { year: 2019, role: 'Leader of the Bloc Québécois', description: 'Elected leader.' }
    ],
    committeeMemberships: [],
    notableQuotes: [
      { text: '"Le Québec, c’est nous."', source: 'Party slogan' }
    ]
  },
  {
    id: 12,
    name: 'Leslyn Lewis',
    party: Party.Conservative,
    position: 'Deputy Leader of the Conservative Party / Shadow Minister of Foreign Affairs',
    termInfo: 'Appointed 2025 (Shadow Cabinet)',
    photoUrl: 'https://picsum.photos/id/1078/200/200',
    bio: 'Leslyn Lewis serves as a senior Conservative MP and a key figure in the party’s foreign-policy and sovereignty agenda.',
    policies: [
      'Emphasises Canada’s national sovereignty, strong alliances, and reforms to foreign-policy practice.'
    ],
    socials: {
      twitter: 'LeslynLewis'
    },
    keyIssues: [4,12,7],
    relatedPoliticianIds: [2],
    career: [
      { year: 2021, role: 'Member of Parliament for Haldimand–Norfolk', description: 'Elected MP.' }
    ],
    committeeMemberships: [],
    notableQuotes: [
      { text: '"No hidden agenda, just common sense."', source: 'Leadership campaign slogan' }
    ]
  }
];
