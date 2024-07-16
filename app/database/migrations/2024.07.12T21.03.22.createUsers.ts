import type Sequelize from '@sequelize/core';
import { DataTypes } from '@sequelize/core';
import type { Migration } from 'utils/umzug/index.ts';

const up: Migration = async ({ context: sequelize }: { context: Sequelize }) => {
  await sequelize.queryInterface.createTable('users', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: { type: DataTypes.STRING, allowNull: false },
    ipAddress: { type: DataTypes.STRING, allowNull: false },
    failedLoginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    lastActive: { type: DataTypes.DATE },
    verifiedAt: { type: DataTypes.DATE },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
    deletedAt: { type: DataTypes.DATE },
  });
};

const down = async ({ context: sequelize }: { context: Sequelize }): Promise<void> => {
  await sequelize.queryInterface.dropTable('users');
};

export { up, down };
