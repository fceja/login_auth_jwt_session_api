import { BaseRepository } from "./base/BaseRepository";
import UserModel from "@models/UserModel";
import UserRoleModel from "@models/UserRoleModel";

export class UserRepository extends BaseRepository<UserModel | UserRoleModel> {}
