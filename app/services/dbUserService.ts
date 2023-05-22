export const dbGetUserByEmail = (dbConn, email) => {
  return dbConn.query(
    `select * from _user where email='${email}'`
  );
}