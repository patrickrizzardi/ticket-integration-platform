import type Sequelize from '@sequelize/core';
import { DataTypes } from '@sequelize/core';
import dayjs from 'dayjs';
import type { Migration } from 'utils/umzug/index.ts';

const up: Migration = async ({ context: sequelize }: { context: Sequelize }) => {
  await sequelize.queryInterface.createTable('integrations', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE },
  });

  await sequelize.queryInterface.bulkInsert('integrations', [
    { name: 'Notion', createdAt: dayjs().toDate(), updatedAt: dayjs().toDate() },
    { name: 'HubSpot', createdAt: dayjs().toDate(), updatedAt: dayjs().toDate() },
    { name: 'Jira', createdAt: dayjs().toDate(), updatedAt: dayjs().toDate() },
    { name: 'Wrike', createdAt: dayjs().toDate(), updatedAt: dayjs().toDate() },
    { name: 'Quickbase', createdAt: dayjs().toDate(), updatedAt: dayjs().toDate() },
    { name: 'Zoho', createdAt: dayjs().toDate(), updatedAt: dayjs().toDate() },
  ]);
};

const down = async ({ context: sequelize }: { context: Sequelize }): Promise<void> => {
  await sequelize.queryInterface.bulkDelete('integrations', {});
  await sequelize.queryInterface.dropTable('integrations');
};

export { up, down };
