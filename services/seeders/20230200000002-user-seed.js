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
        fullname: "Prospero Milan",
        email: "prosperomilan@gmail.com",
        password: funcHashValue("prospero111"),
        phoneNumber: "081211213441",
        city: "Bandung",
        favoriteGenre: "Fantasy",
        favoriteBook: "Harry Potter",
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(107.5925576773082 -6.940669415817259)"
        ),
        avatar: "https://media.istockphoto.com/id/1388253782/id/foto/potret-kepala-pria-profesional-bisnis-milenial-yang-sukses.jpg?b=1&s=170667a&w=0&k=20&c=TKRwBYire7T3w4qlG1_ijP7ugs66MYZVXZREs9AKt2Q=",
        isBanned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Miranda Milan",
        email: "mirandamilan@gmail.com",
        password: funcHashValue("miranda222"),
        phoneNumber: "081212213441",
        city: "Jakarta",
        favoriteGenre: "Romance",
        favoriteBook: "Really Good, Actually",
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.84304125335981 -6.2418023072307625)"
        ),
        avatar: "https://img.freepik.com/free-photo/close-up-shot-pretty-woman-with-perfect-teeth-dark-clean-skin-having-rest-indoors-smiling-happily-after-received-good-positive-news_273609-1248.jpg",
        isBanned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Ariel Sycorax",
        email: "arielsycorax@gmail.com",
        password: funcHashValue("asycorax"),
        phoneNumber: "081212211241",
        city: "Jakarta",
        favoriteGenre: "Romance",
        favoriteBook: "Final Offer",
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.8404441475624 -6.238927738616384)"
        ),
        avatar: "https://media.istockphoto.com/id/1399788030/id/foto/potret-wanita-muda-india-yang-percaya-diri-berpose-di-latar-belakang.jpg?b=1&s=170667a&w=0&k=20&c=W6Vx9X3BLyxiXwrjACSuwbMmVGS3KCw-_dyzBjZ4Vko=",
        isBanned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Brian David Gilbert",
        email: "bdg@gmail.com",
        password: funcHashValue("bdg333"),
        phoneNumber: "081212211431",
        city: "Jakarta",
        favoriteGenre: "Drama",
        favoriteBook: "Rome & Julliet",
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.84357584501699 -6.239228771586251)"
        ),
        avatar: "https://media.istockphoto.com/id/1386479313/id/foto/wanita-bisnis-afro-amerika-milenium-yang-bahagia-berpose-terisolasi-di-atas-putih.jpg?b=1&s=170667a&w=0&k=20&c=8j9-kNoXifTl5acQbFERHFaYWyRES1ZNyCYtR6-ewkk=",
        isBanned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullname: "Alonso Naples",
        email: "alonaples@gmail.com",
        password: funcHashValue("katara123"),
        phoneNumber: "081232211431",
        city: "Medan",
        favoriteGenre: "History",
        favoriteBook: "King Lear",
        location: Sequelize.fn(
          "ST_GeomFromText",
          "POINT(106.84357584501699 -6.239228771586251)"
        ),
        avatar: "https://cdn.pixabay.com/photo/2016/11/22/21/42/woman-1850703__480.jpg",
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
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
