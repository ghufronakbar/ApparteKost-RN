import axiosInstance from "@/config/axiosInstance";
import { toastError, toastLoading, toastSuccess } from "@/helper/toast";
import { ResFail, ResSuccess } from "@/models/ApiRes";
import {
  ResBoarding,
  ResBoardingDetail,
  ResKeyLocation,
} from "@/models/ResBoarding";

export const getAllBoardings = async () => {
  try {
    const { data } = await axiosInstance.get<ResSuccess<ResBoarding>>(
      "/boardings"
    );
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResFail;
    toastError(err.response?.data.message);
  }
};

export const getBoardingDetail = async (id: string) => {
  try {
    const { data } = await axiosInstance.get<ResSuccess<ResBoardingDetail>>(
      `/boardings/${id}`
    );
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResFail;
    toastError(err.response?.data.message);
  }
};

export const bookingBoarding = async (
  id: string,
  loading: boolean,
  setLoading: (loading: boolean) => void,
  afterSuccess?: () => void
) => {
  try {
    if (loading) return;
    toastLoading();
    setLoading(true);
    const { data } = await axiosInstance.post<ResSuccess<ResBoardingDetail>>(
      `/boardings`,
      {
        boardingHouseId: id,
      }
    );
    afterSuccess?.();
    toastSuccess(data.message);
  } catch (error) {
    console.log(error);
    const err = error as ResFail;
    toastError(err.response?.data.message);
  } finally {
    setLoading(false);
  }
};

export const bookmarkBoarding = async (
  id: string,
  loading: boolean,
  setLoading: (loading: boolean) => void,
  afterSuccess?: () => void
) => {
  try {
    if (loading) return;
    toastLoading();
    setLoading(true);
    const { data } = await axiosInstance.put<ResSuccess<ResBoardingDetail>>(
      `/boardings`,
      {
        boardingHouseId: id,
      }
    );
    afterSuccess?.();
    toastSuccess(data.message);
  } catch (error) {
    console.log(error);
    const err = error as ResFail;
    toastError(err.response?.data.message);
  } finally {
    setLoading(false);
  }
};

interface FormReviewBoarding {
  boardingHouseId: number;
  rating: number;
  review: string | null;
}

export const initFormReviewBoarding: FormReviewBoarding = {
  boardingHouseId: 0,
  rating: 0,
  review: null,
};

export const reviewBoarding = async (
  form: FormReviewBoarding,
  loading: boolean,
  setLoading: (loading: boolean) => void,
  afterSuccess?: () => void
) => {
  try {
    if (loading) return;
    toastLoading();
    setLoading(true);
    const { data } = await axiosInstance.patch<ResSuccess<ResBoardingDetail>>(
      `/boardings`,
      form
    );
    afterSuccess?.();
    toastSuccess(data.message);
  } catch (error) {
    console.log(error);
    const err = error as ResFail;
    toastError(err.response?.data.message);
  } finally {
    setLoading(false);
  }
};

export const getKeyLocation = async () => {
  try {
    const { data } = await axiosInstance.get<ResSuccess<ResKeyLocation>>(
      "/boardings/key-location"
    );
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResFail;
    toastError(err.response?.data.message);
  }
};
