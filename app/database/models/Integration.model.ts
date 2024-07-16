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

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare name: string;

  @Attribute(DataTypes.DATE)
  declare createdAt: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare updatedAt: CreationOptional<Date>;
}
