'use client'

import axios from "axios"

const axiosInstance  = axios.create({
    baseURL : process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials : true,
    headers : {
        "Content-type" : "application/json"
    }
});


// axiosInstance.interceptors.request.use


export {axiosInstance};