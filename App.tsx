import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { CarCard } from './components/CarCard';
import { FilterSidebar } from './components/FilterSidebar';
import { CarDetails } from './components/CarDetails';
import { ChatWidget } from './components/ChatWidget';
import { CARS, TRANSLATIONS } from './constants';
import { Car, Language } from './types';
import { Search, ChevronRight } from 'lucide-react';

function App() {
  const [view, setView] = useState<'home' | 'inventory' | 'details'>('home');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filters, setFilters] = useState({
    type: '',
    fuel: '',
    trans: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState<Language>('en');

  const t = TRANSLATIONS[language];

  // Apply font and direction based on language
  useEffect(() => {
    document.body.className = `bg-slate-50 text-slate-900 transition-all duration-300 ${language === 'ar' ? 'font-arabic' : ''}`;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Filter Logic
  const filteredCars = useMemo(() => {
    return CARS.filter(car => {
      const matchSearch = 
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = filters.type ? car.type === filters.type : true;
      const matchFuel = filters.fuel ? car.fuelType === filters.fuel : true;
      const matchTrans = filters.trans ? car.transmission === filters.trans : true;
      return matchSearch && matchType && matchFuel && matchTrans;
    });
  }, [searchTerm, filters]);

  const handleNavigate = (newView: 'home' | 'inventory') => {
    setView(newView);
    setSelectedCar(null);
    window.scrollTo(0, 0);
  };

  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
    setView('details');
    window.scrollTo(0, 0);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans ${language === 'ar' ? 'font-arabic' : ''}`}>
      <Header onNavigate={handleNavigate} language={language} setLanguage={setLanguage} t={t} />

      {/* Views */}
      <main className="flex-grow">
        {view === 'home' && (
          <>
            {/* Hero Section */}
            <div className="bg-slate-900 text-white py-20 lg:py-32 relative overflow-hidden">
               {/* Abstract Background */}
               <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                   <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
                   <div className="absolute top-48 -left-24 w-72 h-72 bg-blue-600 rounded-full blur-3xl"></div>
               </div>
               
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-2xl">
                  <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                    {t.hero.title1} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">{t.hero.title2}</span>
                  </h1>
                  <p className="text-slate-300 text-lg mb-8">
                    {t.hero.subtitle}
                  </p>

                  {/* Search Bar */}
                  <div className="bg-white p-2 rounded-full flex shadow-xl max-w-lg transform hover:scale-[1.01] transition-transform">
                    <div className={`flex-1 px-4 flex items-center ${language === 'ar' ? 'border-l' : 'border-r'} border-slate-200`}>
                       <Search className={`text-slate-400 w-5 h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                       <input 
                         type="text" 
                         placeholder={t.hero.searchPlaceholder}
                         className="w-full py-3 bg-transparent outline-none text-slate-900 placeholder-slate-400"
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                         onKeyDown={(e) => {
                             if(e.key === 'Enter') handleNavigate('inventory');
                         }}
                       />
                    </div>
                    <button 
                        onClick={() => handleNavigate('inventory')}
                        className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 px-8 rounded-full transition-colors flex items-center whitespace-nowrap"
                    >
                        {t.hero.searchBtn}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Section */}
            <div className="container mx-auto px-4 py-16">
              <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{t.hero.featured}</h2>
                    <p className="text-slate-500 mt-1">{t.hero.justAdded}</p>
                  </div>
                  <button 
                    onClick={() => handleNavigate('inventory')}
                    className="text-blue-600 font-semibold flex items-center hover:underline gap-1"
                  >
                    {t.hero.viewAll} <ChevronRight size={16} className={language === 'ar' ? 'rotate-180' : ''} />
                  </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CARS.slice(0, 4).map(car => (
                  <CarCard key={car.id} car={car} onClick={handleCarClick} t={t} />
                ))}
              </div>
            </div>
          </>
        )}

        {view === 'inventory' && (
           <div className="container mx-auto px-4 py-8">
              <div className="flex flex-col lg:flex-row gap-8">
                 {/* Sidebar */}
                 <div className="w-full lg:w-1/4">
                    <FilterSidebar filters={filters} setFilters={setFilters} t={t} />
                 </div>

                 {/* Grid */}
                 <div className="w-full lg:w-3/4">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-900">
                            {filteredCars.length} <span className="font-normal text-slate-500 text-lg">{t.results.available}</span>
                        </h1>
                    </div>
                    
                    {filteredCars.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredCars.map(car => (
                            <CarCard key={car.id} car={car} onClick={handleCarClick} t={t} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl border border-slate-100">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{t.results.noResults}</h3>
                            <p className="text-slate-500">{t.results.tryAdjust}</p>
                            <button 
                                onClick={() => {setFilters({type: '', fuel: '', trans: ''}); setSearchTerm('')}}
                                className="mt-4 text-blue-600 font-bold hover:underline"
                            >
                                {t.results.clear}
                            </button>
                        </div>
                    )}
                 </div>
              </div>
           </div>
        )}

        {view === 'details' && selectedCar && (
          <CarDetails 
            car={selectedCar} 
            onBack={() => handleNavigate('inventory')} 
            t={t} 
            language={language}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Autoroute H24</h4>
            <p className="text-sm">{t.footer.desc}</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">{t.footer.buy}</h5>
            <ul className="space-y-2 text-sm">
                <li>Used Cars</li>
                <li>New Cars</li>
                <li>Electric Vehicles</li>
                <li>Motorcycles</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">{t.footer.company}</h5>
            <ul className="space-y-2 text-sm">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Contact</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-4">{t.footer.legal}</h5>
            <ul className="space-y-2 text-sm">
                <li>Imprint</li>
                <li>Privacy Policy</li>
                <li>Cookie Settings</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm">
            &copy; 2024 Autoroute H24 GmbH. All rights reserved.
        </div>
      </footer>

      <ChatWidget currentView={view} selectedCar={selectedCar} language={language} t={t} />
    </div>
  );
}

export default App;
