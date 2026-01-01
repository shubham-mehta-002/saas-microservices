import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials : true,
    headers: {
        "Content-Type": "application/json",
    },
});


// response interceptor - call to refresh token in case of expired access token
axiosInstance.interceptors.response.use((request) => request ,
    async(error) => {
        // handle only axiosError
        if (!error?.response) {
            return Promise.reject(error);
        }
        const originalRequest = error.config as any;
        
        // if not a unauthorized 404 error
        if(error.response?.status != 401){
            return Promise.reject(error);
        }
        if (originalRequest.url?.includes("/auth/refresh")) {
            return Promise.reject(error);
        }
        // in case already retried the call -> logout directly
        if(originalRequest._retry){
            // handlLogout()
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try{
            await axiosInstance.post('/auth/refresh');
            
            // retry the orginal api call
            return axiosInstance(originalRequest);
        }catch{
            // refresh token expired / missing
            // handlLogout()
            return Promise.reject(error);
        }
    }
) 

