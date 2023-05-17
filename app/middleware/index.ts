import validateJwtToken from './auth/validateJwtToken';
import refreshJwtToken from './auth/refresJwtToken';

export const midWare = {
    validateJwtToken:validateJwtToken,
    refreshJwtToken:refreshJwtToken
};