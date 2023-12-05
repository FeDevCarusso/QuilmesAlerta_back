import { DataTypes, Model } from "sequelize";
import sequelize from "../../db.js";
import User from "./User.js";

class UserRoles extends Model {}

UserRoles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: ["user", "admin", "moderator"],
      },
    },
  },
  {
    sequelize,
    modelName: "UserRoles",
  }
);

// Relación con el modelo User
UserRoles.belongsTo(User, { foreignKey: "userId" });

export default UserRoles;
