import loginAuthMW  from "../middleware/auth/loginAuth";
import refreshJwtTokenMW from '../middleware/auth/refresJwtToken';
import requireAdminMW from "../middleware/auth/requireAdmin";
import validateJwtTokenMW from '../middleware/auth/validateJwtToken';
import someHandlerMW from "../middleware/test/testHandler";
import createUserMW from "../middleware/user/createUser";
import getUserMW from "../middleware/user/getUser";
import getUsersMW from "../middleware/user/getUsers";


export const midW = {
    authLoginAuth:loginAuthMW,
    authRefreshJwtToken:refreshJwtTokenMW,
    authRequireAdmin:requireAdminMW,
    authValidateJwtToken:validateJwtTokenMW,
    testSomeHandler:someHandlerMW,
    userCreateUser:createUserMW,
    userGetUser:getUserMW,
    userGetUsers:getUsersMW
};