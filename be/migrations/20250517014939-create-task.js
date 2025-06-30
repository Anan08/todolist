'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      title: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('todo', 'in-progress', 'done'),
        defaultValue: 'in-progress',
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model : 'Users',
          key : 'id',
          allowNull: false,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',

      }},
      dueDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      priority: {
        type: Sequelize.ENUM('low', 'medium', 'high'),
        defaultValue: 'medium',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};