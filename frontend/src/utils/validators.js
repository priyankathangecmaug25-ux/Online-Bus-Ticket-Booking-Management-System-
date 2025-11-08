export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// Indian phone (10 digits) or general 7-15 digits:
export const phoneRegex = /^\d{10,15}$/;
// password: at least 6 characters, at least one letter and one number
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
