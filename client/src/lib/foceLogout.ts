import { axiosInstance } from "./axios/axiosInstance";
import { errorToast } from "./toast/toast";

export const forceLogout = async () => {
    try {
        await axiosInstance.post("/user/logout");
    } catch {
    // ignore logout failure
    } finally {
        errorToast("Session expired. Please login again.");

    // Safe redirect
    window.location.href = "/login";
    }
};
