import type { CreationOptional, InferAttributes, InferCreationAttributes } from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import { Attribute, AutoIncrement, NotNull, PrimaryKey, Table, Unique } from '@sequelize/core/decorators-legacy';

@Table({
  tableName: 'users',
  defaultScope: { attributes: { exclude: ['password'] } },
})
export class Integration extends Model<InferAttributes<Integration>, InferCreationAttributes<Integration>> {
  @Attribute(DataTypes.BIGINT)
  @PrimaryKey
  @AutoIncrement
  @NotNull
  @Unique
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.BIGINT)
  @NotNull
  declare userId: CreationOptional<number>;

  @Attribute(DataTypes.BIGINT)
  @NotNull
  declare integrationId: CreationOptional<number>;

  @Attribute(DataTypes.DATE)
  declare createdAt: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare updatedAt: CreationOptional<Date>;
}
