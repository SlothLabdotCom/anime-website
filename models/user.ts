// In your `models` file (e.g., models/User.ts or models/index.ts)
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';  // Adjust the path if necessary

class User extends Model {
  public uid!: string;
  public email!: string;
  public username!: string;
  public password!: string;
}

User.init(
  {
    uid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  }
);

export { User };
