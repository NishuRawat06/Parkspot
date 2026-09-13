import { Sequelize } from "sequelize";

export const database = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  pool: { max: 5, idle: 30000 },
});

export const testDBConnection = async () => {
  try {
    await database.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
