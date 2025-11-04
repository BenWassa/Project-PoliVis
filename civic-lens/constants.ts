import { Party, Politician, KeyIssue } from './types';

export const KEY_ISSUES_DATA: KeyIssue[] = [
  {
    id: 'carbon-tax',
    title: 'Carbon Tax',
    description: 'Debate over carbon pricing mechanisms continues to be a central political issue under the new government.',
  },
  {
    id: 'healthcare',
    title: 'Healthcare Expansion',
    description: 'Proposals to broaden public healthcare, including dental and pharmacare, and federal-provincial funding agreements.',
  },
  {
    id: 'housing',
    title: 'Housing Affordability',
    description: 'Strategies to address the rising cost of housing by increasing supply and reducing municipal red tape.',
  },
  {
    id: 'international-relations',
    title: 'International Relations',
    description: 'Focus on Canada\'s role on the global stage, including trade, diplomacy, and national sovereignty.',
  },
  {
    id: 'quebec-sovereignty',
    title: 'Quebec Sovereignty',
    description: 'Advocacy for the protection of Quebec\'s culture, language, and political autonomy.',
  },
  {
    id: 'environmental-policy',
    title: 'Environmental Policy',
    description: 'Comprehensive strategies for environmental protection, resource development, and meeting climate targets.',
  },
  {
    id: 'fiscal-policy',
    title: 'Fiscal Policy',
    description: 'Management of government revenue, spending, and debt to influence the economy.',
  },
  {
    id: 'indigenous-reconciliation',
    title: 'Indigenous Reconciliation',
    description: 'Actions to address the legacy of residential schools and advance the rights of Indigenous peoples.',
  },
  {
    id: 'national-defence',
    title: 'National Defence',
    description: 'Policies concerning the Canadian Armed Forces, military spending, and national security.',
  },
    {
    id: 'energy-resources',
    title: 'Energy & Natural Resources',
    description: 'Policies on the development, regulation, and export of Canada\'s natural resources, including oil, gas, and renewables.',
  },
  {
    id: 'debt-reduction',
    title: 'Debt Reduction',
    description: 'New government priority focusing on balancing the federal budget and controlling national debt.',
  },
  {
    id: 'digital-sovereignty',
    title: 'Digital Sovereignty',
    description: 'Policies concerning data privacy, competition in the tech sector, and regulation of online content.',
  },
  {
    id: 'supply-chain-resilience',
    title: 'Supply Chain Resilience',
    description: 'Strengthening domestic manufacturing and trade corridors to ensure economic stability.',
  },
];

export const POLITICIANS_DATA: Politician[] = [
  {
    id: 2,
    name: 'Pierre Poilievre',
    party: Party.Conservative,
    position: 'Prime Minister of Canada',
    termInfo: 'In office since 2025',
    photoUrl: 'https://picsum.photos/id/1074/200/200',
    bio: 'Pierre Poilievre is the 24th Prime Minister of Canada, having led the Conservative Party to a minority government victory in the 2025 federal election. His government focuses on fiscal responsibility, reducing the cost of living, and accelerating economic growth.',
    policies: [
      'Introduced the "Common Sense Act" to reduce federal spending and balance the budget.',
      'Repealed the federal carbon tax for consumers to lower fuel prices.',
      'Launched federal initiatives to partner with municipalities to fast-track housing construction.',
      'Supports resource development projects to enhance energy independence.',
    ],
    socials: {
      website: 'https://www.conservative.ca/',
      twitter: 'PierrePoilievre',
    },
    keyIssues: ['fiscal-policy', 'housing', 'energy-resources', 'debt-reduction', 'carbon-tax'],
    relatedPoliticianIds: [6, 3, 4, 14, 12],
    career: [
        { year: '2025-Present', role: 'Prime Minister of Canada', description: 'Leads the Government of Canada with a minority mandate.' },
        { year: '2022-2025', role: 'Leader of the Conservative Party', description: 'Led the party to victory in the 2025 election.' },
        { year: '2017-2022', role: 'Shadow Minister for Finance & Jobs', description: 'Served as a prominent critic of the government\'s economic policies.' },
        { year: '2004-Present', role: 'Member of Parliament for Carleton', description: 'Represents his riding for over two decades.' },
    ],
    committeeMemberships: [
        { name: 'Cabinet', role: 'Chair' },
    ],
    notableQuotes: [
        { text: '"A new government with a clear mandate: axe the tax, build the homes, fix the budget."', source: '2025 Victory Speech' },
        { text: '"Bring it home."', source: 'Campaign Slogan' },
    ],
  },
  {
    id: 6,
    name: 'Chrystia Freeland',
    party: Party.Liberal,
    position: 'Leader of the Opposition & Interim Liberal Leader',
    termInfo: 'Interim Leader since 2025',
    photoUrl: 'https://picsum.photos/id/65/200/200',
    bio: 'Following the 2025 election, Chrystia Freeland was selected as the Interim Leader of the Liberal Party, becoming the Leader of the Official Opposition. She now leads the party\'s efforts to hold the new government accountable.',
    policies: [
      'Leading the Official Opposition\'s critique of the government\'s fiscal plan and spending cuts.',
      'Advocating for the protection of national social programs like dental care and child care.',
      'Championing Canada\'s continued role in international alliances and a rules-based global order.',
      'Holding the government to account on environmental commitments and climate change.',
    ],
    socials: {
      twitter: 'cafreeland',
    },
    keyIssues: ['fiscal-policy', 'healthcare', 'international-relations', 'environmental-policy'],
    relatedPoliticianIds: [2, 1, 3, 4, 14],
    career: [
      { year: '2025-Present', role: 'Leader of the Opposition & Interim Liberal Leader', description: 'Leads the Liberal Party in the House of Commons.' },
      { year: '2020-2025', role: 'Minister of Finance', description: 'First woman to hold the position.' },
      { year: '2019-2025', role: 'Deputy Prime Minister of Canada', description: 'Served as Prime Minister Trudeau\'s second-in-command.' },
      { year: '2013-Present', role: 'Member of Parliament', description: 'Represents University—Rosedale.' },
    ],
    committeeMemberships: [],
    notableQuotes: [
      { text: '"Our role is to be a constructive, but tough and determined, opposition."', source: 'Press Conference, 2025' },
    ],
  },
  {
    id: 3,
    name: 'Jagmeet Singh',
    party: Party.NDP,
    position: 'Leader of the NDP',
    termInfo: 'Leader since 2017',
    photoUrl: 'https://picsum.photos/id/373/200/200',
    bio: 'Jagmeet Singh continues to lead the NDP, which holds a significant position in the new minority parliament. His focus remains on using the party\'s influence to advocate for social programs and affordability for working families.',
    policies: [
      'Using the NDP\'s position to protect national dental care and pharmacare programs.',
      'Advocates for an excess profit tax on large corporations.',
      'Pushing for federal investment in affordable housing and transit.',
      'Opposing rollbacks of environmental regulations.',
    ],
    socials: {
      website: 'https://www.ndp.ca/',
      twitter: 'theJagmeetSingh',
    },
    keyIssues: ['healthcare', 'housing', 'fiscal-policy', 'indigenous-reconciliation'],
    relatedPoliticianIds: [2, 6, 4, 14, 13],
    career: [
        { year: '2017-Present', role: 'Leader of the New Democratic Party', description: 'Leads the federal NDP through multiple minority parliaments.' },
        { year: '2019-Present', role: 'Member of Parliament for Burnaby South', description: 'Represents his riding in the House of Commons.' },
        { year: '2011-2017', role: 'Member of Provincial Parliament (Ontario)', description: 'Served as Deputy Leader of the Ontario NDP.' },
    ],
    committeeMemberships: [],
    notableQuotes: [
        { text: '"We will use every tool we have to fight for Canadians."', source: 'Statement on 2025 Election Results' },
        { text: '"Love and Courage."', source: 'Autobiography Title & Personal Motto' },
    ],
  },
  {
    id: 4,
    name: 'Yves-François Blanchet',
    party: Party.BlocQuébécois,
    position: 'Leader of the Bloc Québécois',
    termInfo: 'Leader since 2019',
    photoUrl: 'https://picsum.photos/id/431/200/200',
    bio: 'Yves-François Blanchet continues his leadership of the Bloc Québécois, ensuring the party remains a strong voice for Quebec\'s interests and autonomy within the new minority government.',
    policies: [
      'Vigilantly defending Quebec\'s jurisdiction against federal overreach.',
      'Promoting the French language and Quebec culture at the federal level.',
      'Ensuring Quebec receives its fair share of federal funding, particularly for infrastructure and green energy.',
    ],
    socials: {
      twitter: 'yfblanchet',
    },
    keyIssues: ['quebec-sovereignty', 'international-relations', 'fiscal-policy'],
    relatedPoliticianIds: [2, 6, 3],
    career: [
        { year: '2019-Present', role: 'Leader of the Bloc Québécois', description: 'Maintains a strong federal presence for the party.' },
        { year: '2012-2014', role: 'Quebec Minister of Sustainable Development', description: 'Served in the provincial cabinet under Pauline Marois.' },
    ],
    committeeMemberships: [],
    notableQuotes: [
        { text: '"Le Québec, c\'est nous." (Quebec, that\'s us.)', source: 'Party Slogan' },
    ],
  },
  {
    id: 14,
    name: 'Jonathan Wilkinson',
    party: Party.Green,
    position: 'Leader of the Green Party',
    termInfo: 'Leader since 2025',
    photoUrl: 'https://picsum.photos/id/561/200/200',
    bio: 'Jonathan Wilkinson assumed the sole leadership of the Green Party in 2025. He champions a platform that integrates bold climate action with social and economic justice for all Canadians.',
    policies: [
        'Advocating for a Guaranteed Livable Income to address poverty.',
        'Pushing for a rapid transition to a 100% renewable energy grid.',
        'Linking environmental action with social justice outcomes and reconciliation.',
    ],
    socials: { twitter: 'jonathanwp' },
    keyIssues: ['environmental-policy', 'housing', 'fiscal-policy'],
    relatedPoliticianIds: [2, 6, 3, 4, 5],
    career: [
      { year: '2025-Present', role: 'Leader of the Green Party of Canada', description: '' },
      { year: '2022-2025', role: 'Co-Leader of the Green Party of Canada', description: '' },
      { year: '2021-Present', role: 'Member of Parliament for Notre-Dame-de-Grâce—Westmount', description: '' },
    ],
    committeeMemberships: [],
    notableQuotes: []
  },
  {
    id: 1,
    name: 'Justin Trudeau',
    party: Party.Liberal,
    position: 'Member of Parliament',
    termInfo: 'Prime Minister 2015-2025',
    photoUrl: 'https://picsum.photos/id/64/200/200',
    bio: 'After serving as the 23rd Prime Minister of Canada for a decade, Justin Trudeau stepped down as leader of the Liberal Party following the 2025 election. He continues to serve his constituents as the Member of Parliament for Papineau.',
    policies: [
      'Implemented a national price on carbon pollution.',
      'Introduced the Canada Child Benefit to support families.',
      'Negotiated the Canada-U.S.-Mexico Agreement (CUSMA).',
      'Launched national early learning and child care agreements.',
    ],
    socials: {
      website: 'https://pm.gc.ca/en',
      twitter: 'JustinTrudeau',
    },
    keyIssues: ['carbon-tax', 'healthcare', 'international-relations', 'indigenous-reconciliation'],
    relatedPoliticianIds: [6],
    career: [
      { year: '2015-2025', role: 'Prime Minister of Canada', description: 'Led the Government of Canada through multiple majority and minority terms.' },
      { year: '2025-Present', role: 'Member of Parliament for Papineau', description: 'Continues to represent his Montreal riding.' },
      { year: '2013-2015', role: 'Leader of the Liberal Party', description: 'Rebuilt the party and led it to a majority victory in the 2015 federal election.' },
    ],
    committeeMemberships: [],
    notableQuotes: [
      { text: '"Better is always possible."', source: '2015 Election Campaign Slogan' },
      { text: '"In Canada, diversity is our strength."', source: 'Frequent Public Statement' },
    ],
  },
  {
    id: 12,
    name: 'Leslyn Lewis',
    party: Party.Conservative,
    position: 'Minister of Foreign Affairs',
    termInfo: 'In office since 2025',
    photoUrl: 'https://picsum.photos/id/1078/200/200',
    bio: 'A prominent voice within the Conservative party, Leslyn Lewis was appointed Minister of Foreign Affairs in the new government. With a PhD in international law, she brings a focus on national sovereignty to Canada\'s foreign policy.',
    policies: [
      'Refocusing Canada\'s foreign policy on key alliances and national interests.',
      'Leading Canada\'s diplomatic presence on the world stage.',
      'Reviewing international agreements to ensure they benefit Canadians.',
    ],
    socials: { twitter: 'LeslynLewis' },
    keyIssues: ['fiscal-policy', 'international-relations', 'digital-sovereignty'],
    relatedPoliticianIds: [2],
    career: [
      { year: '2025-Present', role: 'Minister of Foreign Affairs', description: ''},
      { year: '2021-Present', role: 'Member of Parliament for Haldimand—Norfolk', description: '' },
      { year: '2020 & 2022', role: 'Conservative Leadership Candidate', description: 'Finished third in 2020 and 2022, showing strong grassroots support.' },
    ],
    committeeMemberships: [],
    notableQuotes: [
      { text: '"No hidden agenda, just common sense."', source: 'Leadership Campaign Slogan' }
    ]
  },
  {
    id: 5,
    name: 'Elizabeth May',
    party: Party.Green,
    position: 'Member of Parliament',
    termInfo: 'Co-Leader 2022-2025',
    photoUrl: 'https://picsum.photos/id/559/200/200',
    bio: 'A veteran environmentalist and respected parliamentarian, Elizabeth May stepped down as co-leader in 2025 to focus on her work as the Member of Parliament for Saanich—Gulf Islands and as a leading advocate for climate action.',
    policies: [
      'Implement aggressive, science-based targets for greenhouse gas reduction.',
      'Champion a transition to a green economy through investments in renewable energy.',
      'Advocate for electoral reform to create a more proportional system.',
    ],
    socials: {
      twitter: 'ElizabethMay',
    },
    keyIssues: ['carbon-tax', 'environmental-policy', 'healthcare', 'electoral-reform'],
    relatedPoliticianIds: [14],
    career: [
        { year: '2022-2025', role: 'Co-Leader of the Green Party of Canada', description: 'Returned to a leadership role, sharing duties with Jonathan Wilkinson.' },
        { year: '2011-Present', role: 'Member of Parliament for Saanich—Gulf Islands', description: 'The first Green Party MP ever elected in Canada.' },
        { year: '2006-2019', role: 'Leader of the Green Party of Canada', description: 'Longest-serving female leader of a Canadian federal party.' },
    ],
    committeeMemberships: [
        { name: 'Standing Committee on Environment and Sustainable Development', role: 'Member' },
    ],
    notableQuotes: [
        { text: '"We are not defenders of the environment, we are the environment defending itself."', source: 'Public Statement' },
    ],
  },
  {
    id: 11,
    name: 'Mélanie Joly',
    party: Party.Liberal,
    position: 'Member of Parliament',
    termInfo: 'Minister of Foreign Affairs 2021-2025',
    photoUrl: 'https://picsum.photos/id/66/200/200',
    bio: 'Mélanie Joly is a senior Liberal MP and serves as a key voice for Quebec within the Official Opposition, having previously served as Minister of Foreign Affairs.',
    policies: [
      'Holds the government accountable on its foreign policy decisions.',
      'Advocates for a rules-based international order and human rights.',
    ],
    socials: { twitter: 'melaniejoly' },
    keyIssues: ['international-relations', 'quebec-sovereignty', 'national-defence'],
    relatedPoliticianIds: [1, 6],
    career: [
      { year: '2021-2025', role: 'Minister of Foreign Affairs', description: '' },
      { year: '2019-2021', role: 'Minister of Economic Development and Official Languages', description: '' },
      { year: '2015-Present', role: 'Member of Parliament for Ahuntsic-Cartierville', description: '' },
    ],
    committeeMemberships: [],
    notableQuotes: [
      { text: '"Diplomacy is about showing up."', source: 'Public Statement' }
    ]
  },
  {
    id: 13,
    name: 'Alexandre Boulerice',
    party: Party.NDP,
    position: 'Deputy Leader of the NDP',
    termInfo: 'MP since 2011',
    photoUrl: 'https://picsum.photos/id/378/200/200',
    bio: 'Alexandre Boulerice is a long-serving NDP Member of Parliament from Quebec and serves as the party\'s Deputy Leader. A former journalist and union advisor, he is a passionate advocate for workers\' rights and social justice issues.',
    policies: [
      'Strong advocate for union rights and fair wages.',
      'Focuses on environmental issues and a just transition for workers.',
      'Acts as a key spokesperson for the NDP in Quebec.',
    ],
    socials: { twitter: 'boulerice' },
    keyIssues: ['healthcare', 'fiscal-policy', 'environmental-policy', 'quebec-sovereignty'],
    relatedPoliticianIds: [3],
    career: [
      { year: '2011-Present', role: 'Member of Parliament for Rosemont—La Petite-Patrie', description: 'Part of the "Orange Wave" that swept Quebec in 2011.' },
      { year: 'Present', role: 'Deputy Leader of the NDP', description: '' },
    ],
    committeeMemberships: [],
    notableQuotes: []
  },
   {
    id: 15,
    name: 'Bill Blair',
    party: Party.Liberal,
    position: 'Member of Parliament',
    termInfo: 'Minister of National Defence 2023-2025',
    photoUrl: 'https://picsum.photos/id/68/200/200',
    bio: 'Bill Blair is a senior Liberal MP, drawing on his extensive experience in law enforcement and as a former cabinet minister, including Minister of National Defence. He is a prominent voice on public safety and defence issues.',
    policies: [
        'Advocates for modernizing the Canadian Armed Forces.',
        'Focuses on national security and Canada\'s contributions to alliances like NATO.',
    ],
    socials: { twitter: 'BillBlair' },
    keyIssues: ['national-defence', 'international-relations', 'fiscal-policy'],
    relatedPoliticianIds: [1, 6, 11],
    career: [
      { year: '2023-2025', role: 'Minister of National Defence', description: '' },
      { year: '2019-2023', role: 'Minister of Public Safety', description: 'Handled files related to policing, firearms, and border security.' },
      { year: '2015-Present', role: 'Member of Parliament for Scarborough Southwest', description: '' },
    ],
    committeeMemberships: [],
    notableQuotes: []
  },
];
