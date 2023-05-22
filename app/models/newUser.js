class newUser {
  constructor({ email, password }, role) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = new Date().toISOString();
    this.lastUpdated = new Date().toISOString();
  }
}

module.exports = newUser;
