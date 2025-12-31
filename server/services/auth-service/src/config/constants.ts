// export {OTP_LENGTH,OTP_EXPIRY_TIME} from "@project/shared"

export const PASSWORD_RESET_TOKEN_EXPIRY = 5 * 60 * 1000; // 5 minutes 
export const userRoles = ['user','freelancer','admin'] as const;
export const authProviders = ['local', 'google', 'github'] as const;
