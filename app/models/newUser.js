class newUser {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
    this.createdAt = new Date().toISOString();
    this.lastUpdated = new Date().toISOString();
  }
}

module.exports = newUser;
