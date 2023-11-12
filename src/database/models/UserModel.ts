import { UserInterface } from "@appTypes/IndexTypes";

class UserModel {
  user_id?: string;
  email?: string;
  password?: string;
  createdAt?: string;
  lastUpdated?: string;

  constructor({ email, password }: UserInterface) {
    this.email = email;
    this.password = password;
  }
}

export default UserModel;
