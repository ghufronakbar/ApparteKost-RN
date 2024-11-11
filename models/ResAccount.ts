export type Role = "ADMIN" | "USER" | "BOARDING_HOUSE";
export type History = "REVIEW" | "BOOKING";

export interface ResProfile {
  userId: number;
  email: string;
  name: string;
  phone: string;
  password: string;
  picture: string | null;
}

export const initProfile: ResProfile = {
  userId: 0,
  email: "Loading...",
  name: "Loading...",
  phone: "Loading...",
  password: "",
  picture: null,
};

export interface ResLogin {
  accessToken: string;
  role: Role;
}

export interface ResRegister extends ResProfile {
  accessToken: string;
  role: Role;
}

export interface ResHistory {
  type: History;
  boardingHouseId: number;
  message: string;
  district: string;
  subdistrict: string;
  time: string;
  picture: string | null;
  timeRelative: string;
}
