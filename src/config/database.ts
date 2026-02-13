import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT as any,
  dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
});

export const connectDB = async() =>{
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    throw new Error("Unable to connect to database");
  }
}

export default sequelize;