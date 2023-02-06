"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn("Posts", "title");
    await queryInterface.removeColumn("Posts", "author");
    await queryInterface.removeColumn("Posts", "GenreId");
    await queryInterface.addColumn("Posts", "BookId", {
      type: Sequelize.INTEGER,
      references: { model: { tableName: "Books" }, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn("Posts", "title", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Posts", "author", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Posts", "GenreId", {
      type: Sequelize.INTEGER,
      references: { model: { tableName: "Genres" }, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.removeColumn("Posts", "BookId");
  },
};
