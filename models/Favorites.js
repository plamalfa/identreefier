const db = require("../db/connection");

const Favorites = {};

Favorites.createFavorite = (userId, treeId) => {
  return db.one(
    "INSERT INTO favorites (userid, treeid) VALUES ($1, $2) RETURNING *",
    [userId, treeId]
  );
};

Favorites.findAll = userId => {
  return db.any("SELECT * FROM favorites WHERE userId = $1", [userId]);
};

Favorites.findFavoriteByUserIdAndTreeId = (userid, treeid) => {
  return db.any("SELECT * FROM favorites WHERE userid = $1 AND treeid = $2", [
    userid,
    treeid
  ]);
};

Favorites.delete = id => {
  return db.result("DELETE FROM favorites WHERE id = $1", [id]);
};

Favorites.edit = (editNoteData, treeId) => {
  return db.none("UPDATE favorites SET notes = $1 WHERE treeid = $2", [
    editNoteData,
    treeId
  ]);
};

module.exports = Favorites;
