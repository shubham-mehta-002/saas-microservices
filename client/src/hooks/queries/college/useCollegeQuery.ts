import { getAllActiveColleges, getAllColleges } from "@/src/services/college.service";
import { useQuery } from "@tanstack/react-query";
import {COLLEGE_KEYS} from "../../contants";
import { ApiResponse, CollegeModelType } from "@project/shared";

export const useCollegesQuery = () => {
    return useQuery<
        ApiResponse<CollegeModelType[]>,
        Error,
        CollegeModelType[]
    >({
        queryKey : COLLEGE_KEYS.allColleges, 
        queryFn : getAllColleges,
    })
}


export const useActiveCollegesQuery = () => {
    return useQuery<
        ApiResponse<CollegeModelType[]>,
        Error
    >({
        queryKey : COLLEGE_KEYS.allColleges, 
        queryFn : getAllActiveColleges,
    })
}

