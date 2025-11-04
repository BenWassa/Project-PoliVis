export enum Party {
  Conservative = 'Conservative',
  Liberal = 'Liberal',
  NDP = 'NDP',
  BlocQuébécois = 'Bloc Québécois',
  Green = 'Green',
}

export interface KeyIssue {
  id: string;
  title: string;
  description: string;
}

export interface CareerEntry {
  year: string;
  role: string;
  description: string;
}

export interface Committee {
  name: string;
  role: string;
}

export interface Quote {
  text: string;
  source: string;
}


export interface Politician {
  id: number;
  name: string;
  party: Party;
  position: string;
  termInfo: string;
  photoUrl: string;
  bio: string;
  policies: string[];
  socials: {
    website?: string;
    twitter?: string;
  };
  keyIssues: string[]; // Array of KeyIssue IDs
  relatedPoliticianIds: number[]; // Array of Politician IDs
  career: CareerEntry[];
  committeeMemberships: Committee[];
  notableQuotes: Quote[];
}