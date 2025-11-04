import React, { useState, useMemo, useCallback } from 'react';
import PoliticianCard from './PoliticianCard';
import PartySelector from './PartySelector';
import SearchBar from './SearchBar';
import type { Politician } from '../types';
import { Party } from '../types';

interface PoliticiansViewProps {
  politicians: Politician[];
  onSelectPolitician: (id: number) => void;
}

const PoliticiansView: React.FC<PoliticiansViewProps> = ({ politicians, onSelectPolitician }) => {
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectParty = useCallback((party: Party | null) => {
    setSelectedParty(party);
  }, []);

  const filteredPoliticians = useMemo(() => {
    let results = politicians;

    if (selectedParty) {
      results = results.filter(p => p.party === selectedParty);
    }
    
    if (searchQuery.trim() !== '') {
      results = results.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return results;
  }, [politicians, selectedParty, searchQuery]);

  const allParties = useMemo(() => {
    const parties = new Set(politicians.map(p => p.party));
    return Array.from(parties).sort();
  }, [politicians]);

  return (
    <section className="space-y-8 animate-fade-in">
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 space-y-6">
        <PartySelector
          parties={allParties}
          selectedParty={selectedParty}
          onSelectParty={handleSelectParty}
        />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredPoliticians.map((politician) => (
          <PoliticianCard
            key={politician.id}
            politician={politician}
            onSelect={onSelectPolitician}
          />
        ))}
      </div>
      {filteredPoliticians.length === 0 && (
        <div className="text-center py-16 col-span-full">
          <p className="text-slate-400 text-lg">No politicians found.</p>
          <p className="text-slate-500">Try adjusting your filters.</p>
        </div>
      )}
    </section>
  );
};

export default PoliticiansView;