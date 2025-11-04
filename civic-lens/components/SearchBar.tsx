import React from 'react';
import { SearchIcon } from './icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = "Search politicians by name..." }) => {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-11 pr-4 py-3 bg-slate-800/60 border border-slate-700 rounded-full text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-colors"
        aria-label="Search politicians by name"
      />
    </div>
  );
};

export default SearchBar;
