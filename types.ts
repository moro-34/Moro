export enum CarType {
  SUV = 'SUV',
  SEDAN = 'Sedan',
  COUPE = 'Coupe',
  HATCHBACK = 'Hatchback',
  CONVERTIBLE = 'Convertible',
  ELECTRIC = 'Electric',
}

export enum FuelType {
  PETROL = 'Petrol',
  DIESEL = 'Diesel',
  HYBRID = 'Hybrid',
  ELECTRIC = 'Electric',
}

export enum Transmission {
  AUTOMATIC = 'Automatic',
  MANUAL = 'Manual',
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  type: CarType;
  power: number; // hp
  description: string;
  imageUrl: string;
  imageUrls?: string[];
  location: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type Language = 'en' | 'fr' | 'ar';
