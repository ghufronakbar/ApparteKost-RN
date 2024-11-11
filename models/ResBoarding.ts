import { ResProfile } from "./ResAccount";

export interface ResBoarding {
  all: ResBoardingDetail[];
  bookmarked: ResBoardingDetail[];
}

export interface ResBoardingDetail {
  boardingHouseId: number;
  name: string;
  owner: string;
  ownerPicture: string | null;
  email: string;
  phone: string;
  password: string;
  description: string;
  district: string;
  subdistrict: string;
  location: string;
  panoramaPicture: string | null;
  maxCapacity: number;
  price: number;
  isPending: boolean;
  isConfirmed: boolean;
  isActive: boolean;
  _count: Count;
  pictures: Picture[];
  reviews: Review[];
  averageRating: number;
  urlGoogleMap: string;
  isBookmarked: boolean;
  booking: Booking | null;
  review: Review | null;
  bookings: Booking[];
}

export interface Booking {
  bookingId: number;
  userId: number;
  boardingHouseId: number;
  bookedDate: string;
  isActive: boolean;
}

export interface Count {
  bookings: number;
  pictures: number;
  reviews: number;
  bookmarks: number;
}

export interface Picture {
  picture: string;
}

export interface Review {
  reviewId: number;
  name: string;
  picture: string | null;
  rating: number;
  user: ResProfile;
}

export interface ResKeyLocation {
  district: string[];
  subdistrict: string[];
  all: string[];
}
