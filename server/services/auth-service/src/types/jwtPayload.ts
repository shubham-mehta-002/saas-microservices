import { userRoles } from "../config/constants.js"

export type JwtPayload = {
    user_id : string,
    role : typeof userRoles[number]
} 