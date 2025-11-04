import React, { useMemo } from 'react';
import type { Politician } from '../types';
import { Party } from '../types';
import { TagIcon, UsersIcon } from './icons';

interface PartiesViewProps {
  politicians: Politician[];
  onSelectPolitician: (id: number) => void;
}

const partyColorMap: Record<Party, { border: string; text: string; ring: string }> = {
  [Party.Conservative]: { border: 'border-blue-500', text: 'text-blue-400', ring: 'ring-blue-500' },
  [Party.Liberal]: { border: 'border-red-500', text: 'text-red-400', ring: 'ring-red-500' },
  [Party.NDP]: { border: 'border-orange-500', text: 'text-orange-400', ring: 'ring-orange-500' },
  [Party.BlocQuébécois]: { border: 'border-sky-400', text: 'text-sky-300', ring: 'ring-sky-500' },
  [Party.Green]: { border: 'border-green-500', text: 'text-green-400', ring: 'ring-green-500' },
};

const partyInfo: Record<Party, { description: string }> = {
    [Party.Conservative]: { description: 'Advocates for lower taxes, fiscal conservatism, and a strong national economy.' },
    [Party.Liberal]: { description: 'Focuses on social progress, multiculturalism, and a balanced approach to economic and environmental issues.' },
    [Party.NDP]: { description: 'Champions social democratic policies, including expanded public services and workers\' rights.' },
    [Party.BlocQuébécois]: { description: 'Dedicated to the promotion of Quebec\'s interests and sovereignty on the federal stage.' },
    [Party.Green]: { description: 'Prioritizes environmental sustainability, ecological wisdom, and non-violence.' },
};


const PartiesView: React.FC<PartiesViewProps> = ({ politicians, onSelectPolitician }) => {
  const partiesData = useMemo(() => {
    const data = new Map<Party, { members: Politician[], leader?: Politician, issues: Set<string> }>();

    politicians.forEach(p => {
      if (!data.has(p.party)) {
        data.set(p.party, { members: [], issues: new Set() });
      }
      const partyData = data.get(p.party)!;
      partyData.members.push(p);
      p.keyIssues.forEach(issue => partyData.issues.add(issue));

      if (p.position.toLowerCase().includes('leader')) {
        partyData.leader = p;
      }
    });

    return Array.from(data.entries()).map(([party, { members, leader, issues }]) => ({
      party,
      members,
      leader,
      issues: Array.from(issues).slice(0, 3) // Show top 3 issues for brevity
    }));
  }, [politicians]);

  return (
    <section className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white">Political Parties of Canada</h2>
        <p className="text-slate-400 mt-1">An overview of the major federal parties.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {partiesData.map(({ party, members, leader, issues }) => {
            const colors = partyColorMap[party];
            return (
                <div key={party} className={`bg-slate-800/50 border-2 ${colors.border} rounded-2xl p-6 flex flex-col sm:flex-row gap-6`}>
                    <div className="text-center sm:text-left">
                        {leader && (
                             <button onClick={() => onSelectPolitician(leader.id)} className="group block mx-auto sm:mx-0">
                                <img src={leader.photoUrl} alt={leader.name} className={`w-24 h-24 rounded-full object-cover ring-4 ${colors.ring} group-hover:scale-105 transition-transform`} />
                                <p className="font-bold mt-2 group-hover:text-cyan-400 transition-colors">{leader.name}</p>
                                <p className="text-sm text-slate-400">Party Leader</p>
                            </button>
                        )}
                    </div>
                    <div className="flex-grow">
                        <h3 className={`text-2xl font-bold ${colors.text}`}>{party}</h3>
                        <p className="text-slate-300 mt-2 text-sm">{partyInfo[party].description}</p>
                        
                        <div className="mt-4 pt-4 border-t border-slate-700 space-y-2">
                             <div className="flex items-center gap-2 text-sm">
                                <UsersIcon className={`w-5 h-5 ${colors.text}`} />
                                <span className="font-semibold text-white">{members.length}</span>
                                <span className="text-slate-400">Politicians in dataset</span>
                            </div>
                             <div className="flex items-center gap-2 text-sm">
                                <TagIcon className={`w-5 h-5 ${colors.text}`} />
                                <span className="text-slate-400">Key Focus Areas: {issues.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
      </div>
    </section>
  );
};

export default PartiesView;
