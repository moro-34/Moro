import React, { useState } from 'react';
import { Car as CarIcon, User, Search, Menu, Globe } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  onNavigate: (view: 'home' | 'inventory') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, language, setLanguage, t }) => {
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-yellow-400 shadow-md text-slate-900">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="bg-slate-900 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <CarIcon className="w-6 h-6 text-yellow-400" />
          </div>
          <span className="text-2xl font-bold tracking-tight">Autoroute<span className="font-light">H24</span></span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 font-medium">
          <button onClick={() => onNavigate('inventory')} className="hover:text-slate-700 transition-colors">{t.nav.buy}</button>
          <button className="hover:text-slate-700 transition-colors">{t.nav.sell}</button>
          <button className="hover:text-slate-700 transition-colors">{t.nav.services}</button>
          <button className="hover:text-slate-700 transition-colors">{t.nav.magazine}</button>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative">
            <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2 hover:bg-yellow-500 rounded-full transition-colors flex items-center gap-1"
            >
                <Globe className="w-5 h-5" />
                <span className="text-xs font-bold uppercase">{language}</span>
            </button>
            
            {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-slate-100 py-2 w-32 z-50">
                    <button onClick={() => {setLanguage('en'); setIsLangOpen(false)}} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm flex items-center gap-2">
                        🇺🇸 English
                    </button>
                    <button onClick={() => {setLanguage('fr'); setIsLangOpen(false)}} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-sm flex items-center gap-2">
                        🇫🇷 Français
                    </button>
                    <button onClick={() => {setLanguage('ar'); setIsLangOpen(false)}} className="w-full text-right px-4 py-2 hover:bg-slate-50 text-sm flex items-center gap-2 font-arabic justify-end">
                        العربية 🇸🇦
                    </button>
                </div>
            )}
          </div>

          <button className="p-2 hover:bg-yellow-500 rounded-full transition-colors" aria-label="Search">
             <Search className="w-5 h-5" />
          </button>
          <button className="flex items-center space-x-2 hover:bg-yellow-500 px-3 py-1.5 rounded-full transition-colors">
            <User className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-semibold">{t.nav.login}</span>
          </button>
           <button className="md:hidden p-2 hover:bg-yellow-500 rounded-full">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
