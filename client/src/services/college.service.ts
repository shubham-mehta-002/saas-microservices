import { axiosInstance } from "../lib";
import { ApiResponse , CollegeModelType} from "@project/shared";


export const getAllCollegesApi = async() => {
    const res = await axiosInstance.get<ApiResponse<CollegeModelType[]>>("/college/college")
    return res.data;
}

export const getAllActiveCollegesApi = async() => {
    const res = await axiosInstance.get<ApiResponse<CollegeModelType[]>>("/college/college/active")
    console.log({res})
    return res.data;
} 


