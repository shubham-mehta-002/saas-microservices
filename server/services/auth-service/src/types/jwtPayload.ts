import { userRolesType } from "@project/shared"

export type JwtPayload = {
    user_id : string,
    role : userRolesType
} 