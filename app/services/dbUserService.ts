const dbService = require("../services/dbUserService")

exports.ifUserExists = async (dbConn, email) => {
    try {
      // retrieve email from db if exists
      const query = await dbConn.query(
        `select * from _user where email='${email}'`
      );

      return query.rowCount > 0 ? true : false;

    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };