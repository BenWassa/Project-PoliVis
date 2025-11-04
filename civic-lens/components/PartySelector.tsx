import React from 'react';
import { Party } from '../types';
import { CheckCircleIcon } from './icons';

interface PartySelectorProps {
  parties: Party[];
  selectedParty: Party | null;
  onSelectParty: (party: Party | null) => void;
}

const partyDisplayConfig: Record<Party, { bg: string; border: string; text: string; hoverBg: string }> = {
  [Party.Conservative]: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500',
    text: 'text-blue-400',
    hoverBg: 'hover:bg-blue-500/20',
  },
  [Party.Liberal]: {
    bg: 'bg-red-500/10',
    border: 'border-red-500',
    text: 'text-red-400',
    hoverBg: 'hover:bg-red-500/20',
  },
  [Party.NDP]: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500',
    text: 'text-orange-400',
    hoverBg: 'hover:bg-orange-500/20',
  },
  [Party.BlocQuébécois]: {
    bg: 'bg-sky-400/10',
    border: 'border-sky-400',
    text: 'text-sky-300',
    hoverBg: 'hover:bg-sky-400/20',
  },
  [Party.Green]: {
    bg: 'bg-green-500/10',
    border: 'border-green-500',
    text: 'text-green-400',
    hoverBg: 'hover:bg-green-500/20',
  },
};


interface PartyButtonProps {
    party: Party | null;
    selectedParty: Party | null;
    onSelectParty: (party: Party | null) => void;
}

const PartyButton: React.FC<PartyButtonProps> = ({ party, selectedParty, onSelectParty }) => {
    const isSelected = selectedParty === party;
    const label = party || 'All Parties';
    const config = party ? partyDisplayConfig[party] : {
      bg: 'bg-slate-700/50',
      border: 'border-slate-600',
      text: 'text-slate-300',
      hoverBg: 'hover:bg-slate-700',
    };

    return (
      <button
        onClick={() => onSelectParty(party)}
        className={`flex-shrink-0 relative px-4 py-2 text-sm font-semibold rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500
          ${isSelected
            ? `${config.bg} ${config.border} ${config.text} shadow-md`
            : `${config.bg} border-transparent ${config.text} ${config.hoverBg}`
          }`}
        aria-pressed={isSelected}
        aria-label={`Filter by ${label}`}
      >
        {isSelected && <CheckCircleIcon className="absolute -top-1.5 -right-1.5 w-5 h-5 text-cyan-400 bg-slate-900 rounded-full" />}
        {label}
      </button>
    );
};

const PartySelector: React.FC<PartySelectorProps> = ({ parties, selectedParty, onSelectParty }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3" role="toolbar" aria-label="Filter by political party">
        <PartyButton party={null} selectedParty={selectedParty} onSelectParty={onSelectParty} />
        {parties.map(party => (
            <PartyButton key={party} party={party} selectedParty={selectedParty} onSelectParty={onSelectParty} />
        ))}
    </div>
  );
};

export default PartySelector;