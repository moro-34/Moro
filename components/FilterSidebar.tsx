import React from 'react';
import { CarType, FuelType, Transmission } from '../types';

interface FilterSidebarProps {
  filters: any; 
  setFilters: (f: any) => void;
  t: any;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, t }) => {
  const handleChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-fit sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg text-slate-900">{t.filters.title}</h2>
        <button 
            onClick={() => setFilters({ type: '', fuel: '', trans: '' })}
            className="text-xs text-blue-600 font-semibold hover:underline"
        >
            {t.filters.reset}
        </button>
      </div>

      <div className="space-y-6">
        {/* Vehicle Type */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">{t.filters.body}</label>
          <select 
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
            value={filters.type}
            onChange={(e) => handleChange('type', e.target.value)}
          >
            <option value="">{t.filters.allTypes}</option>
            {Object.values(CarType).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Fuel */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">{t.filters.fuel}</label>
          <div className="space-y-2">
            {Object.values(FuelType).map(fuel => (
              <label key={fuel} className="flex items-center space-x-2 cursor-pointer">
                <input 
                    type="radio" 
                    name="fuel" 
                    value={fuel}
                    checked={filters.fuel === fuel}
                    onChange={(e) => handleChange('fuel', e.target.value)}
                    className="text-yellow-400 focus:ring-yellow-400 h-4 w-4 border-gray-300"
                />
                <span className="text-sm text-slate-600">{fuel}</span>
              </label>
            ))}
             <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                    type="radio" 
                    name="fuel" 
                    value=""
                    checked={filters.fuel === ''}
                    onChange={(e) => handleChange('fuel', e.target.value)}
                    className="text-yellow-400 focus:ring-yellow-400 h-4 w-4 border-gray-300"
                />
                <span className="text-sm text-slate-600">{t.filters.any}</span>
              </label>
          </div>
        </div>

         {/* Transmission */}
         <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">{t.filters.trans}</label>
          <select 
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
            value={filters.trans}
            onChange={(e) => handleChange('trans', e.target.value)}
          >
            <option value="">{t.filters.any}</option>
            {Object.values(Transmission).map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <button className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold rounded-lg transition-colors">
            {t.filters.show}
        </button>
      </div>
    </div>
  );
};
