interface UserInterfaceType {
  email: string;
  password: string;
}

class User {
  email: string;
  password: string;
  role: string;
  createdAt: string;
  lastUpdated: string;

  constructor({ email, password }: UserInterfaceType) {
    this.email = email;
    this.password = password;
  }
}

export default User;
