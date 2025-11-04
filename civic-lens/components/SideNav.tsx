import React, { useEffect, useRef } from 'react';
import { CloseIcon, DownloadIcon } from './icons';
import type { Politician, KeyIssue } from '../types';

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
  politicians: Politician[];
  issues: KeyIssue[];
}

const SideNav: React.FC<SideNavProps> = ({ isOpen, onClose, politicians, issues }) => {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      navRef.current?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleExport = (data: unknown, filename: string) => {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export data:", error);
      alert("An error occurred while trying to export the data.");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="sidenav-title"
      className="fixed inset-0 z-50"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      />
      
      {/* SideNav Panel */}
      <div
        ref={navRef}
        tabIndex={-1}
        className="relative z-10 flex flex-col w-full max-w-xs h-full bg-slate-800 border-r border-slate-700 shadow-2xl animate-slide-in-left"
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 id="sidenav-title" className="text-xl font-bold text-white">Menu</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full text-slate-400 hover:bg-slate-700/50 hover:text-white transition-colors"
            aria-label="Close navigation menu"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-grow p-4 overflow-y-auto">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Export Data</h3>
            <button 
              onClick={() => handleExport(politicians, 'politicians.json')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-200 font-medium transition-colors"
            >
              <DownloadIcon className="w-5 h-5 text-cyan-400"/>
              <span>Export Politicians (JSON)</span>
            </button>
            <button 
              onClick={() => handleExport(issues, 'key_issues.json')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-200 font-medium transition-colors"
            >
              <DownloadIcon className="w-5 h-5 text-cyan-400"/>
              <span>Export Key Issues (JSON)</span>
            </button>
          </div>
        </div>

        <footer className="p-4 border-t border-slate-700 text-xs text-slate-500">
          Civic Lens Demo
        </footer>
      </div>
    </div>
  );
};

export default SideNav;