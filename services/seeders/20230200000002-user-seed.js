"use strict";

const { funcHashValue } = require("../helper/bcryptHandler");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        fullname: "perys siahaan",
        email: "peryssiahaan@gmail.com",
        password: funcHashValue("perys123"),
        phoneNumber: "081211213441",
        city: "Bandung",
        favoriteGenre: "Mystery",
        favoriteBook: "Lama",
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(107.5925576773082 -6.940669415817259)"
        ),
        isBanned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "yae miko",
        email: "yaemiko@gmail.com",
        password: funcHashValue("mikofoxy123"),
        phoneNumber: "081212213441",
        city: "Jakarta",
        favoriteGenre: "Romance",
        favoriteBook: "Lama",
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.84304125335981 -6.2418023072307625)"
        ),
        isBanned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "raiden mei",
        email: "raidenmei@gmail.com",
        password: funcHashValue("mei0098"),
        phoneNumber: "081212211241",
        city: "Jakarta",
        favoriteGenre: "Romance",
        favoriteBook: "Lama",
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.8404441475624 -6.238927738616384)"
        ),
        isBanned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "nilou",
        email: "nilou@gmail.com",
        password: funcHashValue("nilou112"),
        phoneNumber: "081212211431",
        city: "Jakarta",
        favoriteGenre: "History",
        favoriteBook: "Lama",
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.84357584501699 -6.239228771586251)"
        ),
        isBanned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Katara",
        email: "katara@gmail.com",
        password: funcHashValue("katara123"),
        phoneNumber: "081232211431",
        city: "Medan",
        favoriteGenre: "History",
        favoriteBook: "Lama",
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.84357584501699 -6.239228771586251)"
        ),
        isBanned: false,
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
    await queryInterface.bulkDelete("Users", null, {});
  },
};
