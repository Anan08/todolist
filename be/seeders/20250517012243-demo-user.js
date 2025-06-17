'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: "9c28a8c9-574e-43e8-fc25-ee0fd2df9cef",
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@mail.com',
        password: await bcrypt.hash('12345678', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
