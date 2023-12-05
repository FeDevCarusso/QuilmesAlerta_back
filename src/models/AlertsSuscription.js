import { DataTypes, Model } from 'sequelize';
import User from './User.js';
import sequelize from '../../db.js';

class AlertSuscription extends Model {}

AlertSuscription.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'AlertSuscription',
});

AlertSuscription.belongsTo(User, { foreignKey: 'userId' });

export default AlertSuscription;
