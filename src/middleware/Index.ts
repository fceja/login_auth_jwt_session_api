import loginAuthMW from "./auth/LoginAuth";
import refreshJwtTokenMW from "./auth/RefresJwtToken";
import requireAdminMW from "./auth/RequireAdmin";
import validateJwtTokenMW from "./auth/ValidateJwtToken";
import someHandlerMW from "./test/TestHandler";
import createUserMW from "./user/CreateUser";
import getUserMW from "./user/GetUser";
import getUsersMW from "./user/GetUsers";

export const midW = {
  authLoginAuth: loginAuthMW,
  authRefreshJwtToken: refreshJwtTokenMW,
  authRequireAdmin: requireAdminMW,
  authValidateJwtToken: validateJwtTokenMW,
  testSomeHandler: someHandlerMW,
  userCreateUser: createUserMW,
  userGetUser: getUserMW,
  userGetUsers: getUsersMW,
};
