"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tasks', [
      {
        title: 'Learn AWS',
        description: 'Understand how to connect RDS with Node.js',
        status: 'pending'
      },
      {
        title: 'Setup Sequelize',
        description: 'Configure ORM with PostgreSQL database',
        status: 'in_progress'
      },
      {
        title: 'Deploy Backend',
        description: 'Deploy Node app to EC2 instance',
        status: 'pending'
      },
      {
        title: 'Write API Tests',
        description: 'Test GET and POST APIs properly',
        status: 'completed'
      },
      {
        title: 'Optimize Queries',
        description: 'Improve database performance',
        status: 'pending'
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
