"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        username: "admin",
        email: "admin@gmail.com",
        password:
          "$2b$10$vowdjV0LZ2jLtkcSZeTB9uNhAOybgQeNbmObN/12S9Z6vef8ChmOm",
        is_admin: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};