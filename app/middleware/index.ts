import refreshJwtToken from './auth/refresJwtToken';
import validateJwtToken from './auth/validateJwtToken';
import { loginAuthMid } from "../middleware/auth/loginAuth";
import { someHandler } from "../middleware/test/testHandler";
import { createUserMidW } from "../middleware/user/createUser";
import { getUsersMidW } from "../middleware/user/getUsers";


export const midWare = {
    authRefreshJwtToken:refreshJwtToken,
    authValidateJwtToken:validateJwtToken,
    authLoginAuth:loginAuthMid,
    testSomeHandler:someHandler,
    userCreateUser:createUserMidW,
    userGetUsers:getUsersMidW
};