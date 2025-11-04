import React, { useState, useEffect, useRef } from 'react';
import type { Politician } from '../types';
import { SearchIcon } from './icons';

interface GlobalSearchBarProps {
  politicians: Politician[];
  onSelectPolitician: (id: number) => void;
}

const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({ politicians, onSelectPolitician }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Politician[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = politicians.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 5)); // Limit to 5 results
    } else {
      setResults([]);
    }
  }, [query, politicians]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (id: number) => {
    onSelectPolitician(id);
    setQuery('');
    setResults([]);
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-xs" ref={searchContainerRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search..."
          className="block w-full pl-10 pr-3 py-2 bg-slate-800/60 border border-slate-700 rounded-full text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-colors"
          aria-label="Search politicians"
        />
      </div>

      {isFocused && results.length > 0 && (
        <div className="absolute z-10 top-full mt-2 w-full bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-lg shadow-2xl overflow-hidden animate-fade-in">
          <ul className="divide-y divide-slate-700">
            {results.map(politician => (
              <li key={politician.id}>
                <button
                  onClick={() => handleSelect(politician.id)}
                  className="w-full flex items-center gap-4 p-3 text-left hover:bg-slate-700/50 transition-colors duration-150"
                >
                  <img src={politician.photoUrl} alt={politician.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{politician.name}</p>
                    <p className="text-sm text-slate-400">{politician.party}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;
