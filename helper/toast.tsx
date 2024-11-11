import Toast from "react-native-toast-message";

export const toastSuccess = (message?: string | null) => {
  Toast.show({
    type: "success",
    text1: "Berhasil",
    text2: message || "",
    position: "bottom",
  });
};

export const toastError = (message?: string | null) => {
  Toast.show({
    type: "error",
    text1: "Terjadi kesalahan",
    text2: message || "Silahkan coba lagi",
    position: "bottom",
  });
};

export const toastFill = () =>
  Toast.show({
    type: "error",
    text1: "Lengkapi data",
    text2: "Isi semua kolom",
    position: "bottom",
  });

export const toastLoading = () => {
  Toast.show({
    type: "info",
    text1: "Loading..",
    text2: "Harap tunggu sebentar",
  });
};
