import bcrypt from "bcrypt";

import dbPool from "@utils/DbInit";
import UserModel from "@models/UserModel";
import { UserRepository } from "@database/repositories/UserRepository";

export const createUser = async (userData: UserModel) => {
  try {
    // init user db repositiory
    const userDbrepo = new UserRepository(dbPool, "_users");

    // check if user already exists
    const rows = await userDbrepo.getUserByEmail(userData.email);
    if (Object.entries(rows).length) throw new Error("Email exists");

    // hash user password
    userData.password = bcrypt.hashSync(userData.password, 10);

    // create user
    const createdUser = await userDbrepo.createUser(userData);

    // update newly created user role
    if (!(await userDbrepo.updateUserRole(createdUser.user_id, "user")))
      throw new Error("Error updating user role");

    return createdUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUser = async (userId: string) => {
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
  dbConn.release();

  return data.rows[0];
};

export const getUsers = async () => {
  // init db connection
  const dbConn = await dbPool.connect();

  // excecute query
  const data = await dbConn.query("select * from _user");

  // end db connection
  dbConn.release();

  return data.rows;
};
