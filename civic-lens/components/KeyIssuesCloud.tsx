import React from 'react';
import type { KeyIssue } from '../types';

interface KeyIssuesCloudProps {
  issues: KeyIssue[];
}

const TAG_SIZES = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];
const TAG_COLORS = [
  'text-cyan-400',
  'text-sky-400',
  'text-blue-400',
  'text-indigo-400',
  'text-violet-400',
  'text-fuchsia-400',
  'text-rose-400',
];

const deterministicIndex = (value: string | number, max: number) => {
  const input = typeof value === 'number' ? value.toString() : value;
  let hash = 0;
  if (input.length === 0) {
    return hash;
  }
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % max;
};

const KeyIssuesCloud: React.FC<KeyIssuesCloudProps> = ({ issues }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
      {issues.map(issue => {
        const sizeClass = TAG_SIZES[deterministicIndex(issue.id, TAG_SIZES.length)];
        const colorClass = TAG_COLORS[deterministicIndex(issue.title, TAG_COLORS.length)];

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
