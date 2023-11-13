import { BaseRepository } from "./base/BaseRepository";
import UserModel from "@models/UserModel";
import UserRoleModel from "@models/UserRoleModel";
import { QueryResult } from "pg";

export class UserRepository extends BaseRepository<UserModel | UserRoleModel> {
  // retrieves user by email and non-null role from db
  async getUserAndRoleByEmail(email: string): Promise<UserModel> {
    try {
      const query = `
            SELECT *
            FROM _users A
            LEFT JOIN _user_roles B
            ON A.user_id=B.user_id
            WHERE A.email='${email}' and B.role IS NOT NULL
            `;

      const queryResult: QueryResult = await this._pool.query(query);

      return queryResult.rows[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
