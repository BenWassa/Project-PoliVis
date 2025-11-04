import React, { useState, useMemo, useCallback, useEffect } from 'react';
import PoliticianDetailModal from './components/PoliticianDetailModal';
import PoliticiansView from './components/PoliticiansView';
import PartiesView from './components/PartiesView';
import IssuesView from './components/IssuesView';
import SideNav from './components/SideNav';
import GlobalSearchBar from './components/GlobalSearchBar';
import { POLITICIANS_DATA, KEY_ISSUES_DATA } from './constants';
import type { Politician, KeyIssue } from './types';
import { UsersIcon, TagIcon, MenuIcon } from './components/icons';
import { BuildingLibraryIcon } from './components/icons';

type View = 'politicians' | 'parties' | 'issues';

interface TabButtonProps {
  view: View;
  label: string;
  icon: React.ReactNode;
  activeView: View;
  onTabClick: (view: View) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ view, label, icon, activeView, onTabClick }) => (
  <button
    onClick={() => onTabClick(view)}
    className={`flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-bold rounded-full transition-all duration-200 ${
      activeView === view
        ? 'bg-cyan-500 text-slate-900 shadow-lg'
        : 'text-slate-300 hover:bg-slate-700/50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);


const App: React.FC = () => {
  const [politicians] = useState<Politician[]>(POLITICIANS_DATA);
  const [keyIssues] = useState<KeyIssue[]>(KEY_ISSUES_DATA);
  const [selectedPoliticianId, setSelectedPoliticianId] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<View>('politicians');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedPoliticianId !== null || isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedPoliticianId, isNavOpen]);


  const sortedPoliticians = useMemo(() => {
    const getSortWeight = (p: Politician) => {
        if (p.position.toLowerCase().includes('prime minister')) return 1;
        if (p.position.toLowerCase().includes('leader')) return 2;
        if (p.position.toLowerCase().includes('deputy prime minister')) return 3;
        return 4;
    };
    return [...politicians].sort((a, b) => {
        const weightA = getSortWeight(a);
        const weightB = getSortWeight(b);
        if (weightA !== weightB) {
            return weightA - weightB;
        }
        return a.name.localeCompare(b.name);
    });
  }, [politicians]);

  const selectedPolitician = useMemo(() => {
    if (!selectedPoliticianId) return null;
    return politicians.find(p => p.id === selectedPoliticianId) ?? null;
  }, [selectedPoliticianId, politicians]);

  const handleSelectPolitician = useCallback((id: number) => {
    setSelectedPoliticianId(id);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPoliticianId(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200">
      <SideNav 
        isOpen={isNavOpen} 
        onClose={() => setIsNavOpen(false)} 
        politicians={politicians}
        issues={keyIssues}
      />
      
      <header className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur-lg border-b border-slate-300/10">
        <div className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${isScrolled ? 'py-2' : 'py-5'}`}>
          <div className="flex-1 flex justify-start">
            <button 
              onClick={() => setIsNavOpen(true)} 
              className="p-2 -ml-2 rounded-full text-slate-400 hover:bg-slate-700/50 hover:text-white transition-colors"
              aria-label="Open navigation menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-shrink-0 text-center">
            <h1 className={`font-extrabold text-white tracking-tight transition-all duration-300 ${isScrolled ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>
              Civic Lens
            </h1>
            <p className={`text-slate-400 transition-all duration-300 ease-in-out overflow-hidden ${isScrolled ? 'opacity-0 h-0 mt-0' : 'h-6 mt-1'}`}>
              Explore the network of Canadian politics
            </p>
          </div>

          <div className="flex-1 flex justify-end">
            <GlobalSearchBar politicians={politicians} onSelectPolitician={handleSelectPolitician} />
          </div>
        </div>
        <div className="container mx-auto px-4 pb-4">
            <div className="flex items-center justify-center gap-2 sm:gap-4 bg-slate-800/50 p-2 rounded-full">
                <TabButton 
                  view="politicians" 
                  label="Politicians" 
                  icon={<UsersIcon className="w-5 h-5" />}
                  activeView={activeView}
                  onTabClick={setActiveView}
                />
                <TabButton 
                  view="parties" 
                  label="Parties" 
                  icon={<BuildingLibraryIcon className="w-5 h-5" />}
                  activeView={activeView}
                  onTabClick={setActiveView}
                />
                <TabButton 
                  view="issues" 
                  label="Key Issues" 
                  icon={<TagIcon className="w-5 h-5" />}
                  activeView={activeView}
                  onTabClick={setActiveView}
                />
            </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 sm:px-8 lg:px-12">
        {activeView === 'politicians' && (
          <PoliticiansView
            politicians={sortedPoliticians}
            onSelectPolitician={handleSelectPolitician}
          />
        )}
        {activeView === 'parties' && (
          <PartiesView 
            politicians={politicians} 
            onSelectPolitician={handleSelectPolitician} 
          />
        )}
        {activeView === 'issues' && <IssuesView issues={keyIssues} />}
      </main>
      
      {selectedPolitician && (
        <PoliticianDetailModal
          politician={selectedPolitician}
          allPoliticians={politicians}
          allIssues={keyIssues}
          onClose={handleCloseModal}
          onSelectPolitician={handleSelectPolitician}
        />
      )}
      
      <footer className="text-center py-8 mt-8 border-t border-slate-300/10">
        <p className="text-slate-500 text-sm">&copy; 2024 Civic Lens. PWA Demo.</p>
      </footer>
    </div>
  );
};

export default App;