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
  urlWhatsapp: string;
  isBookmarked: boolean;
  isBooked: boolean;
  isReviewed: boolean;
  booking: Booking | null;
  review: Review | null;
  bookings: Booking[];
  availableRoom: number;
}

export const initResboardingDetail: ResBoardingDetail = {
  boardingHouseId: 0,
  name: "Loading...",
  owner: "Loading...",
  ownerPicture: null,
  email: "Loading...",
  phone: "Loading...",
  password: "Loading...",
  description: "Loading...",
  district: "Loading...",
  subdistrict: "Loading...",
  location: "Loading...",
  panoramaPicture: null,
  maxCapacity: 0,
  price: 0,
  isPending: false,
  isConfirmed: false,
  isActive: false,
  _count: {
    bookings: 0,
    pictures: 0,
    reviews: 0,
    bookmarks: 0,
  },
  pictures: [],
  reviews: [],
  averageRating: 0,
  urlGoogleMap: "Loading...",
  urlWhatsapp: "Loading...",
  isBookmarked: false,
  isBooked: false,
  isReviewed: false,
  booking: null,
  review: null,
  bookings: [],
  availableRoom: 0,
};

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
  userId: number;
  boardingHouseId: number;
  name: string;
  rating: number;
  user: ResProfile;
  comment: string | null;
  createdAt: string;
}

export interface ResKeyLocation {
  district: string[];
  subdistrict: string[];
  all: string[];
}
