import type Sequelize from '@sequelize/core';
import { DataTypes } from '@sequelize/core';
import type { Migration } from 'utils/umzug/index.ts';

const up: Migration = async ({ context: sequelize }: { context: Sequelize }) => {
  await sequelize.queryInterface.createTable('userIntegrations', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        table: 'users',
        key: 'id',
      },
    },
    integrationId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        table: 'integrations',
        key: 'id',
      },
    },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  });
};

const down = async ({ context: sequelize }: { context: Sequelize }): Promise<void> => {
  await sequelize.queryInterface.dropTable('userIntegrations');
};

export { up, down };
