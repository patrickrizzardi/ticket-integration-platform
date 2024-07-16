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
    name: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  });
};

const down = async ({ context: sequelize }: { context: Sequelize }): Promise<void> => {
  await sequelize.queryInterface.dropTable('users');
};

export { up, down };
