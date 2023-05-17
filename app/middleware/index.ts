import authMidWare  from './authJwt';

export const authJwt = {
    validateToken:authMidWare.validateToken
};