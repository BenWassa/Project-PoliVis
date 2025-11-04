import React from 'react';
import type { KeyIssue } from '../types';
import KeyIssuesCloud from './KeyIssuesCloud';

interface IssuesViewProps {
  issues: KeyIssue[];
}

const IssuesView: React.FC<IssuesViewProps> = ({ issues }) => {
  return (
    <section className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-white">Key Issues Landscape</h2>
        <p className="text-slate-400 mt-1">Exploring the core topics in Canadian politics.</p>
      </div>
      <div className="max-w-4xl mx-auto">
        <KeyIssuesCloud issues={issues} />
      </div>
    </section>
  );
};

export default IssuesView;
