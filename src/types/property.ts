export type PropertyType = 'condo' | 'detached' | 'townhouse' | 'semi-detached' | 'penthouse';
export type ListingStatus = 'for-sale' | 'for-rent';

export interface Agent {
  name: string;
  title: string;
  brokerage: string;
  recipientEmail: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  propertiesListed: number;
}

export interface NearbyAmenity {
  name: string;
  distance: string;
  category: 'School' | 'Hospital' | 'Shopping' | 'Transit' | 'Park' | 'Airport';
}

export interface Property {
  id: string;
  mlsNumber: string; // e.g. MLS® #: C1049281
  title: string;
  tagline: string;
  priceCad: number;
  priceUsd: number;
  status: ListingStatus;
  type: PropertyType;
  featured: boolean;
  isNew?: boolean;
  daysOnMarket: number;
  location: {
    address: string;
    unitNumber?: string;
    city: string;
    province: string;
    postalCode: string;
    neighborhood: string;
  };
  specs: {
    bedrooms: number;
    bedroomsPlus?: number; // e.g. 2 + 1
    bathrooms: number;
    areaSqft: number;
    parkingSpaces: number;
    buildingType: string; // e.g. "Apartment", "Detached House", "Row / Townhouse"
    ownershipType: 'Freehold' | 'Condominium';
    yearBuilt?: number;
    propertyTaxesAnnual?: number;
    maintenanceFeesMonthly?: number;
    heatingType?: string;
    coolingType?: string;
  };
  amenities: string[];
  nearby: NearbyAmenity[];
  description: string;
  highlights: string[];
  images: string[];
  agent: Agent;
  realtorCaUrl?: string;
  isCemarListing?: boolean;
}

export type Currency = 'CAD' | 'USD';

export interface FilterState {
  searchQuery: string;
  status: 'all' | ListingStatus;
  type: 'all' | PropertyType;
  city: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'any';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'area-desc';
}
