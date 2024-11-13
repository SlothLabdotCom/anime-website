const { Sequelize } = require('sequelize');

// Load environment variables
require('dotenv').config();

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST,  // Database host
    dialect: 'mysql',           // Database dialect (mysql, postgres, etc.)
    logging: false,             // Disable logging for production
  }
);

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;
