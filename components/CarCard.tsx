import React, { useState } from 'react';
import { Car, FuelType } from '../types';
import { MapPin, Gauge, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onClick: (car: Car) => void;
  t: any;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onClick, t }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = car.imageUrls && car.imageUrls.length > 0 ? car.imageUrls : [car.imageUrl];
  const hasMultipleImages = images.length > 1;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  }

  return (
    <div 
      onClick={() => onClick(car)}
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-yellow-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={images[currentImageIndex]} 
          alt={`${car.make} ${car.model}`} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Carousel Controls */}
        {hasMultipleImages && (
          <>
            <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <button 
                onClick={prevImage}
                className="p-1 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextImage}
                className="p-1 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            {/* Dots */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 px-4 z-20">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => selectImage(e, idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold shadow-sm z-10">
           {car.year}
        </div>
        {car.fuelType === FuelType.ELECTRIC && (
           <div className="absolute bottom-3 left-3 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1 z-10">
              <Zap size={12} fill="currentColor" /> Electric
           </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
           <h3 className="text-lg font-bold text-slate-900 truncate group-hover:text-blue-700 transition-colors">
             {car.make} {car.model}
           </h3>
           <p className="text-slate-500 text-sm">{car.type}</p>
        </div>

        {/* Key Specs */}
        <div className="flex items-center gap-4 text-xs text-slate-600 mb-4">
          <div className="flex items-center gap-1">
             <Gauge size={14} />
             {car.mileage.toLocaleString()} {t.card.km}
          </div>
          <div className="flex items-center gap-1">
             <div className="w-3 h-3 rounded-full border border-slate-400 flex items-center justify-center text-[8px]">T</div>
             {car.transmission}
          </div>
          <div className="flex items-center gap-1">
             <span className="font-semibold">{car.power}</span> {t.card.hp}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between">
           <div>
              <p className="text-xs text-slate-400 mb-1">{t.card.price}</p>
              <p className="text-xl font-bold text-slate-900">€{car.price.toLocaleString()}</p>
           </div>
           <div className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin size={12} />
              {car.location.split(',')[0]}
           </div>
        </div>
      </div>
    </div>
  );
};