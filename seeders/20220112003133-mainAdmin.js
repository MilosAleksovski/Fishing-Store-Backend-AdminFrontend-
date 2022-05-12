'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
   
      await queryInterface.bulkInsert('Users', [{
        firstName: 'Milos',
        lastName: 'Aleksic',
        email: 'miki@gmail.com',
        username: 'admin',
        password: bcrypt.hashSync('admin', 10),
        role: 'Admin',
        createdAt:new Date(),
        updatedAt:new Date()
        

      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
