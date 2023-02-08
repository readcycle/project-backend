"use strict";

const { funcHashValue } = require("../helper/bcryptHandler");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //Seed for Admins Table
    await queryInterface.bulkInsert("Admins", [
      {
        email: "alpha@mail.com",
        password: funcHashValue("alpha"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    //Seed for Genres Table
    await queryInterface.bulkInsert("Genres", [
      {
        name: "Mistery",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Romance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fantasy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Comic",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Horror/Thriller",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Science",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "History",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Non-fiction",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Genres");
    await queryInterface.bulkDelete("Admins");
  },
};
