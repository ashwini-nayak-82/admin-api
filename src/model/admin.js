import { DataTypes } from "sequelize";
import getConnection from "../helper/dbconnection.js";
let Admin = null;
const initAdminModel = async () => {
  if (Admin) return Admin;
  const sequelize = await getConnection();
  Admin = sequelize.define(
    "Admin",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "admins",
      timestamps: true,
    },
  );
  await sequelize.sync({ alter: true });
  return Admin;
};
export default initAdminModel;
