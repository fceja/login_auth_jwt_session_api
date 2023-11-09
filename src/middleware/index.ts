import loginAuthMW from "./auth/LoginAuthMW";
import refreshJwtTokenMW from "./auth/RefresJwtTokenMW";
import requireAdminMW from "./auth/RequireAdminMW";
import validateJwtTokenMW from "./auth/ValidateJwtTokenMW";
import someHandlerMW from "./test/TestHandlerMW";
import createUserMW from "./user/CreateUserMW";
import getUserMW from "./user/GetUserMW";
import getUsersMW from "./user/GetUsersMW";

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
