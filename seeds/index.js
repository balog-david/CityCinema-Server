const seedAdmin = require("./seedAdmin");
const seedRoom = require("./seedRoom");

module.exports = async () => {
  await seedAdmin();
  await seedRoom();
};
// This file is used to seed the database with initial data.
