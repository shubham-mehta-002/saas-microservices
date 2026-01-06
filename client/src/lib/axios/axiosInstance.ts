import axios  from "axios";
import { forceLogout } from "../foceLogout";

function isAxiosError(error: unknown): error is any {
    return (
        typeof error === "object" &&
        error !== null &&
        (error as any).isAxiosError === true
    );
}


export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials : true,
    headers: {
        "Content-Type": "application/json",
    },
});
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
    // Not an axios error → just throw
    if (
        typeof error !== "object" ||
        error === null ||
        !(error as any).isAxiosError
    ) {
        return Promise.reject(error);
    }

    const axiosError = error as any;
    const originalRequest = axiosError.config;

    // No response → network error
    if (!axiosError.response) {
        return Promise.reject(axiosError);
    }

    // Not unauthorized
    if (axiosError.response.status !== 401) {
        return Promise.reject(axiosError);
    }

    // Already retried
    if (originalRequest._retry) {
        return Promise.reject(axiosError);
    }

    // Prevent refresh loop
    if (originalRequest.url?.includes("/auth/refresh")) {
        return Promise.reject(axiosError);
    }

    originalRequest._retry = true;

    try {
        // refresh token
        await axiosInstance.post("/auth/refresh");

        // retry original request
        return axiosInstance(originalRequest);
    } catch {
        // refresh failed → logout
        forceLogout()
        return Promise.reject(axiosError);
    }
  }
);