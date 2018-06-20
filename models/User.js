const db = require("../db/connection");

const User = {};

User.findUsername = formUsername => {
  return db.one("SELECT * FROM users WHERE user_name = $1", [formUsername]);
};

User.createNewUser = (username, password) => {
  return db.one("INSERT INTO users (user_name, password) VALUES ($1, $2)", [
    username,
    password
  ]);
};

module.exports = User;
