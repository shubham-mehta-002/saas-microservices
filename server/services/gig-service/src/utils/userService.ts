import axios from "axios";
import { AuthenticationError, NotFoundError } from "@project/shared/server";
import { ApiResponse, UserModelType } from "@project/shared";

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:8000";


export const fetchUserById = async (userId: string): Promise<UserModelType> => {
    try {
        const response = await axios.get<ApiResponse<UserModelType>>(`${USER_SERVICE_URL}/user/${userId}`);

        const user = response.data.data;
        
        if (!user) {
            throw new NotFoundError(`User with id ${userId} not found `);
        }

        return user;
    } catch (err: any) {
        if (err.response?.status === 404) {
            throw new NotFoundError(`User with id ${userId} not found`);
        }
        throw new AuthenticationError("Failed to verify user with User Service");
    }
};
