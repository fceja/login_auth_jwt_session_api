import refreshJwtToken from './auth/refresJwtToken';
import validateJwtToken from './auth/validateJwtToken';
import { loginAuth } from "../middleware/auth/loginAuth";

import { createUser } from "../middleware/user/createUser";
import { getUsers } from "../middleware/user/getUsers";

export const midWare = {
    authRefreshJwtToken:refreshJwtToken,
    authValidateJwtToken:validateJwtToken,
    authLoginAuth:loginAuth,
    userCreateUser:createUser,
    userGetUsers:getUsers
};