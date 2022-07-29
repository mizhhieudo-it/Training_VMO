import { config } from 'dotenv';

export const JWTCONFIG = {
    token_secret : process.env.TOKEN_SECRET,
    expiresIn : process.env.TOKEN_Expires_IN
}
export const NODE_ENV = process.env.NODE_ENV