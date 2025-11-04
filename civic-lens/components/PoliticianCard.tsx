import React from 'react';
import type { Politician } from '../types';
import { Party } from '../types';
import { ArrowUpRightIcon } from './icons';

interface PoliticianCardProps {
  politician: Politician;
  onSelect: (id: number) => void;
}

const partyColorMap: Record<Party, { gradient: string; text: string; ring: string }> = {
  [Party.Conservative]: {
    gradient: 'from-blue-500 to-blue-700',
    text: 'text-blue-500',
    ring: 'ring-blue-500',
  },
  [Party.Liberal]: {
    gradient: 'from-red-500 to-red-700',
    text: 'text-red-500',
    ring: 'ring-red-500',
  },
  [Party.NDP]: {
    gradient: 'from-orange-500 to-orange-600',
    text: 'text-orange-500',
    ring: 'ring-orange-500',
  },
  [Party.BlocQuébécois]: {
    gradient: 'from-sky-400 to-sky-600',
    text: 'text-sky-500',
    ring: 'ring-sky-500',
  },
  [Party.Green]: {
    gradient: 'from-green-500 to-green-700',
    text: 'text-green-500',
    ring: 'ring-green-500',
  },
};

const PoliticianCard: React.FC<PoliticianCardProps> = ({ politician, onSelect }) => {
  const partyColors = partyColorMap[politician.party];

  const handleCardClick = () => {
    onSelect(politician.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === e.currentTarget) {
      e.preventDefault();
      onSelect(politician.id);
    }
  };

  return (
    <div
      className="group w-full rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 overflow-hidden text-center transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-900/50 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-slate-900 focus:ring-cyan-500 flex flex-col"
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${politician.name}`}
    >
      <div className={`relative h-24 bg-gradient-to-br ${partyColors.gradient} flex items-center justify-center`}>
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
      </div>
      <div className="relative p-6 pt-0 flex-grow flex flex-col">
        <div className="relative -mt-12">
          <img
            src={politician.photoUrl}
            alt={politician.name}
            className={`w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-slate-800 ${partyColors.ring}`}
          />
        </div>

        <div className="flex-grow">
            <h2 className="text-xl font-bold text-white mt-4">{politician.name}</h2>
            <p className="text-slate-400 font-medium text-sm">{politician.position}</p>
            <p className="text-slate-500 text-xs mt-1">{politician.termInfo}</p>
        </div>
        
        <div className="mt-4">
             <span
                className={`inline-block px-3 py-1 text-xs font-semibold bg-slate-700 text-white rounded-full`}
            >
                {politician.party}
            </span>
        </div>
      </div>
       <div className="pb-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 group-hover:text-cyan-400 transition-colors duration-200">
          <span>Explore Details</span>
          <ArrowUpRightIcon className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};

export default PoliticianCard;