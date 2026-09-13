import Sequelize from "sequelize";
import { database } from "../../shared/config/database.js";

const tableName = "parkingLocations";

const parking_location_model = database.define(
  tableName,
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: Sequelize.STRING(1000),
      allowNull: false,
    },
    slots: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    basePrice: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    tableName: tableName,
  },
);

export default parking_location_model;
