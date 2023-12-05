import { DataTypes, Model } from "sequelize";
import sequelize from "../../db.js";
import User from "./User.js";

class Incident extends Model {}

Incident.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Incident",
  }
);

Incident.belongsTo(User, { foreignKey: "userId" });

export default Incident;
