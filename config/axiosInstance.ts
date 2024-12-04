import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN } from "@/constants/AsyncStorage";

const CACHE_TTL = 12 * 60 * 60 * 1000; // TTL untuk cache, misalnya 4 jam

// Buat instance axios
const axiosInstance = axios.create({
  baseURL: "https://api-appartekost.vercel.app/api/mobile",
});

// Fungsi untuk membuat cache key berdasarkan URL dan params, mengabaikan parameter `cache`
const createCacheKey = (url: string, params: any): string => {
  // Buat salinan params untuk menghindari mutasi asli
  const paramsCopy = { ...params };
  delete paramsCopy.cache; // Hapus parameter `cache` dari key cache

  const paramsString = Object.keys(paramsCopy).length
    ? JSON.stringify(paramsCopy)
    : ""; // Normalisasi params kosong
  return `${url}_${paramsString}`;
};

// Menyimpan response di AsyncStorage dengan TTL
const setCache = async (key: string, data: any) => {
  try {
    const item = {
      data,
      expiry: Date.now() + CACHE_TTL,
    };
    // console.log(`Setting cache for key: ${key} with expiry: ${item.expiry}`);
    await AsyncStorage.setItem(key, JSON.stringify(item));
    // console.log(`Cache set successfully for key: ${key}`);
  } catch (error) {
    console.error(`Failed to set cache for key: ${key}`, error);
  }
};

// Mengambil response dari AsyncStorage jika belum kadaluarsa
const getCache = async (key: string) => {
  try {
    const cachedItem = await AsyncStorage.getItem(key);
    if (!cachedItem) {
      // console.log(`Cache miss for key: ${key}`);
      return null;
    }

    const item = JSON.parse(cachedItem);
    if (Date.now() > item.expiry) {
      // console.log(`Cache expired for key: ${key}`);
      await AsyncStorage.removeItem(key); // Hapus cache jika sudah kadaluarsa
      return null;
    }

    // console.log(`Cache hit for key: ${key}`);
    return item.data;
  } catch (error) {
    console.error(`Error reading cache for key: ${key}`, error);
    return null;
  }
};

// Membersihkan semua cache yang terkait dengan URL jika metode bukan GET
const clearCacheForPrefix = async (prefix: string) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const keysToDelete = keys.filter((key) =>
      key.startsWith(prefix.slice(0, 11))
    );
    if (keysToDelete.length > 0) {
      await AsyncStorage.multiRemove(keysToDelete);
      // console.log(`Cleared cache for prefix: ${prefix.slice(0, 11)}`);
    } else {
      // console.log(`No cache found for prefix: ${prefix.slice(0, 11)}`);
    }
  } catch (error) {
    console.error(
      `Error clearing cache for prefix: ${prefix.slice(0, 11)}`,
      error
    );
  }
};

// Interceptor untuk menambahkan token Authorization dan menggunakan cache
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // console.log(config.baseURL)

    // Periksa apakah `cache=true` dikirimkan di params dan bersihkan cache jika ditemukan
    if (config.params && config.params.cache === true && config.url) {
      // console.log(`Parameter cache=true detected, clearing cache for URL: ${config.url}`);
      await clearCacheForPrefix(config.url);
      delete config.params.cache; // Hapus parameter `cache` agar tidak mempengaruhi key cache
    } else {
      // console.log(`Parameter cache not present or set to false for URL: ${config.url}`);
    }

    // Check cache hanya untuk GET requests
    if (config.method === "get" && config.url) {
      const key = createCacheKey(config.url, config.params);
      const cachedResponse = await getCache(key);

      if (cachedResponse) {
        // console.log(`Returning cached response directly for URL: ${config.url}`);
        // Langsung kembalikan respons dari cache tanpa mengirim request ke server
        return Promise.reject({
          isCached: true,
          data: cachedResponse,
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        });
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor response untuk mengelola cache
axiosInstance.interceptors.response.use(
  async (response) => {
    const { method, url, params } = response.config;

    // console.log("Response received", { url, method });

    if (method === "get" && url) {
      const key = createCacheKey(url, params);
      // console.log(`Saving response to cache for URL: ${url}`);
      if (response.status <= 399) {
        await setCache(key, response.data); // Simpan ke cache
      }
    } else if (url) {
      await clearCacheForPrefix(url); // Hapus cache untuk metode selain GET
    }

    return response;
  },
  async (error) => {
    if (error.isCached) {
      // console.log("Returning cached response from error handler");
      return Promise.resolve({
        data: error.data,
        status: error.status,
        statusText: error.statusText,
        headers: error.headers,
        config: error.config,
      });
    }

    console.error("Network or Response Error:", error.message || error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
