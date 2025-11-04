import React, { useMemo, useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import type { Politician, KeyIssue } from '../types';
import { Party } from '../types';
import { CloseIcon, WebsiteIcon, TwitterIcon, UsersIcon, TagIcon, BriefcaseIcon, CommitteeIcon, QuoteIcon, CheckCircleIcon, SparklesIcon } from './icons';

interface PoliticianDetailModalProps {
  politician: Politician;
  allPoliticians: Politician[];
  allIssues: KeyIssue[];
  onClose: () => void;
  onSelectPolitician: (id: number) => void;
}

const partyColorMap: Record<Party, { gradient: string; text: string; ring: string; bg: string; border: string }> = {
  [Party.Conservative]: {
    gradient: 'from-blue-500 to-blue-700',
    text: 'text-blue-400',
    ring: 'ring-blue-500',
    bg: 'bg-blue-500',
    border: 'border-blue-400',
  },
  [Party.Liberal]: {
    gradient: 'from-red-500 to-red-700',
    text: 'text-red-400',
    ring: 'ring-red-500',
    bg: 'bg-red-500',
    border: 'border-red-400',
  },
  [Party.NDP]: {
    gradient: 'from-orange-500 to-orange-600',
    text: 'text-orange-400',
    ring: 'ring-orange-500',
    bg: 'bg-orange-500',
    border: 'border-orange-400',
  },
  [Party.BlocQuébécois]: {
    gradient: 'from-sky-400 to-sky-600',
    text: 'text-sky-400',
    ring: 'ring-sky-500',
    bg: 'bg-sky-500',
    border: 'border-sky-400',
  },
  [Party.Green]: {
    gradient: 'from-green-500 to-green-700',
    text: 'text-green-400',
    ring: 'ring-green-500',
    bg: 'bg-green-500',
    border: 'border-green-400',
  },
};

type ActiveTab = 'overview' | 'career' | 'policies';

interface TabButtonProps {
  tab: ActiveTab;
  label: string;
  activeTab: ActiveTab;
  partyColors: { bg: string };
  onClick: (tab: ActiveTab) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ tab, label, activeTab, partyColors, onClick }) => (
  <button
    onClick={() => onClick(tab)}
    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
      activeTab === tab
        ? `${partyColors.bg} text-white`
        : 'text-slate-400 hover:bg-slate-700/50'
    }`}
    aria-current={activeTab === tab}
  >
    {label}
  </button>
);

const PoliticianDetailModal: React.FC<PoliticianDetailModalProps> = ({
  politician,
  allPoliticians,
  allIssues,
  onClose,
  onSelectPolitician,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [aiSummary, setAiSummary] = useState<{ loading: boolean; data: string | null; error: string | null }>({ loading: false, data: null, error: null });
  
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    triggerElementRef.current = document.activeElement as HTMLElement;
    const modalNode = modalRef.current;
    if (!modalNode) return;

    const focusableElements = modalNode.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) { // Shift+Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    modalNode.addEventListener('keydown', handleKeyDown);

    return () => {
      modalNode.removeEventListener('keydown', handleKeyDown);
      triggerElementRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    // Reset AI summary and active tab when the politician changes
    setAiSummary({ loading: false, data: null, error: null });
    setActiveTab('overview');
  }, [politician.id]);

  const partyColors = partyColorMap[politician.party];

  const issuesById = useMemo(() => new Map(allIssues.map(i => [i.id, i])), [allIssues]);
  const politiciansById = useMemo(() => new Map(allPoliticians.map(p => [p.id, p])), [allPoliticians]);

  const politicianKeyIssues = useMemo(() => {
    return politician.keyIssues.map(issueId => issuesById.get(issueId)).filter(Boolean) as KeyIssue[];
  }, [politician.keyIssues, issuesById]);

  const relatedPoliticians = useMemo(() => {
    return politician.relatedPoliticianIds.map(id => politiciansById.get(id)).filter(Boolean) as Politician[];
  }, [politician.relatedPoliticianIds, politiciansById]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFactCheck = async () => {
    setAiSummary({ loading: true, data: null, error: null });
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Provide a brief, up-to-date summary of the political career and key policy stances of ${politician.name}. Focus on their current role and recent activities. Present the information clearly and concisely in a single paragraph.`;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      setAiSummary({ loading: false, data: response.text, error: null });
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setAiSummary({ loading: false, data: null, error: `Failed to fetch AI summary. ${errorMessage}` });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="politician-name"
    >
      <div ref={modalRef} className={`relative max-h-[90vh] w-full max-w-4xl bg-slate-800 rounded-2xl shadow-2xl animate-slide-up overflow-hidden flex flex-col border-2 ${partyColors.border}`}>
        {/* Header */}
        <header className={`relative p-6 text-center text-white bg-slate-900/50 border-b-4 ${partyColors.border}`}>
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
            >
                <CloseIcon className="w-6 h-6" />
            </button>
            <div className="flex flex-col sm:flex-row items-center sm:text-left gap-6">
                <img
                    src={politician.photoUrl}
                    alt={politician.name}
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ${partyColors.ring}`}
                />
                <div className="flex-grow">
                    <span className={`text-sm font-bold uppercase tracking-wider ${partyColors.text}`}>{politician.party}</span>
                    <h2 id="politician-name" className="text-3xl sm:text-4xl font-extrabold mt-1">{politician.name}</h2>
                    <p className="text-slate-400 text-lg mt-1">{politician.position}</p>
                    <p className="text-slate-500 text-sm">{politician.termInfo}</p>
                </div>
                <div className="flex gap-4 self-center sm:self-start mt-4 sm:mt-0">
                    {politician.socials.website && (
                        <a href={politician.socials.website} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label={`${politician.name}'s Website`}>
                            <WebsiteIcon className="w-6 h-6" />
                        </a>
                    )}
                    {politician.socials.twitter && (
                        <a href={`https://twitter.com/${politician.socials.twitter}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label={`${politician.name}'s Twitter`}>
                            <TwitterIcon className="w-6 h-6" />
                        </a>
                    )}
                </div>
            </div>
        </header>

        <div className="p-6 border-b border-slate-700">
            <nav className="flex items-center justify-center space-x-2 sm:space-x-4 bg-slate-900/50 p-2 rounded-lg">
                <TabButton tab="overview" label="Overview" activeTab={activeTab} onClick={setActiveTab} partyColors={partyColors} />
                <TabButton tab="career" label="Career" activeTab={activeTab} onClick={setActiveTab} partyColors={partyColors} />
                <TabButton tab="policies" label="Policies & Issues" activeTab={activeTab} onClick={setActiveTab} partyColors={partyColors} />
            </nav>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto p-6 flex-grow">
          {activeTab === 'overview' && (
            <div>
              <p className="text-slate-300 leading-relaxed">{politician.bio}</p>
              
              <div className="mt-6 text-center">
                <button
                    onClick={handleFactCheck}
                    disabled={aiSummary.loading}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500
                    ${aiSummary.loading 
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                        : 'bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20'}
                    `}
                >
                    <SparklesIcon className="w-5 h-5" />
                    <span>{aiSummary.loading ? 'Checking...' : 'Fact-Check with AI'}</span>
                </button>
              </div>

              { (aiSummary.loading || aiSummary.data || aiSummary.error) && (
                <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700 animate-fade-in">
                  <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                      <SparklesIcon className="w-5 h-5"/>
                      Live AI Summary
                  </h4>
                  {aiSummary.loading && (
                      <div className="space-y-2 mt-2">
                          <div className="h-4 bg-slate-700 rounded w-full animate-pulse"></div>
                          <div className="h-4 bg-slate-700 rounded w-5/6 animate-pulse"></div>
                          <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse"></div>
                      </div>
                  )}
                  {aiSummary.error && (
                      <p className="text-red-400 text-sm mt-2">{aiSummary.error}</p>
                  )}
                  {aiSummary.data && (
                      <p className="text-slate-300 text-sm mt-2 whitespace-pre-wrap">{aiSummary.data}</p>
                  )}
                </div>
              )}

              <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
                <UsersIcon className={`w-6 h-6 ${partyColors.text}`} />
                Related Politicians
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {relatedPoliticians.map(p => (
                  <button key={p.id} onClick={() => onSelectPolitician(p.id)} className="text-center group">
                    <img src={p.photoUrl} alt={p.name} className="w-16 h-16 rounded-full object-cover mx-auto ring-2 ring-slate-700 group-hover:ring-4 transition-all" />
                    <span className="block text-sm font-medium mt-2 group-hover:text-cyan-400 transition-colors">{p.name}</span>
                    <span className="block text-xs text-slate-400">{p.party}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'career' && (
            <div>
                {/* Career Timeline */}
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <BriefcaseIcon className={`w-6 h-6 ${partyColors.text}`} />
                    Career History
                </h3>
                <div className="relative border-l-2 border-slate-700 pl-6 space-y-8">
                    {politician.career.map((entry, index) => (
                        <div key={index} className="relative">
                            <div className={`absolute -left-[35px] top-1 h-4 w-4 rounded-full ${partyColors.bg}`}></div>
                            <p className="font-bold text-cyan-400">{entry.year}</p>
                            <h4 className="font-semibold text-white text-lg">{entry.role}</h4>
                            <p className="text-slate-400">{entry.description}</p>
                        </div>
                    ))}
                </div>

                {/* Committee Memberships */}
                {politician.committeeMemberships.length > 0 && (
                    <>
                        <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
                            <CommitteeIcon className={`w-6 h-6 ${partyColors.text}`} />
                            Committee Memberships
                        </h3>
                        <ul className="space-y-2">
                        {politician.committeeMemberships.map((committee, index) => (
                            <li key={index} className="bg-slate-700/50 p-3 rounded-lg">
                                <span className="font-semibold text-white">{committee.name}</span> - <span className="text-slate-400">{committee.role}</span>
                            </li>
                        ))}
                        </ul>
                    </>
                )}

                {/* Notable Quotes */}
                {politician.notableQuotes.length > 0 && (
                     <>
                        <h3 className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
                            <QuoteIcon className={`w-6 h-6 ${partyColors.text}`} />
                            Notable Quotes
                        </h3>
                        <div className="space-y-4">
                            {politician.notableQuotes.map((quote, index) => (
                                <blockquote key={index} className="border-l-4 border-slate-600 pl-4 italic">
                                    <p className="text-slate-300">"{quote.text}"</p>
                                    <cite className="block text-right text-sm text-slate-400 not-italic mt-1">— {quote.source}</cite>
                                </blockquote>
                            ))}
                        </div>
                    </>
                )}
            </div>
          )}
          
          {activeTab === 'policies' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                    Key Stances
                    </h3>
                    <ul className="space-y-4">
                        {politician.policies.map((policy, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <CheckCircleIcon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${partyColors.text}`} />
                                <span className="text-slate-300">{policy}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <TagIcon className={`w-6 h-6 ${partyColors.text}`} />
                        Focus Issues
                    </h3>
                    <div className="space-y-3">
                        {politicianKeyIssues.map(issue => (
                            <div key={issue.id} className="bg-slate-700/50 p-4 rounded-lg">
                                <h4 className="font-semibold text-white">{issue.title}</h4>
                                <p className="text-sm text-slate-400 mt-1">{issue.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          )}
        </div>
        
        <footer className={`p-4 bg-slate-900/50 border-t-2 ${partyColors.border} text-xs text-slate-500 text-center`}>
            A Civic Lens Project
        </footer>
      </div>
    </div>
  );
};

export default PoliticianDetailModal;