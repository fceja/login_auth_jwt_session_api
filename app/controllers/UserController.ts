import bcrypt from "bcrypt";

import dbPool from "../utils/dbInit";


export const createUser = async (userData) => {
  // init db connection
  const dbConn = await dbPool.connect();

  // check if user already exists
  const user = (await dbGetUserByEmail(dbConn, userData.email)).rows[0];
  if (user) {
    dbConn.end();

    return false;
  }

  // create account in db
  try {
    // create user
    const user = (await dbCreateUser(dbConn, userData)).rows[0];

    // add role to user
    async () => {await dbAddUserRole(dbConn, user.id, userData.role);}

    // terminate db connection
    dbConn.end();

    return user;

  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const dbAddUserRole = (dbConn, userId, role) => {
  dbConn.query(
    `
    insert into _user_role (user_id, role)
    values (
      ${userId},
      '${role}'
    )
    on conflict (user_id) do update
    set role = excluded.role
    `
  );
}

const dbCreateUser = (dbConn, userData) => {
  return dbConn.query(
    `
    insert into _user (email, password, created_at, last_updated)
    values ($1, $2, $3, $4)
    on conflict (email) do nothing
    returning user_id, email, created_at, last_updated
    `,
    [
      userData.email,
      bcrypt.hashSync(userData.password, 10),
      userData.createdAt,
      userData.lastUpdated,
    ]
  );
}

const dbGetUserByEmail = (dbConn, email) => {
  return dbConn.query(
    `
    select *
    from _user t1
    left join _user_role t2 on t1.user_id = t2.user_id
    where t1.email='${email}'
    `
    );
  }

export const getUser = async (userId) => {
  // init db connection
  const dbConn = await dbPool.connect();

  // excecute query
  const data = await dbConn.query(
    `
    select _user.user_id, email, created_at, last_updated, role
    from _user
    left join _user_role
    on _user.user_id = _user_role.user_id
    where _user.user_id = ${userId}
    `
  );

  // end db connection
  dbConn.end();

  return data.rows[0]
}

export const getUsers = async () => {
  // init db connection
  const dbConn = await dbPool.connect();

  // excecute query
  const data = await dbConn.query('select * from _user');

  // end db connection
  dbConn.end();

  return data.rows
}
