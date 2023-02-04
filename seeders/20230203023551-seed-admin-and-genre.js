'use strict';

const { hashPwd } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
   //Seed for Admins Table
   await queryInterface.bulkInsert('Admins', [
    {
      email: "alpha@mail.com",
      password: hashPwd("alpha"),
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ])

   //Seed for Genres Table
   await queryInterface.bulkInsert('Genres', [
    {
      name: 'Philosophy',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Science',
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ])

   //Seed for Users Table
   await queryInterface.bulkInsert('Users', [
    {
      username: "User 1",
      email: "user1@mail.com",
      password: hashPwd("user1"),
      phoneNumber: "888888",
      city: "Jakarta",
      favoriteGenre: "Philosophy",
      favoriteBook: "The Good Life",
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Genres')
    await queryInterface.bulkDelete('Admins')
  }
};
