import loginAuthMW  from "../middleware/auth/loginAuth";
import refreshJwtTokenMW from '../middleware/auth/refresJwtToken';
import requireAdminMW from "../middleware/auth/requireAdmin";
import validateJwtTokenMW from '../middleware/auth/validateJwtToken';
import someHandlerMW from "../middleware/test/testHandler";
import createUserMW from "../middleware/user/createUser";
import getUsersMW from "../middleware/user/getUsers";


export const midW = {
    authLoginAuth:loginAuthMW,
    authRefreshJwtToken:refreshJwtTokenMW,
    authRequireAdmin:requireAdminMW,
    authValidateJwtToken:validateJwtTokenMW,
    testSomeHandler:someHandlerMW,
    userCreateUser:createUserMW,
    userGetUsers:getUsersMW
};