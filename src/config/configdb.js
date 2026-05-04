const { Sequelize } = require("sequelize");
const config = require("./config.json");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
	dbConfig.database,
	dbConfig.username,
	dbConfig.password,
	{
		host: dbConfig.host,
		dialect: dbConfig.dialect,
		logging: dbConfig.logging
	}
);

const connectDB = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

module.exports = { sequelize, connectDB };