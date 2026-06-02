export type TrekState = "uttarakhand" | "himachal";
export type Difficulty =
  | "Easy"
  | "Moderate"
  | "Challenging"
  | "Difficult"
  | "Easy-Moderate"
  | "Moderate-Difficult"
  | "Very Difficult"
  | "Extreme";
export type BatchStatus = "Available" | "Filling Fast" | "Full";
export type GalleryCategory =
  | "Trail"
  | "Campsite"
  | "Sunrise/Sunset"
  | "Group"
  | "Wildlife"
  | "Snow";
export type MonthStatus = "best" | "possible" | "closed";
export type Season = "spring" | "summer" | "autumn" | "winter";
export type ExperienceCategory =
  | "camping"
  | "meadow"
  | "winter"
  | "river"
  | "temple"
  | "wildlife"
  | "yoga"
  | "photography"
  | "family"
  | "solo"
  | "festival"
  | "rafting";
export type YatraRegion = "uttarakhand" | "himachal";

export interface TrekBatch {
  id: string;
  startDate: string;
  endDate: string;
  seatsAvailable: number;
  totalSeats?: number;
  price: number;
  status: BatchStatus;
}

export interface TrekReview {
  id: string;
  name: string;
  location?: string;
  date: string;
  rating: number;
  text: string;
  review?: string;
  verified: boolean;
  helpfulVotes: number;
  avatar?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: GalleryCategory;
  caption: string;
}

export interface TrekHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  from?: string;
  to?: string;
  distance: string;
  altitude?: string;
  altitudeGain: string;
  walkingHours: string;
  terrain: string;
  campsite: string;
  meals: string;
  highlights: string[];
  description: string;
}

export interface GearList {
  clothing: string[];
  footwear: string[];
  backpack: string[];
  campingGear: string[];
  medicines: string[];
  documents: string[];
}

export interface MonthInfo {
  month: string;
  status: MonthStatus;
  reason: string;
}

export interface HowToReach {
  nearestAirport: string;
  airportDistance: string;
  nearestRailway: string;
  railwayDistance: string;
  roadRoute: string;
  googleMapsUrl: string;
  taxiOptions: string;
  localTransport: string;
}

export interface Waypoint {
  lat: number;
  lng: number;
  name: string;
  altitude: number;
  day: number;
  description: string;
}

export interface ElevationPoint {
  distance: number;
  altitude: number;
}

export interface MapData {
  centerLat: number;
  centerLng: number;
  zoom: number;
  waypoints: Waypoint[];
  elevationProfile: ElevationPoint[];
}

export interface TrekVideo {
  youtubeId: string;
  title: string;
}

export interface TrekFaq {
  question: string;
  answer: string;
}

export interface Trek {
  id: string;
  slug: string;
  name: string;
  state: TrekState;
  district: string;
  altitude: number;
  difficulty: Difficulty;
  duration: string;
  price: number;
  startPoint: string;
  endPoint: string;
  rating: number;
  groupSize: string;
  bestSeason: string;
  heroImage: string;
  tagline?: string;
  region?: string;
  nearestCity?: string;
  nearestAirport?: string;
  nearestRailway?: string;
  aboutTrek: string;
  highlights: TrekHighlight[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  gearList: GearList;
  bestTimeMonths: MonthInfo[];
  howToReach: HowToReach;
  batches: TrekBatch[];
  gallery: GalleryImage[];
  videos: TrekVideo[];
  reviews: TrekReview[];
  faqs: TrekFaq[];
  tags: string[];
  mapData: MapData;
  relatedTrekSlugs: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Yatra {
  id: string;
  slug: string;
  name: string;
  state: TrekState;
  district: string;
  altitude: number;
  difficulty: Difficulty;
  duration: string;
  price: number;
  startPoint: string;
  endPoint: string;
  rating: number;
  groupSize: string;
  bestSeason: string;
  heroImage: string;
  tagline?: string;
  region?: YatraRegion;
  deity?: string;
  stops?: string[];
  openingDate?: string;
  closingDate?: string;
  helicopterAvailable?: boolean;
  aboutYatra: string;
  religiousSignificance: string;
  highlights: TrekHighlight[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  gearList: GearList;
  bestTimeMonths: MonthInfo[];
  howToReach: HowToReach;
  batches: TrekBatch[];
  gallery: GalleryImage[];
  videos: TrekVideo[];
  reviews: TrekReview[];
  faqs: TrekFaq[];
  tags: string[];
  mapData: MapData;
  relatedYatraSlugs: string[];
  templeOpeningDates?: { year: number; opening: string; closing: string }[];
  registrationInfo?: string;
  vvipDarshanInfo?: string;
  dharamshalasInfo?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: "trek-guide" | "yatra" | "gear" | "safety" | "seasonal";
  excerpt: string;
  content: string;
  heroImage: string;
  author: { name: string; title: string; avatar: string };
  readTime: string;
  publishedDate: string;
  tags: string[];
  relatedSlugs?: string[];
}

export interface Destination {
  id: string;
  name: string;
  state: TrekState;
  district?: string;
  region: string;
  image: string;
  tagline: string;
  description: string;
  tags: string[];
  trekCount: number;
  yatraCount: number;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  trekName: string;
  trekSlug: string;
  verified: boolean;
  avatar: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  category: ExperienceCategory;
  link: string;
}
