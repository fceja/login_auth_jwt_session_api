import { UserInterface } from "@appTypes/IndexTypes";

class UserModel {
  email: string;
  password: string;
  role: string;
  createdAt: string;
  lastUpdated: string;

  constructor({ email, password }: UserInterface) {
    this.email = email;
    this.password = password;
  }
}

export default UserModel;
