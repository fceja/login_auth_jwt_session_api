import loginAuthMW  from "../middleware/auth/loginAuth";
import refreshJwtTokenMW from '../middleware/auth/refresJwtToken';
import validateJwtTokenMW from '../middleware/auth/validateJwtToken';
import someHandlerMW from "../middleware/test/testHandler";
import createUserMW from "../middleware/user/createUser";
import getUsersMW from "../middleware/user/getUsers";


export const midWare = {
    authRefreshJwtToken:refreshJwtTokenMW,
    authValidateJwtToken:validateJwtTokenMW,
    authLoginAuth:loginAuthMW,
    testSomeHandler:someHandlerMW,
    userCreateUser:createUserMW,
    userGetUsers:getUsersMW
};