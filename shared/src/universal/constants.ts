export const OTP_LENGTH = 6;
export const OTP_EXPIRY_TIME = 300; // in seconds
export const RESEND_OTP_COOLDOWN = 30; 

export const userRoles = ['user','freelancer','admin'] as const;
export const authProviders = ['local', 'google', 'github'] as const;
export const freelancerAvailablity = ['Full time', 'Part time' , 'Specific Projects only'] as const;