import dotenv from 'dotenv';

dotenv.config()

export const authConfig = { secret:process.env.AUTH_SECRET }