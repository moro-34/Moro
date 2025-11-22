import React, { useEffect, useState } from 'react';
import { Car, Language } from '../types';
import { ArrowLeft, Calendar, Gauge, Zap, MapPin, Share2, Heart, Phone } from 'lucide-react';
import { generateCarSummary } from '../services/geminiService';

interface CarDetailsProps {
  car: Car;
  onBack: () => void;
  t: any;
  language: Language;
}

export const CarDetails: React.FC<CarDetailsProps> = ({ car, onBack, t, language }) => {
  const [aiSummary, setAiSummary] = useState<string>('');
  
  useEffect(() => {
    setAiSummary(''); // Clear previous
    const fetchSummary = async () => {
        const summary = await generateCarSummary(car, language);
        setAiSummary(summary);
    };
    fetchSummary();
  }, [car, language]);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-slate-900 mb-6 transition-colors group"
      >
        <ArrowLeft size={20} className={`group-hover:-translate-x-1 transition-transform ${language === 'ar' ? 'rotate-180 ml-2' : 'mr-2'}`} />
        {t.details.back}
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Images & Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
             <img src={car.imageUrl} alt={car.model} className="w-full h-96 object-cover" />
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{car.make} {car.model}</h1>
                    <p className="text-lg text-slate-500">{car.type} • {car.year}</p>
                </div>
                <p className="text-3xl font-bold text-blue-700">€{car.price.toLocaleString()}</p>
            </div>

            {/* AI Summary Badge */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Zap size={16} className="text-blue-600" fill="currentColor" />
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{t.details.aiBadge}</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                    "{aiSummary || t.details.aiLoading}"
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-slate-100">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <Calendar className="w-5 h-5 mx-auto mb-2 text-slate-400" />
                    <p className="text-xs text-slate-500 uppercase">{t.details.year}</p>
                    <p className="font-bold text-slate-900">{car.year}</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <Gauge className="w-5 h-5 mx-auto mb-2 text-slate-400" />
                    <p className="text-xs text-slate-500 uppercase">{t.details.mileage}</p>
                    <p className="font-bold text-slate-900">{car.mileage.toLocaleString()} {t.card.km}</p>
                </div>
                 <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <div className="w-5 h-5 mx-auto mb-2 text-slate-400 font-serif font-bold flex items-center justify-center border border-slate-400 rounded-sm text-[10px]">M</div>
                    <p className="text-xs text-slate-500 uppercase">{t.details.gearbox}</p>
                    <p className="font-bold text-slate-900">{car.transmission}</p>
                </div>
                 <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <Zap className="w-5 h-5 mx-auto mb-2 text-slate-400" />
                    <p className="text-xs text-slate-500 uppercase">{t.details.fuel}</p>
                    <p className="font-bold text-slate-900">{car.fuelType}</p>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{t.details.desc}</h3>
                <p className="text-slate-600 leading-relaxed">{car.description}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Seller & Actions */}
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-24">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <MapPin size={18} className="text-yellow-500" />
                    {car.location}
                </h3>
                
                <div className="flex items-center gap-3 mb-6 p-3 bg-slate-50 rounded-lg">
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-xl">🏢</div>
                    <div>
                        <p className="font-bold text-sm text-slate-900">{t.details.seller}</p>
                        <div className="flex text-yellow-400 text-xs">★★★★★ <span className="text-slate-400 ml-1">(124)</span></div>
                    </div>
                </div>

                <div className="space-y-3">
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-yellow-200">
                        <Phone size={18} />
                        {t.details.phone}
                    </button>
                    <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                        {t.details.email}
                    </button>
                </div>

                <div className="flex gap-3 mt-4">
                     <button className="flex-1 border border-slate-200 hover:bg-slate-50 py-2 rounded-lg flex items-center justify-center gap-2 text-slate-600 text-sm font-medium transition-colors">
                        <Heart size={16} /> {t.details.save}
                     </button>
                     <button className="flex-1 border border-slate-200 hover:bg-slate-50 py-2 rounded-lg flex items-center justify-center gap-2 text-slate-600 text-sm font-medium transition-colors">
                        <Share2 size={16} /> {t.details.share}
                     </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
