import Sequelize from "sequelize";
import { database } from "../../shared/config/database.js";

const tableName = "booking";
const booking_modal = database.define(
  tableName,
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone_number: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    vehicle_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    vehicle_type: {
      type: Sequelize.ENUM("two wheeler", "four wheeler", "heavy vehicle"),
      allowNull: false,
    },
    entry: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    exit: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    expected_exit: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    base_price: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("parked", "exited", "abandoned"),
      allowNull: false,
    },
  },
  { paranoid: true, timestamps: true, tableName: tableName },
);

export default booking_modal;
