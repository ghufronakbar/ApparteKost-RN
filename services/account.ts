import axiosInstance from "@/config/axiosInstance";
import { ACCESS_TOKEN, USER } from "@/constants/AsyncStorage";
import {
  toastError,
  toastFill,
  toastLoading,
  toastSuccess,
} from "@/helper/toast";
import { ResFail, ResSuccess } from "@/models/ApiRes";
import {
  ResHistory,
  ResLogin,
  ResProfile,
  ResRegister,
} from "@/models/ResAccount";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export interface FormLogin {
  email: string;
  password: string;
}

export const initFormLogin: FormLogin = {
  email: "",
  password: "",
};

export const login = async (
  form: FormLogin,
  loading: boolean,
  setLoading: (loading: boolean) => void
) => {
  try {
    if (loading) return;
    if (!form.email || !form.password) {
      toastFill();
      return;
    }
    toastLoading();
    setLoading(true);
    const { data } = await axiosInstance.post<ResSuccess<ResLogin>>(
      "/account/login",
      form
    );
    await AsyncStorage.setItem(ACCESS_TOKEN, data.data.accessToken);
    toastSuccess(data.message);
    router.replace("/(home)");
  } catch (error) {
    console.log(error);
    const err = error as ResFail;
    toastError(err.response?.data.message);
  } finally {
    setLoading(false);
  }
};

export interface FormRegister {
  email: string;
  password: string;
  phone: string;
  name: string;
}

export const initFormRegister: FormRegister = {
  email: "",
  password: "",
  phone: "",
  name: "",
};

export const register = async (
  form: FormRegister,
  loading: boolean,
  setLoading: (loading: boolean) => void
) => {
  try {
    if (loading) return;
    if (!form.email || !form.password || !form.phone || !form.name) {
      toastFill();
      return;
    }
    toastLoading();
    setLoading(true);
    const { data } = await axiosInstance.post<ResSuccess<ResRegister>>(
      "/account/register",
      form
    );
    const promises = [
      AsyncStorage.setItem(ACCESS_TOKEN, data.data.accessToken),
      AsyncStorage.setItem(USER, JSON.stringify(data.data)),
    ];
    await Promise.all(promises);
    toastSuccess(data.message);
    router.replace("/(home)");
  } catch (error) {
    console.log(error);
    const err = error as ResFail;
    toastError(err.response?.data.message);
  } finally {
    setLoading(false);
  }
};

export const checkAuth = async () => {
  try {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    if (token) {
      router.replace("/(home)");
    } else {
      router.replace("/login");
    }
  } catch (error) {
    console.log(error);
    router.replace("/login");
  }
};

export interface FormProfile {
  email: string;
  name: string;
  phone: string;
}

export const initFormProfile: FormProfile = {
  email: "",
  name: "",
  phone: "",
};

export const updateProfile = async (
  form: FormProfile,
  loading: boolean,
  setLoading: (loading: boolean) => void
) => {
  try {
    if (loading) return;
    if (!form.email || !form.name || !form.phone) {
      toastFill();
      return;
    }
    toastLoading();
    setLoading(true);
    const { data } = await axiosInstance.put<ResSuccess<ResProfile>>(
      "/account",
      form
    );
    await AsyncStorage.setItem(USER, JSON.stringify(data.data));
    toastSuccess(data.message);
  } catch (error) {
    console.log(error);
    const err = error as ResFail;
    toastError(err.response?.data.message);
  } finally {
    setLoading(false);
  }
};

export const getProfile = async () => {
  try {
    const { data } = await axiosInstance.get<ResSuccess<ResProfile>>(
      "/account"
    );
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResFail;
    toastError(err.response?.data.message);
  }
};

export const getSavedProfile = async () => {
  try {
    const data = await AsyncStorage.getItem(USER);
    if (!data) {
      const profile = await getProfile();
      await AsyncStorage.setItem(USER, JSON.stringify(profile));
      return profile;
    } else {
      const profile: ResProfile = JSON.parse(data);
      return profile;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProfilePicture = async () => {
  try {
    const { data } = await axiosInstance.delete<ResSuccess<ResProfile>>(
      "/account"
    );
    toastSuccess(data.message);
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResFail;
    toastError(err.response?.data.message);
  }
};

export interface FormChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const initFormChangePassword: FormChangePassword = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const changePassword = async (
  form: FormChangePassword,
  setForm: (form: FormChangePassword) => void,
  loading: boolean,
  setLoading: (loading: boolean) => void
) => {
  if (loading) return;
  console.log({ form });
  if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
    toastFill();
    return;
  }
  if (form.newPassword !== form.confirmPassword) {
    toastError("Password tidak sama");
    return;
  }
  toastLoading();
  setLoading(true);
  try {
    const { data } = await axiosInstance.put<ResSuccess<ResProfile>>(
      "/account/change-password",
      form
    );
    toastSuccess(data.message);
  } catch (error) {
    console.log(error);
    const err = error as ResFail;
    toastError(err.response?.data.message);
  } finally {
    setLoading(false);
    setForm(initFormChangePassword);
  }
};

export const getAllHistories = async (cache = false) => {
  try {
    const { data } = await axiosInstance.get<ResSuccess<ResHistory[]>>(
      "/account/history",
      {
        params: {
          cache,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
    const err = error as ResFail;
    toastError(err.response?.data.message);
  }
};

export const logout = () => {
  toastSuccess("Berhasil keluar");
  AsyncStorage.clear();
  router.replace("/login");
};

export const uploadProfilePicture = async (
  picture: ImagePicker.ImagePickerAsset,
  loading: boolean,
  setLoading: (loading: boolean) => void,
  afterUpload?: () => void
) => {
  try {
    if (loading) return;
    toastLoading();
    setLoading(true);
    const formData = new FormData();
    formData.append("picture", {
      name: picture?.fileName || "picture.jpg",
      type: "image/jpg",
      uri: picture.uri,
    } as any);
    const { data } = await axiosInstance.patch<ResSuccess<ResProfile>>(
      "/account",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    await AsyncStorage.setItem(USER, JSON.stringify(data.data));
    toastSuccess(data.message);
    afterUpload?.();
    return data.data;
  } catch (error) {
    console.error(error);
    const err = error as ResFail;
    toastError(err.response?.data.message);
  } finally {
    setLoading(false);
  }
};
