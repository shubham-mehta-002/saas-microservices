'use client'

import axios from "axios"

const axiosClient  = axios.create({
    baseURL : process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials : true,
    headers : {
        "Content-type" : "application/json"
    }
});


// axiosClient.interceptors.request.use


export {axiosClient};