import React from 'react';
import type { KeyIssue } from '../types';

interface KeyIssuesCloudProps {
  issues: KeyIssue[];
}

const tagSizes = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];
const tagColors = [
  'text-cyan-400',
  'text-sky-400',
  'text-blue-400',
  'text-indigo-400',
  'text-violet-400',
  'text-fuchsia-400',
  'text-rose-400',
];

const KeyIssuesCloud: React.FC<KeyIssuesCloudProps> = ({ issues }) => {
  // Simple hashing function to get a pseudo-random but deterministic index
  const getIndex = (str: string, max: number) => {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % max;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
      {issues.map(issue => {
        const sizeClass = tagSizes[getIndex(issue.id, tagSizes.length)];
        const colorClass = tagColors[getIndex(issue.title, tagColors.length)];

        return (
          <div
            key={issue.id}
            className={`font-bold p-1 transition-transform duration-300 hover:scale-110 hover:z-10 relative cursor-default ${sizeClass} ${colorClass}`}
            title={issue.description}
          >
            {issue.title}
          </div>
        );
      })}
    </div>
  );
};

export default KeyIssuesCloud;
