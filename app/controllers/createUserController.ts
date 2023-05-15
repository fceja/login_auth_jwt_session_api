import dbPool from "../utils/dbInit";

export default async function createUserController(user) {
  try {
    // init db connection
    const dbConn = await dbPool.connect();

    // query db
    const query = await dbConn.query(
      ` insert into "Users" (email, password, "createdAt", "lastUpdated")
        values ($1, $2, $3, $4)
        on conflict (email) do nothing
        returning id, email, "createdAt", "lastUpdated"
      `,
      [user.email, user.password, user.createdAt, user.lastUpdated]
    );

    // end db connection
    dbConn.end();

    // return
    if (query.rowCount === 0) {
      // user not created, exists already
      return null;
    } else {
      // user created
      return query.rows;
    }
  } catch (err) {
    // error
    console.error(`Error: ${err}`);
  }
}
